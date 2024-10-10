import React from 'react';

const CheckYourEmail = () => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg'>
        <h2 className='text-2xl font-bold'>Check Your Email</h2>
        <p className='text-gray-600'>
          We've sent a confirmation link to your email. Please check your inbox and confirm your email address.
        </p>
        <button
          onClick={() => window.location.reload()}
          className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600'
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default CheckYourEmail;
