import React from 'react'
import { useSearch } from '../componenets/Context/Search'
import Layout from '../componenets/Layout/Layout'

const Search = () => {
    const [values,setValues] = useSearch()
  return (
    <Layout>
        <div className="container">
            <div className="text-center">
                <h1>Search Results</h1>
                <h6>{values?.results.length < 1 ? "no product found" : `found ${values?.results.length}`}</h6>
                <div className="d-fle flex-wrap">
            {values?.map((p) => (
            
              <div className="card m-2" style={{ width: "18rem" }}>
              <img src={`http://localhost:8080/api/product/product-photo/${p._id}`} className="card-img-top"
              alt={p.name} />

                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0,30)}</p>
                  <p className="card-text">$ {p.price}</p>

                  <button className='btn btn-primary '>more details</button>
                  <button className='btn btn-secondary ms-1'>Add To Cart</button>

                </div>
              </div>
            
              ))}
            </div>
            </div>

        </div>
    </Layout>
  )
}

export default Search
