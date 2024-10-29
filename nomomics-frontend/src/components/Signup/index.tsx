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

const SignUp = () => {
  const [showVerify, setShowVerify] = React.useState(false);

  const [verifying, setVerifying] = React.useState(false);
  const [verified, setVerified] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const [credentials, setCredentials] = React.useState({
    email: '',
    password: '',
  });

  const pathName = usePathname();
  console.log(pathName);
  const router = useRouter();

  const { updateProfile } = useProfile();

  React.useEffect(() => {
    if (pathName.includes('/signup/verify') && !done) {
      setVerifying(true);
      (async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          }
        );

        if (res.ok) {
          setVerifying(false);
          setVerified(true);
          setDone(true); // Update done to prevent multiple calls
          Cookies.set('isLoggedIn', 'true', { expires: 7 });
          const response = await res.json();
          console.log(response);
          updateProfile(response.data.user);
        } else {
          toast.error('Invalid token');
          router.push('/signup');
        }
      })();
    } else if (!done) {
      router.push('/signup');
    }
  }, [pathName, done]); // Adding 'done' as a dependency

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
          {showVerify && (
            <EmailSent
              email={credentials.email}
              password={credentials.password}
            />
          )}
          {!verified &&
            !showVerify &&
            !verifying &&
            !pathName.includes('/signup/verify') && (
              <SignUpForm
                setShowVerify={setShowVerify}
                credentials={credentials}
                setCredentials={setCredentials}
              />
            )}

          {verifying && <Loader loading={done} />}

          {verified && <EmailVerify />}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
