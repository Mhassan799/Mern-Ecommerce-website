import React,{useState} from 'react'
import Layout from '../../componenets/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import '../../Styles/AuthStyles.css'



const ForgotPassword = () => {
  
   
    
  const [email, setEmail] = useState('')
  const [newpassword,setNewPassword] = useState('')
  const [answer,setAnswer] = useState('')
  
    const navigate = useNavigate()
        
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post('http://localhost:8080/api/user/forgot-password',
           {email, newpassword,answer });
          
        if(res.status >= 200 && res.status < 300){
   

            toast.success('Reset Password succesfully')
      
      navigate( '/login')

    
    }

          }
          
         catch (error) {
            console.log(email,newpassword)
            alert(error)
          if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Something went wrong");
          }
        }
      }
  return (
    <>
     <Layout>
   <div>

  
  <section className="wrapper">
    <div className="form signup">
      <header>Reset Password</header>
      <form  onSubmit={submitHandler}>
        
        <input type="text"
        value ={email} onChange={(e) => setEmail(e.target.value)}
        
        placeholder="Email address" required />
        <input type="password"
        value ={newpassword} onChange={(e) => setNewPassword(e.target.value)}
        
        placeholder="New Password" required />
         <input type="text"
        value ={answer} onChange={(e) => setAnswer(e.target.value)}
        
        placeholder="Enter Your  fav Sport" required />
       

        
        <input type="submit" defaultValue="Reset" />
        

      </form>
    </div>
    
  </section>
</div>
</Layout>
    </>
  )
}

export default ForgotPassword