import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getproduct } from '../redux/actions/productActions'
import { addToCart, removeFromCart } from '../redux/slices/cartSlice'
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice'
import Loader from '../layouts/Loader'
import { FaShoppingCart, FaHeart, FaRegHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { successtoast, infotoast } from '../toastify/toastify'

const Single = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { singleproduct, loader } = useSelector(state => state.productSlice)
  const cartItems = useSelector((state) => state.cartSlice.items)
  const wishlistItems = useSelector((state) => state.wishlistSlice.items)
 
  // Check if item is in cart or wishlist
  const isInCart = cartItems.some(item => item._id === id)
  const isInWishlist = wishlistItems.some(item => item._id === id)
 
  const [inCart, setInCart] = useState(isInCart)
  const [wishlisted, setWishlisted] = useState(isInWishlist)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (id) {
      dispatch(getproduct(id))
    }
  }, [dispatch, id])

  // Reset slide when product changes
  useEffect(() => {
    setCurrentSlide(0)
  }, [singleproduct])

  if (loader) {
    return <Loader />
  }

  if (!singleproduct) {
    return (
      <div className="py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-700">Product not found</h2>
        <Link to="/" className="text-teal-600 hover:underline mt-4 inline-block">
          Back to Home
        </Link>
      </div>
    )
  }

  const {
    title,
    subTitle,
    brand,
    category,
    description,
    price,
    images,
    stock,
    rating,
    warranty_info
  } = singleproduct

  const productImages = images && images.length > 0 ? images : ""

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === productImages.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))
  }

  const handleAddToCart = () => {
    if (!inCart) {
      dispatch(addToCart(singleproduct))
      setInCart(true)
      successtoast(`${title} added to cart!`)
    } else {
      dispatch(removeFromCart(id))
      setInCart(false)
      infotoast(`${title} removed from cart`)
    }
  }

  const handleAddToWishlist = () => {
    if (!wishlisted) {
      dispatch(addToWishlist(singleproduct))
      setWishlisted(true)
      successtoast(`${title} added to wishlist!`)
    } else {
      dispatch(removeFromWishlist(id))
      setWishlisted(false)
      infotoast(`${title} removed from wishlist`)
    }
  }

  const handleBuyNow = () => {
    successtoast(`Proceeding to checkout for ${title}!`)
    navigate('/checkout')
  }

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Products
      </Link>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image Slider */}
          <div className="md:w-1/2">
            <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-lg bg-gray-100">
              {productImages.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${title} - ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}

              {productImages.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-teal-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <FaChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-teal-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <FaChevronRight size={18} />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
                    {productImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          index === currentSlide ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="flex gap-3 mt-4 justify-center">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentSlide ? 'border-teal-600 ring-2 ring-teal-600/30' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="md:w-1/2">
            <span className="text-sm text-gray-500 uppercase">{category}</span>
           
            <h1 className="text-2xl font-bold text-gray-800 mt-1">{title}</h1>
           
            {subTitle && (
              <p className="text-gray-500 mt-1">{subTitle}</p>
            )}

            <p className="text-sm text-gray-600 mt-2">
              <span className="font-semibold">Brand:</span> {brand}
            </p>

            {rating && (
              <p className="text-sm text-gray-600 mt-1">
                Rating: ★ {rating.toFixed(1)}
              </p>
            )}

            {stock !== undefined && (
              <p className={`text-sm mt-1 ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stock > 0 ? `In Stock (${stock})` : 'Out of Stock'}
              </p>
            )}

            <div className="mt-4">
              <span className="text-2xl font-bold text-teal-600">${price}</span>
            </div>

            <p className="text-gray-600 mt-4">{description}</p>

            {warranty_info && (
              <p className="text-sm text-gray-600 mt-3">
                <span className="font-semibold">Warranty:</span> {warranty_info}
              </p>
            )}

            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 active:scale-95 transition-all font-medium min-w-[140px]"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 ${inCart ? 'bg-blue-600 hover:bg-blue-700' : 'bg-teal-600 hover:bg-teal-700'} text-white py-3 px-6 rounded-lg active:scale-95 transition-all font-medium min-w-[160px]`}
              >
                <FaShoppingCart className="text-lg" />
                {inCart ? 'In Cart' : 'Add to Cart'}
              </button>
              <button
                onClick={handleAddToWishlist}
                className={`flex items-center justify-center gap-2 py-3 px-5 rounded-lg active:scale-95 transition-all font-medium ${
                  wishlisted ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {wishlisted ? <FaHeart className="text-lg" /> : <FaRegHeart className="text-lg" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Single