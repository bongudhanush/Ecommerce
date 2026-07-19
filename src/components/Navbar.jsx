import React, { useState, useContext } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

function Navbar() {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, getWishlistCount } = useContext(ShopContext);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/collection', label: 'COLLECTION' },
    { to: '/deals', label: 'DEALS 🔥' },
    { to: '/about', label: 'ABOUT' },
  ];

  return (
    <div className="flex items-center justify-between py-5 font-medium">

      <Link to='/'><img src={assets.logo} className='w-36' alt="" /></Link>

      {/* ✅ Nav links with proper active underline */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-colors duration-200 ${isActive ? 'text-black font-semibold' : 'text-gray-600 hover:text-black'}`
            }
          >
            {({ isActive }) => (
              <>
                <p>{label}</p>
                {/* ✅ underline only when active */}
                <span className={`w-full h-[2px] bg-black rounded transition-all duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
              </>
            )}
          </NavLink>
        ))}
      </ul>

      <div className='flex items-center gap-5'>

        {/* Search */}
        <img
          onClick={() => { setShowSearch(true); navigate('/collection'); }}
          src={assets.search_icon}
          className='w-5 cursor-pointer hover:opacity-70 transition'
          alt=""
        />

<Link to="/wishlist" className="relative">
  {/* ❤️ Heart Icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 cursor-pointer"
    viewBox="0 0 24 24"
    fill="none"
    stroke="black"
    strokeWidth="2"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>

  {/* 🔴 Number on top-right */}
  <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] px-1 rounded-full leading-tight">
    {getWishlistCount()}
  </span>
</Link>
        {/* Profile Dropdown */}
        <div className="group relative">
          <img className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
          <div className='hidden group-hover:block absolute right-0 pt-4 z-50'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-white border text-gray-500 rounded shadow-lg'>
              <p onClick={() => navigate('/profile')} className="cursor-pointer hover:text-black transition">My Profile</p>
              <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black transition">Orders</p>
              <hr />
              <p onClick={() => navigate('/login')} className="cursor-pointer hover:text-red-500 transition">Logout</p>
            </div>
          </div>
        </div>

        {/* Cart */}
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile hamburger */}
        <img onClick={() => setVisible(true)} src={assets.menu_icon}
          className='w-5 cursor-pointer sm:hidden' alt="" />
      </div>

      {/* Mobile Sidebar */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-50 ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} onClick={() => setVisible(false)}
              className={({ isActive }) => `py-2 pl-6 border ${isActive ? 'font-semibold text-black' : ''}`}
              to={to} end={to === '/'}>
              {label}
            </NavLink>
          ))}
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/wishlist'>WISHLIST 🤍</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;