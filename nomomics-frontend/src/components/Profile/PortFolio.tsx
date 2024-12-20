import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import dummy from '@/public/images/dummy.jpg';

const PortFolio = () => {
  const dummyArr = [1, 2, 3, 6];

  return (
    <div className=' w-full py-10 px-10 pb-48'>
      <div className=' max-h-[100vh] overflow-auto'>
        <div className='grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-10 w-[90%] mx-auto max-md:w-[95%]'>
          {dummyArr.map((_, index) => (
            <Link
              href={'/details'}
              className='relative cursor-pointer min-w-[150px] max-[380px]:min-w-[50px] max-md:min-h-[100px] max-w-[170px] min-h-[150px]'
              key={index}
            >
              <Image
                src={dummy}
                alt='Dummy'
                width={200}
                height={250}
                className='w-full object-cover rounded-lg'
              />
              <div className='w-full rounded-b-lg text-xs text-white px-2 absolute bottom-0 flex flex-col gap-1 bg-black bg-opacity-65 pt-2 tracking-widest font-trebuchet'>
                <h3>Spiderman</h3>
                <h4>Jone Stone</h4>
                <div className='flex items-center justify-between'>
                  <div className='text-[10px] leading-3 flex items-center gap-1'>
                    <p>Reviews</p>
                    <p className='flex items-center gap-0.5'>
                      <span>
                        <svg
                          width='14'
                          height='14'
                          viewBox='0 0 14 14'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M8.00887 2.04754L9.03554 4.10087C9.17554 4.38671 9.54887 4.66087 9.86387 4.71337L11.7247 5.02254C12.9147 5.22087 13.1947 6.08421 12.3372 6.93587L10.8905 8.38254C10.6455 8.62754 10.5114 9.10004 10.5872 9.43837L11.0014 11.2292C11.328 12.6467 10.5755 13.195 9.32137 12.4542L7.5772 11.4217C7.2622 11.235 6.74304 11.235 6.4222 11.4217L4.67804 12.4542C3.4297 13.195 2.67137 12.6409 2.99804 11.2292L3.4122 9.43837C3.48804 9.10004 3.35387 8.62754 3.10887 8.38254L1.6622 6.93587C0.810536 6.08421 1.0847 5.22087 2.2747 5.02254L4.13554 4.71337C4.4447 4.66087 4.81804 4.38671 4.95804 4.10087L5.9847 2.04754C6.5447 0.933372 7.4547 0.933372 8.00887 2.04754Z'
                            stroke='#FBA700'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </span>
                      <span className='text-[10px] leading-3'>4.5</span>
                    </p>
                  </div>
                  <div className=' flex flex-col gap-0 pb-1 items-center'>
                    <span className='text-[10px] leading-3'>100</span>
                    <span className='text-[10px] leading-3'>Comments</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortFolio;
