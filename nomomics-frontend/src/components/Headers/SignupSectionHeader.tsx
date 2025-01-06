import Image from 'next/image';
import React from 'react';
import signupLogo from '@/public/svgs/signup-logo-1.svg';
import Link from 'next/link';

const SignupSectionHeader = (props: { title: string; subTitle: string }) => {
  const { title, subTitle } = props;
  return (
    <div>
      <Link href={'/'} className='flex justify-center mb-4'>
        <Image src={signupLogo} alt='Nomomics Logo' width={250} height={100} />
      </Link>
      <h2 className='text-lg max-md:text-sm font-bold text-center mb-2'>{title}</h2>
      <p className='text-gray-600 max-md:text-xs text-[16px] text-center mb-6'>{subTitle}</p>

      <Link
        href={'/'}
        className=' text-center text-zinc-800 max-md:text-sm max-480:text-xs text-lg underline mx-auto min-w-6 hover:text-primary transition-colors duration-300 ease-in-out'
      >
        Continue as a guest
      </Link>
    </div>
  );
};

export default SignupSectionHeader;
