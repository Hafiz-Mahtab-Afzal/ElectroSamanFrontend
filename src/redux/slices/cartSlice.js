import { createSlice } from '@reduxjs/toolkit'
import { discountPriceCalc } from '../../functions/helper'


// Get cart from localStorage or default to empty
const getCartFromStorage = () => {
  const storedCart = localStorage.getItem('electro_cart')
  if (storedCart) {
    return JSON.parse(storedCart)
  }
  return { items: [], totalQuantity: 0 }
}

const cartSlice = createSlice({

  name: 'cart',
  initialState: getCartFromStorage(),
  reducers: {

    addToCart: (state, action) => {
      const newItem = action.payload
      const existingItem = state.items.find(item => item._id === newItem._id)

      state.totalQuantity++

      if (!existingItem) {
        state.items.push({
          _id: newItem._id,
          title: newItem.title,
          price: newItem.price,
          discount:newItem.discount,
          onsale: newItem.onsale,
          images: newItem.images,
          quantity: 1
        })
      } else {
        existingItem.quantity++
      }
      // Save to localStorage
      localStorage.setItem('electro_cart', JSON.stringify(state))
    },

    removeFromCart: (state, action) => {
      const id = action.payload
      const existingItem = state.items.find(item => item._id === id)
      state.totalQuantity--
      
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item._id !== id)
      } else {
        existingItem.quantity--
      }
      // Save to localStorage
      localStorage.setItem('electro_cart', JSON.stringify(state))
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const existingItem = state.items.find(item => item._id === id)
      if (existingItem) {
        const quantityDiff = quantity - existingItem.quantity
        state.totalQuantity += quantityDiff
        if (quantity <= 0) {
          // Remove item when quantity is 0 or less
          state.items = state.items.filter(item => item._id !== id)
        } else {
          existingItem.quantity = quantity
        }
      }
      // Save to localStorage
      localStorage.setItem('electro_cart', JSON.stringify(state))
    },

    removeItemComplete: (state, action) => {
      const id = action.payload
      const existingItem = state.items.find(item => item._id === id)
      state.totalQuantity -= existingItem.quantity
      state.items = state.items.filter(item => item._id !== id)
      // Save to localStorage
      localStorage.setItem('electro_cart', JSON.stringify(state))
    },

    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      // Save to localStorage
      localStorage.setItem('electro_cart', JSON.stringify(state))
    }
    
  }
})

export const { addToCart, removeFromCart, removeItemComplete, clearCart, updateQuantity } = cartSlice.actions
export default cartSlice.reducer
