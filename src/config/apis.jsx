  
const API = import.meta.env.VITE_API_URL;
console.log("API URL:", import.meta.env.VITE_API_URL);
 const apis = {
          

          "prod" : `${API}/api/v1/products`,
          "auth" : `${API}/api/v1/users`



 }

 export default apis;