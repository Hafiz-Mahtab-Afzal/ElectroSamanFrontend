
import { MdProductionQuantityLimits } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { TbUserFilled } from "react-icons/tb";
import { TiHomeOutline } from "react-icons/ti";
import { IoIosArrowDown } from "react-icons/io";
import { MdAddBox } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { LuMenu } from "react-icons/lu";
import { TbLogout2 } from "react-icons/tb";
import { ImUsers } from "react-icons/im";
import { Link } from 'react-router-dom'
import { useState } from "react";
import { useContext } from "react";
import { Authcontext } from "../../context/auth";

const Sidebar = () => {

  const [openall, setOpenall] = useState(false);
  const toggleMenu = () => {
    setOpenall(!openall);
  };

  const [open, setopen] = useState(true)
  const {Auth, setAuth} = useContext(Authcontext)


  const logout = () => {
    location.href = "/login"
    localStorage.removeItem("auth")
   }
  return (
    <div>
    <button className="fixed pt-4 pl-4 z-50 text-3xl " onClick={() => setopen(!open)}>
      <LuMenu />
    </button>
    <div className={`text-4xl pt-4 h-full font-bold text-center bg-gradient-to-l from-orange-300 to-orange-400  min-h-screen p-2 transform transition-transform duration-300
    ${open ? "translate-x-0" : "-translate-x-full"}
    `}>

        <div>
          Sidebar
        </div>
        <div className="mt-10 text-2xl text-orange-700 text-semibold flex gap-4 flex-col">

          <Link className='text-white bg-gray-700 rounded-md p-2' to="/Dashboard" > <TiHomeOutline className='inline text-[26px] mb-1' /> Dashboard</Link>

          <Link className='text-white pr-14 bg-gray-700 rounded-md p-2' to="/Dashboard/profile" > <TbUserFilled className='inline' /> Profile</Link>

          <button className=" text-white bg-gray-700 rounded-md p-2" onClick={toggleMenu}>
            <Link className='text-white bg-gray-700 rounded-md  pl-6 ' to="/Dashboard/product-list" > <MdProductionQuantityLimits className="inline" /> Products <IoIosArrowDown className="relative inline text-lg ml-6" /></Link>
          </button>
          {openall && (
            <>

           <Link className='text-white bg-gray-700 pr-[8px]  rounded-md p-2' to="/Dashboard/addproduct" >
           <MdAddBox className="inline text-[26px] mb-1  " />Addproduct</Link>

           <Link className='text-white bg-gray-700 pl-[30px] rounded-md p-2' to="/Dashboard/addcategory" >
           <BiCategory className="inline  mb-1" />  Add Category</Link>
           </>
           
          )}


          {/* {
            Auth.User.role == "admin" && ( */}
              <Link className='text-white bg-gray-700 pr-[76px] rounded-md p-2' to="/Dashboard/users" > <ImUsers className="inline" /> Users</Link>
            {/* )
          } */}

          

          <button onClick={logout} className='bg-red-600 hover:bg-orange-600 rounded-md text-white p-2'>
            Logout
          </button>
        </div>
        
    </div>
    </div>
  )
}

export default Sidebar
