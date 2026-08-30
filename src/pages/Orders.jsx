import React, { useContext, useState } from 'react';
import ShopContext from '../context/ShopContextValue';
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom';

function Orders() {
  const { orders, currency, cancelOrder } = useContext(ShopContext);
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleCancelOrder = (orderIndex) => {
    cancelOrder(orderIndex);
    setSelectedOrder(null);
  };

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
        <div className='space-y-5'>
          {orders.map((item, index) => (
            <div
              key={index}
              className='py-4 border border-gray-200 rounded-xl px-4 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm'
            >
              {/* Product Info */}
              <div className='flex items-start gap-6 text-sm'>
                <img
                  className='w-16 sm:w-20 object-cover rounded-lg'
                  src={item.image[0]}
                  alt={item.name}
                />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700 flex-wrap'>
                    <p>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-2 text-sm'>
                    Date: <span className='text-gray-400'>{item.date}</span>
                  </p>
                </div>
              </div>

              {/* Status + Order actions */}
              <div className='md:w-1/2 flex justify-between items-center gap-4'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => setSelectedOrder(index)}
                    className='border border-black px-4 py-2 text-sm font-medium rounded-full hover:bg-black hover:text-white transition'
                  >
                    Track Order
                  </button>
                  <button
                    onClick={() => handleCancelOrder(index)}
                    className='border border-red-500 text-red-600 px-4 py-2 text-sm font-medium rounded-full hover:bg-red-500 hover:text-white transition'
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            </div>
          ))}

          {selectedOrder !== null && (
            <div className='border border-gray-200 rounded-xl p-5 bg-gray-50'>
              <div className='flex items-center justify-between gap-4 flex-wrap'>
                <div>
                  <p className='text-xs uppercase tracking-[0.2em] text-gray-500'>Tracking</p>
                  <h3 className='text-xl font-medium text-gray-900 mt-1'>Order #{selectedOrder + 1}</h3>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className='text-sm text-gray-600 hover:text-black'
                >
                  Close
                </button>
              </div>

              <div className='mt-5 grid gap-3 sm:grid-cols-4'>
                {[
                  { label: 'Order Placed', done: true },
                  { label: 'Packed', done: true },
                  { label: 'In Transit', done: true },
                  { label: 'Delivered', done: false },
                ].map((step, idx) => (
                  <div key={idx} className='flex items-center gap-3'>
                    <div className={`h-3 w-3 rounded-full ${step.done ? 'bg-black' : 'bg-gray-300'}`} />
                    <p className={`text-sm ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</p>
                  </div>
                ))}
              </div>

              <p className='mt-5 text-sm text-gray-600'>
                Your package is being prepared and will be dispatched soon. You can check updates anytime from this tracking panel.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Orders;