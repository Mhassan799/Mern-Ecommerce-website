import React from 'react'
import Layout from '../../componenets/Layout/Layout'
import { useAuth } from '../../componenets/Context/Auth'
import UserMenu from '../../componenets/Layout/UserMenu'
const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout>

    <div className="container-fluid my-5">

        <div className="row">
            <div className="col-md-3">
            <UserMenu/>
            </div>
            <div className="col-md-9 ">
            <div className="card p-5">
               <h3>User name:{auth?.user?.name}</h3> 
               <h3>User emaill:{auth?.user?.email}</h3> 
               <h3>User phone:{auth?.user?.phone}</h3> 


            </div>
            </div>
        </div>
    </div>

    </Layout>
  )
}

export default Dashboard
