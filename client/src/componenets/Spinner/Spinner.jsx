import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


const Spinner = ({path = "login"}) => {

    const [count, setCount] = useState(5)
    const navigate = useNavigate()
    useEffect(() => {
    const interval = setInterval(() => {
        setCount((prevValue)=> --prevValue)

    }, 1000);
    count ===0 && navigate(`/${path}`,{
        state:location.pathname
    })
    return () =>clearInterval(interval)
    }, [count, navigate, location,path])
  return (
    <><div className='d-flex justify-content-center align-items-center'  style={{height:"100vh"}}>
        
    
    <h1 className="sr-only">Redirection You to {count} seconds..... </h1>
    <div className="spinner-border" role="status">
  </div>
  </div>
  </>

  )
}

export default Spinner
