import React,{useState,useEffect} from 'react'
import Layout from '../componenets/Layout/Layout'
import { useAuth } from '../componenets/Context/Auth'
import { Checkbox, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import toast from 'react-hot-toast';
import { Price } from '../componenets/Price';
import { useCart } from '../componenets/Context/Cart';
import image1 from '../assets/images/1.jpg'
import  image2 from '../assets/images/2.jpg'
import image3 from '../assets/images/3.jpg'
import banner from '../assets/images/banner.png'
import  '../Styles/Homepage.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Homepage = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useCart();
  const [products,setProducts]=useState([])
  const [categories,setCategories]=useState([])
  const [checked,setChecked]= useState("")
  const [prices, setPrices]= useState('')
  const [radio,setRadio]= useState([])
  const [total,setTotal]= useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false);

  const getAllCategory = async  () =>{
    try {
      const {data} = await axios.get('http://localhost:8080/api/category/get-category')
      if(data.success){
      setCategories(data.category)
      }
      
    } catch (error) {
     console.log(error)
   
    }
  }

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, [])

  
  const getAllProducts= async ()=>{
    try{
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/product/get-products')
      setLoading(false);
      setProducts(response.data.product)
    }
    catch(error){
      setLoading(false);
      console.log(error)
      toast.error("something went wrong")
         


    }
  }

 
  
 

  const getTotal = async ()=>{
    try {
      const {data} = await axios.get('http:localhost:8080/api/product/count-product')
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...product, ...data?.product]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  const handleFilter= (value,id)=>{
    let all=[...checked]
    if(value){
      all.push(id)
    }
    else{
      all= all.filter((c)=> c !== id);
    }
    setChecked(all)

  }
  useEffect(() => {
    if(!checked.length || !radio.length)
    getAllProducts();
}, [])

useEffect(() => {
  if(checked.length || radio.length)
  filterProduct();
  }, [checked,radio])



  const filterProduct= async ()=>{
    try {
        const {data} = await axios.post('http://localhost:8080/api/product/filter-product', {checked,radio})
        setProducts(data?.product)
    } catch (error) {
      console.log(error)
    }
  }
  

   

  
  return (
    <Layout>
     
    {/* image carousal  */}
    <div className='banner'>
     {/* banner image */}
     <img
        // src={banner}
        src='https://media.licdn.com/dms/image/D4D12AQFfC8RPkiXd7Q/article-inline_image-shrink_1500_2232/0/1694454359704?e=1704931200&v=beta&t=NnZD7Vwl2wnd6LQdbCmo-cv5kgNRjHkJ-wU9-TxTOkE'
        className=""
        alt="bannerimage"
        width={"100%"}
        
      />
 
</div>


      <div className="container-fluid row mt-3 home-page my-0">
        <div className="col-md-3 filters">
          <div className="text-center">
          <h4>Filter By category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c)=>(
              <Checkbox key={c._id}
              onChange={(e)=> handleFilter(e.target.checked,c._id)} >
                {c.name}

              </Checkbox>
            ))}
          </div>
         
          </div>
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
              
              <Radio.Group    onChange={(e)=> setRadio(e.target.value)}>
            {Price.map((p)=>(
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                  
                </div>
              ))}
              </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          {/* {JSON.stringify(radio ,null,4)} */}
          <div className="text-center">
            <h1>All Products</h1>
          </div>

            <div className="d-flex flex-wrap">
            {products?.map((p) => (
            
              <div className="card m-2" style= {{ width: "18rem" }}>
              <img src={`http://localhost:8080/api/product/product-photo/${p._id}`} className="card-img-top"
              alt={p.name} />

                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0,30)}</p>
                  <p className="card-title card-price">$ {p.price}</p>

                  <button className='btn btn-primary text-center ' onClick={()=>navigate(`product/${p.slug}`) }>more details</button>
                  <button
                    className="btn btn-secondary ms-1 text-center my-2"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>

                </div>
              </div>
            
              ))}
            </div>
            <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
            {total}
          </div>
        </div>
      </div>
      </Layout>
    
  )
}

export default Homepage
