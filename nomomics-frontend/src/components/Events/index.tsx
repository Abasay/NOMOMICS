import Image from 'next/image';
import React from 'react';
import eventImg from './hero.png';

const Events = () => {
  return (
    <div className='mt-16 relative container w-[90%] rounded-sm grid mx-auto min-h-[234px] max-h-[371px] place-content-center'>
      {/* Background Image */}
      <Image
        src={eventImg}
        alt='Events'
        width={200}
        height={300}
        className='w-full absolute top-0 h-full rounded-[25px] object-cover'
      />

      {/* Content */}
      <div className='absolute top-[30%] max-480:top-[15%] z-10 items-center flex flex-col md:flex-row justify-center gap-6 w-[90%] font-comic mx-auto text-center md:text-left'>
        <p className='text-xl md:text-6xl font-bold leading-9 tracking-wider text-white'>Virtual Meeting!!!</p>
        <p className='text-lg md:text-3xl flex flex-col gap-3 leading-9 tracking-wider font-bold text-white'>
          <span>Date: 29-05-2024</span>
          <span>Location: Youtube</span>
        </p>
      </div>

      {/* Overlay */}
      <div className='absolute bg-black top-0 w-full h-full rounded-[25px] bg-opacity-30'></div>
    </div>
  );
};

export default Events;
