import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
  return (
    <>
      <NavLink to='/' className='text-gray-700 hover:text-blue-500'>
        Home
      </NavLink>
      <NavLink to='/user' className='text-gray-700 hover:text-blue-500'>
        User List
      </NavLink>
      <NavLink to='/facilityunit' className='text-gray-700 hover:text-blue-500'>
        Facility Unit
      </NavLink>
      <NavLink to='/facility' className='text-gray-700 hover:text-blue-500'>
        Facility Details
      </NavLink>
      <NavLink to='/openinghour' className='text-gray-700 hover:text-blue-500'>
        Opening Hours
      </NavLink>
    </>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='flex'>
      <div className='hidden md:flex space-x-8'>
        <NavLinks />
      </div>
      <div className='md:hidden'>
        <button onClick={toggleNavBar}>
          {isOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
        </button>
      </div>
      {isOpen && (
        <div className='absolute top-16 left-0 w-full bg-white md:hidden'>
          <div className='flex flex-col items-center space-y-4 py-4'>
            <NavLinks />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
