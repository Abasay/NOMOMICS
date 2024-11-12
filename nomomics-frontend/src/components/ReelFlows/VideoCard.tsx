import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface VideoCardProps {
  title: string;
  author: string;
  views: string;
  timestamp: string;
  thumbnail: StaticImageData;
  avatar: StaticImageData;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  author,
  views,
  timestamp,
  thumbnail,
  avatar,
}) => {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <Image
        src={thumbnail}
        alt='Thumbnail'
        width={300}
        height={200}
        className='w-full h-48 object-cover'
      />
      <div className='p-4'>
        <h2 className='text-md font-semibold text-gray-800'>{title}</h2>
        <div className='flex items-center space-x-2 mt-2'>
          <Image
            src={avatar}
            alt='Author'
            width={24}
            height={24}
            className='w-6 h-6 rounded-full'
          />
          <div className='text-sm text-gray-600'>{author}</div>
        </div>
        <div className='text-sm text-gray-500'>
          {views} Views • {timestamp}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
