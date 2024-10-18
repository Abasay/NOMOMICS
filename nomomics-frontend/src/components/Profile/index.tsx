'use client';
import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import Sidebar from './Sidebar';
import ProfileSettings from './ProfileSettings';

const Profile = () => {
    const [active, setActive] = useState<string>('Profile Settings');
    const [sideBarActive, setSideBarActive] =
        useState<string>('Create Profile');
    return (
        <div className=' mt-4'>
            <ProfileHeader active={active} setActive={setActive} />
            <div className=' flex gap-4 bg-[#ffffff]'>
                <Sidebar
                    sideBarActive={sideBarActive}
                    setSideBarActive={setSideBarActive}
                />
                <div>
                    <ProfileSettings />
                </div>
            </div>
        </div>
    );
};

export default Profile;
