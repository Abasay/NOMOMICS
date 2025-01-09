import Profile from '@/components/Profile';
import React from 'react';

const UserProfile = () => {
  return (
    <div className=' bg-[#F5F7FA] dark:bg-slate-800 dark:text-gray-200 text-slate-800 py-12'>
      <div className=' mt-20 xl:w-[80%] w-[90%]  mx-auto'>
        <Profile />
      </div>
    </div>
  );
};

export default UserProfile;
