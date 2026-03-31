
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { getproducts } from '../../redux/actions/productActions';
import Loader from '../../layouts/Loader';
import Button from '@mui/material/Button';
import axios from 'axios';
import apis from '../../config/apis';
import { successtoast } from '../../toastify/toastify';
import { useNavigate } from 'react-router-dom';


const ProductList = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { products,loader } = useSelector((state) => state.productSlice);
  
  useEffect(() => {
      dispatch(getproducts());

    }, []);
  
  const addproduct = () => {
    navigate("/Dashboard/addproduct")
  }
  
  const viewproduct =  (id) => {
       navigate(`/product/${id}`)
  }

  const editproduct = (id) => {
    navigate(`/Dashboard/editproduct/${id}`)
  }

  const deleteproduct = async (id) => {
     try{

      const confirm_delete = confirm("Are yo Sure to delete this Product")
      if(confirm_delete){
      const {data} = await axios.delete(`${apis.prod}/${id}`)
      const {success} = data
      if(success){
        dispatch(getproducts());
        successtoast()
      }
     }
    }
    catch(err){
      console.log(err.message)
    }
      
  }

  
  if (loader) {
    return <Loader />;
  }

  const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'title',
    headerName: 'Title',
    width: 150,
    editable: true,
  },
  {
    field: 'brand',
    headerName: 'Brand',
    width: 120,
    editable: true,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 140,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 100,
    //valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 255,
    editable: true,
    renderCell:(params) => {
      return(
      <Box>

         <div className='-translate-x-[14px]'>
          <Button onClick={() => viewproduct(params.row.pid)} className='!bg-slate-400 !text-white !text-xs !p-2 !font-bold  !ml-1 '>
          <BsEye className='mr-2 !text-lg' />
            View
          </Button>

          <Button onClick={() => editproduct(params.row.pid)} className='!bg-blue-600 !text-white !text-xs !p-2 !font-bold  !ml-2 '>
          <MdEdit className='mr-2 !text-lg' />
            Edit
          </Button>
          
          <Button onClick={() => deleteproduct(params.row.pid)} className='!bg-red-600 !text-white !text-xs !p-2 !font-bold  !ml-2  '>
          <RiDeleteBinLine className='mr-2 !text-lg' />
            Delete
          </Button>
         </div>
          
      </Box>
      )
    }
  },
];

const rows = products && products.map((product,index) => ({
   pid:product._id,
   id:++index,
   title:product.title,
   brand:product.brand,
   category:product.category,
   price:product.price
}))

  return (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-center pt-6 text-4xl font-bold mb-5 text-green-600">ProductList</h1>
      <div className="flex justify-center gap-4 mb-6">
        
        {/* <Button className="!bg-yellow-500 !text-white !font-bold !px-4 !py-2 !rounded-md">
          Update Product
        </Button> */}
        <Button className="!bg-blue-600 !text-white !font-bold !w-60 !translate-y-2 translate-x-80 !px-4 !py-2 !rounded-md" onClick={addproduct}> <IoIosAddCircle className='mr-2 text-xl'  />
          Add Product
        </Button>
      </div>
      <Box className="mx-16 " >
      <DataGrid
        className='!bg-orange-400 '
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

export default ProductList
