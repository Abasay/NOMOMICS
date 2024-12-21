import { useState } from 'react';

const ConverterForm = () => {
	const [conversionType, setConversionType] = useState<
		'cashToToken' | 'coinToToken'
	>('cashToToken');
	const [coinAmount, setCoinAmount] = useState<number | string>('');
	const tokenRate = 1; // Assuming 1 Coin = 1 Token for simplicity

	const calculateTokens = (amount: number) => {
		return amount * tokenRate;
	};

	const handleCoinAmountChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = e.target.value;
		setCoinAmount(value ? parseFloat(value) : '');
	};

	return (
		<div className='p-4 py-10 max-md:text-sm bg-white max-w-lg w-full mx-auto'>
			<div className='flex items-center justify-around mb-4'>
				<label className='flex items-center space-x-2'>
					<input
						type='radio'
						name='conversionType'
						value='cashToToken'
						checked={
							conversionType ===
							'cashToToken'
						}
						onChange={() =>
							setConversionType(
								'cashToToken'
							)
						}
						className='form-radio h-4 w-4 text-blue-600'
					/>
					<span className=' text-[#606060]'>
						Cash to Token
					</span>
				</label>
				<label className='flex items-center space-x-2'>
					<input
						type='radio'
						name='conversionType'
						value='coinToToken'
						checked={
							conversionType ===
							'coinToToken'
						}
						onChange={() =>
							setConversionType(
								'coinToToken'
							)
						}
						className='form-radio h-4 w-4 text-blue-600'
					/>
					<span className=' text-[#606060]'>
						Coin to Token
					</span>
				</label>
			</div>

			<h1 className=' max-480:text-sm max-md:text-xl text-2xl font-bold mb-2'>
				{conversionType === 'coinToToken'
					? 'Convert to tokens'
					: 'Cash to Tokens'}
			</h1>
			<p className='text-sm text-gray-500 mb-2'>
				Conversion rate varies.
			</p>
			<p className='text-sm text-gray-500 mb-4'>
				1 Coin = 1 Token
			</p>

			<div className='bg-[#FDFDFD] border border-blue-300 flex gap-2 items-center p-4 rounded-md mb-4'>
				<span>
					<svg
						width='16'
						height='16'
						viewBox='0 0 16 16'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<g clipPath='url(#clip0_2450_4855)'>
							<path
								d='M8 0C3.58175 0 0 3.58175 0 8C0 12.4185 3.58175 16 8 16C12.4185 16 16 12.4185 16 8C16 3.58175 12.4185 0 8 0ZM8 15.0158C4.14025 15.0158 1 11.8597 1 7.99997C1 4.14022 4.14025 0.999969 8 0.999969C11.8597 0.999969 15 4.14023 15 7.99997C15 11.8597 11.8597 15.0158 8 15.0158Z'
								fill='#22A6F1'
							/>
							<path
								d='M6.7748 11.0008L3.9248 8.15078L4.6373 7.43828L6.7748 9.57578L11.3623 4.98828L12.0748 5.70078L6.7748 11.0008Z'
								fill='#22A6F1'
							/>
						</g>
						<defs>
							<clipPath id='clip0_2450_4855'>
								<rect
									width='16'
									height='16'
									fill='white'
								/>
							</clipPath>
						</defs>
					</svg>
				</span>
				<div>
					<p className='max-480:text-xs max-md:text-sm text-lg font-medium text-center'>
						Total tokens received
					</p>
					<p className='text-sm text-gray-500 '>
						{coinAmount
							? calculateTokens(
									Number(
										coinAmount
									)
							  )
							: '0'}{' '}
						tokens
					</p>
				</div>
			</div>

			<div className=' bg-[#FDFDFD] mb-4'>
				<label htmlFor='coinAmount'>
					Enter your coin amount
				</label>
				<input
					type='number'
					placeholder='Enter your coin amount'
					value={coinAmount}
					onChange={handleCoinAmountChange}
					className='w-full outline-none border-b-2 bg-[#FDFDFD] transition-all duration-300 delay-0 ease-in-out focus-within:outline-none border-black focus-within:border-b-primary p-2 mb-4'
				/>

				<label htmlFor='tokenToreceive'>
					Token to recieve
				</label>
				<input
					type='number'
					placeholder='Token to receive'
					value={
						coinAmount
							? calculateTokens(
									Number(
										coinAmount
									)
							  )
							: ''
					}
					disabled
					className='w-full outline-none bg-[#FDFDFD] border-b-2 bg-none transition-all duration-300 delay-0 ease-in-out focus-within:outline-none border-black focus-within:border-b-primary p-2 mb-4'
				/>
			</div>

			<button className='w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md'>
				Convert
			</button>
		</div>
	);
};

export default ConverterForm;
