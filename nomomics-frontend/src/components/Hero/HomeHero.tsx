'use client';
import React, { useEffect, useState } from 'react';
import Button from '../Common/Button';
import Button1 from '../Common/Button1';
import SaveMe from '../Common/SaveMe';
import styles from '@/styles/common.module.css';
import { useComics } from '@/app/contexts/Comics';
import HeroLoadingSkeleton from './HeroLoadingSkeleton';
import Image from 'next/image';
import bg from './background.png';
import { Comic } from '@/types/comic';
import Link from 'next/link';
import { capitalizeFirstLetter } from '@/libs/capitalize';

const HomeHero = () => {
	const [comic, setComic] = useState<Comic>({} as any);

	const { homeComic } = useComics();
	console.log(homeComic);

	if (!homeComic) return <HeroLoadingSkeleton />;

	return (
		<div className=' relative min-h-[550px] flex flex-col  mx-auto justify-center max-h-[700px]  max-480:min-h-[386px] max-480:max-h-[500px] max-md:min-h-[450px] '>
			<div
				className={`  relative min-h-[386px] flex flex-col container mx-auto justify-center max-h-[500px] mt-20 py-8 px-4 lg:px-16 md:px-8 sm:px-8 `}
			>
				<div>
					<div className=' container absolute top-16 z-20 bg-none mx-auto flex items-start '>
						<div
							className={` flex flex-col max-md:gap-4 gap-8 lg:w-[67%] md:w-[80%] max-md:w-full  text-white ${styles['fade-in']} `}
						>
							<h1 className='text-6xl max-md:text-3xl font-bold font-comic'>
								{
									homeComic.title
								}
							</h1>
							<div className=' max-md:text-sm text-opacity-80 text-white tracking-widest flex gap-6 text-[18px] font-openSans font-bold items-center'>
								<span className='  bg-none border-primary border px-2 rounded-md min-w-fit'>
									{capitalizeFirstLetter(
										homeComic.category
									)}
								</span>
								<span className='  bg-none border-primary border px-2 rounded-md min-w-fit'>
									{capitalizeFirstLetter(
										homeComic.genre
									)}
								</span>
							</div>
							<p className='font-openSans max-md:text-sm min-w-fit text-pretty px-4 text-white font-semibold tracking-widest leading-6 text-opacity-80'>
								{homeComic.synopsis
									.split(
										' '
									)
									.slice(
										0,
										40
									)
									.join(
										' '
									)}
								{homeComic.synopsis.split(
									' '
								).length > 40
									? '...'
									: ''}
								{/* {homeComic.synopsis} */}
							</p>
							<div className=' flex gap-6 w-[300px]'>
								<Link
									href={`/details/${homeComic._id}`}
									className=' w-full'
								>
									{' '}
									<Button1
										text='Read me'
										className=' bg-primary'
										onClickFunc={() =>
											console.log(
												'u'
											)
										}
									/>
								</Link>
								<SaveMe
									text='Save Me'
									className=' bg-white hover:text-white text-black'
									onClickFunc={() =>
										console.log(
											'u'
										)
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Image
				src={homeComic.coverImage}
				alt='Home Hero'
				width={300}
				height={500}
				className=' w-full h-full  left-0 absolute top-0'
			/>
			<div className=' absolute top-0 w-full h-full bg-black bg-opacity-40 z-10 left-0'></div>
		</div>
	);
};

export default HomeHero;
