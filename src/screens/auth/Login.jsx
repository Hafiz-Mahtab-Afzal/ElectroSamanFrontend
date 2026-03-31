import { Link, useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import axios from 'axios'
import apis from "../../config/apis";
import { errortoast, successtoast, warningtoast } from "../../toastify/toastify";
import { Authcontext } from "../../context/auth";

const Login = () => {

    const {Auth, setAuth} = useContext(Authcontext)
    
    const navigate = useNavigate()
    useEffect(() => {
    if(Auth?.token){
      setTimeout(() => {
        navigate("/Dashboard")
      }, 2000);
    }
    },[Auth])

  const [show1, sethide1] = useState(true);
  
  const [user, setuser] = useState({
         email:"",
         password:""
  })

  const changehandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setuser({...user,[name]:value})
  }

  const loginhandler = async (e) => {
         try{
          e.preventDefault()
          const {data} = await axios.post(`${apis.auth}/login`,user)
          const {error,warning,success} = data
          if(error){
            errortoast(error)
          }
          if(warning){
            warningtoast(warning)
          }
          if(success){

            localStorage.setItem("auth",JSON.stringify(data))
            setAuth(data)
            successtoast(success)
          }
         }
         catch(err){
          console.log(err.message)
         }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl hover:scale-110 transition duration-500 hover:shadow-blue-600 hover:shadow-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={loginhandler} className="relative" >

        {/* email  */}
          <div>
            <input
              type="text"
              name = "email"
              value={user.email}
              onChange={changehandler}
              placeholder="Email Address"
              className="w-full p-3 mb-4 rounded border border-gray-300 focus:outline-none hover:outline-none hover:ring-2 hover:ring-rose-400 focus:ring-2 focus:ring-blue-500"
            />
          </div>

        {/* password */}
          <div>
            <div className="absolute text-2xl mt-[14px] ml-[324px]">
              {show1 ? (
                <BsEye onClick={() => sethide1(!show1)} />
              ) : (
                <BsEyeSlash onClick={() => sethide1(!show1)} />
              )}
            </div>
            <input
              type={show1 ? "password" : "text"}
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={changehandler}
              className="w-full p-3 mb-4 rounded border border-gray-300 focus:outline-none hover:outline-none hover:ring-2 hover:ring-rose-400 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded font-semibold hover:opacity-90 transition">
            Log In
          </button>
        </form>

        <div className="mt-4 flex justify-between text-gray-500 text-sm">
          <span  className="text-blue-500 cursor-pointer font-semibold">
            <Link to="/signup"> Sign Up </Link>
          </span>

          <span className="text-blue-500 cursor-pointer font-semibold">
            <Link to="/forgetpassword">Forgot Password?</Link>
          </span>
        </div>

      </div>
    </div>
  );
};

export default Login;
