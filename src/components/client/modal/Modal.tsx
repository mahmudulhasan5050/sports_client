import React from 'react';
import { RxCross2 } from "react-icons/rx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }:ModalProps) => {
  if (!isOpen) return null;

  return (
    <div>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="relative bg-white rounded-lg shadow-lg p-4 w-full max-w-lg md:max-w-xl lg:max-w-2xl md:w-3/4 lg:w-2/3 xl:w-1/2">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <RxCross2 size={40} color='red'/>
        </button>
        {children}
      </div>
    </div>
    </div>
  );
};

export default Modal;
