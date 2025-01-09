import Image from 'next/image';
import React from 'react';
import episodeDummy from '@/public/images/episode-dummy.png';
import { useComics } from '@/app/contexts/Comics';
import Link from 'next/link';
import { Comic } from '@/types/comic';

const Episodes = (props: {
  episode: {
    episodeNumber: number;
    episodeTitle: string;
    // episodeDescription: string;
    episodeFileUrl: string[];
    episodeCoverImage: string;
    dateUploaded: string;
    filesType: string;
    _id: string;
  };
  comic: Comic;
}) => {
  const { episode, comic } = props;
  const { comments } = useComics();
  return (
    <Link
      href={`/read/${comic._id}?episode=${episode.episodeNumber}`}
      className=' flex gap-6 min-w-[400px] max-1024:min-w-[200px] max-1024:max-w-[250px] max-w-[400px] min-h-[200px] max-h-[300px] max-1280:flex-col items-center text-black dark:text-gray-800'
    >
      <Image
        src={episode.episodeCoverImage}
        alt='Dummy Episode'
        width={145}
        height={91}
        className=' w-full max-w-[150px] min-w-[100px] min-h-[100px] max-h-[100px]  rounded-lg'
      />
      <div className=' flex gap-2 flex-col items-start'>
        <p className=' font-bold  text-xl'>Episode {episode.episodeNumber}</p>
        <span className=' text-sm'>
          {new Date(episode.dateUploaded ? episode.dateUploaded : Date.now()).toLocaleDateString()}
        </span>
        <div className=' flex gap-3'>
          <p className=' flex gap-2 items-center'>
            <span>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M15.5799 11.9999C15.5799 13.9799 13.9799 15.5799 11.9999 15.5799C10.0199 15.5799 8.41992 13.9799 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C13.9799 8.41992 15.5799 10.0199 15.5799 11.9999Z'
                  stroke='#292D32'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M11.9998 20.2697C15.5298 20.2697 18.8198 18.1897 21.1098 14.5897C22.0098 13.1797 22.0098 10.8097 21.1098 9.39973C18.8198 5.79973 15.5298 3.71973 11.9998 3.71973C8.46984 3.71973 5.17984 5.79973 2.88984 9.39973C1.98984 10.8097 1.98984 13.1797 2.88984 14.5897C5.17984 18.1897 8.46984 20.2697 11.9998 20.2697Z'
                  stroke='#292D32'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </span>
            <span className=' text-base'>1234</span>
          </p>
          <p className=' flex gap-2 items-center'>
            <span>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M6.00002 9H4.00002C2.89545 9 2.00002 9.89543 2.00002 11V18C2.00002 19.1046 2.89545 20 4.00002 20H6.00002C7.10459 20 8.00002 19.1046 8.00002 18V11C8.00002 9.89543 7.10459 9 6.00002 9Z'
                  stroke='#28303F'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M15.8769 21H12.2111C11.4214 21 10.6494 20.7662 9.99232 20.3282L8.44532 19.2969C8.16712 19.1114 8.00002 18.7992 8.00002 18.4648V10.2656C8.00002 10.0915 8.04543 9.92052 8.13178 9.76943L12 3H13.3287C15.3255 3 16.5164 5.22536 15.4089 6.88675L14 9H19.4385C20.7396 9 21.6943 10.2228 21.3788 11.4851L19.7575 17.9701C19.3123 19.7508 17.7124 21 15.8769 21Z'
                  stroke='#28303F'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </span>
            <span className=' text-base'>1234</span>
          </p>
          <p className=' flex gap-2 items-center'>
            <span>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M6.00002 15H4.00002C2.89545 15 2.00002 14.1046 2.00002 13V6C2.00002 4.89543 2.89545 4 4.00002 4H6.00002C7.10459 4 8.00002 4.89543 8.00002 6V13C8.00002 14.1046 7.10459 15 6.00002 15Z'
                  stroke='#28303F'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M15.8769 3H12.2111C11.4214 3 10.6494 3.23375 9.99232 3.6718L8.44532 4.70313C8.16712 4.8886 8.00002 5.20083 8.00002 5.53518V13.7344C8.00002 13.9085 8.04543 14.0795 8.13178 14.2306L12 21H13.3287C15.3255 21 16.5164 18.7746 15.4089 17.1133L14 15H19.4385C20.7396 15 21.6943 13.7772 21.3788 12.5149L19.7575 6.02986C19.3123 4.24919 17.7124 3 15.8769 3Z'
                  stroke='#28303F'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </span>
            <span className=' text-base'>{comments.length}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Episodes;
