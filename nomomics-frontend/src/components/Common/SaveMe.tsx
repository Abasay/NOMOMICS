import React from 'react';

const SaveMe = (props: {
	className: string;
	text: string;
	onClickFunc: Function;
}) => {
	const { className, text, onClickFunc } = props;
	return (
		<button
			type='submit'
			className={`w-full flex items-center gap-1 justify-center py-2 transition-all  duration-500 delay-0 ease-in-out rounded-md font-bold hover:bg-secondary ${className}`}
			onClick={() => onClickFunc()}
		>
			<span>
				<svg
					width='27'
					height='28'
					viewBox='0 0 27 28'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<g clipPath='url(#clip0_2311_2837)'>
						<path
							d='M5.625 2.75H21.375C21.6734 2.75 21.9595 2.86853 22.1705 3.0795C22.3815 3.29048 22.5 3.57663 22.5 3.875V25.4109C22.5001 25.5115 22.4733 25.6102 22.4223 25.6969C22.3712 25.7836 22.2979 25.855 22.2099 25.9037C22.1219 25.9524 22.0225 25.9767 21.9219 25.9739C21.8214 25.9711 21.7234 25.9414 21.6383 25.8879L13.5 20.7838L5.36175 25.8867C5.27666 25.9402 5.17881 25.9699 5.07836 25.9727C4.97792 25.9756 4.87855 25.9514 4.79058 25.9029C4.70262 25.8543 4.62927 25.783 4.57817 25.6965C4.52707 25.61 4.50007 25.5114 4.5 25.4109V3.875C4.5 3.57663 4.61853 3.29048 4.82951 3.0795C5.04048 2.86853 5.32663 2.75 5.625 2.75ZM20.25 5H6.75V22.361L13.5 18.1299L20.25 22.361V5Z'
							fill='black'
						/>
					</g>
					<defs>
						<clipPath id='clip0_2311_2837'>
							<rect
								width='27'
								height='27'
								fill='white'
								transform='translate(0 0.5)'
							/>
						</clipPath>
					</defs>
				</svg>
			</span>
			<span>{text}</span>
		</button>
	);
};

export default SaveMe;
