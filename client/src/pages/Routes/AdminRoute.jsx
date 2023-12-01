import { useState, useEffect } from "react";
import { useAuth } from "../../componenets/Context/Auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../../componenets/Spinner/Spinner";

export default function AdminRoute(){
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth()
    const token = auth?.token;
    const config = {
                  
                  headers: {
                    'Authorization': `Bearer ${token}`
                }
    }

    useEffect(() => {
        const authCheck = async() => {
            const token = auth?.token;
            const res = await axios.get('http://localhost:8080/api/user/admin-auth', config);
            
            if (res.data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        }
        
        if(auth?.token) authCheck();
    }, [auth?.token])
    return ok? <Outlet/>  : <Spinner path= "" />
}