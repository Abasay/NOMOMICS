'use client';
import React, { useEffect, useRef, useState } from 'react';
import ButtonBack from '../Common/ButtonBack';
import ButtonNext from '../Common/ButtonNext';
import Viewer from '../Viewer';
import Ads from '../Ads';
import Episodes from '../Comics/Episodes';
import Comment from '../Comments';
import { useComics } from '@/app/contexts/Comics';
import Swal from 'sweetalert2';
import {
	notFound,
	useParams,
	useRouter,
	useSearchParams,
} from 'next/navigation';
import Link from 'next/link';

const ReadComic = () => {
	const [nextEpisode, setNextEpisode] = useState<number>(0);

	const { loadingComic, comic, getComic, setComments } = useComics();

	const scrollRef = useRef<HTMLDivElement | null>(null);

	const scrollLeft = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({
				left: -300,
				behavior: 'smooth',
			}); // Adjust scroll distance if needed
		}
	};

	const scrollRight = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({
				left: 300,
				behavior: 'smooth',
			}); // Adjust scroll distance if needed
		}
	};

	const router = useRouter();
	const episodeNumber = useSearchParams().get('episode');

	// const { comicId } = useParams();

	// useEffect(() => {
	// 	setComments([]);
	// 	if (comicId) {
	// 		// console.log(comicId);

	// 		getComic(comicId as string);
	// 	}
	// }, []);

	useEffect(() => {
		if (comic) {
			setNextEpisode(
				comic.episodes.findIndex(
					(episode) =>
						episode.episodeNumber ===
						Number(episodeNumber)
				)
			);
		}
	}, [comic]);

	useEffect(() => {
		if (comic)
			setNextEpisode(
				comic.episodes.findIndex(
					(episode) =>
						episode.episodeNumber ===
						Number(episodeNumber)
				)
			);
	}, [episodeNumber]);

	if (loadingComic) {
		return (
			<div className='relative mt-20'>
				{/* Skeleton Header */}
				<div className='bg-[#FAE8E6] w-full'>
					<div className='container mx-auto relative'>
						<div className='w-full py-12 flex flex-col gap-10 items-center justify-center'>
							<div className='flex flex-col gap-5 items-center justify-center'>
								<div className='h-8 w-1/3 bg-gray-200 rounded animate-pulse'></div>
								<div className='h-6 w-1/4 bg-gray-200 rounded animate-pulse'></div>
							</div>
						</div>
						<div className='w-36 h-10 bg-gray-200 rounded animate-pulse absolute bottom-12 left-12'></div>
						<div className='w-36 h-10 bg-gray-200 rounded animate-pulse absolute bottom-12 right-9'></div>
					</div>
				</div>

				<div className='container mt-10 w-[80%] overflow-x-auto overflow-y-hidden scrollbar-hide mx-auto'>
					<div className='h-40 bg-gray-200 rounded animate-pulse'></div>
					<div className='h-80 bg-gray-200 rounded animate-pulse mt-4'></div>
				</div>

				<div className='w-[90%] container mx-auto'>
					<div className='relative mb-10 flex py-16 flex-row gap-2 bg-[#FAE8E6] w-full px-14'>
						<div className='absolute left-0 top-1/3 h-8 w-8 bg-gray-200 rounded-full shadow-lg animate-pulse'></div>
						<div className='flex overflow-x-auto gap-4 scrollbar-hide'>
							{[...Array(9)].map(
								(_, index) => (
									<div
										key={
											index
										}
										className='w-24 h-36 bg-gray-200 rounded animate-pulse'
									></div>
								)
							)}
						</div>
						<div className='absolute right-0 top-1/3 h-8 w-8 bg-gray-200 rounded-full shadow-lg animate-pulse'></div>
					</div>

					<div className='h-32 bg-gray-200 rounded animate-pulse'></div>
				</div>

				<div className=' pb-12'>
					<Comment />
				</div>
			</div>
		);
	}

	if (
		!comic ||
		!comic.episodes.find(
			(e) => Number(e.episodeNumber) === Number(episodeNumber)
		)
	) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Comic not found',
		});

		return notFound();
	}

	return (
		<div className=' relative mt-20'>
			{/* Header */}
			<div className='bg-[#FAE8E6] w-full '>
				<div className='container mx-auto relative'>
					<div className=' w-full py-12 max-md:text-sm   flex flex-col gap-10 font-comic items-center justify-center'>
						<div className=' flex flex-col gap-5 items-center justify-center'>
							<h3 className=' text-5xl font-semibold max-md:text-2xl max-480:text-xl max-md:text-center tracking-widest'>
								{comic?.title}
							</h3>
							<h4 className='text-2xl max-md:text-sm tracking-widest'>
								By:{' '}
								{comic?.author}
							</h4>
							<h5 className='text-xl max-md:text-sm tracking-widest font-semibold'>
								Episode{' '}
								{episodeNumber}
							</h5>
						</div>
					</div>
					{comic.episodes[nextEpisode - 1] ? (
						<Link
							href={`/read/${
								comic._id
							}?episode=${
								comic.episodes[
									nextEpisode -
										1
								].episodeNumber
							}`}
						>
							<ButtonBack
								className='w-36 max-md:text-sm max-md:w-28 max-md:py-2 max-md:px-2 max-md:bottom-5 max-md:left-2 max- px-4 py-3 bg-secondary absolute bottom-12 left-12'
								text={`Episode ${
									comic
										.episodes[
										nextEpisode -
											1
									]
										.episodeNumber
								}
	              `}
								onClickFunc={() =>
									console.log(
										''
									)
								}
							/>
						</Link>
					) : (
						<Link
							className=''
							href={`/details/${comic._id}`}
						>
							<ButtonBack
								className='w-36 max-md:text-sm max-md:w-28 max-md:py-2 max-md:px-2 max-md:bottom-5 max-md:left-2 max- px-4 py-3 bg-secondary absolute bottom-12 left-12'
								text='prologue'
								onClickFunc={() =>
									console.log(
										''
									)
								}
							/>
						</Link>
					)}

					{nextEpisode !== -1 &&
						comic.episodes[
							nextEpisode + 1
						] && (
							<Link
								href={`/read/${
									comic._id
								}?episode=${
									comic
										.episodes[
										nextEpisode +
											1
									]
										.episodeNumber
								}`}
							>
								{' '}
								<ButtonNext
									className='w-36 max-md:text-sm max-md:w-28 max-md:py-2 max-md:px-2 px-4 py-3 max-md:bottom-5 max-md:right-2 absolute bottom-12 right-9 bg-secondary'
									text={`Episode ${
										comic
											.episodes[
											nextEpisode +
												1
										]
											.episodeNumber
									}`}
									onClickFunc={() =>
										console.log(
											''
										)
									}
								/>
							</Link>
						)}
				</div>
			</div>

			<div className='container  mt-10 w-[80%] max-480:w-full overflow-x-auto  overflow-y-hidden scrollbar-hide scroll-smooth mx-auto'>
				<Ads />
				<Viewer />
			</div>
			<div className=' w-[90%] container  mx-auto'>
				<div className=' relative mb-10 flex py-16 flex-row gap-2 bg-[#FAE8E6] w-full px-14'>
					<button
						onClick={scrollLeft}
						className='absolute left-0 top-1/3  p-2 bg-white rounded-full shadow-lg'
						name='Previous Episodes'
						title='Previous Episodes'
					>
						<svg
							width='30'
							height='30'
							viewBox='0 0 30 30'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<circle
								cx='15'
								cy='15'
								r='15'
								transform='rotate(180 15 15)'
								fill='white'
							/>
							<path
								d='M18 6.48167L11.48 13.2809C10.71 14.0839 10.71 15.3978 11.48 16.2008L18 23'
								stroke='#03215F'
								strokeWidth='1.5'
								strokeMiterlimit='10'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>
					<div
						ref={scrollRef}
						className='flex overflow-x-auto gap-4 no-scrollbar scroll-smooth scrollbar-hide '
						style={{
							scrollBehavior:
								'smooth',
						}}
					>
						{comic.episodes.map(
							(episode, index) => (
								<Episodes
									key={
										index
									}
									episode={
										episode
									}
									comic={
										comic
									}
								/>
							)
						)}
					</div>

					<button
						name='Next Episode'
						onClick={scrollRight}
						title='Previous Episode'
						className='absolute right-0 top-1/3 z-20 p-2 bg-white rounded-full shadow-lg'
					>
						<svg
							width='30'
							height='30'
							viewBox='0 0 30 30'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<circle
								cx='15'
								cy='15'
								r='15'
								fill='white'
							/>
							<path
								d='M12 23.5183L18.52 16.7191C19.29 15.9161 19.29 14.6022 18.52 13.7992L12 7'
								stroke='#03215F'
								strokeWidth='1.5'
								strokeMiterlimit='10'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>
				</div>

				<div className=' pb-12'>
					<Comment />
				</div>
			</div>
		</div>
	);
};

export default ReadComic;
