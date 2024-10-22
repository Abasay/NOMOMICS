'use client';
import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import Sidebar from './Sidebar';
import ProfileSettings from './ProfileSettings';
import PortFolio from './PortFolio';
import Overview from './Metrics/Overview';
import Metrics from './Metrics';
import styles from '@/styles/common.module.css';
import BalanceOverview from './Monetization/EarnOverview';
import WatchlistCard from './Monetization/WatchList';
import TransactionTable from './Monetization/EarnTable';
import BillingForm from './Monetization/Payment';

const Profile = () => {
    const [active, setActive] = useState<string>('Profile Settings');
    const [HeaderData, setHeaderData] = useState<string[]>([
        'Profile Settings',
        'Portfolio Showcase',
        'Metrics',
    ]);
    const [sideBarActive, setSideBarActive] =
        useState<string>('Create Profile');
    return (
        <div className=' mt-4 w-full'>
            <ProfileHeader
                active={active}
                setActive={setActive}
                HeaderData={HeaderData}
            />
            <div className='w-full flex gap-4 bg-[#ffffff]'>
                <div className=' w-full max-w-[250px] border-r-2 border-[#909090]'>
                    <Sidebar
                        sideBarActive={sideBarActive}
                        setSideBarActive={setSideBarActive}
                        setHeaderData={setHeaderData}
                        setActive={setActive}
                    />
                </div>
                <div></div>

                {active === 'Profile Settings' && (
                    <div className={`w-full ${styles['fade-in']}`}>
                        <ProfileSettings />
                    </div>
                )}

                {active === 'Portfolio Showcase' && (
                    <div className={`w-full ${styles['fade-in']}`}>
                        <PortFolio />
                    </div>
                )}
                {active === 'Metrics' && (
                    <div className=' w-full bg-[#FAFAFA]'>
                        <div className={`w-full ${styles['fade-in']}`}>
                            <Metrics />
                        </div>
                    </div>
                )}

                <div className=' w-full bg-[#FAFAFA]'>
                    {active === 'Earn Overview' && (
                        <div
                            className={`w-full py-10 items-center px-8 flex flex-col gap-8 ${styles['fade-in']}`}
                        >
                            <div className=' w-full flex items-center gap-8'>
                                <div className=' w-full'>
                                    <BalanceOverview
                                        cashAmount={35000}
                                        tokenAmount={5000}
                                        coinAmount={35000}
                                    />
                                </div>
                                <div className=' w-[70%]'>
                                    <WatchlistCard />
                                </div>
                            </div>
                            <div className=' w-full'>
                                <TransactionTable />
                            </div>
                        </div>
                    )}
                    {active === 'Payment' && <BillingForm />}
                </div>
            </div>
        </div>
    );
};

export default Profile;
