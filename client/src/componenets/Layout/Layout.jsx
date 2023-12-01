import React from 'react'
import Header from './Header'
import Footer from './Footer'
import toast, { Toaster } from 'react-hot-toast';


const Layout = ({children}) => {
  return (
    <>
      <Header/>
    <main style= {{minHeight :"80vh"}}> 
    <Toaster />
    {children} </main>
    <Footer/>
    </>
  )
}

export default Layout
