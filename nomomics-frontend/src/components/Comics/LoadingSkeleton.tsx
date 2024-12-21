import React from 'react';
import './index.css';

interface Props {
  title: string;
}

const LoadingSkeleton: React.FC = () => {
  // Simulating an array for grid items
  const dummyArr = new Array(8).fill(null);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className='container mx-auto flex flex-col gap-8 pt-20 pb-10'>
      {/* Title Placeholder */}
      <div className='max-md:text-2xl max-480:text-xl text-4xl font-comic tracking-widest font-bold w-[90%] mx-auto bg-gray-500 h-10 rounded-md animate-pulse flex items-center justify-center'>
        <span className='text-gray-400 text-2xl font-semibold flex space-x-1'>
          {'Nomomics'.split('').map((letter, index) => (
            <span
              key={index}
              className={`animate-bounce-letter text-`}
              style={{
                animationDelay: `${index * 0.2}s`,
                color: getRandomColor(),
              }}
            >
              {letter}
            </span>
          ))}
        </span>
      </div>

      {/* Grid of Loading Boxes */}
      <div className='grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-10 w-[90%] mx-auto max-md:w-[95%] max-480:flex max-480:gap-3 max-480:overflow-scroll max-480:scroll-smooth'>
        {dummyArr.map((_, index) => (
          <div
            key={index}
            className='relative cursor-pointer min-w-[150px] max-[380px]:min-w-[50px] max-md:min-h-[100px] max-w-[170px] min-h-[150px] bg-gray-400 animate-pulse rounded-lg flex items-center justify-center'
          >
            <span className='text-gray-400 text-lg font-semibold flex space-x-1'>
              {'Nomomics'.split('').map((letter, letterIndex) => (
                <span
                  key={letterIndex}
                  className='animate-bounce-letter'
                  style={{
                    animationDelay: `${letterIndex * 0.2}s`,
                    color: getRandomColor(),
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
