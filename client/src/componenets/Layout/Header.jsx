import React from 'react'
import { NavLink, Link } from 'react-router-dom'
// import {FiShoppingCart} from 'react-icon'
import { useAuth } from '../Context/Auth'
import toast from 'react-hot-toast'
import SearchInput from '../Form/SearchInput'
import useCategory from '../../hooks/useCategory'
import { useCart } from '../Context/Cart'
import { Badge } from "antd";

const Header = () => {
    const [cart] = useCart();
    const [auth, setAuth] = useAuth()
    const categories =  useCategory();
    // const [categories,setCategories]= useCategory("")
    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ""
        })
        localStorage.removeItem('auth')
        toast.success("logout succesfully")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" >
                        Ecommerce App
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="d-flex mx-auto">
                            <SearchInput/>
                            </div>
                        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                            
                           
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link " aria-current="page" >
                                    Home
                                </NavLink>
                                    
                            </li>
                            
                            <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  <li>
                  {categories?.map((c) => (
                      <Link key={c._id}
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                  ))}
                    </li>
                </ul>
              </li>

                            {
                                !auth.user ? (<>
                                    <li className="nav-item">
                                        <NavLink to="/register" className="nav-link " aria-current="page" >
                                            Register
                                        </NavLink>

                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="nav-link " aria-current="page" >
                                            Login
                                        </NavLink>

                                    </li>
                                </>) : (<>
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth?.user?.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li><NavLink to={`/dashboard/${ auth?.user?.role === 1 ? "admin" : "user" }`} className="dropdown-item" >Dashboard</NavLink></li>
                                            <li><NavLink onClick={handleLogout} to="/login" className="nav-link " aria-current="page">
                                                LogOut
                                            </NavLink></li>
                                        </ul>
                                    </li>


                                </>)
                            }
                           <li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="nav-link">
                    Cart
                  </NavLink>
                </Badge>
              </li>
                            
                        </ul>

                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header
