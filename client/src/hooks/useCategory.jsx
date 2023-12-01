import React,{useState,useEffect} from 'react'
import axios from 'axios'
export default function useCategory()
{
    const [categories,setCategories]= useState([])
    

    // GET CAT 

    const getCategories = async()=>{
        try {
            const {data} = await axios.get('http://localhost:8080/api/category/get-category');
            setCategories(data?.category);
        } catch (error) {
            console.log(error)
        }


    }

    useEffect(()=>{
        getCategories();
    },[])
    return categories;
}
