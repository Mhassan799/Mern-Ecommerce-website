 

import {Routes,Route} from 'react-router-dom'
// import Layout from './componenets/Layout/Layout'

import './App.css'
import Homepage from './pages/Homepage'
import About from './pages/About'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Pagenotfound from './pages/Pagenotfound'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Dashboard from './pages/user/Dashboard'

import ForgotPassword from './pages/Auth/ForgotPassword'
import AdminRoute from './pages/Routes/AdminRoute'
import AdminDashboard from './pages/Admin/AdminDashboard'
import CreateCategory from './pages/Admin/CreateCategory'
import CreateProduct from './pages/Admin/CreateProduct'
import User from './pages/Admin/User'
import Profile from './pages/user/Profile'
import Orders from './pages/user/Orders'
import UserRoute from './pages/Routes/Private'
import Products from './pages/Admin/Products'
import ProductUpdate from './pages/Admin/ProductUpdate'
import Search from './pages/Search'
import PoductDetails from './pages/PoductDetails'
import Categories from './pages/Categories'
import CategoryProduct from './pages/CategoryProduct'
import CartPage from './pages/CartPage'



function App() {
  

  return (
    <>
    
    <Routes>
    <Route path = "/dashboard" element={<UserRoute/>}>
    <Route path = "user/profile" element={<Profile/>}></Route>
    <Route path = "user/orders" element={<Orders/>}></Route>
    <Route path="user" element={<Dashboard />} />



    </Route>

    <Route path = "/dashboard" element={<AdminRoute/>}>
    <Route path = "admin" element={<AdminDashboard/>}></Route>
    <Route path = "admin/create-category" element={<CreateCategory/>}></Route>
    <Route path = "admin/create-product" element={<CreateProduct/>}></Route>
    <Route path = "admin/products" element={<Products/>}></Route>
    <Route path = "admin/products/:slug" element={<ProductUpdate/>}></Route>


    <Route path = "admin/users" element={<User/>}></Route>




    </Route>
      
    <Route path = "/" element={<Homepage/>}></Route>
    <Route path = "/product/:slug" element={<PoductDetails/>}></Route>
    
    <Route path = "/search" element={<Search/>}></Route>

    <Route path = "contact" element={<Contact/>}></Route>
    <Route path = "/privacy-policy" element={<Privacy/>}></Route>
    <Route path = "/register" element={<Register/>}></Route>
    <Route path = "/login" element={<Login/>}></Route>
    <Route path = "/forgot-password" element={<ForgotPassword/>}></Route>

    <Route path = "/dashboard" element={<Dashboard/>}></Route>

    <Route path = "/categories" element={<Categories/>}></Route>
    <Route path = "/category/:slug" element={<CategoryProduct/>}></Route>
    <Route path="/cart" element={<CartPage />} />


    <Route path = "*" element={<Pagenotfound/>}></Route>




    <Route path = "/about" element={<About/>}></Route>


    </Routes>
   
    </>
  )
}

export default App
