import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import dummy from '@/public/images/dummy.jpg';

const Draft = ({ drafts }: { drafts: any }) => {
	const dummyArr = [1, 2, 3, 6];

	if (drafts.length === 0) {
		return (
			<div>
				<h1>
					No drafts available or No Comics under
					review
				</h1>
			</div>
		);
	}

	return (
		<div className=' w-full py-10 px-10 pb-48'>
			<div className=' max-h-[774px] overflow-auto'>
				<div className='flex items-center flex-wrap gap-10 w-[90%] mx-auto'>
					{drafts.map((_: any, index: number) => {
						return (
							<Link
								href={
									'/details'
								}
								className={` relative flex flex-col gap-0 cursor-pointer min-w-[200px] border  min-h-[100px] max-h-[220px] max-w-[200px] rounded-lg overflow-hidden`}
								key={index}
							>
								<Image
									src={
										_.episodeCoverImage
									}
									alt={
										_.episodeTitle
									}
									width={
										200
									}
									height={
										200
									}
									className='w-full h-full'
								/>
								<div className=' w-full  -mt-1 rounded-b-lg text-white px-4  bottom-0 flex flex-col gap-1 bg-black bg-opacity-65 text-xs py-2 tracking-widest font-trebuchet'>
									<h3>
										{
											_.episodeTitle
										}
									</h3>
									<h4>
										{
											_.author
										}
									</h4>
									{/* <div className=' flex items-center justify-between'>
										<div className=' flex items-center flex-row gap-3'>
											<p>
												Reviews
											</p>
											<p className=' flex items-center gap-0.5'>
												<span>
													<svg
														width='14'
														height='14'
														viewBox='0 0 14 14'
														fill='none'
														xmlns='http://www.w3.org/2000/svg'
													>
														<path
															d='M8.00887 2.04754L9.03554 4.10087C9.17554 4.38671 9.54887 4.66087 9.86387 4.71337L11.7247 5.02254C12.9147 5.22087 13.1947 6.08421 12.3372 6.93587L10.8905 8.38254C10.6455 8.62754 10.5114 9.10004 10.5872 9.43837L11.0014 11.2292C11.328 12.6467 10.5755 13.195 9.32137 12.4542L7.5772 11.4217C7.2622 11.235 6.74304 11.235 6.4222 11.4217L4.67804 12.4542C3.4297 13.195 2.67137 12.6409 2.99804 11.2292L3.4122 9.43837C3.48804 9.10004 3.35387 8.62754 3.10887 8.38254L1.6622 6.93587C0.810536 6.08421 1.0847 5.22087 2.2747 5.02254L4.13554 4.71337C4.4447 4.66087 4.81804 4.38671 4.95804 4.10087L5.9847 2.04754C6.5447 0.933372 7.4547 0.933372 8.00887 2.04754Z'
															stroke='#FBA700'
															strokeWidth='1.5'
															strokeLinecap='round'
															strokeLinejoin='round'
														/>
													</svg>
												</span>
												<span>
													4.5
												</span>
											</p>
											<span></span>
										</div>
										<div>
											<span>
												100
												Comments
											</span>
										</div>
									</div> */}
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Draft;
