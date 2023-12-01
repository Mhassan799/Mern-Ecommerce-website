import React,{useState} from 'react'
import Layout from '../../componenets/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import {useNavigate, useLocation, Link} from 'react-router-dom'
import { useAuth } from '../../componenets/Context/Auth'
import '../../Styles/AuthStyles.css'


const Login = () => {
  
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
  const[auth , setAuth] = useAuth();


    
    const navigate = useNavigate()
    const location = useLocation()

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post('http://localhost:8080/api/user/login',
           {email, password });
          
        if(res.status >= 200 && res.status < 300){
    //        console.log(res.data.token)
      // localStorage.setItem('token', res.data.token)
      toast.success('login succesfully')
      setAuth({
        ...auth,
        user:res.data.user,
        token: res.data.token,
      })
      localStorage.setItem('auth',JSON.stringify(res.data))
      console.log(res.data)
      
      navigate(location.state || '/')

    
    }

          }
          
         catch (error) {
            console.log(email,password)
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
      <header>Login</header>
      <form  onSubmit={submitHandler}>
        
        <input type="text"
        value ={email} onChange={(e) => setEmail(e.target.value)}
        
        placeholder="Email address" required />
        <input type="password"
        value ={password} onChange={(e) => setPassword(e.target.value)}
        
        placeholder="Password" required />
       

        
        <input type="submit" defaultValue="Login" />
       
        <Link to  = "/forgot-password">Forgot Password ?</Link>

      </form>
    </div>
    
  </section>
</div>
</Layout>
</>
  )
}

export default Login
