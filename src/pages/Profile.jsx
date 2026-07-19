import React, { useState } from 'react';
import Title from '../components/Title';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    gender: '',
    dob: '',
  });

  const isProfileComplete = Object.values(profile).some(val => val !== '');

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const Field = ({ label, name, type = 'text', children }) => (
    <div>
      <label className='text-sm text-gray-500 mb-1 block'>{label}</label>
      {isEditing
        ? children || (
          <input
            name={name}
            type={type}
            value={profile[name]}
            onChange={handleChange}
            className='border border-gray-300 rounded px-3 py-2 w-full text-sm focus:outline-none focus:border-black'
          />
        )
        : <p className='border border-gray-100 bg-gray-50 rounded px-3 py-2 text-sm text-gray-400'>
            {profile[name] || '—'}
          </p>
      }
    </div>
  );

  return (
    <div className='border-t pt-14 min-h-[80vh]'>
      <div className='text-2xl mb-6'>
        <Title text1={'MY'} text2={'PROFILE'} />
      </div>

      <div className='flex flex-col md:flex-row gap-10'>

        {/* Avatar Section */}
        <div className='flex flex-col items-center gap-4 md:w-1/4'>
          <div className='w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200'>
            <svg className='w-20 h-20 text-gray-300' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z'/>
            </svg>
          </div>

          {/* Name or placeholder */}
          <p className='text-lg font-semibold text-gray-800'>
            {profile.firstName || profile.lastName
              ? `${profile.firstName} ${profile.lastName}`.trim()
              : <span className='text-gray-400 font-normal text-sm'>No name added</span>
            }
          </p>

          {/* Email or placeholder */}
          <p className='text-sm text-gray-400'>
            {profile.email || 'No email added'}
          </p>

          {/* Complete profile banner if empty */}
          {!isProfileComplete && !isEditing && (
            <div className='bg-yellow-50 border border-yellow-200 rounded px-4 py-3 text-center'>
              <p className='text-xs text-yellow-700 font-medium'>Your profile is empty</p>
              <p className='text-xs text-yellow-600 mt-1'>Click Edit Profile to fill in your details</p>
            </div>
          )}

          <button
            onClick={() => setIsEditing(!isEditing)}
            className='mt-2 border border-black px-6 py-2 text-sm hover:bg-black hover:text-white transition-all duration-300'
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {/* Info Section */}
        <div className='flex-1'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

            <Field label='First Name' name='firstName' />
            <Field label='Last Name' name='lastName' />
            <Field label='Email' name='email' type='email' />
            <Field label='Phone' name='phone' />
            <Field label='Date of Birth' name='dob' type='date' />

            <Field label='Gender' name='gender'>
              {isEditing && (
                <select
                  name='gender'
                  value={profile.gender}
                  onChange={handleChange}
                  className='border border-gray-300 rounded px-3 py-2 w-full text-sm focus:outline-none focus:border-black'
                >
                  <option value=''>Select gender</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Other'>Other</option>
                </select>
              )}
            </Field>

            <div className='sm:col-span-2'>
              <Field label='Street Address' name='address' />
            </div>

            <Field label='City' name='city' />
            <Field label='State' name='state' />
            <Field label='Zipcode' name='zipcode' />
            <Field label='Country' name='country' />

          </div>

          {/* Save Button */}
          {isEditing && (
            <button
              onClick={() => setIsEditing(false)}
              className='mt-6 bg-black text-white px-10 py-3 text-sm hover:bg-gray-800 transition'
            >
              SAVE CHANGES
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;