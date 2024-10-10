import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/User';

import { axiosSignUp } from '../axios/index';

const SignUp = () => {
  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosSignUp(formData);

      setFormData({
        name: '',
        email: '',
        password: '',
      })
      navigate('/check-your-email')
    } catch (error) {
      console.error('Registration failed:');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg'
      >
        <h2 className='text-2xl font-bold'>Register</h2>
        <div className='space-y-2'>
          <label className='block text-sm font-medium'>Name</label>
          <input
            id='name'
            name='name'
            type='text'
            value={formData.name}
            onChange={handleChange}
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring'
            required
          />
        </div>
        <div className='space-y-2'>
          <label className='block text-sm font-medium'>Email</label>
          <input
            id='email'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring'
            required
          />
        </div>
        <div className='space-y-2'>
          <label className='block text-sm font-medium'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            value={formData.password}
            onChange={handleChange}
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring'
            required
          />
        </div>
        <button
          type='submit'
          className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600'
        >
          Register
        </button>
        <p className='text-center'>
          Already have an account?{' '}
          <a href='/signin' className='text-sm text-blue-500 hover:underline'>
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
