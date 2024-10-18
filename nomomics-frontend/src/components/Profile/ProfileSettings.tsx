import Image from 'next/image';
import React from 'react';
import profileImg from '@/public/images/profile.png';
import Button from '../Common/Button';

const ProfileSettings = () => {
    return (
        <div className=' flex flex-col px-10 py-10'>
            <div className='flex gap-3 items-center'>
                <Image
                    src={profileImg}
                    alt='Profile Image'
                    width={100}
                    height={100}
                    className=' w-[100px] h-[100px] rounded-full'
                />
                <div className='  w-full justify-between'>
                    <div className='flex gap-3 flex-col'>
                        <h1 className=' tracking-wider font-bold'>
                            Alexa Rawles
                        </h1>
                        <h3 className=' text-[#909090] tracking-wider'>
                            alexarawles@gmail.com
                        </h3>
                    </div>
                    <div>
                        <Button
                            text='Edit'
                            onClickFunc={() => console.log('u clicked me')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
