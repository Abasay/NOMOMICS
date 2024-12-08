// app/layout.tsx
'use client';
import React, { useState, useEffect } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import LoadingScreen from '@/components/Common/LoadingScreen';
import { Toaster } from 'react-hot-toast';
import { ProfileProvider } from './contexts/Profile';
import { ComicsProvider } from './contexts/Comics';

const roboto = Inter({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

// export const metadata: Metadata = {
//   title: 'NOMOMICS',
//   description: 'Nomomics | Latest Comics',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => setLoading(false), 4000); // Adjust duration if necessary
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <html lang='en'>
      <body>
        {/* {loading ? (
          <LoadingScreen />
        ) : ( */}
        <div className={`${roboto} antialiased`}>
          {/* Your layout structure */}
          {/* <div className=' absolute top-0 z-50'> */}
          <Toaster
            position='top-center'
            reverseOrder={false}
            gutter={8}
            containerClassName=''
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: '',
              duration: 5000,
              style: {
                background: '#363636',
                color: '#fff',
                zIndex: 10000,
              },

              // Default options for specific types
              success: {
                duration: 3000,
                // theme: {
                //     primary: 'green',
                //     secondary: 'black',
                // },
              },
            }}
          />
          {/* </div> */}
          <ProfileProvider>
            <ComicsProvider>{children}</ComicsProvider>
          </ProfileProvider>
        </div>
        {/* )} */}
      </body>
    </html>
  );
}
