'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaFacebook,
  FaGoogle,
  FaApple,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import signupLogo from '@/public/svgs/signup-logo-1.svg';
import SignupSectionHeader from '../Headers/SignupSectionHeader';
import Button from '../Common/Button';
import toast, { Toaster } from 'react-hot-toast';
import { passwordStrength } from '@/libs/passwordValidator';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Error from '../Common/Error';
import styles from '@/styles/common.module.css';
import { useAuth } from '@/app/contexts/Auth';

const SignUpForm = (props: {
  setShowVerify: any;
  credentials: { email: string; password: string };
  setCredentials: any;
}) => {
  const { setShowVerify, credentials, setCredentials } = props;
  const isLoggedIn = Cookies.get('isLoggedIn');

  const { accountType, signupMethod } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/profile');
    }
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: true,
    specialOffers: true,
    isAdult: true,
  });

  const [togglePasswd, setTogglePasswd] = useState<boolean>(false);
  const [toggleConfirmPasswd, setToggleConfirmPasswd] =
    useState<boolean>(false);

  const [errMsg, setErrMsg] = useState<string>('');
  const [errMsg1, setErrMsg1] = useState<string>('');

  const handleChange = (e: any) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error('Please fill all fields!');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const checkPasswd = passwordStrength(formData.password);

    if (checkPasswd !== 'valid') {
      toast.error(checkPasswd);
      return;
    }

    if (!formData.termsAccepted) {
      toast.error('To use nomomics, please accept our terms and conditions!');
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        role: accountType,
        signupMethod,
      }),
    };

    try {
      toast.loading('Creating account...');
      const request = await fetch(url, options);
      const response = await request.json();
      console.log(response);

      toast.dismiss();

      if (response.error) {
        setErrMsg(response.error);
        setErrMsg1(response.additionalMessage);
        return;
      }

      if (response.success) {
        toast.success(
          'Account created successfully! Please check your email to verify your account'
        );
        setCredentials({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
        });
        setShowVerify(true);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.dismiss();

      console.log(error);
      toast.error('An error occurred, please try again.');
    }
  };

  return (
    <div className='flex justify-center h-[80%]  items-center '>
      <div className='bg-white  p-8 pt-16 rounded-[25px] shadow-lg w-[80%] max-md:w-full max-md:px-8 px-20 min-w-md '>
        <SignupSectionHeader
          title='Create your account'
          subTitle='Create your personal account now to access all educational benefits we have to offer you'
        />
        {errMsg && (
          <div
            className={`mb-2 ${
              errMsg ? styles['slide-in'] : styles['slide-out']
            }`}
          >
            {
              <Error
                message={errMsg}
                message1={errMsg1}
                type='login'
                w='full'
              />
            }
          </div>
        )}
        <form
          className='max-md:text-sm max-480:text-xs text-lg'
          onSubmit={handleSubmit}
        >
          <div className='mb-4'>
            <label className='block mb-2 font-bold'>Full Name</label>
            <input
              type='text'
              name='fullName'
              value={formData.fullName}
              onChange={handleChange}
              placeholder='Enter your full name'
              className='w-full p-3 border border-gray-300 rounded-lg mb-4 focus-within:outline-primary transition-all  duration-500 delay-0 ease-in-out'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2 font-bold'>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email'
              className='w-full p-3 border border-gray-300 rounded-lg mb-4 focus-within:outline-primary transition-all  duration-500 delay-0 ease-in-out'
              required
            />
          </div>
          <div className='mb-4 relative'>
            <label className='block mb-2 font-bold'>Password</label>
            <input
              type={togglePasswd ? 'text' : 'password'}
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter your password'
              className='w-full p-3 border border-gray-300 rounded-lg mb-4 focus-within:outline-primary transition-all  duration-500 delay-0 ease-in-out'
              required
            />
            <span
              onClick={() => {
                setTogglePasswd((prev) => !prev);
              }}
              className='absolute right-4 top-14 text-zinc-500 cursor-pointer'
            >
              {togglePasswd ? <FaEye size={24} /> : <FaEyeSlash size={24} />}
            </span>

            <p className=' max-md:text-xs text-sm text-zinc-400 font-extralight'>
              At least 8 characters; lower and uppercase letters, numbers and
              symbols
            </p>
          </div>
          <div className='mb-4 relative'>
            <label className='block mb-2 font-bold'>Confirm Password</label>
            <input
              type={toggleConfirmPasswd ? 'text' : 'password'}
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder='Confirm your password'
              className='w-full p-3 border border-gray-300 rounded-lg mb-4 focus-within:outline-primary transition-all  duration-500 delay-0 ease-in-out'
              required
            />
            <span
              onClick={() => {
                setToggleConfirmPasswd((prev) => !prev);
              }}
              className='absolute right-4 top-14 text-zinc-500 cursor-pointer'
            >
              {toggleConfirmPasswd ? (
                <FaEye size={24} />
              ) : (
                <FaEyeSlash size={24} />
              )}
            </span>
          </div>

          <div className='mb-4'>
            <label className='flex items-center'>
              <input
                type='checkbox'
                name='termsAccepted'
                checked={formData.termsAccepted}
                onChange={handleChange}
                className='mr-2 w-4 h-4'
                required
              />
              I agree to Nomomics Terms of Service and Privacy Policy
            </label>
          </div>
          <div className='mb-4'>
            <label className='flex items-center'>
              <input
                type='checkbox'
                name='specialOffers'
                checked={formData.specialOffers}
                onChange={handleChange}
                className='mr-2 w-4 h-4'
              />
              Send me special offers, learning tips, and personalized
              recommendations
            </label>
          </div>
          <div className='mb-10'>
            <label className='flex items-center'>
              <input
                type='checkbox'
                name='isAdult'
                checked={formData.isAdult}
                onChange={handleChange}
                className='mr-2 w-4 h-4'
                required
              />
              Are you above 18?
            </label>
          </div>
          <Button
            text='Sign Up'
            className='mb-4'
            onClickFunc={() => console.log('You clicked me')}
          />
        </form>
        <div className='mt-6 text-center text-zinc-600'>
          <p className='mb-2'>Sign up with</p>
          <div className='flex justify-center space-x-8'>
            <FaFacebook className='text-2xl max-md:text-lg text-blue-600 cursor-pointer hover:text-blue-800' />
            <FaGoogle className='text-2xl max-md:text-lg text-red-500 cursor-pointer hover:text-red-700' />
            <FaApple className='text-2xl max-md:text-lg text-gray-800 cursor-pointer hover:text-black' />
          </div>
        </div>
        <p className='mt-6 text-center'>
          Do you have an account?{' '}
          <Link href='/signin' className=' hover:text-primary font-bold '>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
