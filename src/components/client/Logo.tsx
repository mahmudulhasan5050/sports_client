import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.webp'


export const Logo = () => {
  const navigate = useNavigate();

  return (
    <div className='logo h-16 w-16 cursor-pointer' onClick={() => navigate('/')}>
      <img src={logo} alt='logo' />
    </div>
  );
};

export default Logo;
