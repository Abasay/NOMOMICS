import React from 'react';
import Overview from './Overview';
import Engagements from './Engagements';
import Followers from './Followers';

const Metrics = () => {
  return (
    <div className=' py-10 px-10 min-w-min flex flex-col gap-10 w-full'>
      <div className=' w-full flex flex-wrap gap-6'>
        <Overview />
        <Engagements />
      </div>
      <div className=''>
        <Followers />
      </div>
    </div>
  );
};

export default Metrics;
