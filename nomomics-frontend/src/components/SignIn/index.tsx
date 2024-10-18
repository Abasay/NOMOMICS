'use client';
import React from 'react';
import styles from '@/styles/auth.module.css';
import Image from 'next/image';
import SignInForm from './Form';
import SignUpLogo from '@/public/svgs/signup-logo-1.svg';
import ForgotPassword from './ForgotPassword';
import EmailSent from './EmailSent';
import ResetPassword from '../Recovery/NewPassword';
import Info from '../Common/Info';
import Button from '../Common/Button';

const SignIn = () => {
    const [state, setState] = React.useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = React.useState(true); // Control modal visibility
    return (
        <div className={`${styles.background} relative font-inter`}>
            <div className='flex justify-between py-14 px-2 pl-24 max-md:pl-2 items-center h-auto '>
                <div
                    onClick={() => setState((prev) => !prev)}
                    className={`w-[50%] max-md:w-0 max-md:${styles['fade-out']} ${styles['fade-in']}`}
                >
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
                        state ? styles['fade-in'] : styles['fade-out']
                    } w-full`}
                >
                    {/* {state ? <SignInForm/> : <ForgotPassword/>} */}
                    {/* <EmailSent/> */}
                    {/* <ResetPassword/> */}
                    <SignInForm />
                </div>
            </div>
            {/* Modal */}
            {isModalVisible && (
                <div
                    className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
                        isModalVisible ? styles['fade-in'] : styles['fade-out']
                    }`}
                >
                    <div className='bg-white p-8 rounded-lg shadow-lg w-[80%] md:w-[60%]'>
                        <Info
                            title='Account Locked'
                            description={`<span>This account has been blocked for <b>20 minutes</b> because of too many login attempts.
              Please try again later or contact us.</span>`}
                        />
                        <div className=' w-full mx-auto'>
                            <Button
                                className=' py-4 mt-4'
                                text='Close'
                                onClickFunc={() =>
                                    setIsModalVisible((prev) => !prev)
                                }
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignIn;
