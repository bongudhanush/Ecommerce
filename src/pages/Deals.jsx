import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import NewsLetterBox from '../components/NewsLetterBox';
import { useNavigate } from 'react-router-dom';

function Deals() {
  const { products, currency } = useContext(ShopContext);
  const [popularProducts, setPopularProducts] = useState([]);
  const [dealProducts, setDealProducts] = useState([]);
  const [activeTag, setActiveTag] = useState('All Deals');
  const navigate = useNavigate();

  const tags = ['All Deals', 'Topwear', 'Bottomwear', 'Winterwear', 'New Arrivals'];

  useEffect(() => {
    if (products.length > 0) {
      setPopularProducts(products.filter(p => p.bestseller).slice(0, 5));
      setDealProducts(products.slice(0, 8));
    }
  }, [products]);

  const filteredDeals = activeTag === 'All Deals'
    ? dealProducts
    : dealProducts.filter(p => p.subCategory === activeTag || p.category === activeTag);

  return (
    <div className='border-t pt-10'>

      {/* Hero Banner */}
      <div className='relative rounded-2xl overflow-hidden mb-12 min-h-[340px] flex items-center'
        style={{ background: 'linear-gradient(120deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #533483 100%)' }}>

        <div className='absolute top-[-60px] right-[-60px] w-80 h-80 rounded-full blur-3xl opacity-20'
          style={{ background: 'radial-gradient(circle, #e94560, transparent)' }} />
        <div className='absolute bottom-[-40px] left-[30%] w-64 h-64 rounded-full blur-3xl opacity-15'
          style={{ background: 'radial-gradient(circle, #533483, transparent)' }} />

        <div className='relative z-10 flex flex-col sm:flex-row w-full items-center justify-between px-10 py-12 gap-8'>
          <div className='text-white flex flex-col gap-4'>
            <div className='flex items-center gap-3'>
              <span className='w-8 h-[2px] bg-pink-400'></span>
              <p className='text-xs tracking-[0.4em] text-pink-400 uppercase'>Limited Edition Drop</p>
            </div>
            <h1 className='text-5xl sm:text-6xl font-black leading-tight'>
              STYLE<br />
              <span style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>SEASON</span><br />
              <span className='text-pink-400'>SALE</span>
            </h1>
            <p className='text-white/60 text-sm max-w-xs'>
              Curated fashion. Unbeatable prices. Shop the looks everyone's talking about.
            </p>
            <div className='flex items-center gap-3 mt-2 flex-wrap'>
              {/* ✅ Working buttons */}
              <button
                onClick={() => navigate('/collection')}
                className='bg-white text-gray-900 font-bold px-7 py-3 rounded-full text-sm hover:bg-pink-100 transition shadow-lg'
              >
                SHOP NOW
              </button>
              <button
                onClick={() => {
                  document.getElementById('deals-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className='border border-white/40 text-white px-7 py-3 rounded-full text-sm hover:border-white transition'
              >
                View Lookbook ↓
              </button>
            </div>
          </div>

          {/* Countdown */}
          <div className='flex flex-col items-center gap-4'>
            <div className='bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-8 py-6 text-white text-center'>
              <p className='text-xs tracking-widest text-white/60 mb-3 uppercase'>Ends In</p>
              <div className='flex gap-3'>
                {[{ label: 'HRS', value: '12' }, { label: 'MIN', value: '45' }, { label: 'SEC', value: '30' }].map((t, i) => (
                  <div key={i} className='flex flex-col items-center'>
                    <span className='text-3xl font-black'>{t.value}</span>
                    <span className='text-[10px] text-white/50 tracking-widest'>{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className='bg-pink-500 text-white rounded-full px-6 py-2 text-sm font-bold shadow-lg shadow-pink-500/40'>
              UP TO 50% OFF 🔥
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tags */}
      <div className='flex gap-3 flex-wrap mb-10'>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-5 py-2 text-sm rounded-full transition-all duration-200 font-medium
              ${activeTag === tag
                ? 'bg-black text-white shadow'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Deals Grid */}
      <div className='mb-16' id='deals-grid'>
        <div className='text-2xl mb-6'>
          <Title text1={"TODAY'S"} text2={'DEALS'} />
        </div>
        {(filteredDeals.length === 0) ? (
          <div className='text-center py-16 text-gray-400'>
            <p className='text-lg'>No deals in this category yet.</p>
            <button
              onClick={() => setActiveTag('All Deals')}
              className='mt-4 border border-gray-400 px-6 py-2 text-sm hover:bg-black hover:text-white transition rounded-full'
            >
              Show All Deals
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6'>
            {filteredDeals.map((item) => (
              <div key={item._id} className='relative group'>
                <div className='absolute top-2 left-2 z-10 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full font-bold tracking-wide'>
                  SALE
                </div>
                <ProductItem id={item._id} name={item.name} image={item.image} price={item.price} />
                <div className='flex items-center gap-2 mt-1'>
                  <p className='text-xs font-semibold text-gray-800'>{currency}{item.price}</p>
                  <p className='text-xs text-gray-400 line-through'>{currency}{(item.price * 1.3).toFixed(0)}</p>
                  <p className='text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium'>23% OFF</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popular Products */}
      <div className='mb-16'>
        <div className='text-2xl mb-6'>
          <Title text1={'MOST'} text2={'POPULAR'} />
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {popularProducts.map((item) => (
            <div key={item._id} className='relative'>
              <div className='absolute top-2 left-2 z-10 bg-amber-400 text-black text-[10px] px-2 py-1 rounded-full font-bold'>
                ⭐ TOP
              </div>
              <ProductItem id={item._id} name={item.name} image={item.image} price={item.price} />
            </div>
          ))}
        </div>
      </div>

      {/* Promo Banners — ✅ all Shop Now buttons working */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16'>
        {[
          { bg: 'linear-gradient(135deg,#fce4ec,#f8bbd0)', tag: 'WOMEN', title: 'Effortless Elegance', desc: 'Feminine styles for every occasion', emoji: '👗', filter: 'Women' },
          { bg: 'linear-gradient(135deg,#e3f2fd,#bbdefb)', tag: 'MEN', title: 'Sharp & Modern', desc: 'Clean cuts, timeless confidence', emoji: '👔', filter: 'Men' },
          { bg: 'linear-gradient(135deg,#f3e5f5,#e1bee7)', tag: 'KIDS', title: 'Bright & Playful', desc: "Colours and comfort they'll love", emoji: '🎒', filter: 'Kids' },
        ].map((b, i) => (
          <div key={i} className='rounded-xl p-8 flex flex-col gap-2 hover:shadow-lg transition'
            style={{ background: b.bg }}>
            <p className='text-4xl'>{b.emoji}</p>
            <p className='text-xs tracking-widest text-gray-500 mt-1'>{b.tag}</p>
            <p className='text-xl font-semibold text-gray-800'>{b.title}</p>
            <p className='text-sm text-gray-500'>{b.desc}</p>
            {/* ✅ navigates to collection page */}
            <button
              onClick={() => navigate('/collection')}
              className='mt-3 text-sm font-semibold text-black underline underline-offset-2 self-start hover:opacity-60 transition'
            >
              Shop Now →
            </button>
          </div>
        ))}
      </div>

      <NewsLetterBox />
    </div>
  );
}

export default Deals;