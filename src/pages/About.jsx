import React from 'react';
import Title from '../components/Title';
import NewsLetterBox from '../components/NewsLetterBox';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();

  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* Story Section */}
      <div className='my-10 flex flex-col md:flex-row gap-16 items-center'>

        {/* ✅ Real Unsplash fashion photo */}
        <div className='w-full md:max-w-[460px] rounded-2xl overflow-hidden shadow-md'>
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
            alt="Fashion flat lay"
            className='w-full h-full object-cover'
            onError={(e) => {
              // fallback if image fails
              e.target.src = "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80";
            }}
          />
        </div>

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p className='text-3xl font-semibold text-gray-800'>We are <span className='text-gray-900 italic'>Forever.</span></p>
          <p>Founded with a passion for style and a commitment to quality, Forever was created to bring premium fashion to everyone — without the premium price tag. We believe great clothing should be accessible, sustainable, and expressive.</p>
          <p>From our carefully curated collections to our seamless shopping experience, every detail is designed with you in mind. We source from trusted suppliers across the globe to bring you the latest trends season after season.</p>
          <b className='text-gray-800 text-lg'>Our Mission</b>
          <p>To empower every individual to express themselves through fashion — with confidence, comfort, and conscience. We're not just selling clothes. We're building a community.</p>

          {/* ✅ Working buttons */}
          <div className='flex gap-4 mt-2'>
            <button
              onClick={() => navigate('/collection')}
              className='bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 transition'
            >
              SHOP NOW
            </button>
            <button
              onClick={() => navigate('/deals')}
              className='border border-black text-black px-8 py-3 text-sm hover:bg-black hover:text-white transition'
            >
              VIEW DEALS
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className='py-16 px-4 my-10 rounded-2xl bg-gray-50 border border-gray-100'>
        <div className='text-center mb-10'>
          <Title text1={'BY THE'} text2={'NUMBERS'} />
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 text-center'>
          {[
            { number: '50K+', label: 'Happy Customers', emoji: '😊' },
            { number: '2000+', label: 'Products Listed', emoji: '👚' },
            { number: '120+', label: 'Brands Partnered', emoji: '🤝' },
            { number: '98%', label: 'Satisfaction Rate', emoji: '⭐' },
          ].map((stat, i) => (
            <div key={i} className='flex flex-col items-center gap-2 bg-white rounded-xl py-6 px-4 shadow-sm'>
              <p className='text-3xl'>{stat.emoji}</p>
              <p className='text-4xl font-bold text-gray-800'>{stat.number}</p>
              <p className='text-sm text-gray-500'>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className='my-10'>
        <div className='text-center mb-8'>
          <Title text1={'MEET THE'} text2={'TEAM'} />
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 text-center'>
          {[
            {
              name: 'Sarah Johnson',
              role: 'Founder & CEO',
              img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
            },
            {
              name: 'James Carter',
              role: 'Head of Design',
              img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
            },
            {
              name: 'Priya Sharma',
              role: 'Marketing Lead',
              img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
            },
            {
              name: 'Leo Zhang',
              role: 'Tech Lead',
              img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
            },
          ].map((member, i) => (
            <div key={i} className='flex flex-col items-center gap-3'>
              <img
                src={member.img}
                alt={member.name}
                className='w-24 h-24 rounded-full object-cover border-2 border-gray-200 shadow'
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${member.name}&background=f3f4f6&color=374151&size=96`;
                }}
              />
              <div>
                <p className='font-semibold text-gray-800 text-sm'>{member.name}</p>
                <p className='text-xs text-gray-500'>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className='my-10'>
        <div className='text-center mb-8'>
          <Title text1={'WHY CHOOSE'} text2={'FOREVER'} />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm'>
          {[
            { icon: '🎯', title: 'Quality First', desc: 'Every product is hand-picked and quality checked before it reaches you.' },
            { icon: '🚚', title: 'Fast Delivery', desc: 'We deliver to your doorstep within 3–5 business days, guaranteed.' },
            { icon: '🔄', title: 'Easy Returns', desc: 'Not satisfied? Return within 7 days — no questions asked.' },
            { icon: '💬', title: '24/7 Support', desc: 'Our team is always here to help you, any time of day.' },
            { icon: '🌱', title: 'Sustainable', desc: 'We work with eco-conscious suppliers to reduce our carbon footprint.' },
            { icon: '💳', title: 'Secure Payments', desc: 'All transactions are encrypted and 100% safe.' },
          ].map((item, i) => (
            <div key={i} className='border rounded-xl p-6 flex flex-col gap-3 hover:shadow-md hover:border-gray-300 transition cursor-pointer'>
              <p className='text-3xl'>{item.icon}</p>
              <p className='font-semibold text-gray-800'>{item.title}</p>
              <p className='text-gray-500'>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Working CTA banner */}
      <div className='my-16 rounded-2xl overflow-hidden relative'
        style={{ background: 'linear-gradient(120deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
        <div className='absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full blur-3xl opacity-10'
          style={{ background: 'radial-gradient(circle, #e94560, transparent)' }} />
        <div className='relative z-10 px-10 py-14 text-center text-white flex flex-col items-center gap-4'>
          <p className='text-xs tracking-[0.4em] text-gray-400 uppercase'>Join the Family</p>
          <h2 className='text-3xl sm:text-4xl font-bold'>Ready to upgrade your wardrobe?</h2>
          <p className='text-gray-400 text-sm max-w-md'>Discover thousands of styles curated just for you. New arrivals every week.</p>
          <div className='flex gap-4 mt-2 flex-wrap justify-center'>
            <button
              onClick={() => navigate('/collection')}
              className='bg-white text-gray-900 font-semibold px-8 py-3 rounded-full text-sm hover:bg-gray-100 transition shadow'
            >
              Browse Collection
            </button>
            <button
              onClick={() => navigate('/deals')}
              className='border border-white/40 text-white px-8 py-3 rounded-full text-sm hover:border-white transition'
            >
              See Today's Deals
            </button>
          </div>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
}

export default About;