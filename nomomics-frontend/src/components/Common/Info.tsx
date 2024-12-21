import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import Link from 'next/link';
import Button from './Button';

const Info = (props: { title: string; description: string }) => {
	const { title, description } = props;
	return (
		<div className='flex flex-col justify-center items-center bg-white text-center'>
			{/* Warning icon */}
			<div className=' flex flex-col gap-12 w-[85%] mt-8 items-center'>
				<span>
					<svg
						width='34'
						height='159'
						viewBox='0 0 34 159'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<rect
							x='0.265625'
							width='32.9688'
							height='105.5'
							rx='6.59375'
							fill='#F51D2C'
						/>
						<circle
							cx='16.75'
							cy='141.766'
							r='16.4844'
							fill='#F51D2C'
						/>
					</svg>
				</span>
				<h1 className='text-3xl font-semibold text-gray-900'>
					{title}
				</h1>
				<div className='bg-primary p-4 px-10 rounded-md w-[80%] '>
					<div className='flex items-center gap-6'>
						<span>
							<svg
								width='25'
								height='25'
								viewBox='0 0 25 25'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M12.75 2.25C7.22715 2.25 2.75 6.72715 2.75 12.25C2.75 17.7728 7.22715 22.25 12.75 22.25C18.2728 22.25 22.75 17.7728 22.75 12.25C22.75 6.72715 18.2728 2.25 12.75 2.25Z'
									stroke='#F51D2C'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M12.75 8.25V12.25'
									stroke='#F51D2C'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M12.75 16.25H12.74'
									stroke='#F51D2C'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</span>
						<div>
							<p
								className=' text-[#242424] font-extralight text-start'
								dangerouslySetInnerHTML={{
									__html: description,
								}}
							/>
						</div>
					</div>
				</div>
				{/* <Button
          text='OK'
          className='w-full py-6'
          onClickFunc={() => }
        /> */}
			</div>

			{/* Account Locked text */}

			{/* Description box */}

			{/* OK button */}

			{/* Contact Us link */}
			<p className='text-gray-600 mt-10'>
				Need help?{' '}
				<Link href='/contact'>
					<span className='text-orange-500 underline leading-4 tracking-wide'>
						Contact Us
					</span>
				</Link>
			</p>
		</div>
	);
};

export default Info;
