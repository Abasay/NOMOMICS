const HeroLoadingSkeleton: React.FC = () => {
  return (
    <div className='bg-tertiary h-auto mt-20 py-8 px-4 lg:px-16 md:px-8 sm:px-8'>
      <div className='container mx-auto flex items-start w-full'>
        <div className='flex flex-col max-md:gap-4 gap-8 lg:w-[67%] md:w-[80%] max-md:w-full text-white'>
          {/* Title Skeleton */}
          <div className='w-3/4 h-10 bg-gray-300 rounded-md animate-pulse max-md:h-8'></div>

          {/* Genre Skeleton */}
          <div className='flex gap-6'>
            <div className='w-20 h-6 bg-gray-300 rounded-md animate-pulse max-md:w-16 max-md:h-5'></div>
            <div className='w-24 h-6 bg-gray-300 rounded-md animate-pulse max-md:w-18 max-md:h-5'></div>
          </div>

          {/* Paragraph Skeleton */}
          <div className='space-y-2'>
            <div className='w-full h-4 bg-gray-300 rounded-md animate-pulse'></div>
            <div className='w-11/12 h-4 bg-gray-300 rounded-md animate-pulse'></div>
            <div className='w-10/12 h-4 bg-gray-300 rounded-md animate-pulse'></div>
            <div className='w-9/12 h-4 bg-gray-300 rounded-md animate-pulse'></div>
          </div>

          {/* Button Skeletons */}
          <div className='flex gap-6 w-[300px]'>
            <div className='w-24 h-10 bg-gray-300 rounded-md animate-pulse'></div>
            <div className='w-24 h-10 bg-gray-300 rounded-md animate-pulse'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroLoadingSkeleton;
