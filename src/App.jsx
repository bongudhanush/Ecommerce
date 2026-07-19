import ShopContextProvider from './context/ShopContext';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Collection from "./pages/Collection";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Deals from "./pages/Deals";         // ✅ NEW
import Wishlist from "./pages/Wishlist";   // ✅ NEW
import Footer from "./components/Footer";
import SearchBar from './components/SearchBar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ShopContextProvider>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer />
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/deals" element={<Deals />} />       {/* ✅ NEW */}
          <Route path="/wishlist" element={<Wishlist />} /> {/* ✅ NEW */}
          {/* ✅ Contact route removed */}
        </Routes>
        <Footer />
      </div>
    </ShopContextProvider>
  );
}

export default App;