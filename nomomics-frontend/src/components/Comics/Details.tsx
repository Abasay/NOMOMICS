'use client';
import Image from 'next/image';
import React from 'react';
import heroDetail from '@/public/images/hero-detail.png';
import Button1 from '../Common/Button1';
import Prologue from './Prologue';
import styles from '@/styles/comic.module.css';

const Details = () => {
    return (
        <div className='relative mt-20'>
            <div className={`  ${styles.background}`}>
                <div className=' flex  absolute justify-end mr-10 right-10 top-72'>
                    <Button1
                        className=' w-48 px-4 bg-secondary'
                        text='Episode 1'
                        onClickFunc={() => console.log('Click detals')}
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
