

import axios from 'axios';
import { useState } from 'react';
import apis from '../../config/apis';
import { errortoast, successtoast } from '../../toastify/toastify';
import { useNavigate } from 'react-router-dom';


const AddCategory = () => {

  const navigate = useNavigate()
  const [category, setCategory] = useState("");

  const submithandler = async (e) => {
      try{
        e.preventDefault()
        const {data} = await axios.post(`${apis.prod}/category`,{category})
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
    <div className="flex items-center justify-center p-6 mt-40">
      <form onSubmit={submithandler} className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-8 text-center">Add New Category</h2>

        <label className="block mb-4">
          <span className="text-base font-bold text-slate-700">Category</span>
          <input
            name="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter product title"
            className="w-full mt-2 px-4 py-[10px] rounded border border-gray-300 hover:outline-none hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Submit */}
        <button
        
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded font-semibold hover:opacity-90 transition"
        >
          Add New Category
        </button>
      </form>
    </div>
  );
}

export default AddCategory;
