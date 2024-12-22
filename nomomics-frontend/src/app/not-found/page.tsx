'use client';
import Link from 'next/link';
import React, { Suspense } from 'react';

const NotFound = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div style={{ textAlign: 'center', marginTop: '50px' }}>
				<h1>404 - Page Not Found</h1>
				<p>
					Sorry, the page you are looking for does
					not exist.
				</p>
				<Link href='/'>Go back to Home</Link>
			</div>
		</Suspense>
	);
};

export default NotFound;
