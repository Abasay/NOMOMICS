import React from 'react';
import styles from '@/styles/common.module.css';

export const HeaderData = ['Profile Settings', 'Profile Showcase', 'Metrics'];
const ProfileHeader = (props: {
    active: string;
    setActive: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const { active, setActive } = props;
    return (
        <div className='bg-white mt-8 border-b-2 border-[#909090] flex items-center mx-auto justify-center w-full'>
            <div className='flex font-montserrat text-[#212121] items-center gap-8 justify-center w-full'>
                {HeaderData.map((data, index) => (
                    <div
                        onClick={() => setActive(data)}
                        className='relative cursor-pointer py-3'
                        key={index}
                    >
                        <h1
                            className={`text-[#1A1A1A] py-1 font-bold text-base ${
                                active === data
                                    ? 'text-[#1A1A1A]'
                                    : 'text-[#909090]'
                            }`}
                        >
                            {data}
                        </h1>
                        {active === data && (
                            <div
                                className={`absolute bottom-4 left-0 right-0 h-[2px] rounded-full bg-[#1A1A1A] ${styles['slide-in']}`}
                            ></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileHeader;
