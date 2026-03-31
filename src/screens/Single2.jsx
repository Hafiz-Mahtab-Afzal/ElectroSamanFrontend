import { getproduct } from '../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../layouts/Loader';

const Single = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loader, singleproduct } = useSelector((state) => state.productSlice);

  useEffect(() => {
    dispatch(getproduct(id));
  }, [id]);

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="py-10 px-5">
      {/* Header */}
      <h1 className="text-center text-4xl font-bold text-orange-600 mb-10">
        Product Details
      </h1>

      {/* Product Container */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-8 flex flex-col md:flex-row gap-10">
        {/* Image Section */}
        <div className="flex-1 flex justify-center">
          <div className="border rounded-lg bg-gray-100 w-full h-[450px] hover:shadow-lg transition duration-300">
            <img
              src={singleproduct?.images?.[0]}
              alt={singleproduct?.title}
              className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-5">
          <h2 className="text-3xl font-semibold text-gray-900">
            {singleproduct?.title || 'Product Title'}
          </h2>
          <p className="text-lg text-gray-500">
            {singleproduct?.subtitle || 'Product Subtitle'}
          </p>

          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-700 leading-relaxed text-justify">
              {singleproduct?.description || 'No description available for this product.'}
            </p>
          </div>

          <div className="pt-5">
            <span className="text-3xl font-bold text-orange-600">
              Rs. {singleproduct?.price || '0'}
            </span>
          </div>

          <div className="flex gap-4 pt-6">
            <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg text-lg font-medium transition">
              Add to Cart
            </button>
            <button className="flex-1 border border-orange-500 text-orange-600 py-3 rounded-lg text-lg font-medium hover:bg-orange-50 transition">
              Buy Now
            </button>
          </div>

          <div className="pt-6 text-sm text-gray-500">
            <p>✓ 7 Days Return Policy</p>
            <p>✓ 100% Original Products</p>
            <p>✓ Cash on Delivery Available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
