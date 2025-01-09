import React, { useState } from 'react';
import styles from '@/styles/common.module.css';

// export const HeaderData =
const ProfileHeader = (props: {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  HeaderData: string[];
  notificationCount: number;
  draftCount: number;
}) => {
  const { active, setActive, HeaderData, notificationCount, draftCount } = props;
  const [track, setTrack] = useState<boolean>(false);
  return (
    <div className='bg-white dark:bg-slate-300 px-3 h-16 mt-8 border-b-2 border-[#909090] flex items-center mx-auto justify-center w-full'>
      <div
        className={`flex font-montserrat text-[#212121] items-center gap-8 justify-center w-full ${styles['slide-in-from-right']} `}
      >
        {HeaderData.map((data, index) => (
          <div
            onClick={() => setActive(data)}
            className={`relative cursor-pointer py-3 ${styles['slide-in-from-right']}`}
            key={index}
          >
            <h1
              className={`text-[#1A1A1A] tracking-wider py-1 font-bold max-md:text-sm text-base ${
                active === data ? 'text-[#1A1A1A] dark:text-gray-900' : 'text-[#909090] dark:text-gray-600'
              } ${styles['slide-in-from-right']}`}
            >
              <span className=' flex gap-1 mb-1'>
                {data}
                {data === 'Draft' && (
                  <span className='text-xs bg-primary  text-white dark:text-gray-800 rounded-full px-2 grid place-items-center'>
                    {draftCount}
                  </span>
                )}
                {data === 'Notification' && (
                  <span className='text-xs bg-primary text-white dark:text-gray-800 rounded-full px-2 grid place-items-center'>
                    {notificationCount}
                  </span>
                )}
              </span>
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
