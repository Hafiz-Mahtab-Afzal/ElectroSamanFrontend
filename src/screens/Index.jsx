import { useEffect } from 'react';
import Loader from '../layouts/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { getproducts } from '../redux/actions/productActions';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import ProductCard from '../layouts/ProductCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import big from "../img/1.avif";
import small from "../img/2.avif";
import big2 from "../img/3.avif";
import big3 from "../img/4.avif";
import 'swiper/css/navigation';
import 'swiper/css'


const Index = () => {
  const dispatch = useDispatch();
  const { loader, products } = useSelector((state) => state.productSlice);
  useEffect(() => {
    dispatch(getproducts());
  }, []);

  const img = [
    big,
    small
  ]

  return (
    <div>
      <div className="bg-gradient-to-l from-orange-400 via-orange-800 py-4 px3 text-white">
        <h1 className="text-center text-4xl font-semibold">Electro Premium Products</h1>
      </div>
       
      <Swiper
      className='text-white'
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={1}
      navigation
      
    >
      <SwiperSlide><img className='px-20 pt-2 h-96 w-full' src={big} /></SwiperSlide>
      <SwiperSlide><img className='px-20 pt-2 h-96 w-full' src={small} /></SwiperSlide>
      <SwiperSlide><img className='px-20 pt-2 h-96 w-full' src={big2} /></SwiperSlide>
      <SwiperSlide><img className='px-20 pt-2 h-96 w-full' src={big3} /></SwiperSlide>
      ...
    </Swiper>

      <div>
        {loader ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1  lg:grid-cols-4 gap-10 px-24 pl-20">
            {products &&
              products.map((product, key) => <ProductCard product={product} key={key} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
