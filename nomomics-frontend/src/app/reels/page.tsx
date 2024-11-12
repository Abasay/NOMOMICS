import GenreFilter from '@/components/ReelFlows/GenreFilter';
import VideoCard from '@/components/ReelFlows/VideoCard';
import React from 'react';
import reelImg from '@/public/images/reel.png';
import avatar from '@/public/images/avatar.png';

const Reels = () => {
  // Example data
  const videos = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    author: 'Alan Cooper',
    views: '15K',
    timestamp: '1 week ago',
    thumbnail: reelImg,
    avatar: avatar,
  }));

  return (
    <div className='min-h-screen container mx-auto p-4'>
      <GenreFilter />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16'>
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            title={video.title}
            author={video.author}
            views={video.views}
            timestamp={video.timestamp}
            thumbnail={video.thumbnail}
            avatar={video.avatar}
          />
        ))}
      </div>
    </div>
  );
};
export default Reels;
