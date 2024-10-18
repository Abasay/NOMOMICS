'use client'
import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SignupSectionHeader from '../Headers/SignupSectionHeader';
import { passwordValidator } from '@/libs/passwordValidator';
import styles from '@/styles/common.module.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<string>('Very Weak');
  const [strong, setStrong] = useState<number>(0);
  const [weak, setWeak] = useState<number>(100);

  // Function to handle password strength
  const getPasswordStrength = (password: string) => {
    const passwordValidate = passwordValidator(password);
    setStrong(passwordValidate);
    setWeak(100 - passwordValidate);
    if (passwordValidate === 0) return 'Very Weak';
    if (passwordValidate === 20) return 'Very Weak';
    if (passwordValidate === 40) return 'Weak';
    if (passwordValidate === 60) return 'Good';
    if (passwordValidate === 80) return 'Strong';
    if (passwordValidate === 100) return 'Very Strong';
  };

  // Update password strength when the new password changes
  useEffect(() => {
    if (newPassword){
          setPasswordStrength(getPasswordStrength(newPassword) as string);
          setStrong(passwordValidator(newPassword));
          setWeak(100 - passwordValidator(newPassword));
    } else {
      setStrong(0)
      setWeak(100)
    }

  }, [newPassword]);

  return (
    <div className="flex justify-center h-[80%]  items-center ">
      <div className="bg-white  p-8 pt-16 rounded-[25px] shadow-lg w-[80%] px-16 min-w-md max-md:w-full max-md:px-8 ">
        <SignupSectionHeader title='Reset your password' subTitle='Please enter the new password for your account'/>

        {/* New Password Input */}
        <div className="mb-4 w-full ">
          <label htmlFor="new-password" className="block font-semibold mb-1">
            New password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus-within:outline-primary transition-all  duration-300 delay-0 ease-in-out"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-2 top-4 text-gray-600"
            >
              {showNewPassword ? (
                <FaEye className="w-5 h-5" />
              ) : (
                <FaEyeSlash className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className='flex items-center flex-col gap-2 w-full'>
            <div className='flex gap-0 w-full'>
              <div
                className={`border-primary ${strong > 0 && 'border-[3px]'}`}
                style={{ width: `${strong}%`, borderColor: strong > 0 ? '#FBA700' : 'transparent' }}
              ></div>
              <div
                className={`border-zinc-500 ${weak > 0 && 'border-[3px]'}`}
                style={{ width: `${weak}%`, borderColor: weak > 0 ? '#8f8fb4' : 'transparent' }}
              ></div>
            </div>
            <div className="mt-1 text-sm flex items-center w-full justify-between">
              <p className=' text-primary'>Password strength: </p>
              <p className={`${strong < 60 && 'text-red-500'} ${strong >= 60  && strong < 80 &&'text-primary'} ${strong > 80 && 'text-green-500'}`}>{passwordStrength}</p>
            </div>
          </div>
        </div>

        {/* Confirm Password Input */}
        <div className="mb-6 w-full  relative">
          <label htmlFor="confirm-password" className="block font-semibold mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-3 border ${
                confirmPassword && newPassword !== confirmPassword
                  ? 'border-red-500'
                  : 'border-gray-300'
              } w-full p-3 border border-gray-300 rounded-lg mb-4 focus-within:outline-primary transition-all  duration-300 delay-0 ease-in-out`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-4 text-gray-600"
            >
              {showConfirmPassword ? (
                <FaEye className="w-5 h-5" />
              ) : (
                <FaEyeSlash className="w-5 h-5" />
              )}
            </button>
          </div>
          {confirmPassword && newPassword !== confirmPassword && (
            <p className={`text-red-500 text-sm absolute -bottom-2 transition-all duration-700 delay-150 ease-in-out `}>Both passwords must match</p>
          )}
        </div>

        {/* Reset Password Button */}
        <button
          type="button"
          className="w-full max-w-md py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300"
        >
          Reset my password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
