import React from 'react';

const CarouselLoadingSkeleton: React.FC = () => {
  const dummyArr = Array(25).fill(null); // Placeholder array for loading skeletons

  return (
    <div className='w-[90%] mt-20 container mx-auto'>
      <div className='slider'>
        <div className='slides gap-4 flex'>
          {dummyArr.map((_, index) => (
            <div
              key={index}
              className='slide relative border min-w-[150px] max-w-[170px] min-h-[100px] max-h-[180px] bg-gray-300 animate-pulse rounded-md'
            >
              {/* Image Placeholder */}
              <div className='h-full w-full bg-gray-300 rounded-md'></div>

              {/* Text Placeholder */}
              <div className='absolute bottom-0 rounded-b-lg bg-black bg-opacity-65 w-full p-2 flex flex-col gap-1'>
                <div className='bg-gray-400 h-4 w-3/4 rounded animate-pulse'></div>
                <div className='bg-gray-400 h-3 w-1/2 rounded animate-pulse'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselLoadingSkeleton;
