import React from 'react';

const PrevArrow = () => {
	return (
		<>
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
		</>
	);
};

export default PrevArrow;
