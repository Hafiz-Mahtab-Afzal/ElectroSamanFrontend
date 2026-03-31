
import React, { useContext, useEffect } from 'react'
import Sidebar from './Sidebar'
import Dashboarddesign from './DashboardDesign'
import { Authcontext } from '../../context/auth'
import { Outlet, useNavigate } from 'react-router-dom'
const Dashboard = () => {

  const {Auth, setAuth} = useContext(Authcontext)
  
  const navigate = useNavigate()
  if(!Auth?.token){
    navigate("/login")
  }





  return (
    <div className='flex'>
        <div className="w-1/4">
         <Sidebar />
        </div>
        <div className="w-3/4">
        <Outlet />   
        </div>
    </div>
  )
}

export default Dashboard
