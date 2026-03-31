
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10  rounded-xl hover:scale-110 transition duration-500 hover:shadow-blue-600 hover:shadow-2xl shadow-lg  max-w-md text-center">
        <div className="text-5xl mb-4">✔️</div>
        <h2 className="text-2xl font-bold mb-6">
          Your password has been successfully reset.
        </h2>

        <button 
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded font-semibold hover:opacity-90 transition">
         <Link to="/login"> Go to Login</Link>
        </button>

      </div>
    </div>
  );
};

export default Success;
