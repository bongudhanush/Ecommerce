import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { useNavigate } from 'react-router-dom';

function Wishlist() {
  const { wishlist, products, removeFromWishlist, currency } = useContext(ShopContext);
  const navigate = useNavigate();

  const wishlistProducts = products.filter(p => wishlist.includes(p._id));

  return (
    <div className='border-t pt-14 min-h-[80vh]'>
      <div className='text-2xl mb-6'>
        <Title text1={'MY'} text2={'WISHLIST'} />
      </div>

      {wishlistProducts.length === 0 ? (
        <div className='text-center text-gray-400 py-20 flex flex-col items-center gap-4'>
          <p className='text-5xl'>🤍</p>
          <p className='text-xl font-medium text-gray-500'>Your wishlist is empty</p>
          <p className='text-sm'>Save items you love by clicking the heart icon on any product.</p>
          <button
            onClick={() => navigate('/collection')}
            className='mt-4 bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 transition'
          >
            BROWSE PRODUCTS
          </button>
        </div>
      ) : (
        <div>
          <p className='text-sm text-gray-500 mb-6'>{wishlistProducts.length} item{wishlistProducts.length > 1 ? 's' : ''} saved</p>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {wishlistProducts.map((item) => (
              <div key={item._id} className='relative group'>
                {/* Remove from wishlist button */}
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className='absolute top-2 right-2 z-10 bg-white rounded-full w-7 h-7 flex items-center justify-center shadow text-red-500 hover:scale-110 transition'
                  title='Remove from wishlist'
                >
                  ♥
                </button>
                <ProductItem id={item._id} name={item.name} image={item.image} price={item.price} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Wishlist;