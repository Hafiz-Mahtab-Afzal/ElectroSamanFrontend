
import React, { useContext, useEffect } from 'react'
import { Authcontext } from '../../context/auth'

const Dashboarddesign = () => {

  const {Auth, setAuth} = useContext(Authcontext)
  const {first_name,last_name} = Auth?.User || ""

  
  return (
    <div>
      <h1 className='text-4xl text-center font-bold text-green-600 pt-6'>Dashboard</h1>
      <br /><br />
      <h1 className='text-3xl text-center font-bold'>
        {`${Auth?.User?.first_name} ${Auth?.User?.last_name}`} ({`${Auth?.User?.role}`})
      </h1>

    </div>
  )
}

export default Dashboarddesign
