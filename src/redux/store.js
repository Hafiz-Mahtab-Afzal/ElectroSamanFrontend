import { combineReducers,configureStore } from '@reduxjs/toolkit'
import  productSlice  from './slices/productSlice'
import  cartSlice  from './slices/cartSlice'
import  wishlistSlice  from './slices/wishlistSlice'

const reducer = combineReducers({
        productSlice,
        cartSlice,
        wishlistSlice
        
})




const store = configureStore({reducer})
export default store;