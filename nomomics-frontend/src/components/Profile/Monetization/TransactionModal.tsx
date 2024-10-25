import React from 'react';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-lg p-6 w-96'>
        {/* Modal Content */}
        <div className='space-y-4'>
          <div className='flex justify-between items-center'>
            <h2 className='text-[#984409] font-bold'>Transaction Date</h2>
            <span className='text-gray-800'>31 Aug 2024</span>
          </div>

          <div className='flex justify-between items-center'>
            <h2 className='text-[#984409] font-bold'>Transaction Amount</h2>
            <span className='text-gray-800'>₦1,500</span>
          </div>

          <div className='flex justify-between items-center'>
            <h2 className='text-[#984409] font-bold'>Transaction Amount</h2>
            <span className='text-gray-500 text-right'>
              One thousand, five hundred naira only
            </span>
          </div>

          <div className='flex justify-between items-center'>
            <h2 className='text-[#984409] font-bold'>Status</h2>
            <span className='text-gray-800'>Successful</span>
          </div>

          {/* Share Icons */}
          <div className='flex justify-center mt-4 space-x-4'>
            <button className='text-gray-600 hover:text-gray-900'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M8 17l4-4m0 0l4 4m-4-4v12M16 7l-4-4m0 0L8 7m4-4v12'
                />
              </svg>
            </button>
            <button className='text-gray-600 hover:text-gray-900'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M8 17l4-4m0 0l4 4m-4-4V7M16 7l-4 4m0 0l-4-4m4 4V7'
                />
              </svg>
            </button>
            <button className='text-gray-600 hover:text-gray-900'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M8 17l4-4m0 0l4 4m-4-4v12M16 7l-4-4m0 0L8 7m4-4v12'
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Close Button */}
        <div className='mt-6 flex justify-center'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-[#984409] text-white rounded-lg hover:bg-orange-500'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
