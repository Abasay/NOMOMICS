import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white w-full max-w-md p-6 rounded shadow-lg relative'>
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-600 hover:text-gray-800'
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;