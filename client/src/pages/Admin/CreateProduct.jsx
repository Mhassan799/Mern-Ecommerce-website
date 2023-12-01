import React,{useState,useEffect} from 'react'
import Layout from '../../componenets/Layout/Layout'
import AdminMenu from '../../componenets/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../componenets/Context/Auth'
import {  useNavigate } from 'react-router-dom'
import { Select } from 'antd'
const {Option} = Select;


const CreateProduct = () => {
const navigate = useNavigate();
const [auth,setAuth]=useAuth()
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [name, setName] = useState("")
  const [shipping, setShippping] = useState("")
  const [description, setDescription] = useState("")


  const token = auth?.token;
  const config = {
                
                headers: {
                  'Authorization': `Bearer ${token}`
              }
  }

  const handlCreate = async (e)=>{
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




      const {data} = await axios.post('http://localhost:8080/api/product/create-product', productData,config)
      if(data?.success){
       
        toast.success("product created succesfuly")
        navigate('/dashboard/admin/products')
        
      }
      else{
        toast.error("errorRRRRRRRRRRR in creating product")
       
      }
    } catch (error) {
      console.log(error)
      toast.error("something went wrong")
    }

  }


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
            <h1>Create Product</h1>
            <div className="m-1 w-75">
          <Select  bordered={false}
          placeholder="select a category"
          size='large'
          showSearch
          className='form-select mb-3'
          onChange={(value)=>{
            setCategory(value);
          }}          
          >
            {categories.map((c)=>(
              <Option key={c._id} value = {c._id}>{c.name}</Option>
            ))}
          </Select>
          </div>
         
          <div className="mb-3">
            <label  className='btn btn-outine-secondary'>
              {photo ? photo.name : "upload photo"}
              <input type="file"  name="photo" accept="image/★"
               onChange={(e) => setPhoto(e.target.files[0])} 
              hidden />
            </label>
            <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img
                  src = {URL.createObjectURL(photo)}
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
            {/* <div className="mb-3">
              <input
              type='text'
              value={category}
              placeholder='write a category'
              className='form-control'
              onChange={(e)=> setCategory(e.target.value)}
              />
            </div> */}
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
              >
                <Option value={false}>no</Option>
                <Option value={true}>yes</Option>

                
              </Select>
              
            </div>
            <div className="mb-3">

              <button  className='btn btn-primary'  onClick={handlCreate}>create product</button>
            </div>
          
          </div>
            </div>
        </div>
        
       
      

    </Layout>
  )
}

export default CreateProduct
