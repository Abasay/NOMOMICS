'use client';
import Image from 'next/image';
import React from 'react';
import dummy from '@/public/images/dummy.jpg';
import Button1 from '../Common/Button1';
import Link from 'next/link';

const Comics = (props: { title: string }) => {
    const { title } = props;
    const dummyArr = [1, 2, 3, 4, 5, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6];
    return (
        <div className=' flex  flex-col gap-8 pt-40'>
            <h1 className=' text-4xl font-comic tracking-widest font-bold w-[90%] mx-auto'>
                {title}
            </h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-[90%] mx-auto'>
                {dummyArr.map((_, index) => {
                    return (
                        <Link
                            href={'/details'}
                            className={` relative cursor-pointer `}
                            key={index}
                        >
                            <Image
                                src={dummy}
                                alt='Dummy'
                                width={236}
                                height={350}
                                className=' w-full object-cover rounded-lg'
                            />
                            <div className=' h-auto w-full rounded-b-lg text-white px-4 absolute bottom-0 flex flex-col gap-1 bg-black bg-opacity-65 pt-2 tracking-widest font-trebuchet'>
                                <h3>Spiderman</h3>
                                <h4>Jone Stone</h4>
                                <div className=' flex items-center justify-between'>
                                    <div className=' flex items-center flex-row gap-2'>
                                        <p>Reviews</p>
                                        <p className=' flex items-center gap-0.5'>
                                            <span>
                                                <svg
                                                    width='14'
                                                    height='14'
                                                    viewBox='0 0 14 14'
                                                    fill='none'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                >
                                                    <path
                                                        d='M8.00887 2.04754L9.03554 4.10087C9.17554 4.38671 9.54887 4.66087 9.86387 4.71337L11.7247 5.02254C12.9147 5.22087 13.1947 6.08421 12.3372 6.93587L10.8905 8.38254C10.6455 8.62754 10.5114 9.10004 10.5872 9.43837L11.0014 11.2292C11.328 12.6467 10.5755 13.195 9.32137 12.4542L7.5772 11.4217C7.2622 11.235 6.74304 11.235 6.4222 11.4217L4.67804 12.4542C3.4297 13.195 2.67137 12.6409 2.99804 11.2292L3.4122 9.43837C3.48804 9.10004 3.35387 8.62754 3.10887 8.38254L1.6622 6.93587C0.810536 6.08421 1.0847 5.22087 2.2747 5.02254L4.13554 4.71337C4.4447 4.66087 4.81804 4.38671 4.95804 4.10087L5.9847 2.04754C6.5447 0.933372 7.4547 0.933372 8.00887 2.04754Z'
                                                        stroke='#FBA700'
                                                        stroke-width='1.5'
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                    />
                                                </svg>
                                            </span>
                                            <span>4.5</span>
                                        </p>
                                        <span></span>
                                    </div>
                                    <div>
                                        <span>100 Comments</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
                {/* <div className=' relative w-[300px] '>
                    <Image
                        src={dummy}
                        alt='Dummy'
                        width={236}
                        height={350}
                        className=' w-full object-cover'
                    />
                    <div className=' h-auto w-full text-white px-4 absolute bottom-0 flex flex-col gap-1 bg-black bg-opacity-65 pt-2 tracking-widest'>
                        <h3>Spiderman</h3>
                        <h4>Jone Stone</h4>
                        <div className=' flex items-center -mt-1 justify-between'>
                            <div className=' flex items-center flex-row gap-2'>
                                <p>Reviews</p>
                                <p className=' flex items-center gap-0.5'>
                                    <span>
                                        <svg
                                            width='14'
                                            height='14'
                                            viewBox='0 0 14 14'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                d='M8.00887 2.04754L9.03554 4.10087C9.17554 4.38671 9.54887 4.66087 9.86387 4.71337L11.7247 5.02254C12.9147 5.22087 13.1947 6.08421 12.3372 6.93587L10.8905 8.38254C10.6455 8.62754 10.5114 9.10004 10.5872 9.43837L11.0014 11.2292C11.328 12.6467 10.5755 13.195 9.32137 12.4542L7.5772 11.4217C7.2622 11.235 6.74304 11.235 6.4222 11.4217L4.67804 12.4542C3.4297 13.195 2.67137 12.6409 2.99804 11.2292L3.4122 9.43837C3.48804 9.10004 3.35387 8.62754 3.10887 8.38254L1.6622 6.93587C0.810536 6.08421 1.0847 5.22087 2.2747 5.02254L4.13554 4.71337C4.4447 4.66087 4.81804 4.38671 4.95804 4.10087L5.9847 2.04754C6.5447 0.933372 7.4547 0.933372 8.00887 2.04754Z'
                                                stroke='#FBA700'
                                                stroke-width='1.5'
                                                stroke-linecap='round'
                                                stroke-linejoin='round'
                                            />
                                        </svg>
                                    </span>
                                    <span>4.5</span>
                                </p>
                                <span></span>
                            </div>
                            <div>
                                <span>100 Comments</span>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className=' w-[150px] mx-auto'>
                <Button1
                    text='See more'
                    className=' w-full bg-primary py-2'
                    onClickFunc={() => console.log('usee more')}
                />
            </div>
        </div>
    );
};

export default Comics;
