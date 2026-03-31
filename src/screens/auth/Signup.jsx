import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { SignUpSchema } from '../../Schemas/Index';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import apis from '../../config/apis';
import { errortoast, successtoast } from '../../toastify/toastify';
import { Authcontext } from '../../context/auth';
          
const SignUp = () => {

    const {Auth, setAuth} = useContext(Authcontext)
      const navigate = useNavigate()
      useEffect(() => {
      if(Auth?.token){
        setTimeout(() => {
          navigate("/Dashboard")
        }, 2000)
          
      }
      },[Auth])
  const { values, errors, handleSubmit, handleChange, handleBlur, touched } = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: async (values,action) => {
      const {data} = await axios.post(`${apis.auth}/pre-signup`,values)
      const {success,error} = data
      if(success){
        successtoast(success)
        action.resetForm()
      }
      if(error){
        action.setFieldError("email", error) 
      }
      console.log(values);
    },
    
  });
  console.log(errors);

  const [show1, sethide1] = useState(true);
  const [show2, sethide2] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-10 rounded-xl hover:scale-110 transition duration-500 hover:shadow-blue-600 hover:shadow-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="relative">
          {/* First_Name */}
          <div className='mb-4'>
            <input
              type="text"
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Your First Name"
              className="w-full p-3 rounded border border-gray-300 hover:outline-none hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.first_name && touched.first_name ? <p className='text-red-600 text-sm'>{errors.first_name}</p> : null}
          </div>

          {/* Last_Name */}
          <div className='mb-4'>
            <input
              type="text"
              name="last_name"
              value={values.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Your Last Name"
              className="w-full p-3 rounded border border-gray-300 hover:outline-none hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.last_name && touched.last_name ? <p className='text-red-600 text-sm'>{errors.last_name}</p> : null}
          </div>

          {/* email */}
          <div className='mb-4'>
            <input
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Your Email Address"
              className="w-full p-3 rounded border border-gray-300 hover:outline-none hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && touched.email ? <p className='text-red-600 text-sm'>{errors.email}</p> : null}
          </div>

          {/* password */}
          <div className='mb-4'>
            <div className="absolute text-2xl mt-[14px] ml-[324px]">
              {show1 ? (
                <BsEye onClick={() => sethide1(!show1)} />
              ) : (
                <BsEyeSlash onClick={() => sethide1(!show1)} />
              )}
            </div>
            <input
              type={show1 ? 'password' : 'text'}
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Your Password"
              className="w-full p-3 rounded border border-gray-300 hover:outline-none hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && touched.password ? <p className='text-red-600 text-sm'>{errors.password}</p> : null}
          </div>

          {/* confirm_password */}
          <div className='mb-4'>
            <div className="absolute text-2xl mt-[14px] ml-[324px]">
              {show2 ? (
                <BsEye onClick={() => sethide2(!show2)} />
              ) : (
                <BsEyeSlash onClick={() => sethide2(!show2)} />
              )}
            </div>
            <input
              type={show2 ? 'password' : 'text'}
              name="confirm_password"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm Password"
              className="w-full p-3 rounded border border-gray-300 hover:ring-2 hover:outline-none hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirm_password && touched.confirm_password ? <p className='text-red-600 text-sm'>{errors.confirm_password}</p> : null}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-500">
          Already have an account?{' '}
          <span className="text-blue-500 cursor-pointer font-semibold">Login</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
