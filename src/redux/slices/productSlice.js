import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   products:[],
   categories:[],
   singleproduct:null,
   loader:false,
   error:null
}

const productSlice = createSlice ({
      name:"product",
      initialState,
      reducers:{
        setloading:(state) => {
            state.loader = true
        },
        setproducts:(state,{payload}) => {
            state.loader = false
            state.products = payload
        },
        setcategories:(state,{payload}) => {
            state.loader = false
            state.categories = payload
        },
        setproduct:(state,{payload}) => {
           state.loader = false
           state.singleproduct = payload
        }
      }       

})

export const {setloading,setproducts,setproduct,setcategories} = productSlice.actions
export default productSlice.reducer
