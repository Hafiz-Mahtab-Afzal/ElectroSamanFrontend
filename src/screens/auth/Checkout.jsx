import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apis from '../../config/apis';
import { Authcontext } from '../../context/auth';
import { errortoast, successtoast } from '../../toastify/toastify';

/* ya sir ka kam ha */
// import { loadStripe } from '@stripe/stripe-js'
// import { 
//     // Elements,
//     // CardCvcElement,
//     // CardExpiryElement,
//     // CardNumberElement,
//     useElements,
//     useStripe
//  } from '@stripe/stripe-js'
// import {  } from '../../config/apis'

const Checkout = ({cartItems}) => {

  // const stripe = useStripe()
  // const elements = useElements()




  const { Auth, setAuth } = useContext(Authcontext);
  const navigate = useNavigate();
  if (!Auth?.token) {
    location.href = '/login';
  }
  console.log(Auth?.token);
  const [order, setorder] = useState({
    phone: '',
    address: '',
    pastal_code: '',
    city: '',
    state: '',
    country: '',
    shippingCharges: '',
    saving: '',
  });

  const changehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setorder({ ...order, [name]: value });
  };

  const checkouthandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(`${apis.order}/create-order`, order);
      const { error, success } = data;

      if (error) {
        errortoast(error);
      }
      if (success) {
        successtoast(success);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="bg-white p-10 rounded-xl  hover:shadow-blue-600 hover:shadow-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Checkout</h2>

        <form onSubmit={checkouthandler} className="grid grid-cols-2 gap-4">
          {/* Phone */}
          <>
            <input
              type="text"
              name="phone"
              value={order.phone}
              onChange={changehandler}
              placeholder="Phone Number"
              className="p-3 rounded border border-gray-300 hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>

          {/* Postal Code */}
          <>
            <input
              type="text"
              name="pastal_code"
              value={order.pastal_code}
              onChange={changehandler}
              placeholder="Postal Code"
              className="p-3 rounded border border-gray-300 hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>

          {/* Address (full width) */}
          <>
            <input
              type="text"
              name="address"
              value={order.address}
              onChange={changehandler}
              placeholder="Address"
              className="col-span-2 p-3 rounded border border-gray-300 hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>

          {/* City */}
          <>
            <input
              type="text"
              name="city"
              value={order.city}
              onChange={changehandler}
              placeholder="City"
              className="p-3 rounded border border-gray-300 hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>

          {/* State */}
          <>
            <input
              type="text"
              name="state"
              value={order.state}
              onChange={changehandler}
              placeholder="State"
              className="p-3 rounded border border-gray-300 hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>

          {/* Country */}
          <>
            <input
              type="text"
              name="country"
              value={order.country}
              onChange={changehandler}
              placeholder="Country"
              className="p-3 rounded border border-gray-300 hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>

          {/* Shipping Charges */}
          <>
            <input
              type="number"
              name="shippingCharges"
              value={order.shippingCharges}
              onChange={changehandler}
              placeholder="Shipping Charges"
              className="p-3 rounded border border-gray-300 hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>

          {/* Saving */}
          <>
            <input
              type="number"
              name="saving"
              value={order.saving}
              onChange={changehandler}
              placeholder="Saving"
              className="p-3 rounded border border-gray-300 hover:ring-2 hover:ring-rose-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>

          <button className="col-span-2 mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded font-semibold hover:opacity-90 transition">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
