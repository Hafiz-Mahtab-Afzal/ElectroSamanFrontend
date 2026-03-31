
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import apis from '../src/config/apis'
import { Authcontext } from '../src/context/auth'
import { Outlet } from 'react-router-dom'
import P404 from '../src/screens/P404'

const ProtectedRoute = () => {
  const {Auth, setAuth} = useContext(Authcontext)
  const [ok, setok] = useState(false)

  useEffect(() => {
      Auth?.token && FetchLoggedUser()
  },[Auth?.token])

  const FetchLoggedUser = async () => {
      try {
        await axios.get(apis.auth + "/logged-user",{
          headers:{
            Authorization: `Bearer ${Auth?.token}`
          }
        })
      setok(true)
      } 
      catch (err) {
         setok(false)
         console.log(err.message)
      }
  }

  return ok ? <Outlet /> : <P404 />

}

export default ProtectedRoute
