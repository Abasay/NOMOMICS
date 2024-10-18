'use client';
import React from 'react';
import Button from '../Common/Button';
import Button1 from '../Common/Button1';
import SaveMe from '../Common/SaveMe';
import styles from '@/styles/common.module.css';

const HomeHero = () => {
    return (
        <div
            className={`flex items-start w-full bg-tertiary h-auto mt-20 py-8 px-14 `}
        >
            <div
                className={` flex flex-col gap-8 w-[67%] text-white ${styles['fade-in']} `}
            >
                <h1 className='text-6xl font-bold font-comic'>
                    Son of Amadioha
                </h1>
                <div className=' text-opacity-80 text-white tracking-widest flex gap-6 text-[18px] font-openSans font-bold items-center'>
                    <span>Horror</span>
                    <span>Mystery</span>
                </div>
                <p className='font-openSans text-white font-semibold tracking-widest leading-6 text-opacity-80'>
                    Dozie, son of the legendary Amadioha, is ensnared in a web
                    of mystery. A series of unexplained murders shadow his rise
                    to success, turning his world into a thrilling puzzle.
                    Amidst the darkness of commerce, he must solve the enigma
                    that endangers all he cherishes.
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
    );
};

export default HomeHero;
