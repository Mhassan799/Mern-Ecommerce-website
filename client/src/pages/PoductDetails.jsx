import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../componenets/Layout/Layout'
import axios from 'axios'
import '../Styles/ProductDetailsStyles.css'


const PoductDetails = () => {
    const params = useParams()
    const [product,setProduct] = useState({})
    const [relatedProduct,setRelatedProduct]= useState([])
    const getProduct =async()=>{
        try {
            const res = await axios.get(`http://localhost:8080/api/product/get-product/${params.slug}`)
            setProduct(res.data?.product)
            getRelatedProducts(res.data?.product._id, res.data?.product.category._id)
            console.log(res.data.product)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(params?.slug) {
            getProduct();
        }
    },[params?.slug])

    const getRelatedProducts =async(pid,cid)=>{
        try {
           const {data} = await axios.get(`http://localhost:8080/api/product/related-product/${pid}/${cid}`)
           setRelatedProduct(data?.product) 
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Layout>
        
        {/* {JSON.stringify(product,null,4)} */}
        <div className="row container mt-2">
            <div className="col-md-6">
            <img src={`http://localhost:8080/api/product/product-photo/${product._id}`} className="card-img-top"
              alt={product.name} 
              height="300"
              width={'350px'}
              />
              
            </div>
            <div className="col-md-6">
                <div className="text">
                    <h1>Product detailss</h1>
                     <h6>Name:{product.name}</h6>
                     <h6>Name:{product._id}</h6> 

                     
                     <h6>Description:{product?.description}</h6>
                    <h6>Price:{product?.price}</h6>
                    <h6>Category:{product?.category?.name}</h6> 
                  
                    <button className='btn btn-secondary ms-1'>Add To Cart</button>
                </div>
            </div>


        </div>
        <div className="row">
            <h1>Similar Products</h1>
            {JSON.stringify(relatedProduct,null,4)}
            <div className="d-fle flex-wrap">
            {relatedProduct?.map((p) => (
            
              <div className="card m-2" style={{ width: "18rem" }}>
              <img src={`http://localhost:8080/api/product/product-photo/${p._id}`} className="card-img-top"
              alt={p.name} />

                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0,30)}</p>
                  <p className="card-text">$ {p.price}</p>

                 
                  <button className='btn btn-secondary ms-1'>Add To Cart</button>

                </div>
              </div>
            
              ))}
            </div>
        </div>
    </Layout>
  )
}

export default PoductDetails
