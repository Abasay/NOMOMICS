import React from 'react';
import SignupSectionHeader from '../Headers/SignupSectionHeader';
import Image from 'next/image';
import { FaGoogle, FaMailBulk, FaMailchimp } from 'react-icons/fa';
import { AiOutlineGoogle, AiOutlineMail } from 'react-icons/ai';
import { useAuth } from '@/app/contexts/Auth';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const SignUpOptions = () => {
  const { signupMethod, setSignupMethod, accountType } = useAuth();
  const router = useRouter();

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google-signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: codeResponse.code,
          signupMethod,
          role: accountType,
        }),
      }).then(async (data) => {
        const response = await data.json();
        if (response.success) {
          Cookies.set('token', response.data.token);
          Cookies.set('isLoggedIn', 'true');

          Swal.fire({
            icon: 'success',
            text: response.data.message,
          });

          router.push('/profile');
        }
        console.log(response);
      });
    },
    onError: (errorResponse) =>
      Swal.fire({
        icon: 'error',
        text: errorResponse.error,
      }),
  });
  return (
    <div className='flex justify-center h-[80%]  items-center '>
      <div className='bg-white  p-8 pt-16 rounded-[25px] shadow-lg w-[80%] max-md:w-full max-md:px-8 px-20 min-w-md '>
        <SignupSectionHeader
          title='Create your account'
          subTitle='Create your personal account now to access all educational benefits we have to offer you'
        />{' '}
        <div className='flex flex-col items-center justify-center gap-8 p-4 max-w-sm mx-auto'>
          <button
            className='flex items-center font-semibold text-base gap-12 justify-start pl-14 w-full border border-[#B3B3B3] rounded-[30px] py-2 shadow-sm hover:shadow-md'
            onClick={() => {
              setSignupMethod('email');
            }}
          >
            {/* <Image src='/google-icon.svg' alt='Google' className='h-5 w-5 mr-2' /> */}
            <span className=' grid place-content-center h-[25px] w-[25px] rounded-full border border-gray-300 shadow-slate-600'>
              <AiOutlineMail fill='black' color='white ' />
            </span>
            <span>Sign up with Email</span>
          </button>

          <div className='relative flex items-center w-full'>
            <div className='border-t border-gray-300 w-full'></div>
            <span className='px-2 text-gray-500 text-sm'>or</span>
            <div className='border-t border-gray-300 w-full'></div>
          </div>

          <button
            className='flex font-semibold text-base gap-12 items-center justify-start pl-14 w-full border border-[#B3B3B3] rounded-[30px] py-2 shadow-sm hover:shadow-md'
            onClick={() => {
              googleLogin();
              setSignupMethod('Google');
            }}
          >
            <span className=' grid place-content-center h-[25px] w-[25px] rounded-full border border-gray-300 shadow-slate-600'>
              <svg
                width='17'
                height='17'
                viewBox='0 0 17 17'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clip-path='url(#clip0_2575_5431)'>
                  <path
                    d='M16.1609 8.6958C16.1609 8.11799 16.1159 7.53706 16.02 6.96863H8.3232V10.2418H12.7308C12.5479 11.2975 11.9602 12.2313 11.0997 12.8248V14.9486H13.7292C15.2734 13.4682 16.1609 11.2819 16.1609 8.6958Z'
                    fill='#4285F4'
                  />
                  <path
                    d='M8.32319 17.0006C10.524 17.0006 12.38 16.2479 13.7322 14.9486L11.1027 12.8248C10.3711 13.3432 9.42658 13.6368 8.32618 13.6368C6.19736 13.6368 4.39235 12.1408 3.74471 10.1294H1.0312V12.3188C2.41644 15.1891 5.23789 17.0006 8.32319 17.0006Z'
                    fill='#34A853'
                  />
                  <path
                    d='M3.74172 10.1294C3.39991 9.07375 3.39991 7.93063 3.74172 6.87496V4.68555H1.03121C-0.126148 7.08735 -0.126148 9.91704 1.03121 12.3188L3.74172 10.1294Z'
                    fill='#FBBC04'
                  />
                  <path
                    d='M8.32318 3.36434C9.48654 3.3456 10.6109 3.8016 11.4535 4.63864L13.7832 2.21185C12.308 0.768899 10.3501 -0.0244134 8.32318 0.000572805C5.23789 0.000572805 2.41644 1.81207 1.0312 4.68549L3.74171 6.87491C4.38635 4.86039 6.19436 3.36434 8.32318 3.36434Z'
                    fill='#EA4335'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_2575_5431'>
                    <rect width='16.32' height='17' fill='white' />
                  </clipPath>
                </defs>
              </svg>
            </span>{' '}
            <span>Sign up with Google</span>
          </button>

          <button className='flex font-semibold text-base gap-12 items-center justify-start pl-14 w-full border border-[#B3B3B3] rounded-[30px] py-2 shadow-sm hover:shadow-md'>
            <span className=' grid place-content-center h-[25px] w-[25px] rounded-full border border-gray-300 shadow-slate-600'>
              <svg
                width='17'
                height='17'
                viewBox='0 0 17 17'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M11.436 1.70138C11.436 2.42671 11.1244 3.15204 10.6838 3.67479C10.2163 4.25421 9.40737 4.68488 8.7642 4.68488C8.69054 4.68488 8.61687 4.67496 8.57154 4.66646C8.55479 4.58198 8.54578 4.49616 8.54462 4.41004C8.54462 3.67479 8.92145 2.94946 9.3252 2.49046C9.83945 1.89404 10.6923 1.44354 11.4091 1.41663C11.4275 1.49879 11.436 1.60079 11.436 1.70138ZM13.9641 6.27013L13.9995 6.24675C13.044 4.87754 11.5933 4.84071 11.1895 4.84071C10.5719 4.84071 10.0187 5.06029 9.554 5.24446C9.21754 5.37763 8.92712 5.49238 8.69195 5.49238C8.43199 5.49238 8.1345 5.37196 7.80229 5.23879C7.38295 5.06879 6.90979 4.87754 6.38704 4.87754C4.624 4.87754 2.83333 6.33954 2.83333 9.09283C2.83333 10.8098 3.49491 12.6196 4.31375 13.7841C5.02066 14.7758 5.63549 15.5833 6.51666 15.5833C6.93458 15.5833 7.24129 15.4537 7.56358 15.317C7.92058 15.1654 8.29741 15.0053 8.86691 15.0053C9.4435 15.0053 9.78775 15.1555 10.1192 15.3C10.4288 15.4345 10.7263 15.5649 11.191 15.5649C12.1543 15.5649 12.7875 14.6936 13.3939 13.821C14.0739 12.8293 14.3593 11.856 14.3678 11.8107C14.3126 11.7923 12.466 11.0478 12.466 8.9455C12.466 7.25258 13.7247 6.42738 13.9641 6.27013Z'
                  fill='black'
                />
              </svg>
            </span>{' '}
            <span>Sign up Apple</span>
          </button>

          <button className='flex font-semibold text-base gap-12 items-center justify-start pl-14 w-full border border-[#B3B3B3] rounded-[30px] py-2 shadow-sm hover:shadow-md'>
            <span className=' grid place-content-center h-[25px] w-[25px] rounded-full border border-gray-300 shadow-slate-600'>
              <svg
                width='17'
                height='17'
                viewBox='0 0 17 17'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M15.5833 8.49996C15.5833 4.58996 12.41 1.41663 8.50001 1.41663C4.59001 1.41663 1.41667 4.58996 1.41667 8.49996C1.41667 11.9283 3.85334 14.7829 7.08334 15.4416V10.625H5.66667V8.49996H7.08334V6.72913C7.08334 5.36204 8.19542 4.24996 9.56251 4.24996H11.3333V6.37496H9.91667C9.52709 6.37496 9.20834 6.69371 9.20834 7.08329V8.49996H11.3333V10.625H9.20834V15.5479C12.7854 15.1937 15.5833 12.1762 15.5833 8.49996Z'
                  fill='#4067BC'
                />
              </svg>
            </span>
            <span>Sign up Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpOptions;
