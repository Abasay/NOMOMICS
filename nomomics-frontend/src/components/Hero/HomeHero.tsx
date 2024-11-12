'use client';
import React from 'react';
import Button from '../Common/Button';
import Button1 from '../Common/Button1';
import SaveMe from '../Common/SaveMe';
import styles from '@/styles/common.module.css';

const HomeHero = () => {
  return (
    <div
      className={` bg-tertiary h-auto mt-20 py-8 px-4 lg:px-16 md:px-8 sm:px-8 `}
    >
      <div className='container mx-auto flex items-start w-full '>
        <div
          className={` flex flex-col max-md:gap-4 gap-8 lg:w-[67%] md:w-[80%] max-md:w-full  text-white ${styles['fade-in']} `}
        >
          <h1 className='text-6xl max-md:text-3xl font-bold font-comic'>
            Son of Amadioha
          </h1>
          <div className=' max-md:text-sm text-opacity-80 text-white tracking-widest flex gap-6 text-[18px] font-openSans font-bold items-center'>
            <span>Horror</span>
            <span>Mystery</span>
          </div>
          <p className='font-openSans max-md:text-sm text-white font-semibold tracking-widest leading-6 text-opacity-80'>
            Dozie, son of the legendary Amadioha, is ensnared in a web of
            mystery. A series of unexplained murders shadow his rise to success,
            turning his world into a thrilling puzzle. Amidst the darkness of
            commerce, he must solve the enigma that endangers all he cherishes.
          </p>
          <div className=' flex gap-6 w-[300px]'>
            <Button1
              text='Read me'
              className=' bg-primary'
              onClickFunc={() => console.log('u')}
            />
            <SaveMe
              text='Save Me'
              className=' bg-white hover:text-white text-black'
              onClickFunc={() => console.log('u')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
