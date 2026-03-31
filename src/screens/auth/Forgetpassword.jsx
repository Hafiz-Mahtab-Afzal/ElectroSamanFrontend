
import { errortoast, successtoast, warningtoast } from "../../toastify/toastify";
import { Link, useNavigate } from "react-router-dom";
import apis from "../../config/apis";
import { useState } from "react";
import axios from 'axios'

const ForgotPassword = () => {
  
  const [user, setuser] = useState({
        email:""
  })

  const changehandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setuser({...user,[name]:value})
  }

  const forgethandler = async (e) => {
       try{
       e.preventDefault()
       const {data} =  await axios.post(`${apis.auth}/forget-password`,user)
       const {error,warning,success} = data
       if(error){
        errortoast(error)
       }
       if(warning){
        warningtoast(warning)
       }
       if(success){
        setTimeout(() => {
          location.href="/otp"
        }, 2000);
        successtoast(success)
       }
       }
       catch(err){
        console.log(err.message)
       }
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-10 rounded-xl hover:scale-110 transition duration-500 hover:shadow-blue-600 hover:shadow-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Forgot Password?</h2>
        <p className="text-gray-500 mb-4 text-center">
          Enter your email or mobile number to receive OTP
        </p>

        <form onSubmit={forgethandler} className="space-y-4">

        {/* email */}
          <div>
            <input
            type="text"
            name="email" 
            value={user.email}
            onChange={changehandler}
            placeholder="Enter your email or mobile number"
            className="w-full p-3 rounded border border-gray-300 hover:outline-none hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded font-semibold hover:opacity-90 transition">
              Send
          </button>

        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
