'use client';
import React, { useEffect, useState } from 'react';
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
import TransactionHistory from './Monetization/TransactionHistory';
import ConverterForm from './Monetization/Converter';
import FileUpload from './ContentManagement/FileUpload';
import Draft from './ContentManagement/Draft';
import { useProfile } from '@/app/contexts/Profile';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import ContentManagement from './ContentManagement';

const Profile = () => {
  const isLoggedIn = Cookies.get('isLoggedIn');
  const token = Cookies.get('token');
  const router = useRouter();
  const { updateProfile } = useProfile();

  if (!isLoggedIn) {
    router.push('/signin');
  }

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/signin');
    }
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/user/get-user`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setIsCreator(data.data.user.role === 'Creator');
        // if (data.data.user.role === 'Creator')
        //   setHeaderData(['Profile Settings', 'Portfolio Showcase', 'Metrics']);
        updateProfile(data.data.user);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const [active, setActive] = useState<string>('Profile Settings');
  const [isCreator, setIsCreator] = useState<boolean>(false);
  const [HeaderData, setHeaderData] = useState<string[]>([
    'Profile Settings',
    'Portfolio Showcase',
    'Metrics',
  ]);

  const [sideBarActive, setSideBarActive] = useState<string>('Create Profile');

  return (
    <div className=' mt-4 font-inter w-full'>
      <ProfileHeader
        active={active}
        setActive={setActive}
        HeaderData={HeaderData}
      />
      <div className=' flex max-md:flex-col gap-4 bg-[#ffffff]  border-teal-950'>
        <div className=' w-full md:max-w-[300px] md:border-r-2 border-[#909090]'>
          <Sidebar
            sideBarActive={sideBarActive}
            setSideBarActive={setSideBarActive}
            setHeaderData={setHeaderData}
            setActive={setActive}
            isCreator={isCreator}
          />
        </div>

        {active === 'Profile Settings' && (
          <div className={`w-full ${styles['fade-in']} overflow-auto`}>
            <ProfileSettings isCreator={isCreator} />
          </div>
        )}

        {active === 'Portfolio Showcase' && isCreator && (
          <div className={`w-full  ${styles['fade-in']} overflow-auto`}>
            <PortFolio />
          </div>
        )}
        {active === 'Metrics' && isCreator && (
          <div className={`w-full ${styles['fade-in']} overflow-auto`}>
            <Metrics />
          </div>
        )}

        {active === 'Earn Overview' && isCreator && (
          <div
            className={`w-full  overflow-auto py-10 items-center px-8 flex flex-col gap-8 ${styles['fade-in']}`}
          >
            <div className=' w-full flex min-w-min flex-wrap items-center gap-8'>
              <div className='  border'>
                <BalanceOverview
                  cashAmount={35000}
                  tokenAmount={5000}
                  coinAmount={35000}
                />
              </div>
              <div className=' min-w-[300px] max-w-[400px]'>
                <WatchlistCard />
              </div>
            </div>
            <div className=' min-w-[700px] max-w-lg'>
              <TransactionTable />
            </div>
          </div>
        )}
        {active === 'Payment' && <BillingForm />}
        {active === 'History' && <TransactionHistory />}
        {active === 'Convert' && isCreator && <ConverterForm />}
        {active === 'Upload' && isCreator && <ContentManagement />}
        {active === 'Draft' && isCreator && <Draft />}
      </div>
    </div>
  );
};

export default Profile;
