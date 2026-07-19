import { createContext, useState } from 'react';
import { products } from '../assets/frontend_assets/assets';
import { toast } from 'react-toastify';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 15;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);   // ✅ NEW

  const addToCart = (itemId, size) => {
    if (!size) { toast.error('Please select a product size'); return; }
    setCartItems((prev) => {
      const cartData = structuredClone(prev);
      if (cartData[itemId]) {
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
      } else {
        cartData[itemId] = { [size]: 1 };
      }
      return cartData;
    });
    toast.success('Item added to cart!');
  };

  const updateQuantity = (itemId, size, quantity) => {
    setCartItems((prev) => {
      const cartData = structuredClone(prev);
      if (quantity === 0) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
      } else {
        cartData[itemId][size] = quantity;
      }
      return cartData;
    });
  };

  const getCartCount = () => {
    let total = 0;
    for (const id in cartItems)
      for (const size in cartItems[id])
        total += cartItems[id][size];
    return total;
  };

  const getCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const product = products.find(p => p._id === id);
      if (!product) continue;
      for (const size in cartItems[id])
        total += product.price * cartItems[id][size];
    }
    return total;
  };

  const placeOrder = () => {
    const orderItems = [];
    for (const productId in cartItems) {
      const product = products.find(p => p._id === productId);
      if (!product) continue;
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          orderItems.push({
            ...product, size,
            quantity: cartItems[productId][size],
            date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
            status: 'Ready to ship',
          });
        }
      }
    }
    setOrders(prev => [...prev, ...orderItems]);
    setCartItems({});
    toast.success('Order placed successfully!');
  };

  // ✅ NEW wishlist functions
  const addToWishlist = (itemId) => {
    if (wishlist.includes(itemId)) {
      toast.info('Already in wishlist!');
      return;
    }
    setWishlist(prev => [...prev, itemId]);
    toast.success('Added to wishlist! 🤍');
  };

  const removeFromWishlist = (itemId) => {
    setWishlist(prev => prev.filter(id => id !== itemId));
    toast.success('Removed from wishlist');
  };

  const getWishlistCount = () => wishlist.length;

  const value = {
    products, currency, delivery_fee,
    search, setSearch, showSearch, setShowSearch,
    cartItems, addToCart, updateQuantity, getCartCount, getCartAmount,
    orders, placeOrder,
    wishlist, addToWishlist, removeFromWishlist, getWishlistCount, // ✅ NEW
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;