'use client';
import Image from 'next/image';
import React from 'react';
import SignUpLogo from '@/public/svgs/signup-logo-1.svg';
import styles from '@/styles/auth.module.css';
import SignUpForm from './Form';
import EmailVerify from './EmailVerify';
import SignInForm from '../SignIn/Form';
import { usePathname, useRouter } from 'next/navigation';
import EmailSent from './EmailSent';
import Loader from './Loader';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useProfile } from '@/app/contexts/Profile';
import { Cookie } from 'next/font/google';
import Landing from './Landing';
import { useAuth } from '@/app/contexts/Auth';
import SignUpOptions from './SignupOptions';
import { GoogleOAuthProvider } from '@react-oauth/google';

const SignUp = () => {
  const [showVerify, setShowVerify] = React.useState(false);
  const [showLanding, setShowLanding] = React.useState(true);

  const { accountType, signupMethod } = useAuth();

  const [verifying, setVerifying] = React.useState(false);
  const [verified, setVerified] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const [credentials, setCredentials] = React.useState({
    email: '',
    password: '',
    fullName: '',
  });

  const pathName = usePathname();
  console.log(pathName);
  const router = useRouter();

  const { updateProfile } = useProfile();


  const token = pathName.split('/').pop();
  console.log(token);

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
          {showVerify && !verified && (
            <EmailSent
              email={credentials.email}
              password={credentials.password}
              fullName={credentials.fullName}
              setVerified={setVerified}
            />
          )}
          {showLanding && <Landing setShowLanding={setShowLanding} />}
          {!showLanding && !signupMethod && (
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
            >
              <SignUpOptions />
            </GoogleOAuthProvider>
          )}
          {!showVerify &&
            accountType &&
            !showLanding &&
            signupMethod === 'email' && (
              <SignUpForm
                setShowVerify={setShowVerify}
                credentials={credentials}
                setCredentials={setCredentials}
              />
            )}

          {verifying && <Loader loading={verifying} />}

          {verified && <EmailVerify />}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
