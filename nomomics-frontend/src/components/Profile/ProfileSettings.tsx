import Image from 'next/image';
import React from 'react';
import profileImg from '@/public/images/profile.png';
import Button from '../Common/Button';

const ProfileSettings = () => {
    return (
        <div className=' flex flex-col w-full border px-10 py-10 gap-8 pb-48'>
            <div className='flex gap-3 items-center w-full '>
                <Image
                    src={profileImg}
                    alt='Profile Image'
                    width={100}
                    height={100}
                    className=' w-[100px] h-[100px] rounded-full'
                />
                <div className='  justify-between flex w-full'>
                    <div className='flex gap-3 flex-col'>
                        <h1 className=' tracking-wider font-bold'>
                            Alexa Rawles
                        </h1>
                        <h3 className=' text-[#909090] tracking-wider'>
                            alexarawles@gmail.com
                        </h3>
                    </div>
                    <div className=' w-20'>
                        <Button
                            text='Edit'
                            onClickFunc={() => console.log('u clicked me')}
                            className=' w-10'
                        />
                    </div>
                </div>
            </div>
            <div className=' flex flex-col gap-8 w-full'>
                <div className=' flex gap-8 justify-between w-full items-center'>
                    <div className=' flex flex-col gap-2 w-full'>
                        <label
                            htmlFor='firstName'
                            className=' text-[16px] leading-6 '
                        >
                            First Name
                        </label>
                        <input
                            type='text'
                            name='firstName'
                            placeholder='Your First Name'
                            className=' w-full outline-none py-2 px-2 bg-[#F9F9F9] rounded-md placeholder:text-[#bdbdbd]'
                        />
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <label
                            htmlFor='nickName'
                            className=' text-[16px] leading-6'
                        >
                            Nick Name
                        </label>
                        <input
                            type='text'
                            name='nickName'
                            placeholder='Your Nick Name'
                            className=' w-full outline-none py-2 px-2 bg-[#F9F9F9] rounded-md placeholder:text-[#bdbdbd]'
                        />
                    </div>
                </div>
                <div className=' flex gap-8 justify-between w-full items-center'>
                    <div className=' flex flex-col gap-2 w-full'>
                        <label
                            htmlFor='gender'
                            className=' text-[16px] leading-6 '
                        >
                            Gender
                        </label>

                        <select
                            name='gender'
                            title='gender'
                            className=' w-full text-[#bdbdbd] outline-none py-3 px-2 bg-[#F9F9F9] rounded-md placeholder:text-[#bdbdbd]'
                        >
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <label
                            htmlFor='country'
                            className=' text-[16px] leading-6 '
                        >
                            Country
                        </label>

                        <select
                            name='country'
                            title='country'
                            className=' w-full text-[#bdbdbd] outline-none py-3 px-2 bg-[#F9F9F9] rounded-md placeholder:text-[#bdbdbd]'
                        >
                            <option value='nigeria'>Nigeria</option>
                            <option value='ghana'>Ghana</option>
                        </select>
                    </div>
                </div>
                <div className=' flex gap-8 justify-between w-full items-center'>
                    <div className=' flex flex-col gap-2 w-full'>
                        <label
                            htmlFor='language'
                            className=' text-[16px] leading-6 '
                        >
                            Language
                        </label>

                        <select
                            name='language'
                            title='language'
                            className=' w-full text-[#bdbdbd] outline-none py-3 px-2 bg-[#F9F9F9] rounded-md placeholder:text-[#bdbdbd]'
                        >
                            <option value='male'>English</option>
                            <option value='female'>Igbo</option>
                            <option value='female'>Yoruba</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <label
                            htmlFor='country'
                            className=' text-[16px] leading-6 '
                        >
                            Email Address
                        </label>

                        <input
                            type='text'
                            name='email'
                            placeholder='Your Email'
                            className=' w-full outline-none py-2 px-2 bg-[#F9F9F9] rounded-md placeholder:text-[#bdbdbd]'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
