'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/svgs/signup-logo-1.svg';

const Footer = () => {
	return (
		<>
			<footer className='relative z-10 bg-[#ff8702] font-inter text-black pt-10 md:pt-16 lg:pt-16'>
				<div className='container mx-auto'>
					<div className=' flex flex-row flex-wrap gap-8 justify-between w-[90%] mx-auto'>
						<div className=' max-w-[250px] px-4 '>
							<div className='mb-6'>
								<Link
									href='/'
									className='mb-8 w-[150px] inline-block'
								>
									<Image
										src={
											logo
										}
										alt='logo'
										className='w-full dark:hidden'
										width={
											140
										}
										height={
											30
										}
									/>
								</Link>
								{/* <a href="mailto:"></a> */}
								<Link href={'mailto:nomomics@gmail.com'} className='mb-6 pl-3 font-roboto text-base flex items-center gap-3 leading-relaxed text-body-color dark:text-body-color-dark'>
									<span>
										<svg
											width='24'
											height='24'
											viewBox='0 0 24 24'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M16.939 3C18.28 3 19.57 3.53 20.519 4.481C21.469 5.43 22 6.71 22 8.05V15.95C22 18.74 19.73 21 16.939 21H7.06C4.269 21 2 18.74 2 15.95V8.05C2 5.26 4.259 3 7.06 3H16.939ZM18.07 8.2C17.86 8.189 17.66 8.26 17.509 8.4L13 12C12.42 12.481 11.589 12.481 11 12L6.5 8.4C6.189 8.17 5.759 8.2 5.5 8.47C5.23 8.74 5.2 9.17 5.429 9.47L5.56 9.6L10.11 13.15C10.67 13.59 11.349 13.83 12.06 13.83C12.769 13.83 13.46 13.59 14.019 13.15L18.53 9.54L18.61 9.46C18.849 9.17 18.849 8.75 18.599 8.46C18.46 8.311 18.269 8.22 18.07 8.2Z'
												fill='#FF5555'
											/>
										</svg>
									</span>
									<span>
										Nomomics.Com
									</span>
								</Link>
								<Link href={'tel:'} className='mb-6 font-roboto pl-3 flex items-center gap-3 text-base leading-relaxed text-body-color dark:text-body-color-dark'>
									<span>
										<svg
											width='24'
											height='24'
											viewBox='0 0 24 24'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												fillRule='evenodd'
												clipRule='evenodd'
												d='M11.5317 12.4724C15.5208 16.4604 16.4258 11.8467 18.9656 14.3848C21.4143 16.8328 22.8216 17.3232 19.7192 20.4247C19.3306 20.737 16.8616 24.4943 8.1846 15.8197C-0.493478 7.144 3.26158 4.67244 3.57397 4.28395C6.68387 1.17385 7.16586 2.58938 9.61449 5.03733C12.1544 7.5765 7.54266 8.48441 11.5317 12.4724Z'
												fill='#FF5555'
											/>
										</svg>
									</span>
									<span>
										+1
										234
										456
										678
										89
									</span>
								</Link>
								<div className='flex pl-3 items-center'>
									<Link
										href='/'
										aria-label='social-link'
										target='_blank'
										rel='noopener noreferrer'
										className='mr-6 text-body-color duration-300 hover:text-onHover dark:text-body-color-dark dark:hover:text-onHover'
									>
										<svg
											width='40'
											height='40'
											viewBox='0 0 40 40'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<rect
												width='39.59'
												height='39.59'
												rx='19.795'
												fill='#3B5998'
											/>
											<path
												d='M24.1426 21.1758H21.5059V29.0508H17.9902V21.1758H15.1074V17.9414H17.9902V15.4453C17.9902 12.6328 19.6777 11.0508 22.2441 11.0508C23.4746 11.0508 24.7754 11.2969 24.7754 11.2969V14.0742H23.334C21.9277 14.0742 21.5059 14.918 21.5059 15.832V17.9414H24.6348L24.1426 21.1758Z'
												fill='white'
											/>
										</svg>
									</Link>
									<a
										href='/'
										aria-label='social-link'
										target='_blank'
										rel='noopener noreferrer'
										className='mr-6 text-body-color duration-300 hover:text-onHover dark:text-body-color-dark dark:hover:text-onHover'
									>
										<svg
											width='41'
											height='40'
											viewBox='0 0 41 40'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<rect
												x='0.589844'
												width='39.59'
												height='39.59'
												rx='19.795'
												fill='#262626'
											/>
											<g clipPath='url(#clip0_2311_2781)'>
												<path
													d='M24.3072 12H26.5964L21.5964 18.3667L27.5 27H22.8614L19.247 21.7667L15.0904 27H12.8012L18.1627 20.2L12.5 12H17.259L20.5422 16.8L24.3072 12ZM23.494 25.4667H24.759L16.5663 13.4333H15.1807L23.494 25.4667Z'
													fill='white'
												/>
											</g>
											<defs>
												<clipPath id='clip0_2311_2781'>
													<rect
														width='15'
														height='15'
														fill='white'
														transform='translate(12.5 12)'
													/>
												</clipPath>
											</defs>
										</svg>
									</a>
									<Link
										href='https://www.instagram.com/nomomics_?igsh=MWI2MGZ6aTVlN2IxNA=='
										aria-label='social-link'
										target='_blank'
										rel='noopener noreferrer'
										className='mr-6 text-body-color duration-300 hover:text-onHover dark:text-body-color-dark dark:hover:text-onHover'
									>
										<svg
											width='40'
											height='40'
											viewBox='0 0 40 40'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<rect
												x='0.179688'
												width='39.59'
												height='39.59'
												rx='19.795'
												fill='#262626'
											/>
											<path
												d='M20.1668 16.0078C22.3816 16.0078 24.2098 17.8359 24.2098 20.0508C24.2098 22.3008 22.3816 24.0938 20.1668 24.0938C17.9168 24.0938 16.1238 22.3008 16.1238 20.0508C16.1238 17.8359 17.9168 16.0078 20.1668 16.0078ZM20.1668 22.6875C21.6082 22.6875 22.7684 21.5273 22.7684 20.0508C22.7684 18.6094 21.6082 17.4492 20.1668 17.4492C18.6902 17.4492 17.5301 18.6094 17.5301 20.0508C17.5301 21.5273 18.7254 22.6875 20.1668 22.6875ZM25.2996 15.8672C25.2996 16.3945 24.8777 16.8164 24.3504 16.8164C23.823 16.8164 23.4012 16.3945 23.4012 15.8672C23.4012 15.3398 23.823 14.918 24.3504 14.918C24.8777 14.918 25.2996 15.3398 25.2996 15.8672ZM27.9715 16.8164C28.0418 18.1172 28.0418 22.0195 27.9715 23.3203C27.9012 24.5859 27.6199 25.6758 26.7059 26.625C25.7918 27.5391 24.6668 27.8203 23.4012 27.8906C22.1004 27.9609 18.198 27.9609 16.8973 27.8906C15.6316 27.8203 14.5418 27.5391 13.5926 26.625C12.6785 25.6758 12.3973 24.5859 12.327 23.3203C12.2566 22.0195 12.2566 18.1172 12.327 16.8164C12.3973 15.5508 12.6785 14.4258 13.5926 13.5117C14.5418 12.5977 15.6316 12.3164 16.8973 12.2461C18.198 12.1758 22.1004 12.1758 23.4012 12.2461C24.6668 12.3164 25.7918 12.5977 26.7059 13.5117C27.6199 14.4258 27.9012 15.5508 27.9715 16.8164ZM26.284 24.6914C26.7059 23.6719 26.6004 21.2109 26.6004 20.0508C26.6004 18.9258 26.7059 16.4648 26.284 15.4102C26.0027 14.7422 25.4754 14.1797 24.8074 13.9336C23.7527 13.5117 21.2918 13.6172 20.1668 13.6172C19.0066 13.6172 16.5457 13.5117 15.5262 13.9336C14.823 14.2148 14.2957 14.7422 14.0145 15.4102C13.5926 16.4648 13.698 18.9258 13.698 20.0508C13.698 21.2109 13.5926 23.6719 14.0145 24.6914C14.2957 25.3945 14.823 25.9219 15.5262 26.2031C16.5457 26.625 19.0066 26.5195 20.1668 26.5195C21.2918 26.5195 23.7527 26.625 24.8074 26.2031C25.4754 25.9219 26.0379 25.3945 26.284 24.6914Z'
												fill='white'
											/>
										</svg>
									</Link>
									<a
										href='/'
										aria-label='social-link'
										target='_blank'
										rel='noopener noreferrer'
										className='text-body-color duration-300 hover:text-onHover dark:text-body-color-dark dark:hover:text-onHover'
									>
										<svg
											width='41'
											height='40'
											viewBox='0 0 41 40'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<rect
												x='0.769531'
												width='39.59'
												height='39.59'
												rx='19.795'
												fill='#CD201F'
											/>
											<path
												d='M29.9004 15.4453C30.3223 16.9219 30.3223 20.0859 30.3223 20.0859C30.3223 20.0859 30.3223 23.2148 29.9004 24.7266C29.6895 25.5703 29.0215 26.2031 28.2129 26.4141C26.7012 26.8008 20.7246 26.8008 20.7246 26.8008C20.7246 26.8008 14.7129 26.8008 13.2012 26.4141C12.3926 26.2031 11.7246 25.5703 11.5137 24.7266C11.0918 23.2148 11.0918 20.0859 11.0918 20.0859C11.0918 20.0859 11.0918 16.9219 11.5137 15.4453C11.7246 14.6016 12.3926 13.9336 13.2012 13.7227C14.7129 13.3008 20.7246 13.3008 20.7246 13.3008C20.7246 13.3008 26.7012 13.3008 28.2129 13.7227C29.0215 13.9336 29.6895 14.6016 29.9004 15.4453ZM18.7559 22.9336L23.748 20.0859L18.7559 17.2383V22.9336Z'
												fill='white'
											/>
										</svg>
									</a>
								</div>
							</div>
						</div>

						<div className=' mt-3'>
							<div className='mb-12 lg:mb-16'>
								<h2 className='mb-10 text-3xl   dark:'>
									Links
								</h2>
								<ul>
									<li>
										<Link
											href='/'
											className='mb-4 inline-block text-base text-body-color duration-300 hover:text-onHover dark:text-body-color-dark dark:hover:text-onHover'
										>
											Home
										</Link>
									</li>
									<li>
										<Link
											href='/about'
											className='mb-4 inline-block text-base text-body-color duration-300 hover:text-onHover dark:text-body-color-dark dark:hover:text-onHover'
										>
											About
										</Link>
									</li>
								</ul>
							</div>
						</div>

						<div className=' mt-3'>
							<div className='mb-12 lg:mb-16'>
								<h2 className='mb-10 text-3xl   dark:'>
									Legal
								</h2>
								<ul>
									<li>
										<Link
											href='/'
											className='mb-4 inline-block text-base text-body-color duration-300 hover:text-onHover dark:text-body-color-dark dark:hover:text-onHover'
										>
											Terms
											Of
											Use
										</Link>
									</li>
									<li>
										<Link
											href='/'
											className='mb-4 inline-block text-base text-body-color duration-300 hover:text-onHover dark:text-body-color-dark dark:hover:text-onHover'
										>
											Privacy
											Policy
										</Link>
									</li>
								</ul>
							</div>
						</div>

						<div className=' mt-3'>
							<div className='mb-12 lg:mb-16'>
								<h2 className='mb-10 text-3xl   dark:'>
									Product
								</h2>
								<ul>
									<li>
										<Link
											href='/contact'
											className='mb-4 inline-block text-base text-body-color duration-300 hover:text-onHover dark:text-body-color-dark dark:hover:text-onHover'
										>
											Categories
										</Link>
									</li>
									<li>
										<Link
											href='/'
											className='mb-4 inline-block text-base text-body-color duration-300 hover:text-onHover dark:text-body-color-dark dark:hover:text-onHover'
										>
											Customer
											Support
										</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="mt-3">
						<div className="mb-8 lg:mb-12 text-center">
							<h2 className="mb-6 text-2xl lg:text-3xl font-semibold  ">
							Stay Updated with Comic News!
							</h2>
							<p className="mb-8 text-sm lg:text-base">
							Sign up for our newsletter to receive the latest updates and news.
							</p>
							<form className="flex flex-col items-center space-y-4 lg:space-y-0 lg:flex-row lg:space-x-4">
							<input
								type="email"
								className="w-full lg:w-1/2 py-3 rounded-md border border-gray-300 focus:border-primary focus:outline-none transition duration-300 px-4 text-sm placeholder:text-gray-500"
								placeholder="Enter your email"
							/>
							<button
								type="submit"
								className="w-full lg:w-auto px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300 text-sm"
							>
								Subscribe
							</button>
							</form>
						</div>
						</div>

					</div>

					<div className='h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]'></div>
					<div className='py-8'>
						<p className='text-center  text-sm font-roboto font-extralight text-body-color dark: tracking-wider'>
							Copyright{' '}
							{new Date().getFullYear()}{' '}
							Nomomics.com. All rights
							reserved.
						</p>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
