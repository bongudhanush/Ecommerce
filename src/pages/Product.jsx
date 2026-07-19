import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';

function Product() {
  const { productId } = useParams();
  const { products, currency, addToCart, addToWishlist, wishlist } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    products.map((item) => {
      if (item._id === productId) { setProductData(item); setImage(item.image[0]); }
      return null;
    });
  }, [productId, products]);

  const isWishlisted = productData && wishlist.includes(productData._id);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

        {/* Images */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img onClick={() => setImage(item)} src={item} key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" alt="" />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* Info */}
        <div className='flex-1'>
          <div className='flex items-start justify-between gap-4'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

            {/* ✅ Prominent wishlist button */}
            <button
              onClick={() => addToWishlist(productData._id)}
              className={`mt-2 flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200
                ${isWishlisted
                  ? 'bg-pink-50 border-pink-400 text-pink-600'
                  : 'border-gray-300 text-gray-500 hover:border-pink-400 hover:text-pink-500'}`}
            >
              <span className='text-base'>{isWishlisted ? '❤️' : '🤍'}</span>
              {isWishlisted ? 'Wishlisted' : 'Wishlist'}
            </button>
          </div>

          {/* Stars */}
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className='w-3.5' />
            <img src={assets.star_icon} alt="" className='w-3.5' />
            <img src={assets.star_icon} alt="" className='w-3.5' />
            <img src={assets.star_icon} alt="" className='w-3.5' />
            <img src={assets.star_dull_icon} alt="" className='w-3.5' />
            <p className='pl-2 text-sm text-gray-500'>(122)</p>
          </div>

          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

          {/* Size */}
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 transition ${item === size ? 'border-orange-500 bg-orange-50' : 'hover:border-gray-400'}`}
                  key={index}>{item}</button>
              ))}
            </div>
          </div>

          <button onClick={() => addToCart(productData._id, size)}
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 hover:bg-gray-900 transition'>
            ADD TO CART
          </button>

          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>✅ 100% Original product.</p>
            <p>🚚 Cash on delivery is available on this product.</p>
            <p>🔄 Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <button
  onClick={() => addToWishlist(productData._id)}
  className={`mt-2 flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200
    ${isWishlisted
      ? 'bg-red-50 border-red-400 text-red-500'
      : 'border-gray-300 text-gray-600 hover:border-black hover:text-black'}`}
>
  {/* ✅ SVG heart — fills red when wishlisted, empty black border when not */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={isWishlisted ? '#ef4444' : 'none'}
    stroke={isWishlisted ? '#ef4444' : 'black'}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
  {isWishlisted ? 'Wishlisted' : 'Wishlist'}
</button>

      {/* Description */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm cursor-pointer'>Description</b>
          <p className='border px-5 py-3 text-sm cursor-pointer text-gray-500'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>E-commerce websites utilize text strategically across various touchpoints to enhance user experience, drive sales, and build customer relationships.</p>
          <p>An ecommerce website is an online portal where businesses and customers engage in the buying and selling of goods and services over the internet.</p>
        </div>
      </div>

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className="opacity-0"></div>;
}

export default Product;