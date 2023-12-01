import React,{useState} from 'react'
import Layout from '../../componenets/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import '../../Styles/AuthStyles.css'


import {useNavigate} from 'react-router-dom'

const Register = () => {
     
    const [name,setName] = useState('')
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')


    const [phone,setPhone] = useState('')
    const [answer,setAnswer] = useState('')

    const navigate = useNavigate()
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post('http://localhost:8080/api/user/register',
           { name, email, password, phone , answer});
          
        
          if(res.status >= 200 && res.status < 300) {
            toast.success("User Registered Successfully");
           
          navigate('/login');

          }
          
        } catch (error) {
            console.log(email,password)
            alert(error)
          if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Something went wrong");
          }
        }
      }
    // console.log(process.env.REACT_APP_API)
    

  return (  
   <>
   <Layout>
   <div>

  
  <section className="wrapper">
    <div className="form signup">
      <header>Signup</header>
      <form  onSubmit={submitHandler} >
        <input type="text"
        value ={name} onChange={(e) => setName(e.target.value)}
        placeholder="Full name" required />
        <input type="text"
        value ={email} onChange={(e) => setEmail(e.target.value)}
        
        placeholder="Email address" required />
        <input type="password"
        value ={password} onChange={(e) => setPassword(e.target.value)}
        
        placeholder="Password" required />
        <input type="text"
        value ={phone} onChange={(e) => setPhone(e.target.value)}
        
        placeholder="phone" required />
        <input type="text"
        value ={answer} onChange={(e) => setAnswer(e.target.value)}
        
        placeholder="your fav sports" required />

        
        <input type="submit" defaultValue="Signup"    />
      </form>
    </div>
    
  </section>
</div>
</Layout>
   </>
  )
}

export default Register
