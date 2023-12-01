import React from 'react'
import Layout from '../../componenets/Layout/Layout'
import AdminMenu from '../../componenets/Layout/AdminMenu'
import { useAuth } from '../../componenets/Context/Auth'


const AdminDashboard = () => {
    const [auth] = useAuth()
  return (
    <Layout>

    <div className="container-fluid my-5">

        <div className="row">
            <div className="col-md-3">
            <AdminMenu/>
            </div>
            <div className="col-md-9 ">
            <div className="card p-5">
               <h3>Admin name:{auth?.user?.name}</h3> 
               <h3>Admin emaill:{auth?.user?.email}</h3> 
               <h3>Admin phone:{auth?.user?.phone}</h3> 


            </div>
            </div>
        </div>
    </div>

    </Layout>
  )
}

export default AdminDashboard
