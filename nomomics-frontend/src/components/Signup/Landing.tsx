import React from 'react';
import SignupSectionHeader from '../Headers/SignupSectionHeader';
import { useAuth } from '@/app/contexts/Auth';

const Landing = ({
  setShowLanding,
}: {
  setShowLanding: (showLanding: boolean) => void;
}) => {
  const { setAccountType } = useAuth();
  return (
    <div className='flex justify-center h-[80%]  items-center '>
      <div className='bg-white  p-8 pb-24 pt-16 rounded-[25px] shadow-lg w-[80%] max-md:w-full max-md:px-8 px-20 min-w-md '>
        <SignupSectionHeader
          title='Create your account'
          subTitle='Create your personal account now to access all educational benefits we have to offer you'
        />
        <div className=' flex flex-col gap-8 pb-10 items-center max-w-[520px] mx-auto max-md:text-sm max-480:text-xs'>
          <div className='flex flex-col gap-2 text-base max-md:text-sm max-480:text-xs'>
            <button
              onClick={() => {
                setAccountType('User');
                setShowLanding(false);
              }}
              className=' w-full border rounded-[20px] py-3 border-[#FBA700]  text-[#FBA700] font-semibold'
            >
              User
            </button>
            <span className=' flex gap-1 items-start '>
              <span className=' text-[#FF0000] font-semibold'>NB:</span>
              <span className=' text-[#5C5A5A]'>
                User can read, watch and buy on Nomomics website but can't
                upload.
              </span>
            </span>
          </div>
          <div className='flex flex-col gap-2 text-base max-md:text-sm max-480:text-xs'>
            <button
              onClick={() => {
                setAccountType('Creator');
                setShowLanding(false);
              }}
              className=' w-full border rounded-[20px] py-3 border-[#FBA700]  text-[#FBA700] font-semibold'
            >
              Creator
            </button>
            <span className=' flex gap-1 items-start '>
              <span className=' text-[#FF0000] font-semibold'>NB:</span>
              <span className=' text-[#5C5A5A]'>
                Creator can read, watch, buy and upload on Nomomics website
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
