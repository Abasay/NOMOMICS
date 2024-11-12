import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dummy from '@/public/images/dummy.jpg';
import './index.css';

const AutoSlidingCarousel = () => {
  const dummyArr = Array(25).fill(null); // Replace with your actual data if needed

  return (
    <div className='w-[90%] mt-20 container mx-auto'>
      <div className='slider'>
        <div className='slides gap-4'>
          {dummyArr.map((image, index) => (
            <Link
              href={'/details'}
              key={index}
              className='slide relative border min-w-[150px] max-w-[170px] min-h-[100px] max-h-[180px] '
            >
              <Image
                src={dummy}
                alt='dummy'
                className='rounded-md  h-full object-cover'
              />
              {/* <div className='  top-0 z-10 h-full w-full hidden hover:absolute transition-all delay-0 duration-500 '></div> */}
              <div className='text-white z-15 absolute bottom-0 rounded-b-lg bg-black bg-opacity-65 w-full p-2'>
                <h3>Spiderman</h3>
                <h4>John Doe</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoSlidingCarousel;
