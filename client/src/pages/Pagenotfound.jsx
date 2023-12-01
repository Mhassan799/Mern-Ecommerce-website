import React from 'react'
import Layout from '../componenets/Layout/Layout'
import { Link } from 'react-router-dom'



const Pagenotfound = () => {
  return (
    <Layout>
      <div className='pnf'>
        <h1 className='title'>404</h1>
        <h2 className='pnf-heading'>Oops! Page Not Found</h2>
        <Link to = "/" className="pnf-btn"> Go Back
        </Link>
      </div>
      </Layout>
  )
}

export default Pagenotfound
