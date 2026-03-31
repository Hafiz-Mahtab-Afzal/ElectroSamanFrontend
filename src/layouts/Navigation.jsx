
{/* ya titania ka ha */}
import { FaHome, FaInfoCircle,FaUserLock, FaSignInAlt, FaUserPlus, FaTachometerAlt, FaEnvelope, FaShoppingCart, FaHeart, FaTrash, FaUserTie, FaCog, FaCogs } from 'react-icons/fa'
import { AiOutlineLogin } from "react-icons/ai";
import { clearCart, removeItemComplete } from '../redux/slices/cartSlice'
import { removeFromWishlist } from '../redux/slices/wishlistSlice'
import { useSelector, useDispatch } from 'react-redux'
import { BsFillCartFill, BsFillChatRightTextFill, BsFillChatSquareTextFill } from "react-icons/bs";

{/* ya mera kam ha */}
import { BsCart3, BsMoonStarsFill } from "react-icons/bs";
import { IoMdSunny } from "react-icons/io";
import { useContext, useEffect, useRef, useState } from "react"
import { Link, NavLink } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import { BiCartAdd } from "react-icons/bi";
import { BsFillCartXFill } from "react-icons/bs";
import { Authcontext } from '../context/auth';
import { discountPriceCalc } from '../functions/helper';

{/* ya sir ka kam ha */}
import nouser from "../img/nouser.png";
import profile from "../img/profile.png";


