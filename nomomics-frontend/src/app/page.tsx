'use client';
import About from '@/components/About';
import Comics from '@/components/Comics';
import AutoSlidingCarousel from '@/components/Comics/Slider';
import Events from '@/components/Events';
import Footer from '@/components/Footer';
import Header from '@/components/Headers';
import HomeHero from '@/components/Hero/HomeHero';
import Image from 'next/image';
import React, { Suspense } from 'react';

export default function Home() {
	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<Header />
				<HomeHero />
				<AutoSlidingCarousel />

				<Comics title='New Release' />
				<Events />
				<Comics title='Most Viewed' />
				<Comics title='Free Comics' />
				<About />
				<Footer />
			</Suspense>
		</>
	);
}
