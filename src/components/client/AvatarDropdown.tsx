import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, UserCircle, LogOut, Calendar } from 'lucide-react';
import OwnScheduleModal from './modal/OwnScheduleModal';

interface AvatarDropdownProps {
  userCTX: { name: string; role:string };
  handleLogout: () => void;
}

const AvatarDropdown = ({ userCTX, handleLogout }:AvatarDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // useRef is used to have drop-down menu outside click functionality

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleOwnScheduleClick = () => {
    setIsModalOpen(true); // Open the modal
    setIsOpen(false); // Close the dropdown
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
    <div className='relative' ref={dropdownRef}>
      <button onClick={toggleDropdown} className='flex items-center space-x-2 '>
        <UserCircle className='h-8 w-8 text-gray-600' />
        <ChevronDown className='h-4 w-4 text-gray-600 ' />
      </button>
      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 rounded-lg bg-white z-10 shadow-lg'>
          <div className='py-2'>
            <div className='px-4 py-2 text-gray-800'>{userCTX.name}</div>
            <hr />
            <button
               onClick={handleOwnScheduleClick}
              className='flex w-full items-center px-4 py-2 text-gray-800 hover:bg-gray-100'
            >
              <Calendar className='mr-2 h-4 w-4' /> Own Schedule
            </button>
            <button
              onClick={handleLogout}
              className='flex w-full items-center px-4 py-2 text-gray-800 hover:bg-gray-100'
            >
              <LogOut className='mr-2 h-4 w-4' /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
    <OwnScheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default AvatarDropdown;
