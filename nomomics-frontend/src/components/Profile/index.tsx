'use client';
import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import Sidebar from './Sidebar';
import ProfileSettings from './ProfileSettings';
import PortFolio from './PortFolio';
import Overview from './Metrics/Overview';
import Metrics from './Metrics';

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
                {/* <div className=' w-full'>
                    <ProfileSettings />
                </div> */}
                {/* <div className=' w-full'>
                    <PortFolio />
                </div> */}
                <div className=' w-full bg-[#FAFAFA]'>
                    <div className=' w-full'>
                        <Metrics />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
