import React from 'react';
import styles from '@/styles/about.module.css';
const About = () => {
    return (
        <div
            className={`${styles.background} px-28 gap-14  mx-auto w-[90%] text-white mt-20 font-inter flex flex-col items-center justify-center `}
        >
            <h3 className=' font-semibold leading-relaxed tracking-wider text-5xl text-center'>
                Sign up with NOMOMICS to get the latest and interesting comic
            </h3>
            <p className=' font-extralight text-[16px] tracking-wide text-center'>
                Lorem ipsum dolor sit amet consectetur. Laoreet enim amet
                blandit quis sagittis vitae purus platea tincidunt. Interdum
                cras at ullamcorper sit urna quis id ut. Tellus facilisis purus
                fusce ut ultricies pellentesque neque mi. Elementum ornare
                eleifend lacus Lorem ipsum dolor sit amet consectetur. Laoreet
                enim amet blandit quis sagittis vitae purus platea tincidunt.
                Interdum cras at ullamcorper sit urna quis id ut. Tellus
                facilisis purus fusce ut ultricies pellentesque neque mi.
                Elementum ornare eleifend lacus
            </p>
        </div>
    );
};

export default About;
