import React from 'react'
import Layout from '../../componenets/Layout/Layout'
import UserMenu from '../../componenets/Layout/UserMenu'

const Orders = () => {
  return (
    <Layout>
    <div className="row">

        <div className="col-md-3"> <UserMenu/> </div>
    <div className="col-md-9">
        <h1>Orders</h1>
    </div>
    </div>

</Layout>
  )
}

export default Orders
