import axios from 'axios';
import React, { useState } from 'react'
import { useSearch } from '../Context/Search';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const navigate = useNavigate()
    const [values,setValues] = useSearch()
    const [keyword,setKeyword]=useState("")
    const submitHandler = async(e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.get(`http://localhost:8080/api/product/search/${values.keyword}`)
            setValues({...values,results:data})
            navigate('/search')
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={submitHandler}>
      <input 
   className="form-control me-2"
   type="search"
   placeholder="Search"
   aria-label="Search"
   value={keyword}
   onChange={(e) => setKeyword(e.target.value)}
/>
  <button className="btn btn-outline-success" type="submit">Search</button>
</form>

    </div>
  )
}

export default SearchInput
