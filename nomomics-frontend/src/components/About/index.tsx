import React from 'react';
import styles from '@/styles/about.module.css';

const About = () => {
  return (
    <div
      className={`${styles.background} px-4 sm:px-8 md:px-16 lg:px-28 gap-6 md:gap-10 lg:gap-14 mx-auto w-[90%] text-white mt-10 md:mt-16 lg:mt-20 font-inter`}
    >
      <div className='container mx-auto flex flex-col items-center justify-center'>
        <h3 className='font-semibold leading-relaxed tracking-wider text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center'>
          Sign up with NOMOMICS to get the latest and interesting comic
        </h3>
        <p className='font-extralight text-[14px] sm:text-[15px] md:text-[16px] tracking-wide text-center mt-4 md:mt-6'>
          Lorem ipsum dolor sit amet consectetur. Laoreet enim amet blandit quis
          sagittis vitae purus platea tincidunt. Interdum cras at ullamcorper
          sit urna quis id ut. Tellus facilisis purus fusce ut ultricies
          pellentesque neque mi. Elementum ornare eleifend lacus Lorem ipsum
          dolor sit amet consectetur. Laoreet enim amet blandit quis sagittis
          vitae purus platea tincidunt. Interdum cras at ullamcorper sit urna
          quis id ut. Tellus facilisis purus fusce ut ultricies pellentesque
          neque mi. Elementum ornare eleifend lacus.
        </p>
      </div>
    </div>
  );
};

export default About;
