import React,{useState,useEffect} from 'react'
import Layout from '../../componenets/Layout/Layout'
import AdminMenu from '../../componenets/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../componenets/Context/Auth'
import {  useNavigate,useParams } from 'react-router-dom'
import { Select } from 'antd'

const {Option} = Select;

const ProductUpdate = () => {

       
const navigate = useNavigate();
const params = useParams()
const [auth,setAuth]=useAuth()
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [name, setName] = useState("")
  const [shipping, setShippping] = useState("")
  const [description, setDescription] = useState("")
  const [id,setId]= useState("")


  const token = auth?.token;
  const config = {
                
                headers: {
                  'Authorization': `Bearer ${token}`
              }
  }




  const handleUpdate= async (e)=>{
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append("name",name)
      productData.append("description",description)
      productData.append("price",price)
      productData.append("quantity",quantity)
      productData.append("category",category)
      productData.append("shipping",shipping)
     photo && productData.append("photo",photo)



      const {data} = await axios.put(`http://localhost:8080/api/product/update-product/${id}`, productData,config)
      if(data?.success){
          
          toast.error(data.message) 
        }
      else{
        toast.success("product updted succesfuly")
        navigate('/dashboard/admin/products')
       
      }
    } catch (error) {
      console.log(error)
      toast.error("something went wrong")
    }

  }

//   delete product 

const handleDelete= async()=>{
    try {
        let answer = prompt("are you sure that you want to delete this product?")
        if(!answer){return}
        const {data} = axios.delete(`http://localhost:8080/api/product/delete-product/${id}`,config)
        if(data?.success){
            toast.success("poduct deleted succesfully")
            navigate('/dashboard/admin/products')
        }
    } catch (error) {
        console.log(error)
        toast.error("error in deleting product")
    }
}
//   get siingle product 
const getSingleProduct = async ()=>{
    try{
        const {data} = await axios.get(`http://localhost:8080/api/product/get-single-product/${params.slug}`,config);
        setName(data.product.name);
        setId(data.product._id);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setShippping(data.product.shipping);
        setCategories(data.product.category._id);
        setPhoto(data.product.photo);




    }
    catch(error){
        console.log(error)
        toast.error("smething went wroong")
    }
}
useEffect(() => {
getSingleProduct();
// eslint-disable-next-line
}, [])

  const getAllCategory = async  () =>{
    try {
      const {data} = await axios.get('http://localhost:8080/api/category/get-category', config)
      
      if(data?.success){
        setCategories(data?.category)
      }
    } catch (error) {
     console.log(error)
     toast.error("something went wrong in getting categories") 
    }
  }

  useEffect(() => {
    getAllCategory();
  }, [])
  


 
  return (
    <Layout>
        <div className="row">

            <div className="col-md-3"> <AdminMenu/> 
            </div>
        <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
          <Select  bordered={false}
          placeholder="select a category"
          size='large'
          showSearch
          className='form-select mb-3'
          onChange={(value)=>{
            setCategory(value);
          }} 
          value={category}         
          >
            {categories.map((c)=>(
              <Option key={c._id} value = {c._id}>{c.name}</Option>
            ))}
          </Select>
          </div>
         
          <div className="mb-3">
            <label  className='btn btn-outine-secondary'>
              {photo ? photo.name : "upload photo"}
              <input type="file"  name="photo" accept="image/*"
               onChange={(e) => setPhoto(e.target.files[0])} 
              hidden />
            </label>
            <div className="mb-3">
              {photo ? (
                <div className="text-center">
                  <img
                  src = {URL.createObjectURL(photo)}
                  alt="product_photo"
                  height={"200px"}
                  className='img img-responsive'
                  />
                </div>

              ): (
                <div className="text-center">
                <img
                src = {`http://localhost:8080/api/product/product-photo/${id}`}
                alt="product_photo"
                height={"200px"}
                className='img img-responsive'
                />
              </div>
              )}
            </div>
            <div className="mb-3">
              <input
              type='text'
              value={name}
              placeholder='write a name'
              className='form-control'
              onChange={(e)=> setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
              type='text'
              value={description}
              placeholder='write a descripton'
              className='form-control'
              onChange={(e)=> setDescription(e.target.value)}
              />
            </div>
            
            <div className="mb-3">
              <input
              type='number'
              value={price}
              placeholder='write a price'
              className='form-control'
              onChange={(e)=> setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
              type='number'
              value={quantity}
              placeholder='write a quantity'
              className='form-control'
              onChange={(e)=> setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Select
              bordered={false}
              placeholder="select"
              size='large'
              showSearch
              className='form-select mb-3'
              onChange={(value)=>{
                setShippping(value);
              }}
              value={shipping? "yes" : "no"}
              >
                <Option value={false}>no</Option>
                <Option value={true}>yes</Option>

                
              </Select>
              
            </div>
            <div className="mb-3">

              <button  className='btn btn-primary'  onClick={handleUpdate}>create product</button>
              <button  className='btn btn-danger'  onClick={handleDelete}>Delete product</button>

            </div>
          
          </div>
            </div>
        </div>
        
       
      

    </Layout>
  )
            }



export default ProductUpdate
