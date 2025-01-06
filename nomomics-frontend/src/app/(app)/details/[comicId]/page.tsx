import Image from 'next/image';
import React from 'react';
import heroDetail from '@/public/images/hero-detail.png';
import Details from '@/components/Comics/Details';

const DetailsPage = () => {
  return (
    <div className='container mx-auto'>
      <Details />
    </div>
  );
};

export default DetailsPage;
