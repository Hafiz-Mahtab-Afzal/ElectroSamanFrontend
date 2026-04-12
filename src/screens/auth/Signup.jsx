import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../../config/firebase";
const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);
 
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { SignUpSchema } from '../../Schemas/Index';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apis from '../../config/apis';
import { errortoast, successtoast } from '../../toastify/toastify';
import { Authcontext } from '../../context/auth';

const SignUp = () => {
  const { Auth, setAuth } = useContext(Authcontext);
  const navigate = useNavigate();
  useEffect(() => {
    if (Auth?.token) {
      setTimeout(() => {
        navigate('/Dashboard');
      }, 2000);
    }
  }, [Auth]);

  const { values, errors, handleSubmit, handleChange, handleBlur, touched } = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: async (values, action) => {
      const { data } = await axios.post(`${apis.auth}/pre-signup`, values);
      const { success, error } = data;
      if (success) {
        successtoast(success);
        action.resetForm();
      }
      if (error) {
        action.setFieldError('email', error);
      }
      console.log(values);
    },
  });

  const authWithGoogle= () => {
      signInWithPopup(auth, provider)
     .then(async(result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user)
      const fields = {
        first_name: user.providerData[0].displayName,
        last_name:"null",
        email: user.providerData[0].email,
        password: "null",
        profilepicture:user.providerData[0].photoURL,
        phonenumber:user.providerData[0].phoneNumber,
        role:"buyer"
      }

      const {data} = await axios.post(`${apis.auth}/signUpWithGoogle`, fields);
      const { success, error } = data;
      console.log(data)
      if (success) {
        successtoast(success);
        localStorage.setItem("auth", JSON.stringify(data))
        setAuth(data)
        setTimeout(() => {
          navigate("/")
        }, 2000);

      }
      if (error) {
        errortoast(error)
      }
      

    }).catch((error) => {
      // Handle Errors here.
      console.log(error.message)
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData?.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  const [show1, sethide1] = useState(true);
  const [show2, sethide2] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-10 rounded-xl hover:scale-110 transition duration-500 hover:shadow-blue-600 hover:shadow-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="relative">
          {/* First_Name */}
          <div className="mb-4">
            <input
              type="text"
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Your First Name"
              className="w-full p-3 rounded border border-gray-300 hover:outline-none hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.first_name && touched.first_name ? (
              <p className="text-red-600 text-sm">{errors.first_name}</p>
            ) : null}
          </div>

          {/* Last_Name */}
          <div className="mb-4">
            <input
              type="text"
              name="last_name"
              value={values.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Your Last Name"
              className="w-full p-3 rounded border border-gray-300 hover:outline-none hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.last_name && touched.last_name ? (
              <p className="text-red-600 text-sm">{errors.last_name}</p>
            ) : null}
          </div>

          {/* email */}
          <div className="mb-4">
            <input
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Your Email Address"
              className="w-full p-3 rounded border border-gray-300 hover:outline-none hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && touched.email ? (
              <p className="text-red-600 text-sm">{errors.email}</p>
            ) : null}
          </div>

          {/* password */}
          <div className="mb-4">
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
            {errors.password && touched.password ? (
              <p className="text-red-600 text-sm">{errors.password}</p>
            ) : null}
          </div>

          {/* confirm_password */}
          <div className="mb-4">
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
            {errors.confirm_password && touched.confirm_password ? (
              <p className="text-red-600 text-sm">{errors.confirm_password}</p>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>

        <button
          type="button"
          onClick={authWithGoogle}
          className="w-full flex items-center justify-center gap-3 mt-4 py-3 px-4 bg-white border border-gray-300 rounded text-gray-800 font-medium hover:bg-gray-50 hover:border-gray-400 active:scale-[0.98] transition-all"
        >
          <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.08 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-3.58-13.46-8.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="mt-4 text-center text-gray-500">
          Already have an account?{' '}
          <span className="text-blue-500 cursor-pointer font-semibold">Login</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
