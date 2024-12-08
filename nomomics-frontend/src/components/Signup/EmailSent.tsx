import React from 'react';
import SignupSectionHeader from '../Headers/SignupSectionHeader';
import toast from 'react-hot-toast';
import Button from '../Common/Button';
import { useProfile } from '@/app/contexts/Profile';
import Cookies from 'js-cookie';

const EmailSent = ({
  email,
  password,
  fullName,
  setVerified,
}: {
  email: string;
  password: string;
  fullName: string;
  setVerified: (value: boolean) => void;
}) => {
  const [resending, setResending] = React.useState(false);
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);

  const { updateProfile } = useProfile();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const { value } = e.target;
    if (Number.isNaN(Number(value))) {
      toast.error('Please enter a valid number');
      e.target.value = '';

      return;
    }
    if (value.length > 1) {
      e.target.value = value.charAt(0);
    }
    if (value.length === 1 && idx < inputsRef.current.length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === 'Backspace' && idx > 0 && !inputsRef.current[idx]?.value) {
      inputsRef.current[idx - 1]?.focus();
    }
  };
  const resendLink = async () => {
    try {
      setResending(true);
      // resend email logic
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/resend-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (res.ok) {
        setResending(false);
        toast.success('Email sent');
      } else {
        setResending(false);
        toast.error('Failed to send email');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async () => {
    const otp = inputsRef.current.map((input) => input?.value).join('');

    if (otp.length < 6) {
      toast.error('Please fill all the fields');
      return;
    }

    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ otp, email, password, fullName }),
        }
      );
      const response = await request.json();

      if (request.ok) {
        toast.success(response.data.message);
        setVerified(true);
        // console.log(response);
        updateProfile(response.data.user);
        Cookies.set('token', response.data.token, { expires: 7 });
        Cookies.set('isLoggedIn', 'true', { expires: 7 });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('An error occurred please try again');
    }
  };
  return (
    <div className='flex justify-center h-[80%] max-480:text-xs max-md:text-sm  items-center '>
      <div className='bg-white  p-8 pt-16 rounded-[25px] shadow-lg w-[80%] mx-auto px-16 min-w-md max-md:w-full max-md:px-8 '>
        <SignupSectionHeader
          title='Verification Code'
          subTitle='We have sent the verification code to your email address'
        />
        <div className='flex flex-col gap-2 container mx-auto max-w-[480px]'>
          <div className='flex flex-col gap-1'>
            <h2 className='text-[24px] leading-[32px] font-medium text-[#0E0E0E]'>
              Verify your Email
            </h2>
            <span className='text-base leading-[24px] text-[#3C3C3C]'>
              Enter the 6 digit code sent to your email address
            </span>
          </div>
          {/**code */}
          <div className='flex flex-col gap-6 mt-4 w-full'>
            <div className='flex justify-center max-w-[500px] mx-auto flex-wrap gap-4 sm:gap-2'>
              {Array(6)
                .fill('')
                .map((_, idx) => (
                  <input
                    key={idx}
                    ref={(el: any) => (inputsRef.current[idx] = el)}
                    className='
          focus:outline-none 
          h-[60px] w-[60px] 
          sm:h-[50px] sm:w-[50px] 
          text-zinc-700 placeholder-inputcolor 
          rounded-[12px] text-[20px] sm:text-[16px] 
          border-[1px] border-[#8A8A8A] 
          gap-[8px] text-center font-[500]
        '
                    maxLength={1}
                    type='text'
                    inputMode='numeric'
                    pattern='[0-9]*'
                    onChange={(e) => handleChange(e, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                  />
                ))}
            </div>
          </div>
          <Button
            text='Verify OTP'
            className='mb-2 mt-3'
            onClickFunc={() => {
              // e.preventDefault();
              handleSubmit();
            }}
          />
        </div>
        <div className=' my-10 flex gap-1 justify-center items-center'>
          {/* <span>
            <svg
              width='150'
              height='150'
              viewBox='0 0 150 150'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M71.0179 31.7152C70.528 31.4471 69.9785 31.3066 69.42 31.3066C68.8615 31.3066 68.312 31.4471 67.822 31.7152L33.1549 50.6246C32.4231 51.024 31.7679 51.55 31.2196 52.1781L69.42 73.0095L107.62 52.1693C107.072 51.5428 106.416 51.0183 105.685 50.6201L71.0179 31.7152ZM29.4707 93.4502V58.8053L67.822 79.7254C68.312 79.9935 68.8615 80.134 69.42 80.134C69.9785 80.134 70.528 79.9935 71.0179 79.7254L109.369 58.8053V93.4502C109.369 97.2762 107.849 100.946 105.144 103.651C102.439 106.356 98.7692 107.876 94.9431 107.876H43.8968C40.0708 107.876 36.4014 106.356 33.696 103.651C30.9906 100.946 29.4707 97.2762 29.4707 93.4502ZM113.812 56.8788C115.855 58.1824 117.535 59.9798 118.699 62.1048C119.863 64.2298 120.472 66.6139 120.471 69.0367V95.6696C120.471 101.85 118.015 107.778 113.645 112.148C109.275 116.518 103.347 118.973 97.167 118.973H57.2177C54.7934 118.976 52.4075 118.368 50.2808 117.204C48.1541 116.04 46.3553 114.359 45.0509 112.315H97.1625C101.577 112.315 105.811 110.561 108.933 107.44C112.054 104.318 113.808 100.084 113.808 95.6696L113.812 56.8788Z'
                fill='#FBA700'
              />
              <path
                d='M75 140.625C57.5952 140.625 40.9032 133.711 28.5961 121.404C16.289 109.097 9.375 92.4048 9.375 75C9.375 57.5952 16.289 40.9032 28.5961 28.5961C40.9032 16.289 57.5952 9.375 75 9.375C92.4048 9.375 109.097 16.289 121.404 28.5961C133.711 40.9032 140.625 57.5952 140.625 75C140.625 92.4048 133.711 109.097 121.404 121.404C109.097 133.711 92.4048 140.625 75 140.625ZM75 150C94.8912 150 113.968 142.098 128.033 128.033C142.098 113.968 150 94.8912 150 75C150 55.1088 142.098 36.0322 128.033 21.967C113.968 7.90176 94.8912 0 75 0C55.1088 0 36.0322 7.90176 21.967 21.967C7.90176 36.0322 0 55.1088 0 75C0 94.8912 7.90176 113.968 21.967 128.033C36.0322 142.098 55.1088 150 75 150Z'
                fill='#FBA700'
              />
            </svg>
          </span> */}
          <span>Didn&apos;t get the otp?</span>
          <button
            onClick={resendLink}
            disabled={resending}
            className=' text-primary font-bold '
          >
            {resending ? 'Resending Link' : 'Resend Link'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailSent;
