
import React,{useState,useEffect}from 'react'
import AdminMenu from '../../componenets/Layout/AdminMenu'
import Layout from '../../componenets/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../componenets/Context/Auth';
import { Link } from 'react-router-dom';



const Products = () => {
    const [products,setProducts]= useState([]);
    const [auth,setAuth]=useAuth()

    const token = auth?.token;
    const config = {
                  
                  headers: {
                    'Authorization': `Bearer ${token}`
                }
    }

    const getAllProducts= async()=>{
        try {
            const response = await axios.get('http://localhost:8080/api/product/get-products')
            setProducts(response.data.product)
            console.log(response.data.product)
        } catch (error) {
         console.log(error)
         toast.error("something went wrong")   
        }
    }
    useEffect(() => {
    getAllProducts();
    }, [])
   

  return (

    <Layout>
    <div className="row">
      <div className="col-md-3">
        <AdminMenu />
      </div>
      <div className="col-md-9 ">
        <h1 className="text-center">All Products List</h1>
        <div className="d-flex">
          {products?.map((p) => (
            <Link
              key={p._id}
              to={`/dashboard/admin/products/${p.slug}`}
              className="product-link" >
              <div className="card m-2" style={{ width: "18rem" }}>
              <img src={`http://localhost:8080/api/product/product-photo/${p._id}`} className="card-img-top"
              alt={p.name} />

                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                </div>
              </div>
            </Link>
              ))}
              </div>
      </div>
    </div>
  </Layout>
  )
}

export default Products
