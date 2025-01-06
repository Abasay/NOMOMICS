'use client';
import Image from 'next/image';
import React from 'react';
import heroDetail from '@/public/images/hero-detail.png';
import Button1 from '../Common/Button1';
import Prologue from './Prologue';
import styles from '@/styles/comic.module.css';
import { useComics } from '@/app/contexts/Comics';
import Swal from 'sweetalert2';
import { notFound } from 'next/navigation';
import './index.css';

const Details = () => {
  const { loadingComic, comic } = useComics();

  if (loadingComic) {
    return (
      <div className='relative'>
        {/* Button Placeholder with "Nomomics" Text */}
        <div className='flex absolute justify-end mr-10 right-10 top-72'>
          <div className='w-48 h-12 bg-gray-300 rounded-lg animate-pulse flex items-center justify-center'>
            <span className='text-gray-400 font-semibold text-xl flex space-x-1'>
              {'NOMOMICS'.split('').map((letter, index) => (
                <span
                  key={index}
                  className={`animate-bounce-letter`}
                  style={{
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </div>
        </div>

        {/* Image Placeholder with "Nomomics" Text */}
        <div className='w-full h-[449px] bg-gray-300 animate-pulse flex items-center justify-center'>
          <span className='text-gray-400 font-semibold text-3xl flex space-x-1'>
            {'NOMOMICS'.split('').map((letter, index) => (
              <span
                key={index}
                className={`animate-bounce-letter`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                {letter}
              </span>
            ))}
          </span>
        </div>
      </div>
    );
  }

  if (!comic) {
    Swal.fire({
      title: 'Error',
      text: 'Comic not found',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
    return notFound();
  }
  return (
    <div className='relative -mt-1'>
      <div className={`relative`}>
        <div className=' flex  absolute justify-end mr-10 right-10 top-72'>
          <Button1
            className=' w-48 px-4 bg-secondary'
            text='Episode 1'
            onClickFunc={() => console.log('Click detals')}
          />
        </div>
        <div className=' max-480:block hidden absolute top-0 w-full h-[80%] bg-black bg-opacity-40 z-10'></div>
        <div className=' w-full h-[449px] '>
          <Image
            src={comic?.coverImage || heroDetail} //It should be nomomics logo tho
            alt='Hero'
            layout='fill'
            objectFit='cover'
            objectPosition='center'
          />
        </div>
      </div>
      <div className=' -mt-16'>
        <Prologue />
      </div>
    </div>
  );
};

export default Details;
