
import { errortoast, successtoast } from '../../toastify/toastify';
import ImageUpload from '../../layouts/Uploading/ImageUpload';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import apis from '../../config/apis';
import { useState } from 'react';
import axios from 'axios';
import { getcategories } from '../../redux/actions/productActions';
import { useEffect } from 'react';

const AddProduct = () => {
  const navigate = useNavigate()
  const [product, setproduct] = useState({
    title: '',
    subtitle:"",
    brand: '',
    category: '',
    price: '',
    description: '',
    images:''
  });
  
  const dispatch = useDispatch()
  const {loader,categories} = useSelector((state) => state.productSlice)
  useEffect(() => {
       dispatch(getcategories())
  },[])
  console.log(categories)

  const changehandler = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setproduct({ ...product, [name]:value})
  }

  const submithandler = async (e) => {

      e.preventDefault()
      try{
        const payload = {
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
        };
        const {data} = await axios.post(`${apis.prod}`,payload)
        const {error,success} = data
        if(error){
          errortoast(error)
        }
        if(success){
          successtoast(success)
          setTimeout(() => {
            navigate("/Dashboard/product-list")
          }, 2000);
        }
      }
      catch(err){
          console.log(err.message)
         } 
  }

  return (
    <div className="flex items-center justify-center p-6">
      
      <form onSubmit={submithandler} className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-8 text-center">Add Product</h2>

        {/* Title */}
        <label className="block mb-4">
          <span className="text-base font-bold text-slate-700">Title</span>
          <input
            name="title"
            value={product.title}
            onChange={changehandler}
            placeholder="Enter product title"
            className="w-full mt-2 px-4 py-[10px] rounded border border-gray-300 hover:outline-none hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Subtitle */}
        <label className="block mb-4">
          <span className="text-base font-bold text-slate-700">SubTitle</span>
          <input
            name="subtitle"
            value={product.subtitle}
            onChange={changehandler}
            placeholder="Enter product subtitle"
            className="w-full mt-2 px-4 py-[10px] rounded border border-gray-300 hover:outline-none hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <div className="flex gap-4 mb-4">
          {/* Brand */}
          <label className="flex-1">
            <span className="text-base font-bold text-slate-700">Brand</span>
            <input
              name="brand"
              value={product.brand}
              onChange={changehandler}
              placeholder="Brand"
              className="w-full  mt-2 px-4 py-2 rounded border border-gray-300 hover:outline-none hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          {/* Category */}
          <label className="flex-1">
            <span className="text-base font-bold text-slate-700">Category</span>
            <select
              name="category"
              value={product.category}
              onChange={changehandler}
              className="w-full mt-2 px-2 py-2 rounded border border-gray-300 hover:outline-none hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select category</option>
              {
                categories && categories.map( category => (
                  <option key={category._id } value={category._id}>{category.category_name}</option>
                ))
              }
            </select>
          </label>

          {/* Price */}
          <label className="flex-1">
            <span className="text-base font-bold text-slate-700">Price</span>
            <input
              name="price"
              value={product.price}
              onChange={changehandler}
              placeholder="Price"
              className="w-full  mt-2 px-4 py-2 rounded border border-gray-300 hover:outline-none hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>

        {/* Description */}
        <label className="block mb-4">
          <span className="text-base font-bold text-slate-700">Description</span>
          <textarea
            name="description"
            value={product.description}
            onChange={changehandler}
            placeholder="Enter product description..."
            rows={4}
            className="w-full  mt-2 px-4 py-2 rounded border text-lg border-gray-300 hover:outline-none hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Upload Image */}
        <label className="block mb-2">
          <span className="text-lg font-bold  text-slate-700">Upload Image</span>
          <div className="flex flex-col items-center justify-center border border-gray-300 rounded-xl p-4 bg-gray-50 shadow-inner">
          <ImageUpload setFormData={setproduct} />
          </div>
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded font-semibold hover:opacity-90 transition"
        >
          Add Product
        </button>

      </form>
    </div>
  );
}

export default AddProduct;
