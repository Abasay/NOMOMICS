'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dummy from '@/public/images/dummy.jpg';
import './index.css';
import { useComics } from '@/app/contexts/Comics';
import CarouselLoadingSkeleton from './SliderLoader';

const AutoSlidingCarousel = () => {
	const dummyArr = Array(25).fill(null); // Replace with your actual data if needed

	const { comics } = useComics();

	if (comics.length === 0) {
		return <CarouselLoadingSkeleton />;
	}
	return (
		<div className='w-[90%] mt-10 container mx-auto'>
			<div className='slider '>
				<div className='slides gap-4'>
					{comics.map((comic, index) => (
						<Link
							href={'/details'}
							key={index}
							className='slide relative border min-w-[150px] max-w-[170px] min-h-[150px] max-h-[180px] '
						>
							<Image
								src={
									comic.coverImage ||
									dummy
								} //Nomomics
								alt='dummy'
								width={200}
								height={250}
								className='rounded-md  h-full object-cover'
							/>
							{/* <div className='  top-0 z-10 h-full w-full hidden hover:absolute transition-all delay-0 duration-500 '></div> */}
							<div className='text-white text-sm z-15 absolute bottom-0 rounded-b-lg bg-black bg-opacity-65 w-full p-2'>
								<h3 className=' text-xs tracking-wide'>
									{
										comic.title
									}
								</h3>
								<h4 className=' text-[10px] leading-[10px]'>
									{
										comic.author
									}
								</h4>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default AutoSlidingCarousel;
