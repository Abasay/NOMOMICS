import React from 'react';

const Button1 = (props: {
	className: string;
	text: string;
	onClickFunc: Function;
}) => {
	const { className, text, onClickFunc } = props;
	return (
		<button
			type='submit'
			className={`w-full justify-center flex items-center gap-1 text-[#F2F6FF] py-2 transition-all  duration-500 delay-0 ease-in-out rounded-md font-bold hover:bg-secondary ${className}`}
			onClick={() => onClickFunc()}
		>
			<span>{text}</span>
			<span>
				<svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008'
						stroke='white'
						strokeWidth='1.5'
						strokeMiterlimit='10'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</span>
		</button>
	);
};

export default Button1;
