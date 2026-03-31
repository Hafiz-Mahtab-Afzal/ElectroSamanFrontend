
import { errortoast, successtoast, warningtoast } from '../../toastify/toastify';
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import apis from '../../config/apis';
import axios from 'axios'
import ResetPassword from './Resetpassword';


const OTP = () => {
  
  const [user, setuser] = useState({
       otp:""
  })

  const Changehandler = (otp) => {
  setuser({ otp });
};

  const otphandler = async (e) => {
      e.preventDefault()
      const {data} = await axios.post(`${apis.auth}/otp`,user)
      if(data.error){
        errortoast(data.error)
      }
      if(data.warning){
        warningtoast(data.warning)
      }
      if(data.success){
        setTimeout(() => {
          location.href=`/resetpassword/${data.success.token}`
        }, 2000);
        
        successtoast(data.success.message)
      }

  }

  return (
     <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-10 rounded-xl hover:scale-110 transition duration-500 hover:shadow-blue-600 hover:shadow-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Enter OTP</h2>
        <p className="text-gray-500 text-lg mb-4 text-center">
          Enter the OTP sent to your email or phone
        </p>
        
        <form onSubmit={otphandler} >

          {/* otp */}

          <div className='mb-4  '>
            <OtpInput
            value={user.otp}
            onChange={Changehandler}
            numInputs={5}
            renderSeparator={<span></span>}
            renderInput={(props) => <input {...props} />}
            containerStyle=" gap-3 ml-[-2px]"
            // inputClassName="w-[55px] h-[55px] rounded-[10px] border border-gray-300 text-[20px]"
            inputStyle={{
              width: "55px",
              height: "55px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "20px",
            }}
            />
          </div>
          
          <button 
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded font-semibold hover:opacity-90 transition"
          type='submit'
          >
            Verify OTP
          </button>
        </form>

      </div>
    </div>
  );
}

export default OTP

