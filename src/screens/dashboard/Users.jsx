

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import { MdEdit } from "react-icons/md";
import { Authcontext } from '../../context/auth';
import Button from '@mui/material/Button';
import axios from 'axios';
import apis from '../../config/apis';
import { successtoast } from '../../toastify/toastify';


  const Users = () => {

  const {Auth, setAuth} = useContext(Authcontext)
  const [user, setuser] = useState([])
  const getusers = async () => {
    try{
     const {data} = await axios.get(`${apis.auth}/users`)
     setuser(data.users)
    }
    catch(err){
      console.log(err.message)
     }
  }

  const blocked = async (id) => {
     try{
      const {data} = await axios.put(`${apis.auth}/block/${id}`,{
                headers:{
                  Authorization: `Bearer ${Auth?.token}`
                }
              })
      const {success} = data
      if(success){
        successtoast(success)
        setuser(prevUsers => prevUsers.map(u => 
        u._id === id ? { ...u, isblocked: !u.isblocked } : u
      ));
      }
     }
     catch(err){
      console.log(err.message)
     }
  }
  useEffect(() => {
    getusers()
  },[])

  

  const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 120,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 210,
    editable: true,
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 110,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 110,
    editable: true,
  },
  {
      field: 'actions',
      headerName: 'Actions',
      width: 255,
      renderCell:(params) => {
        return(
        <Box>
          
           <div className='-translate-x-[14px]'>
       
            <Button onClick={() => blocked(params.row.id)} className='!bg-blue-600 !text-white !text-xs !p-2 !font-bold  !ml-1  '>
            <MdEdit className='mr-2 !text-lg' />
               Blocked/Unblocked
            </Button>
           </div>
           
            
        </Box>
        )
      }
    },
];

const rows = user.map((users) => ({
    id: users._id,
    name: users.first_name,
    email: users.email,
    role: users.role,
    gender: users.gender,
    status:users.isblocked ? "Blocked":"Active"
}))
   

  return (
    <div className='bg-gray-100 min-h-screen'>
      <h1 className='text-4xl text-green-600 font-bold pt-6 pb-6 text-green text-center'>Users</h1>
    <Box className="mx-16">
      <DataGrid
        className='!bg-orange-500'
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
    </div>
  )
}

export default Users
