import React, { useContext, useState, useEffect } from 'react';
import ShopContext from '../context/ShopContextValue';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { products, cartItems, currency, delivery_fee, updateQuantity, getCartAmount, getCartCount, buyAllItems } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();
  const cartCount = getCartCount();
  const subtotal = getCartAmount();

  const handleBuyAllItems = () => {
    const orderPlaced = buyAllItems();
    if (orderPlaced) navigate('/orders');
  };

  useEffect(() => {
    const tempData = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          tempData.push({ _id: productId, size, quantity: cartItems[productId][size] });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find(p => p._id === item._id);
          if (!productData) return null;

          return (
            <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
              <div className='flex items-start gap-6'>
                <img className='w-16 sm:w-20' src={productData.image[0]} alt={productData.name} />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency}{productData.price}</p>
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                  </div>
                </div>
              </div>

              <input
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val > 0) updateQuantity(item._id, item.size, val);
                  if (val <= 0) updateQuantity(item._id, item.size, 0);
                }}
                className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                type="number"
                min={1}
                value={item.quantity}
              />

              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className='w-4 mr-4 sm:w-5 cursor-pointer'
                src={assets.bin_icon}
                alt="Remove"
              />
            </div>
          );
        })}
      </div>

      {/* Cart Total */}
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <div className='text-2xl'>
            <Title text1={'CART'} text2={'TOTALS'} />
          </div>
          <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
              <p>Subtotal</p>
              <p>{currency}{subtotal}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
              <p>Shipping Fee</p>
              <p>{currency}{delivery_fee}.00</p>
            </div>
            <hr />
            <div className='flex justify-between font-bold text-base'>
              <b>Total</b>
              <b>{currency}{subtotal === 0 ? 0 : subtotal + delivery_fee}.00</b>
            </div>
          </div>
          <div className='w-full text-end flex flex-col sm:flex-row justify-end gap-3 my-8'>
            <button
              onClick={handleBuyAllItems}
              disabled={cartCount === 0}
              className='bg-black text-white text-sm font-medium tracking-[0.12em] px-8 py-3 rounded-full shadow-sm hover:bg-gray-900 transition disabled:bg-gray-300 disabled:cursor-not-allowed'
            >
              BUY ALL ITEMS
            </button>
            <button
              onClick={() => navigate('/place-order')}
              disabled={cartCount === 0}
              className='border border-black text-black text-sm font-medium tracking-[0.12em] px-8 py-3 rounded-full hover:bg-black hover:text-white transition disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed'
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
