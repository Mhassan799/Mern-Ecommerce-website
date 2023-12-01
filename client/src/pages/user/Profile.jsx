import React,{useState,useEffect} from 'react'
import Layout from '../../componenets/Layout/Layout'
import UserMenu from '../../componenets/Layout/UserMenu'
import { useAuth } from '../../componenets/Context/Auth'
import toast from 'react-hot-toast'
import axios from 'axios'


const Profile = () => {
  const [auth,setAuth] = useAuth()
  const [name,setName] = useState('')
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [phone,setPhone] = useState('')
    const [answer,setAnswer] = useState('')

    useEffect(() => {
      const { email, name, phone,answer} = auth?.user;
      setName(name);
      setPhone(phone);
      setEmail(email);
      setAnswer(answer)
    }, [auth?.user]);
  
    const token = auth?.token;
    const config = {
                  
                  headers: {
                    'Authorization': `Bearer ${token}`
                }
    }

    const submitHandler = async(e)=>{
      e.preventDefault()
      try {
        const { data } = await axios.put("http://localhost:8080/api/user/update-profile", {
          name,
          email,
          password,
          phone,
          
        },config);
        if (data?.errro) {
          toast.error(data?.error);
        } else {
          setAuth({ ...auth, user: data?.updatedUser });
          let ls = localStorage.getItem("auth");
          ls = JSON.parse(ls);
          ls.user = data.updatedUser;
          localStorage.setItem("auth", JSON.stringify(ls));
          toast.success("Profile Updated Successfully");
          
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }

    }
  return (
    <Layout>
    <div className="row">

        <div className="col-md-3"> <UserMenu/> </div>
    <div className="col-md-9">
    <div>

  
<section className="wrapper">
  <div className="form signup">
    <header>Profile</header>
    <form  onSubmit={submitHandler} >
      <input type="text"
      value ={name} onChange={(e) => setName(e.target.value)}
      placeholder="Full name"  />
      <input type="text"
      value ={email} onChange={(e) => setEmail(e.target.value)}
      
      placeholder="Email address" disabled />
      <input type="password"
      value ={password} onChange={(e) => setPassword(e.target.value)}
      
      placeholder="Password"  />
      <input type="text"
      value ={phone} onChange={(e) => setPhone(e.target.value)}
      
      placeholder="phone"  />
      <input type="text"
      value ={answer} onChange={(e) => setAnswer(e.target.value)}
      
      placeholder="your fav sports"  />

      
      <input type="submit" defaultValue="Signup"    />
    </form>
  </div>
  
</section>
</div>
    </div>
    </div>

</Layout>
  )
}

export default Profile
