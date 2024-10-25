import React from 'react';
import Button from '../Common/Button';
import Image from 'next/image';
import episodeDummy from '@/public/images/episode-dummy.png';
import Button1 from '../Common/Button1';
import styles from '@/styles/common.module.css';
import Comics from '.';
import Link from 'next/link';

const Prologue = () => {
    return (
        <>
            <div
                className={`rounded-xl flex py-11 max-md:flex-col  gap-10 bg-white mx-auto w-[90%] font-comic ${styles['fade-in']}`}
                //use the stles[fade-in] to animate the component when fetching is complete
            >
                <div className=' w-[60%] max-md:px-8 max-md:w-full -mt-11 rounded-tl-xl drop-shadow-xl px-24 py-10 bg-[#FAE8E6] flex flex-col gap-10 font-comic items-center justify-center'>
                    <div className=' flex flex-col gap-5 items-center justify-center'>
                        <h3 className=' text-5xl tracking-widest'>
                            Spider Man
                        </h3>
                        <h4 className='text-3xl tracking-widest'>Prologue</h4>
                    </div>
                    <div>
                        <p className=' tracking-wide text-base text-[#5C5A5A]'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Consequuntur dolorem fugiat, tempora maxime
                            molestias voluptatem veniam, fuga aspernatur
                            tenetur, iusto provident aperiam eaque odio nobis
                            quod reprehenderit assumenda quas! Cum. Lorem ipsum
                            dolor sit amet consectetur adipisicing elit. Labore
                            quia maxime, veniam recusandae architecto provident
                            officia. Recusandae, inventore nihil, explicabo,
                            perspiciatis quam cupiditate distinctio saepe in
                            soluta voluptate corporis velit. Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Quos
                            similique excepturi obcaecati mollitia ut fuga
                            temporibus, quibusdam deleniti reprehenderit?
                            Voluptatem ratione incidunt aliquam error doloremque
                            facilis veniam itaque, sed minima. Lorem ipsum dolor
                            sit amet consectetur, adipisicing elit. Consequuntur
                            dolorem fugiat, tempora maxime molestias voluptatem
                            veniam, fuga aspernatur tenetur, iusto provident
                            aperiam eaque odio nobis quod reprehenderit
                            assumenda quas! Cum. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Labore quia maxime,
                            veniam recusandae architecto provident officia.
                            Recusandae, inventore nihil, explicabo, perspiciatis
                            quam cupiditate distinctio saepe in soluta voluptate
                            corporis velit. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Quos similique
                            excepturi obcaecati mollitia ut fuga temporibus,
                            quibusdam deleniti reprehenderit? Voluptatem ratione
                            incidunt aliquam error doloremque facilis veniam
                            itaque, sed minima.
                        </p>
                    </div>
                    <Link href={'/read'} className=' w-36'>
                        <Button1
                            text='Episode 1'
                            className=' bg-secondary w-32'
                            onClickFunc={() => console.log('U are good')}
                        />
                    </Link>

                    <div className=' flex gap-3 justify-center'>
                        <p className=' flex gap-2 items-center'>
                            <span>
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M15.5799 11.9999C15.5799 13.9799 13.9799 15.5799 11.9999 15.5799C10.0199 15.5799 8.41992 13.9799 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C13.9799 8.41992 15.5799 10.0199 15.5799 11.9999Z'
                                        stroke='#292D32'
                                        stroke-width='1.5'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                    />
                                    <path
                                        d='M11.9998 20.2697C15.5298 20.2697 18.8198 18.1897 21.1098 14.5897C22.0098 13.1797 22.0098 10.8097 21.1098 9.39973C18.8198 5.79973 15.5298 3.71973 11.9998 3.71973C8.46984 3.71973 5.17984 5.79973 2.88984 9.39973C1.98984 10.8097 1.98984 13.1797 2.88984 14.5897C5.17984 18.1897 8.46984 20.2697 11.9998 20.2697Z'
                                        stroke='#292D32'
                                        stroke-width='1.5'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                    />
                                </svg>
                            </span>
                            <span className=' text-base'>1234</span>
                        </p>
                        <p className=' flex gap-2 items-center'>
                            <span>
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M6.00002 9H4.00002C2.89545 9 2.00002 9.89543 2.00002 11V18C2.00002 19.1046 2.89545 20 4.00002 20H6.00002C7.10459 20 8.00002 19.1046 8.00002 18V11C8.00002 9.89543 7.10459 9 6.00002 9Z'
                                        stroke='#28303F'
                                        stroke-width='1.5'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                    />
                                    <path
                                        d='M15.8769 21H12.2111C11.4214 21 10.6494 20.7662 9.99232 20.3282L8.44532 19.2969C8.16712 19.1114 8.00002 18.7992 8.00002 18.4648V10.2656C8.00002 10.0915 8.04543 9.92052 8.13178 9.76943L12 3H13.3287C15.3255 3 16.5164 5.22536 15.4089 6.88675L14 9H19.4385C20.7396 9 21.6943 10.2228 21.3788 11.4851L19.7575 17.9701C19.3123 19.7508 17.7124 21 15.8769 21Z'
                                        stroke='#28303F'
                                        stroke-width='1.5'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                    />
                                </svg>
                            </span>
                            <span className=' text-base'>1234</span>
                        </p>
                        <p className=' flex gap-2 items-center'>
                            <span>
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M6.00002 15H4.00002C2.89545 15 2.00002 14.1046 2.00002 13V6C2.00002 4.89543 2.89545 4 4.00002 4H6.00002C7.10459 4 8.00002 4.89543 8.00002 6V13C8.00002 14.1046 7.10459 15 6.00002 15Z'
                                        stroke='#28303F'
                                        stroke-width='1.5'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                    />
                                    <path
                                        d='M15.8769 3H12.2111C11.4214 3 10.6494 3.23375 9.99232 3.6718L8.44532 4.70313C8.16712 4.8886 8.00002 5.20083 8.00002 5.53518V13.7344C8.00002 13.9085 8.04543 14.0795 8.13178 14.2306L12 21H13.3287C15.3255 21 16.5164 18.7746 15.4089 17.1133L14 15H19.4385C20.7396 15 21.6943 13.7772 21.3788 12.5149L19.7575 6.02986C19.3123 4.24919 17.7124 3 15.8769 3Z'
                                        stroke='#28303F'
                                        stroke-width='1.5'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                    />
                                </svg>
                            </span>
                            <span className=' text-base'>12</span>
                        </p>
                        <p>
                            <span>
                                <svg
                                    width='25'
                                    height='24'
                                    viewBox='0 0 25 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M18.91 8.78414C20.8926 8.78414 22.4998 7.26546 22.4998 5.39207C22.4998 3.51868 20.8926 2 18.91 2C16.9275 2 15.3203 3.51868 15.3203 5.39207C15.3203 7.26546 16.9275 8.78414 18.91 8.78414Z'
                                        stroke='#292D32'
                                        stroke-width='1.5'
                                        stroke-miterlimit='10'
                                    />
                                    <path
                                        d='M6.08973 16.4931C8.07229 16.4931 9.67949 14.9744 9.67949 13.1011C9.67949 11.2277 8.07229 9.70898 6.08973 9.70898C4.10717 9.70898 2.5 11.2277 2.5 13.1011C2.5 14.9744 4.10717 16.4931 6.08973 16.4931Z'
                                        stroke='#292D32'
                                        stroke-width='1.5'
                                        stroke-miterlimit='10'
                                    />
                                    <path
                                        d='M18.91 22C20.8926 22 22.4998 20.4813 22.4998 18.6079C22.4998 16.7345 20.8926 15.2158 18.91 15.2158C16.9275 15.2158 15.3203 16.7345 15.3203 18.6079C15.3203 20.4813 16.9275 22 18.91 22Z'
                                        stroke='#292D32'
                                        stroke-width='1.5'
                                        stroke-miterlimit='10'
                                    />
                                    <line
                                        y1='-0.5'
                                        x2='8.26491'
                                        y2='-0.5'
                                        transform='matrix(0.846108 -0.533011 0.576484 0.817109 9.49219 11.9121)'
                                        stroke='#292D32'
                                    />
                                    <line
                                        y1='-0.5'
                                        x2='7.3317'
                                        y2='-0.5'
                                        transform='matrix(0.953805 0.300427 -0.332667 0.943044 9.49219 15.2158)'
                                        stroke='#292D32'
                                    />
                                </svg>
                            </span>
                        </p>
                    </div>
                    <div className=' w-full -mt-4 border border-[#5C5A5A]'></div>
                </div>

                <div className=' w-[40%] scroll-smooth  scrollbar-hide max-md:overflow-x-auto max-md:w-full flex flex-col max-md:flex-row gap-10 mt-0 pt-0'>
                    {[1, 2, 3, 4, 5, 6].map((episode, idx) => {
                        return (
                            <div className=' flex gap-6 max-1280:flex-col items-center'>
                                <Image
                                    src={episodeDummy}
                                    alt='Dummy Episode'
                                    width={145}
                                    height={91}
                                    className=' max-1280:w-[80%] rounded-lg'
                                />
                                <div className=' flex gap-2 flex-col items-start'>
                                    <p className=' font-bold  text-xl'>
                                        Episode 2
                                    </p>
                                    <span className=' text-sm'>
                                        July 14, 2024
                                    </span>
                                    <div className=' flex gap-3'>
                                        <p className=' flex gap-2 items-center'>
                                            <span>
                                                <svg
                                                    width='24'
                                                    height='24'
                                                    viewBox='0 0 24 24'
                                                    fill='none'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                >
                                                    <path
                                                        d='M15.5799 11.9999C15.5799 13.9799 13.9799 15.5799 11.9999 15.5799C10.0199 15.5799 8.41992 13.9799 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C13.9799 8.41992 15.5799 10.0199 15.5799 11.9999Z'
                                                        stroke='#292D32'
                                                        stroke-width='1.5'
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                    />
                                                    <path
                                                        d='M11.9998 20.2697C15.5298 20.2697 18.8198 18.1897 21.1098 14.5897C22.0098 13.1797 22.0098 10.8097 21.1098 9.39973C18.8198 5.79973 15.5298 3.71973 11.9998 3.71973C8.46984 3.71973 5.17984 5.79973 2.88984 9.39973C1.98984 10.8097 1.98984 13.1797 2.88984 14.5897C5.17984 18.1897 8.46984 20.2697 11.9998 20.2697Z'
                                                        stroke='#292D32'
                                                        stroke-width='1.5'
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                    />
                                                </svg>
                                            </span>
                                            <span className=' text-base'>
                                                1234
                                            </span>
                                        </p>
                                        <p className=' flex gap-2 items-center'>
                                            <span>
                                                <svg
                                                    width='24'
                                                    height='24'
                                                    viewBox='0 0 24 24'
                                                    fill='none'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                >
                                                    <path
                                                        d='M6.00002 9H4.00002C2.89545 9 2.00002 9.89543 2.00002 11V18C2.00002 19.1046 2.89545 20 4.00002 20H6.00002C7.10459 20 8.00002 19.1046 8.00002 18V11C8.00002 9.89543 7.10459 9 6.00002 9Z'
                                                        stroke='#28303F'
                                                        stroke-width='1.5'
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                    />
                                                    <path
                                                        d='M15.8769 21H12.2111C11.4214 21 10.6494 20.7662 9.99232 20.3282L8.44532 19.2969C8.16712 19.1114 8.00002 18.7992 8.00002 18.4648V10.2656C8.00002 10.0915 8.04543 9.92052 8.13178 9.76943L12 3H13.3287C15.3255 3 16.5164 5.22536 15.4089 6.88675L14 9H19.4385C20.7396 9 21.6943 10.2228 21.3788 11.4851L19.7575 17.9701C19.3123 19.7508 17.7124 21 15.8769 21Z'
                                                        stroke='#28303F'
                                                        stroke-width='1.5'
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                    />
                                                </svg>
                                            </span>
                                            <span className=' text-base'>
                                                1234
                                            </span>
                                        </p>
                                        <p className=' flex gap-2 items-center'>
                                            <span>
                                                <svg
                                                    width='24'
                                                    height='24'
                                                    viewBox='0 0 24 24'
                                                    fill='none'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                >
                                                    <path
                                                        d='M6.00002 15H4.00002C2.89545 15 2.00002 14.1046 2.00002 13V6C2.00002 4.89543 2.89545 4 4.00002 4H6.00002C7.10459 4 8.00002 4.89543 8.00002 6V13C8.00002 14.1046 7.10459 15 6.00002 15Z'
                                                        stroke='#28303F'
                                                        stroke-width='1.5'
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                    />
                                                    <path
                                                        d='M15.8769 3H12.2111C11.4214 3 10.6494 3.23375 9.99232 3.6718L8.44532 4.70313C8.16712 4.8886 8.00002 5.20083 8.00002 5.53518V13.7344C8.00002 13.9085 8.04543 14.0795 8.13178 14.2306L12 21H13.3287C15.3255 21 16.5164 18.7746 15.4089 17.1133L14 15H19.4385C20.7396 15 21.6943 13.7772 21.3788 12.5149L19.7575 6.02986C19.3123 4.24919 17.7124 3 15.8769 3Z'
                                                        stroke='#28303F'
                                                        stroke-width='1.5'
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                    />
                                                </svg>
                                            </span>
                                            <span className=' text-base'>
                                                12
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Comics title='Related' />
        </>
    );
};

export default Prologue;