'use client';
import Image from 'next/image';
import React from 'react';
import dummyImg from './dummy.png';
import avatar from './avatar.png';
import ButtonNext from '../Common/ButtonNext';
import Button1 from '../Common/Button1';
import { MarketPlaceComic } from '@/types/comic';

interface CardProps extends MarketPlaceComic {
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({
  category,
  title,
  price,
  description,
  synopsis,
  onClick,
  owner: { profileImage, fullName, nickName },
  coverImage,
}) => {
  return (
    <div
      className='bg-white  shadow-xl rounded-lg overflow-hidden border border-gray-200'
      onClick={onClick}
    >
      {/* Image */}
      <div className='relative'>
        <Image
          src={coverImage}
          alt={''}
          width={300}
          height={300}
          className='w-full h-48 object-cover'
        />
        <span className='absolute bottom-2 right-2 px-5 bg-[#FFFFFF] text-marketPlace text-xs font-bold  py-1 rounded-[25px]'>
          Sell
        </span>
      </div>

      {/* Content */}
      <div className='p-4'>
        {/* Category */}
        <span className='text-sm text-marketPlace font-medium'>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>

        {/* Title and Price */}
        <div className='flex justify-between items-center mt-2'>
          <h2 className='text-lg font-semibold text-gray-800'>{title}</h2>
          <span className='text-lg font-semibold text-marketPlace'>
            #{price}
          </span>
        </div>

        {/* Description */}
        <p className='text-sm text-gray-600 mt-2'>
          {synopsis.split(' ').slice(0, 20).join(' ')}
          {synopsis.split(' ').length > 20 ? '...' : ''}
        </p>

        {/* Admin */}
        <div className='flex items-center gap-2 justify-between mt-4'>
          <Image
            src={profileImage}
            alt={fullName}
            width={8}
            height={8}
            className='w-8 h-8 rounded-full border border-gray-200'
          />
          <div className=' flex flex-col ml-2'>
            <span className='text-xs text-[#667085] '>
              {nickName ? nickName : 'Creator'}
            </span>
            <span className=' text-xs text-[#101828] font-semibold'>
              {fullName}
            </span>
          </div>
          <Button1
            text={'Contact'}
            className=' text-[#FFFFFF] text-sm font-normal min-w-min max-w-fit mx-auto bg-secondary hover:bg-tertiary  border border-primary  transition-all duration-300 ease-in-out rounded-lg py-2 px-4 mt-4'
            onClickFunc={() => console.log('')}
          />
        </div>

        {/* Button */}
        {/* <button className='mt-4 w-full bg-orange-500 text-white text-sm py-2 rounded hover:bg-orange-600 transition'>
          {buttonText}
        </button> */}
      </div>
    </div>
  );
};

export default Card;
