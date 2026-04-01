import axios from "axios";
const API = import.meta.env.VITE_API_URL;
import { useEffect, useState } from "react";
import { createContext } from "react";

export const Authcontext = createContext()

const Authprovider = ({children}) => {
 
    const [Auth, setAuth] = useState({
         User:null,
         token:"",
         refreshToken:""
    })

    const [dark, setdark] = useState(true)
    const changedark =  () => {
        setdark(!dark)
    }

    axios.defaults.baseURL = `${API}/api/v1`

    useEffect(() => {
       const userAuth = JSON.parse(localStorage.getItem("auth"))
       userAuth && setAuth(userAuth)
    },[])

    return(
        <Authcontext.Provider value={{Auth,setAuth,dark,changedark}}>
            {children}
        </Authcontext.Provider>
      )
 }

export default Authprovider;