const Navigation = () => {

  const {Auth, setAuth,dark,changedark} = useContext(Authcontext)
  const dispatch = useDispatch()

  

  {/* ya titania ka ha */}

  const destroyCart = () => dispatch(clearCart())

  // Cart and Wishlist state
  const cartItems = useSelector((state) => state.cartSlice.items)
  const cartTotalQuantity = useSelector((state) => state.cartSlice.totalQuantity)
  const wishlistItems = useSelector((state) => state.wishlistSlice.items)
  console.log(cartItems)
  // Dropdown states
  const [showCartDropdown, setShowCartDropdown] = useState(false)
  const [showWishlistDropdown, setShowWishlistDropdown] = useState(false)

  // Calculate cart total with discounted prices
  const cartTotal = cartItems.reduce((total, item) => {
    const discountedPrice = discountPriceCalc(item.onsale, item.discount, item.price)
    return total + (discountedPrice * item.quantity)
  }, 0)
  console.log(cartTotal)
  const handleRemoveFromCart = (id) => {
    dispatch(removeItemComplete(id))
  }

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id))
  }

  {/* ya sir ka kam ha */}
  const loggedIn =
    Auth.user !== null && Auth.token !== "" && Auth.refreshToken !== "";
  const logout = () => {
    setAuth({ User: null, token: "", refreshtoken: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const cartRef = useRef(null);
  const catRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setIsCartOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      if (catRef.current && !catRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (dropdownSetter, currentState) => {
    dropdownSetter(!currentState);
  };

  return (
    <div>
      <div className="bg-orange-600 py-4 px-3 h-16 flex justify-evenly pr-14 gap-12">
      <div className='text-[28px] -translate-y-[2px]  whitespace-nowrap font-serif'>Electro Saman.com</div>
      {/* ya search bar ha */}
    <form className="flex relative">
        {/* is sa dropdown bana ha */}
        <select className='absolute outline-none z-10 rounded-full bg-transparent -mt-[2px] -translate-x-4 h-10 w-5 '>
        <option value="">Fashion</option>
        <option value="">Ladies Clothes</option>
        <option value="">Beauty</option>
        <option value="">Watches</option>
        <option value="">Shoes</option>
        <option value="">Shirts</option>
      </select>

        <input
          type="text"
          className="bg-gray-500 placeholder-white text-white 
           rounded-full outline-none -translate-y-1 -translate-x-6 pl-9 w-96 h-7 p-[22px] "
         placeholder="Search for anything"
        />

        <button
          type="submit"
          className="absolute text-[24px] mt-[8px] ml-[320px] text-white hover:bg-slate-400 rounded-full"
        >
          {<IoSearch />}
        </button>
    </form>

      {/* ya sara links han */}
        <>
          <NavLink to="/" className="text-white hover:text;yellow -translate-x-12  font-serif text-[24px]">
            Home
          </NavLink>

          <NavLink to="/aboutus" className="text-white hover:text;yellow -translate-x-12  font-serif text-[24px]">
            Aboutus
          </NavLink>

          <NavLink to="/contactus" className="text-white hover:text;yellow -translate-x-12  font-serif text-[24px]">
            Contactus
          </NavLink>

          {
            Auth?.token? 
            (<>
            <NavLink to="/Dashboard" className="text-white hover:text;yellow -translate-x-12  font-serif text-[24px]">
             Dashboard
            </NavLink>
            </>) 
            :
            (<> <NavLink to="/products" className="text-white hover:text;yellow -translate-x-12  font-serif text-[24px]">
            Products
          </NavLink>

          <NavLink to="/faq" className="text-white hover:text;yellow -translate-x-12  font-serif text-[24px]">
            FAQ
          </NavLink> </>)

          }
        </>

      {/* ya light aur dark mode ka button ha */}
      <button onClick={changedark} className={dark ? "absolute text-white text-3xl mt-1 hover:animate-pulse translate-x-[748px]" : "text-white absolute text-3xl mt-1 hover:animate-pulse translate-x-[748px] " }>
         {dark ? <BsMoonStarsFill /> : <IoMdSunny />}
      </button>

      

      {/* ya sir ka kam ha */}

      {/* show the Profile Icon */}
      {loggedIn ? (
        <div className="relative -translate-x-[66px]" ref={profileRef}>
          <div className='h-[36px] w-[36px]'>
            <img
            src={profile}
            alt="Profile"
            className="cursor-pointer h-10 w-[70px]  rounded-full border-2 border-white transition-all hover:animate-spin duration-300 hover:scale-110"
            onClick={() => toggleDropdown(setIsProfileOpen, isProfileOpen)}
            />
          </div>
          
          {isProfileOpen && (
            <div className="absolute right-0 mt-2  dark:bg-teal-500 hover:bg-teal-700  bg-teal-600 text-white rounded-lg shadow-lg p-2 transition-all duration-300 w-[240px] ">
              <Link
                to="/dashboard/profile"
                className="flex items-center space-x-2 text-lg px-2 py-1 hover:bg-gray-200rounded  transition-all duration-300"
              >
                <span className="font-bold text-sm text-white hover:text-yellow-300 ">
                  {Auth?.User?.first_name
                    ? Auth.User?.first_name + " " + Auth.User?.last_name
                    : "User"}

                  <br />
                  <b className="text-orange-300"> {Auth.user?.email} </b>
                </span>
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 text-xs px-2 py-1 hover:bg-gray-200rounded transition-all duration-300"
              >
                <FaUserTie />
                <span> Dashboard </span>
              </Link>
              <Link
                to="/dashboard/update-profile"
                className="flex items-center space-x-2 text-xs px-2 py-1 hover:bg-gray-200rounded transition-all duration-300"
              >
                <FaCogs />
                <span>Settings</span>
              </Link>
              <Link
                to="/orders"
                className="flex items-center space-x-2 text-xs px-2 py-1 hover:bg-gray-200rounded transition-all duration-300"
              >
             
                <span>Orders </span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-xs px-2 py-1 hover:bg-gray-200rounded transition-all duration-300"
              >
              
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="relative  -translate-x-[66px] " ref={profileRef}>
          <div className='h-[36px] w-[36px]'>
            <img
            src={nouser}
            alt="Profile"
            className="cursor-pointer absolute rounded-full border-2 border-white transition-all hover:animate-spin duration-300 hover:scale-110"
            onClick={() => toggleDropdown(setIsProfileOpen, isProfileOpen)}
          />
          </div>
          {isProfileOpen && (
            <div className="absolute right-0 mt-[-6px] w-[250px] bg-gray-200 dark:slate-800 text-white rounded-lg shadow-lg p-[-0.5rem] transition-all duration-300">
              {/* show the If user is not logged in */}
              <div className="absolute right-0 mt-2 w-56 bg-teal-700 dark:bg-teal-500 text-white rounded-lg shadow-lg transition-all duration-300">
                <Link
                  to="/login"
                  className="flex items-center justify-between px-2 py-1 hover:bg-teal-600"
                >
                  <span>Login</span>
                  <AiOutlineLogin className="ml-2" />
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center justify-between px-2 py-1 hover:bg-teal-700"
                >
                  <span>Signup</span>
                  <FaUserLock className="ml-2" />
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* ya titania ka kam ha */}

      {/* Right side - Cart and Wishlist Icons */}
      <div className="flex items-center gap-6">
        {/* Cart Icon */}
        <div className="relative">
          <button
            onClick={() => {
              setShowCartDropdown(!showCartDropdown)
              setShowWishlistDropdown(false)
            }}
            className="flex items-center"
          >
            <BsCart3 className="text-[32px] translate-y-1 -translate-x-[86px] absolute text-white cursor-pointer" />
            {cartTotalQuantity > 0 && (
              <span className="absolute bottom-[2px]  right-[46px] bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartTotalQuantity}
              </span>
            )}
          </button>

          {showCartDropdown && (
            <div className="absolute right-0 top-12 w-72 bg-gray-50 border-2 border-gray-200 rounded-lg shadow-2xl" style={{ zIndex: 99999 }}>
              <div className="p-3 bg-blue-600 text-white font-semibold rounded-t-lg flex justify-between items-center">
                <span>Cart ({cartTotalQuantity})</span>
                <span className="text-sm">Rs. {cartTotal.toFixed(2)}</span>
              </div>

              {cartItems.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => {
                    const discountedPrice = discountPriceCalc(item.price, item.onSale, item.discount)
                    const hasDiscount = item.onSale && item.discount > 0

                    return (
                      <div key={item._id} className="p-3 flex items-center gap-3 hover:bg-gray-100">
                        <img src={item.images[0]} alt={item.title} className="w-12 h-12 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-800 truncate">{item.title}</h4>
                          <p className="text-sm">
                            {hasDiscount ? (
                              <>
                                <span className="text-red-500 font-bold">Rs. {discountedPrice.toFixed(2)}</span>
                                <span className="text-gray-400 line-through ml-1">Rs{parseFloat(item.price).toFixed(2)}</span>
                              </>
                            ) : (
                              <span className="text-gray-600">Rs{parseFloat(item.price).toFixed(2)}</span>
                            )}
                            <span className="text-gray-500"> x {item.quantity}</span>
                          </p>
                        </div>
                        <button onClick={() => handleRemoveFromCart(item._id)} className="text-red-500 hover:text-red-700">
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            <hr />
          <div className='flex'>
            {cartTotal > 0  && (

            <div className='p-3 pr-2 text-center text-gray-500'>
                <hr />
                  <button onClick={destroyCart} className="h-9 w-28 m-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm shadow-md hover:from-purple-600 hover:to-pink-600 hover:shadow-lg transition-all duration-300">
                   Clear Cart
                  </button>
            </div>
           )}
            
            <Link to="/cart">
              <button  className="h-9 mt-5 w-28 m-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm shadow-md hover:from-purple-600 hover:to-pink-600 hover:shadow-lg transition-all duration-300">
              View Cart
              </button>
            </Link>
            
          </div>
          
          
          
          </div>
          
          )}
          
        </div>
        

        {/* Wishlist Icon */}
        <div className="relative">
          <button
            onClick={() => {
              setShowWishlistDropdown(!showWishlistDropdown)
              setShowCartDropdown(false)
            }}
            className="flex items-center"
          >
            <FaHeart  className="text-2xl text-white absolute text-[30px] translate-y-1 -translate-x-[60px]  cursor-pointer" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-[18px] right-[] bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </button>

          {showWishlistDropdown && (
            <div className="absolute right-0 top-12 w-72 bg-gray-50 border-2 border-gray-200 rounded-lg shadow-2xl" style={{ zIndex: 99999 }}>
              <div className="p-3 bg-blue-600 text-white font-semibold rounded-t-lg">
                <span>Wishlist ({wishlistItems.length})</span>
              </div>

              {wishlistItems.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <p>Your wishlist is empty</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
                  {wishlistItems.map((item) => {
                    const discountedPrice = discountPriceCalc(item.price, item.onSale, item.discount)
                    const hasDiscount = item.onSale && item.discount > 0

                    return (
                      <div key={item._id} className="p-3 flex items-center gap-3 hover:bg-gray-100">
                        <img src={item.images[0]} alt={item.title} className="w-12 h-12 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-800 truncate">{item.title}</h4>
                          <p className="text-sm">
                            {hasDiscount ? (
                              <>
                                <span className="text-red-500 font-bold">Rs{discountedPrice.toFixed(2)}</span>
                                <span className="text-gray-400 line-through ml-1">Rs{parseFloat(item.price).toFixed(2)}</span>
                              </>
                            ) : (
                              <span className="text-gray-600">Rs{(item.price).toFixed(2)}</span>
                            )}
                          </p>
                        </div>
                        <button onClick={() => handleRemoveFromWishlist(item._id)} className="text-red-500 hover:text-red-700">
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Click outside overlay */}
      {(showCartDropdown || showWishlistDropdown) && (
        <div
          className="fixed inset-0"
          style={{ zIndex: 99998 }}
          onClick={() => {
            setShowCartDropdown(false)
            setShowWishlistDropdown(false)
          }}
        />
      )}

      </div>
    </div>
  );
};

export default Navigation;
