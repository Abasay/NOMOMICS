// components/BillingForm.tsx
import React, { useState } from 'react';
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa'; // Icons for card types
import { HiOutlinePhone } from 'react-icons/hi'; // Phone icon

const BillingForm: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className=' mx-auto overflow-auto px-3 bg-white py-10'>
      {/* Header */}
      <h2 className='text-lg font-semibold mb-4'>Enjoy unlimited comics</h2>

      {/* Billing Name */}
      <div className='mb-4'>
        <label htmlFor='name' className='block text-gray-700 mb-2'>
          Billed to
        </label>
        <input
          type='text'
          id='name'
          value='Adeoye Paul'
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          readOnly
        />
      </div>

      {/* Payment Methods */}
      <div className='mb-6'>
        <label className='block text-gray-700 mb-2'>Payment Method</label>
        <div className='flex items-center flex-wrap gap-2 space-x-4'>
          <label className='flex items-center'>
            <input
              type='radio'
              name='payment'
              value='card'
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
              className='mr-2'
            />
            Card
          </label>
          <label className='flex items-center'>
            <input
              type='radio'
              name='payment'
              value='bitcoin'
              onChange={() => setPaymentMethod('bitcoin')}
              className='mr-2'
            />
            Bitcoin
          </label>
          <label className='flex items-center'>
            <input
              type='radio'
              name='payment'
              value='paystack'
              onChange={() => setPaymentMethod('paystack')}
              className='mr-2'
            />
            Paystack
          </label>
          <label className='flex items-center'>
            <input
              type='radio'
              name='payment'
              value='paypal'
              onChange={() => setPaymentMethod('paypal')}
              className='mr-2'
            />
            Paypal
          </label>
          <label className='flex items-center'>
            <input
              type='radio'
              name='payment'
              value='phone'
              onChange={() => setPaymentMethod('phone')}
              className='mr-2'
            />
            <HiOutlinePhone className='text-xl' /> {/* Phone icon */}
          </label>
        </div>
      </div>

      {/* Card Details */}
      {paymentMethod === 'card' && (
        <>
          <div className='mb-4'>
            <label htmlFor='cardNumber' className='block text-gray-700 mb-2'>
              Card Number
            </label>
            <input
              type='text'
              id='cardNumber'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='1234 5678 9012 3456'
            />
            {/* Payment Logos */}
            <div className='flex space-x-2 mt-2 text-xl'>
              <FaCcVisa className='text-blue-500' />
              <FaCcMastercard className='text-red-500' />
              <FaCcPaypal className='text-purple-500' />
            </div>
          </div>

          {/* Expiration Date & CVV */}
          <div className='flex space-x-4 mb-4'>
            <div className='w-1/2'>
              <label htmlFor='expiry' className='block text-gray-700 mb-2'>
                MM / YY
              </label>
              <input
                type='text'
                id='expiry'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='MM / YY'
              />
            </div>
            <div className='w-1/2'>
              <label htmlFor='cvv' className='block text-gray-700 mb-2'>
                CVV
              </label>
              <input
                type='text'
                id='cvv'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='CVV'
              />
            </div>
          </div>
        </>
      )}

      {/* Country & Zip Code */}
      <div className='mb-4'>
        <label htmlFor='country' className='block text-gray-700 mb-2'>
          Country
        </label>
        <div className='flex items-center space-x-2 border border-gray-300 rounded-lg px-4 py-2'>
          <span className='mr-2'>United States</span>
          <img
            src='/images/us-flag.png' // Assume you have a US flag icon
            alt='US Flag'
            className='w-6 h-4'
          />
        </div>
      </div>
      <div className='mb-6'>
        <input
          type='text'
          id='zip'
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Zip Code'
        />
      </div>

      {/* Footer Text */}
      <p className='text-gray-500 mb-4'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>

      {/* Details Button */}
      <button className='text-blue-600 font-semibold'>Details</button>
    </div>
  );
};

export default BillingForm;
