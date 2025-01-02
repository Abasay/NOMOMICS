'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
	FaFacebook,
	FaGoogle,
	FaApple,
	FaEyeSlash,
	FaEye,
} from 'react-icons/fa';
import SignupSectionHeader from '../Headers/SignupSectionHeader';
import Button from '../Common/Button';
import Error from '../Common/Error';
import styles from '@/styles/common.module.css';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useProfile } from '@/app/contexts/Profile';
import { useGoogleLogin } from '@react-oauth/google';
import Swal from 'sweetalert2';
// import Cookies from 'node_modules/@types/js-cookie';

const SignInForm = ({ setIsModalVisible }: { setIsModalVisible: any }) => {
	const isLoggedIn = Cookies.get('isLoggedIn');
	const token = Cookies.get('token')

	const router = useRouter();

	useEffect(()=>{
		if (isLoggedIn && token) {
		router.push('/profile');
	}
	},[])

	const [formData, setFormData] = useState<{
		email: string;
		password: string;
		rememberMe: boolean;
	}>({
		email: '',
		password: '',
		rememberMe: true,
	});

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const [signingIn, setSigningIn] = useState<boolean>(false);

	const [errMsg, setErrMsg] = useState<string>('');
	const [errMsg1, setErrMsg1] = useState<string>('');

	const handleTogglePassword = () => {
		setShowPassword((prev) => !prev);
	};

	const handleChange = (e: any) => {
		const { name, value, checked, type } = e.target;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	const { updateProfile } = useProfile();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const { email, password, rememberMe } = formData;

		const uri = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
		const body = { email, password, rememberMe };
		try {
			setSigningIn(true);
			await fetch(uri, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			})
				.then((res) => res.json())
				.then((data: any) => {
					setSigningIn(false);
					if (data.error) {
						setErrMsg(data.error);
						setErrMsg1(
							data.additionalMessage
						);
						if (
							data.error.includes(
								'is locked'
							)
						) {
							setIsModalVisible(true);
						}
					}

					if (data.success) {
						console.log(data);
						updateProfile(data.data.user);
						toast.success(
							'Login successful!'
						);
						Cookies.set(
							'isLoggedIn',
							'true'
						);
						Cookies.set(
							'token',
							data.data.token
						);
						setFormData({
							email: '',
							password: '',
							rememberMe: true,
						});
						router.push('/profile');
					} else {
					}
				});
		} catch (error) {
			console.log(error);
			setSigningIn(false);
			toast.error('An error occurred');
		}
	};

	const googleLogin = useGoogleLogin({
		flow: 'auth-code',
		onSuccess: async (codeResponse) => {
			console.log(codeResponse);
			await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/google-login`,
				{
					method: 'POST',
					headers: {
						'Content-Type':
							'application/json',
					},
					body: JSON.stringify({
						code: codeResponse.code,
					}),
				}
			).then(async (data) => {
				const response = await data.json();
				if (response.success) {
					Cookies.set(
						'token',
						response.data.token
					);
					Cookies.set('isLoggedIn', 'true');

					Swal.fire({
						icon: 'success',
						text: response.data.message,
					});

					updateProfile(response.data.user);

					router.push('/profile');
				}
				console.log(response);
			});
		},
		onError: (errorResponse) =>
			Swal.fire({
				icon: 'error',
				text: errorResponse.error,
			}),
	});

	return (
		<div className='flex justify-center h-[80%]  items-center '>
			<div className='bg-white  p-8 pt-16 rounded-[25px] shadow-lg w-[80%] px-16 min-w-md max-md:w-full max-md:px-8 '>
				<SignupSectionHeader
					title='Welcome back!'
					subTitle='Log in to your account'
				/>
				<div className=' mt-6'>
					{errMsg && (
						<div
							className={`${
								errMsg
									? styles[
											'slide-in'
									  ]
									: styles[
											'slide-out'
									  ]
							}`}
						>
							{
								<Error
									message={
										errMsg
									}
									message1={
										errMsg1
									}
									type='login'
									w='full'
								/>
							}
						</div>
					)}
					<form
						className=' pt-10 max-480:text-xs max-md:text-sm text-lg'
						onSubmit={handleSubmit}
					>
						<div className='mb-4'>
							<label className='block mb-2 font-bold'>
								Email
							</label>
							<input
								type='email'
								name='email'
								value={
									formData.email
								}
								onChange={
									handleChange
								}
								placeholder='Enter your email'
								className='w-full p-3 border border-gray-300 rounded-lg mb-4 focus-within:outline-primary transition-all  duration-500 delay-0 ease-in-out'
								required
							/>
						</div>
						<div className='mb-4 relative'>
							<label className='block mb-2 font-bold'>
								Password
							</label>
							<input
								type={
									showPassword
										? 'text'
										: 'password'
								}
								name='password'
								value={
									formData.password
								}
								onChange={
									handleChange
								}
								placeholder='Enter your password'
								className='w-full p-3 border border-gray-300 rounded-lg mb-4 focus-within:outline-primary transition-all  duration-500 delay-0 ease-in-out'
								required
							/>
							<span
								onClick={
									handleTogglePassword
								}
								className='absolute right-4 top-14 text-zinc-500 cursor-pointer'
							>
								{showPassword ? (
									<FaEye
										size={
											24
										}
									/>
								) : (
									<FaEyeSlash
										size={
											24
										}
									/>
								)}
							</span>
						</div>
						<div className='mb-10 flex w-full flex-wrap  justify-between'>
							<label className='flex items-center max-480:text-xs max-md:text-sm text-lg text-zinc-950'>
								<input
									type='checkbox'
									name='rememberMe'
									checked={
										formData.rememberMe
									}
									onChange={
										handleChange
									}
									className='mr-2 w-6 h-6 border  rounded-full'
									required
								/>
								Remember Me
							</label>
							<span className=' text-zinc-500 max-md:text-xs text-[14px]'>
								Forgot password?
							</span>
						</div>
						<Button
							className='w-full'
							text={
								signingIn
									? 'Signing in...'
									: 'Sign in'
							}
							disabled={signingIn}
							onClickFunc={() =>
								handleSubmit
							}
						/>
					</form>
				</div>

				<div className='mt-6 text-center text-zinc-600'>
					<p className='mb-2'>Sign in with</p>
					<div className='flex justify-center space-x-8'>
						<FaFacebook className='text-2xl max-480:text-sm max-md:text-xl text-blue-600 cursor-pointer hover:text-blue-800' />
						<FaGoogle
							className='text-2xl max-480:text-sm max-md:text-xl text-red-500 cursor-pointer hover:text-red-700'
							onClick={() =>
								googleLogin()
							}
						/>
						<FaApple className='text-2xl max-480:text-sm max-md:text-xl text-gray-800 cursor-pointer hover:text-black' />
					</div>
				</div>
				<p className='mt-6 text-center'>
					Don&apos;t have an account?{' '}
					<Link
						href='/signup'
						className=' hover:text-primary font-bold '
					>
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignInForm;
