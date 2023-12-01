import React from 'react'
import Layout from '../../componenets/Layout/Layout'
import AdminMenu from '../../componenets/Layout/AdminMenu'

const User = () => {
  return (
    <Layout>
        <div className="row">

            <div className="col-md-3"> <AdminMenu/> </div>
        <div className="col-md-9">
            <h1>All Users</h1>
        </div>
        </div>

    </Layout>
  )
}

export default User
