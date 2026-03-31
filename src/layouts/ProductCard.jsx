
{/* ya titania ka kam ha */}
import { addToCart, removeFromCart } from "../redux/slices/cartSlice"
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlistSlice"
import { infotoast } from "../toastify/toastify";

{/* ya mera kam ha */}
import { Heart, Eye, ShoppingCart , Tag } from 'lucide-react';
import { discountPriceCalc } from '../functions/helper';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from './Navigation';
import  { useState } from 'react';
import Rating from './Rating';
import { FaHeart, FaRegHeart } from "react-icons/fa";



const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(discountPriceCalc(true, 50, 5000) )

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showHover, setShowHover] = useState(false);

  const {
    _id,
    title,
    brand,
    category,
    images,
    price,
    stock,
    rating,
    discount,
    features,
    onSale,
    fastDelivery,
    originalPrice,
  } = product;


  const handleNavigate = () => {
    navigate(`/product/${_id}`);
  };
   
  {/* ya titania ka kam ha */}

    // Get cart and wishlist from Redux
    const cartItems = useSelector((state) => state.cartSlice.items)
    const wishlistItems = useSelector((state) => state.wishlistSlice.items)
    
    // Check if item is in cart or wishlist
    const isInCart = cartItems.some(item => item._id === _id)
    const isInWishlist = wishlistItems.some(item => item._id === _id)
  
    // Calculate discounted price

    const discountAmount = onSale && discount > 0 ? (originalPrice * discount) / 100 : 0
    const discountedPrice = originalPrice - discountAmount
  
    const handleAddToWishlist = (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (!isInWishlist) {
        dispatch(addToWishlist(product))
        infotoast(`${title} has been added to wishlist!`)
      } else {
        dispatch(removeFromWishlist(_id))
        infotoast(`${title} has been removed from wishlist!`)
      }
    }
  
    const handleAddToCart = (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (!isInCart) {
        dispatch(addToCart(product))
        infotoast(`${title} has been added to cart!`)
      } else {
        dispatch(removeFromCart(_id))
        infotoast(`${title} has been removed from cart!`)
      }
    }  

  return (
    <div
      className="group relative bg-white rounded-xl mt-10 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
      onClick={() => setShowHover(!showHover)}
    >
      <div
        className="relative h-48 cursor-pointer overflow-hidden"
        onMouseEnter={() => setShowHover(true)}
        onMouseLeave={() => setShowHover(false)}
        onClick={handleNavigate}
      >
      {/* ya image ha */}
      <>
        <img
          src={images[0]}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            showHover ? 'scale-105' : ''
          }`}
        />

        {images[1] && (
          <img
            src={images[1]}
            alt={title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out
              ${showHover ? 'opacity-80 -translate-y-4' : 'opacity-0 translate-y-6'}
            `}
          />
        )}
      </>
      {/* ya features ka kam ha */}
      <>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div
          className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-center z-10 transition-all duration-500
            ${showHover ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <h3 className="text-xs font-bold text-white mb-1">Key Features</h3>
          <div className="flex flex-wrap gap-1 justify-center">
            {features?.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-white/90 text-gray-800 text-[10px] rounded-full shadow"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </>
      {/* ya wishlist ka button ha */}
        <button
          onClick={handleAddToWishlist}
          className={`absolute top-[30px] right-2 z-20 p-2 rounded-full shadow-md transition-all duration-300 ${
           isInWishlist ? "bg-red-500 text-white"
          : 
          "bg-white text-gray-600 hover:bg-red-500 hover:text-white"
        }`}
>
          {isInWishlist ? <FaHeart className="w-4 h-4" /> : <FaRegHeart className="w-4 h-4" />}
        </button>
      {/* ya eye icon wala kam ha */}
        <button
          onClick={handleNavigate}
          className="absolute bottom-4 right-2 p-1.5 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition z-10"
        >
          <Link to={`/product/${_id}`} title="to see the full details click here">
            <Eye className="w-4 h-4 text-gray-600" />{' '}
          </Link>
        </button>
      {/* ya items ka kam ha stock ka */}
      <>
        {stock === 0 && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
            Out of Stock
          </span>
        )}
        {stock > 0 && stock <= 10 && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
            only {stock} items left
          </span>
        )}
        {stock > 10 && (
          <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
            {stock} items left
          </span>
        )}
      </>
      </div>
      
      {/* CONTENT */}
      <div className="p-3">
        <h3 className="font-bold text-sm truncate">{title}</h3>
        <p className="text-[14px] text-blue-600 truncate">{brand}</p>
      {/* ya discount price aur rating ka kam ha */}
      <>
        <div className="flex relative justify-between items-center mt-2">
          {onSale ? (
            <span className="text-red-700 font-bold text-sm">
              {discountPriceCalc(onSale, discount, price)} Rs
              <sup className="absolute line-through text-xs text-gray-500">{price} Rs</sup>
            </span>
          ) : (
            <span className="text-red-700 font-bold text-sm">{price} Rs</span>
          )}

          <Rating rating={rating} />
        </div>

        {discount > 0 && (
          <div className="absolute top-0 right-0 bg-green-600 text-white px-2 py-1 text-xs font-bold rounded-bl-lg flex items-center">
            <Tag className="w-3 h-3 mr-1" />-{discount}% OFF
          </div>
        )}
      </>
      {/* ya add to cart aur eye icon ka kam ha  */}
        <div className="flex gap-2 mt-3">
          <button to={`/product/${_id}`}
            onClick={handleAddToCart}           
            title={stock === 0 ? 'Out of stock' : undefined}
            className={`flex-1 ${stock == 0 ? 'bg-red-800 hover:bg-red-900' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2 cursor-pointer `}
          >
            <ShoppingCart className="w-4 h-4" />
            {stock == 0 ? 'Sold' : 'Add to cart'}
          </button>

          <button 
            onClick={(e) => {
              
              handleNavigate();
            }}
            className="bg-gray-900 text-white px-3 py-2 rounded-lg font-bold flex items-center gap-1"
          >
            <Link to={`/product/${_id}`} title="to see the full details click here">
              <Eye className="w-4 h-4 text-white" />{' '}
            </Link>
          </button>
        </div>
      {/* ya fast delivery ka kam ha */}
      <>
        {fastDelivery && (
          <div className="mt-2 text-xs text-orange-600 font-bold text-center">
            🚀 Express Delivery Today
          </div>
        )}
      </>
      </div>
    </div>
  );
};

export default ProductCard;
