import "./Css/Style.css"
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Activateaccount from "./screens/auth/Activateaccount"
import ForgotPassword from "./screens/auth/Forgetpassword"
import ResetPassword from "./screens/auth/Resetpassword"
import { ToastContainer } from 'react-toastify';
import Navigation from "./layouts/Navigation"
import Success from "./screens/auth/Success"
import Signup from "./screens/auth/Signup"
import Category from "./screens/Category"
import Login from "./screens/auth/Login"
import Contact from "./screens/Contact"
import Aboutus from "./screens/Aboutus"
import Single from "./screens/Single"
import OTP from "./screens/auth/OTP"
import Index from "./screens/Index"
import Dashboard from "./screens/dashboard/Dashboard"
import Profile from "./screens/dashboard/Profile"
import  { Authcontext } from "./context/auth"
import ProductList from "./screens/dashboard/ProductList"
import Dashboarddesign from "./screens/dashboard/DashboardDesign"
import Users from "./screens/dashboard/Users"
import AddProduct from "./screens/dashboard/Addproduct"
import Editproduct from "./screens/dashboard/Editproduct"
import P404 from "./screens/P404"
import { useContext, useState } from "react"
import ImageUpload from "./layouts/Uploading/ImageUpload"
import AddCategory from "./screens/dashboard/AddCategory"
import Cart from "./screens/Cart"
import ProtectedRoute from "../route/ProtectedRoute"
import Checkout from "./screens/auth/Checkout"


const Elecrto = () => {

  const {dark} = useContext(Authcontext)

  return (
      //  ya navbar ha
    
    <div className={dark ? "bg-gray-300 min-h-screen" : "bg-gradient-to-tr from-teal-300 via-yellow-200 to-teal-400 min-h-screen"}>
      <Router >
      <Navigation />
      <ToastContainer />
      {/* doosra pages ka link */}
      <Routes >
        <Route path="/" element={<Index />}/>
        <Route path="/cat/:name" element={<Category />}/>
        <Route path="/product/:id" element={<Single />}/>
        <Route path="/contactus" element={<Contact />}/>
        <Route path="/aboutus" element={<Aboutus />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/:token" element={<Activateaccount />}/>
        <Route path="/forgetpassword" element={<ForgotPassword />}/>
        <Route path="/otp" element={<OTP />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/resetpassword/:token" element={<ResetPassword />}/>
        <Route path="checkout" element={<Checkout />}/>
        <Route path="/imageupload" element={<ImageUpload />}/>
        <Route path="/success" element={<Success />}/>
        <Route path="/*" element={<P404 />}/>

        {/* These are the protected routes */}
        <Route path="/Dashboard" element={<ProtectedRoute />} >

        {/* parent route */}
        <Route path="" element={<Dashboard />}>
           <Route index element={<Dashboarddesign />} />
           <Route path="profile" element={<Profile />}/>
           <Route path="product-list" element={<ProductList />}/>
           <Route path="users" element={<Users />}/>
           <Route path="addproduct" element={<AddProduct />}/>
           <Route path="addcategory" element={<AddCategory />}/>
           <Route path="editproduct/:id" element={<Editproduct />}/>
           
        </Route>

        </Route>

      </Routes>
      </Router>
    </div>
  )
}

export default Elecrto
