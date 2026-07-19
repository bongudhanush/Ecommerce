import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom';

function Orders() {
  const { orders, currency } = useContext(ShopContext);
  const navigate = useNavigate();

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl mb-6'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {orders.length === 0 ? (
        // ✅ Empty state — shown before any order is placed
        <div className='text-center text-gray-400 py-20 flex flex-col items-center gap-4'>
          <p className='text-xl font-medium text-gray-500'>No orders yet!</p>
          <p className='text-sm'>Looks like you haven't placed any orders.</p>
          <button
            onClick={() => navigate('/collection')}
            className='mt-4 bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 transition'
          >
            START SHOPPING
          </button>
        </div>
      ) : (
        // ✅ Real orders from context
        <div>
          {orders.map((item, index) => (
            <div
              key={index}
              className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
            >
              {/* Product Info */}
              <div className='flex items-start gap-6 text-sm'>
                <img
                  className='w-16 sm:w-20 object-cover'
                  src={item.image[0]}
                  alt={item.name}
                />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-2 text-sm'>
                    Date: <span className='text-gray-400'>{item.date}</span>
                  </p>
                </div>
              </div>

              {/* Status + Track */}
              <div className='md:w-1/2 flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button className='border px-4 py-2 text-sm font-medium rounded-sm hover:bg-black hover:text-white transition'>
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;