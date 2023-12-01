import React,{useState,useEffect} from 'react'
import Layout from '../../componenets/Layout/Layout'
import AdminMenu from '../../componenets/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../componenets/Context/Auth'
import CategoryInput from '../../componenets/Form/CategoryInput'
import {Modal} from 'antd'



const CreateCategory = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updatedName, setUpdatedName] = useState()
  const [auth, setAuth] = useAuth()


  const token = auth?.token;
const config = {
              
              headers: {
                'Authorization': `Bearer ${token}`
            }
}

  // handle form 

  const handleSubmit =  async (e)=> {

    e.preventDefault()
    try{
      
      const {data} = await axios.post('http://localhost:8080/api/category/create-category',{name}, config)
      
      if(data.success){
        toast.success(`${name} is created` )
        getAllCategory(); 
      }else{
        toast.error(data.message)
      }
    }
    catch(error){
      console.log(error)
      toast.error("sometthing went wrong")

    }
  } 

  // get all cat 

  const getAllCategory = async  () =>{
    try {
      const {data} = await axios.get('http://localhost:8080/api/category/get-category', config)
      
      if(data.success){
        setCategories(data.category)
      }
    } catch (error) {
     console.log(error)
     toast.error("something went wrong in getting categories") 
    }
  }

  useEffect(() => {
    getAllCategory();
  }, [])

  const handleUpdate = async(e)=>{
    e.preventDefault()
    try{
      const {data} = await axios.put(`http://localhost:8080/api/category/update-category/${selected._id}`,{name:updatedName},config)
      if(data.success){
        toast.success(`${updatedName} is updated`)
        setSelected(null)
        setUpdatedName("")
        setVisible(false)
        getAllCategory();
      }
    }catch(error){
      console.log(error);
      toast.error('something went wrong')
    }
  }


  // for delete 

 
  const handleDelete = async(e,categoryId)=>{
    e.preventDefault()
    try{
      const {data} = await axios.delete(`http://localhost:8080/api/category/delete-category/${categoryId}`,config)
      if(data.success){
        toast.success(`${updatedName} is deleted`)
        
        getAllCategory();
      }
    }catch(error){
      console.log(error);
      toast.error('something went wrong')
    }
  }
  return (
    <Layout>
        <div className="row">

            <div className="col-md-3"> <AdminMenu/> </div>
        <div className="col-md-9">
            <h1>Managae category</h1>
            <div className="p-3">
              <CategoryInput  handleSubmit={handleSubmit} value= {name}
               setValue = {setName} />
            </div>
            <div className='w-75'>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Action</th>
      
    </tr>
  </thead>
  <tbody>
      <>
      {categories?.map((c) =>(
    <tr>
        <td key = {c._id}>{c.name}</td>
        <td>
          <button className="btn btn-primary ms-2" onClick={()=> {setVisible(true); setUpdatedName(c.name);
          setSelected(c)}}>Edit</button>
       <button className="btn btn-danger ms-3" onClick={(e) => handleDelete(e,c._id)}>delete</button>


          </td> 
    </tr>
    ))}
    </>
   
  </tbody>
</table>
        <div>
          <Modal onCancel={()=>setVisible(false)} 
           footer={null}  
           open={visible} >
            <CategoryInput   value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
          </Modal>
        </div>
            </div>
        </div>
        </div>

    </Layout>
  )
}

export default CreateCategory
