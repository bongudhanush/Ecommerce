import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

function PlaceOrder() {
  const { currency, delivery_fee, getCartAmount, placeOrder } = useContext(ShopContext);
  const navigate = useNavigate();
  const [payment, setPayment] = useState('stripe');

  const handlePlaceOrder = () => {
    placeOrder();           // ✅ saves cart items to orders
    navigate('/orders');    // ✅ redirects to orders page
  };

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      {/* Left - Delivery Info */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Zipcode' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
      </div>

      {/* Right - Summary + Payment */}
      <div className='mt-8'>
        <div className='text-2xl'>
          <Title text1={'CART'} text2={'TOTALS'} />
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
          <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>{currency}{getCartAmount()}.00</p>
          </div>
          <hr />
          <div className='flex justify-between'>
            <p>Shipping Fee</p>
            <p>{currency}{delivery_fee}.00</p>
          </div>
          <hr />
          <div className='flex justify-between font-bold text-base'>
            <b>Total</b>
            <b>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
          </div>
        </div>

        {/* Payment Method */}
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-3 flex-col lg:flex-row'>

            <div
              onClick={() => setPayment('stripe')}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${payment === 'stripe' ? 'border-green-500' : ''}`}
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${payment === 'stripe' ? 'bg-green-400 border-green-400' : 'border-gray-400'}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>STRIPE</p>
            </div>

            <div
              onClick={() => setPayment('razorpay')}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${payment === 'razorpay' ? 'border-green-500' : ''}`}
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${payment === 'razorpay' ? 'bg-green-400 border-green-400' : 'border-gray-400'}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>RAZORPAY</p>
            </div>

            <div
              onClick={() => setPayment('cod')}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${payment === 'cod' ? 'border-green-500' : ''}`}
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${payment === 'cod' ? 'bg-green-400 border-green-400' : 'border-gray-400'}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>

          </div>

          <div className='w-full text-end mt-8'>
            <button
              onClick={handlePlaceOrder}
              className='bg-black text-white px-16 py-3 text-sm'
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;