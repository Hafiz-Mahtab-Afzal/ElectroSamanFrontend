import { useState } from "react";
import { Link } from "react-router-dom";

const Productcard = ({ pro, ke }) => {
  const { _id, images, title } = pro;
  const [hovered, setHovered] = useState(false);

  return (
    <Link to={`/product/${_id}`}>
      <div className="bg-white hover:bg-gray-200 hover:scale-105 transition-transform duration-500 shadow-md hover:shadow-xl rounded-md overflow-hidden w-72 mt-10 mb-5"
      onMouseEnter={() => setHovered(true)}   
        onMouseLeave={() => setHovered(false)}  
      >

        <div className="h-72">
          <img
            src={hovered && images[1] ? images[1] : images[0]} 
            alt={title}
            className="w-full h-full object-cover  hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-4 text-center">
          <h2 className="text-gray-800 font-semibold text-lg ">
            {ke} {title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default Productcard;
