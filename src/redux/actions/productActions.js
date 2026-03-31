import { setcategories, setloading,setproduct,setproducts } from '../slices/productSlice'
import apis from '../../config/apis'
import axios from 'axios'

export const getproducts = () => async (dispatch) => {
     
         try{
             dispatch(setloading())
             const {data} = await axios.get(apis.prod)
             const {total,products} = data
             dispatch(setproducts(products))
            }
            catch(err){
              dispatch(setloading())
              console.log(err.message)
            }
}

export const getcategories = () => async (dispatch) => {
     
         try{
             dispatch(setloading())
             const {data} = await axios.get(`${apis.prod}/category`)
             const {total,categories} = data
             dispatch(setcategories(categories))
            }
            catch(err){
              dispatch(setloading())
              console.log(err.message)
            }
}

export const getproduct = (id) => async (dispatch) => {
        try{
            dispatch(setloading())
            const {data} = await axios.get(`${apis.prod}/${id}`)
            const {singleproduct} = data
            dispatch(setproduct(singleproduct))
        }
        catch(err){
           dispatch(setloading())
           console.log(err.message)
        }
}
