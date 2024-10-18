'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
    FaFacebook,
    FaGoogle,
    FaApple,
    FaEyeSlash,
    FaEye,
} from 'react-icons/fa';
import SignupSectionHeader from '../Headers/SignupSectionHeader';
import Button from '../Common/Button';
import Error from '../Common/Error';
import styles from '@/styles/common.module.css';

const SignInForm = () => {
    const [formData, setFormData] = useState<{
        email: string;
        password: string;
        rememberMe: boolean;
    }>({
        email: '',
        password: '',
        rememberMe: true,
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleChange = (e: any) => {
        const { name, value, checked, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <div className='flex justify-center h-[80%]  items-center '>
            <div className='bg-white  p-8 pt-16 rounded-[25px] shadow-lg w-[80%] px-16 min-w-md max-md:w-full max-md:px-8 '>
                <SignupSectionHeader
                    title='Welcome back!'
                    subTitle='Log in to your account'
                />
                <div className=' mt-6'>
                    <div
                        className={`${
                            formData.email
                                ? styles['slide-in']
                                : styles['slide-out']
                        }`}
                    >
                        {
                            <Error
                                message={`Incorrect email or password.`}
                                message1='3 login attempts before your account is blocked.'
                                type='login'
                                w='full'
                            />
                        }
                    </div>
                    <form className=' pt-10 text-lg' onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label className='block mb-2 font-bold'>
                                Email
                            </label>
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
                            <label className='block mb-2 font-bold'>
                                Password
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                                className='w-full p-3 border border-gray-300 rounded-lg mb-4 focus-within:outline-primary transition-all  duration-500 delay-0 ease-in-out'
                                required
                            />
                            <span
                                onClick={handleTogglePassword}
                                className='absolute right-4 top-14 text-zinc-500 cursor-pointer'
                            >
                                {showPassword ? (
                                    <FaEye size={24} />
                                ) : (
                                    <FaEyeSlash size={24} />
                                )}
                            </span>
                        </div>
                        <div className='mb-10 flex w-full justify-between'>
                            <label className='flex items-center text-lg text-zinc-950'>
                                <input
                                    type='checkbox'
                                    name='rememberMe'
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className='mr-2 w-6 h-6 border  rounded-full'
                                    required
                                />
                                Remember Me
                            </label>
                            <span className=' text-zinc-500 text-[14px]'>
                                Forgot password?
                            </span>
                        </div>
                        <Button className='w-full' text='Sign in' />
                    </form>
                </div>

                <div className='mt-6 text-center text-zinc-600'>
                    <p className='mb-2'>Sign in with</p>
                    <div className='flex justify-center space-x-8'>
                        <FaFacebook className='text-2xl text-blue-600 cursor-pointer hover:text-blue-800' />
                        <FaGoogle className='text-2xl text-red-500 cursor-pointer hover:text-red-700' />
                        <FaApple className='text-2xl text-gray-800 cursor-pointer hover:text-black' />
                    </div>
                </div>
                <p className='mt-6 text-center'>
                    Don&apos;t have an account?{' '}
                    <Link
                        href='/login'
                        className=' hover:text-primary font-bold '
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignInForm;
