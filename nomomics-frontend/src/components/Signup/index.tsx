import Image from 'next/image';
import React from 'react';
import SignUpLogo from '@/public/svgs/signup-logo-1.svg';
import styles from '@/styles/auth.module.css';
import SignUpForm from './Form';
import EmailVerify from './EmailVerify';
import SignInForm from '../SignIn/Form';

const SignUp = () => {
    return (
        <div className={styles.background}>
            <div className='flex justify-between py-14 px-2 pl-24 max-md:pl-2 items-center h-auto font-inter'>
                <div
                    className={`w-[50%] max-md:w-0 max-md:${styles['fade-out']} ${styles['fade-in']}`}
                >
                    {/* <SignUpLogo className='w-full text-white h-[300px]'/> */}
                    <Image
                        src={SignUpLogo}
                        alt='SignUp Logo'
                        width={300}
                        height={200}
                        className=' w-full h-[250px]'
                    />
                </div>
                <div
                    className={`  ${
                        true ? styles['fade-in'] : styles['fade-out']
                    } w-full`}
                >
                    <SignUpForm />
                    {/* <EmailVerify/> */}
                </div>
            </div>
        </div>
    );
};

export default SignUp;
