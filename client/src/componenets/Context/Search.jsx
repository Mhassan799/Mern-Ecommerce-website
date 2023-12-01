import {useState,  useContext ,useEffect, createContext} from 'react'
import axios from 'axios';

const SearchContext = createContext()

const SearchProvider = ({children})=>{
    const [auth,setAuth]= useState({
       keyword: "",
       results: [],
    })
    // defult axios 
    axios.defaults.headers.common['Authorization'] = auth?.token

   
    return(
        <SearchContext.Provider value={[auth,setAuth]}>
            {children}
        </SearchContext.Provider>
    );
};

// custom hook 
const useSearch = () => useContext(SearchContext);
export {useSearch, SearchProvider}

