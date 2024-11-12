'use client';
// components/LoadingScreen.js
import React, { useState, useEffect } from 'react';
import styles from './LoadingScreen.module.css'; // CSS module for styling
import SignUpLogo from '@/public/svgs/signup-logo-1.svg';
import Image from 'next/image';

const LoadingScreen = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 3000); // Simulating a 3-second load time
    return () => clearTimeout(timer);
  }, []);

  if (isLoaded) return null; // Hide the loading screen after loading

  return (
    <div className={`${styles.loadingScreen}`}>
      <Image
        src={SignUpLogo}
        alt='Website Logo'
        width={700}
        height={500}
        className={styles.logoAnimation}
      />
    </div>
  );
};

export default LoadingScreen;
