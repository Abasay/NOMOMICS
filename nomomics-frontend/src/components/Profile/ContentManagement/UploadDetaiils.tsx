// components/UploadDetails.tsx
import { useProfile } from '@/app/contexts/Profile';
import { imageToBase64 } from '@/libs/fileConvert';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { AiFillBackward } from 'react-icons/ai';
import { FaBackspace } from 'react-icons/fa';
import Swal from 'sweetalert2';

interface UploadDetailsProps {
	setShowUploadDetails: (value: boolean) => void;
	showUploadDetails: boolean;
	comicDetails: {
		title: string;
		author: string;
		description: string;
		uploadedFile: string;
		files: string[];
		filesType: string;
	};

	setActive: any;
	setSideBarActive: any;
}

const UploadDetails: React.FC<UploadDetailsProps> = ({
	setShowUploadDetails,
	showUploadDetails,
	comicDetails,
	setActive,
	setSideBarActive,
}) => {
	const [synopsis, setSynopsis] = useState('');
	const [genre, setGenre] = useState('');
	const [category, setCategory] = useState('');
	const [location, setLocation] = useState('');
	const [ageLimit, setAgeLimit] = useState('');
	const [coverImage, setCoverImage] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [subTitle, setSubTitle] = useState<string>('');
	const [price, setPrice] = useState<string>('');

	const handleUploadFilesForUrls = async (
		file: string
	): Promise<string> => {
		let url;
		try {
			const { title, filesType } = comicDetails;
			const url =
				filesType === 'pdf'
					? '/upload-comic-as-pdf'
					: '/upload-comic-as-pic';
			const request = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/comics${url}`,
				{
					method: 'POST',
					headers: {
						'Content-Type':
							'application/json',
						Authorization: `Bearer ${Cookies.get(
							'token'
						)}`,
					},
					body: JSON.stringify({
						base64File: file,
						// id: Cookies.get('id'),
						title: title,
					}),
				}
			);

			const response = await request.json();
			if (response.success) {
				return response.data.url;
			} else {
				Swal.fire({
					icon: 'error',
					text:
						response.message ||
						'An error occurred',
				});
				throw (
					new Error(response.message) ||
					'An error occurred'
				);
				return 'An error occurred';
			}
		} catch (error: any) {
			console.log(error);
			// throw new Error(error)
			Swal.fire({
				icon: 'error',
				text: error.message || 'An error occurred',
			});
			throw new Error(error.message) || 'An error occurred';
			return 'An error occurred';
		}
	};

	const handleSubmit = async () => {
		// Handle the form submission
		console.log({
			synopsis,
			genre,
			category,
			location,
			ageLimit,
		});

		const { files } = comicDetails;

		if (
			!synopsis ||
			!genre ||
			!category ||
			!location ||
			!coverImage
		) {
			Swal.fire('All fields are required!');
			return;
		}

		Swal.fire({
			title: 'Uploading Comic',
			html: 'Please wait...',
			didOpen: () => {
				Swal.showLoading();
			},
		});
		setLoading(true);

		const filesUrl = await Promise.all(
			files.map(async (file) => {
				return await handleUploadFilesForUrls(file);
			})
		);

		// console.log(filesUrl);

		if (Array.isArray(filesUrl)) {
			try {
				// toast.loading('Uploading Comic...');
				const reqBody =
					location === 'marketplace'
						? {
								synopsis,
								genre,
								category,
								location,
								ageLimit,
								...comicDetails,
								files: filesUrl,
								coverImage,
								subTitle,
								episode: 1,
								price,
						  }
						: {
								synopsis,
								genre,
								category,
								location,
								ageLimit,
								...comicDetails,
								files: filesUrl,
								coverImage,
								subTitle,
								episode: 1,
						  };
				const url =
					location === 'marketplace'
						? `${process.env.NEXT_PUBLIC_API_URL}/comics/comic/upload-to-market-place`
						: `${process.env.NEXT_PUBLIC_API_URL}/comics/comic/upload`;
				const request = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type':
							'application/json',
						Authorization: `Bearer ${Cookies.get(
							'token'
						)}`,
					},
					body: JSON.stringify({
						...reqBody,
					}),
				});

				const response = await request.json();
				toast.dismiss();
				setLoading(false);
				if (response.success) {
					// toast.success('Comic successfully uploaded');
					Swal.fire({
						icon: 'success',
						text: 'Comic successfully uploaded!.',
					});
					setSideBarActive('Create Profile');
					setActive('Profile Settings');

					getMyComics();
				} else {
					Swal.fire({
						icon: 'error',
						text: response.message,
					});
				}
			} catch (error: any) {
				console.log(error);
				// toast.error(error.message);
				Swal.fire({
					icon: 'error',
					text: error.message,
				});
			}
		}
	};

	const { setMyComics } = useProfile();

	const getMyComics = async () => {
		// fetch my comics
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/comics/comics/user`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${Cookies.get(
							'token'
						)}`,
					},
				}
			);

			const data = await res.json();
			setMyComics(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const onDrop = async (acceptedFiles: File[]) => {
		const convertedImage = (await imageToBase64(
			acceptedFiles[0]
		)) as string;
		setCoverImage(convertedImage);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'image/png': ['.png', '.jpeg', '.jpg', '.webp'],
		},
	});

	return (
		<div className=' bg-white flex max-md:text-sm flex-col justify-center items-center'>
			<div className=' w-full mb-2'>
				<button
					onClick={() =>
						setShowUploadDetails(
							!showUploadDetails
						)
					}
					className=' py-2 flex gap-2 items-center text-lg  '
				>
					<FaBackspace />
					<span>Back</span>
				</button>
			</div>
			<div className='w-full  max-w-md'>
				<h1 className='text-lg font-semibold mb-6'>
					Upload Details
				</h1>

				<div
					{...getRootProps()}
					className={`border-2 border-dashed p-6 rounded-md text-center cursor-pointer ${
						isDragActive
							? 'border-primary'
							: 'border-gray-300'
					}`}
				>
					<input {...getInputProps()} />
					{isDragActive ? (
						<p>Drop the files here ...</p>
					) : (
						<p>
							Click or drag image to
							this area to upload
							<br />
							<span className='text-sm text-gray-500'>
								Formats accepted
								are .png .jpg
								.jpeg
							</span>
						</p>
					)}
				</div>

				<div className=' mt-2'>
					<label
						htmlFor='title'
						className='block text-sm font-medium '
					>
						Sub Title
					</label>
					<input
						type='text'
						id='title'
						value={subTitle}
						onChange={(e) =>
							setSubTitle(
								e.target.value
							)
						}
						placeholder='Type your Sub-title'
						className='mt-1 block  w-full p-2 border-2 transition-all delay-0 duration-300 ease-in-out focus:border-primary rounded-md outline-none'
					/>
				</div>

				<div className='mb-4'>
					<label className='block mb-2'>
						Synopsis
					</label>
					<textarea
						className='w-full p-2 border  text-gray-900  rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
						value={synopsis}
						onChange={(e) =>
							setSynopsis(
								e.target.value
							)
						}
					/>
				</div>

				<div className='mb-4'>
					<label className='block mb-2'>
						Genre
					</label>
					<select
						className='w-full p-2 border  text-gray-400  rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
						value={genre}
						onChange={(e) =>
							setGenre(e.target.value)
						}
					>
						<option value=''>
							Select Genre
						</option>
						<option value='comedy'>
							Comedy
						</option>
						<option value='action'>
							Action
						</option>
						<option value='romance'>
							Romance
						</option>
						<option value='sci-fi'>
							Sci-Fi
						</option>
						<option value='thriller'>
							Thriller
						</option>
						<option value='superhero'>
							Superhero
						</option>
						<option value='18+'>18+</option>
					</select>
				</div>

				<div className='mb-4'>
					<label className='block mb-2'>
						Category
					</label>
					<select
						className='w-full p-2 border  text-gray-400  rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
						value={category}
						onChange={(e) =>
							setCategory(
								e.target.value
							)
						}
					>
						<option value=''>
							Select Category
						</option>
						<option value='fiction'>
							Fiction
						</option>
						<option value='horror'>
							Horror
						</option>
						<option value='humor'>
							Humor
						</option>
						<option value='sci-fi'>
							Science-Friction
						</option>
					</select>
				</div>

				<div className='mb-4'>
					<label className='block mb-2'>
						Location
					</label>
					<select
						className='w-full p-2 border  text-gray-400  rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
						value={location}
						onChange={(e) =>
							setLocation(
								e.target.value
							)
						}
					>
						<option value=''>
							Select Location
						</option>
						<option value='marketplace'>
							Market Place
						</option>
						<option value='reelflow'>
							Reel Flow
						</option>
						<option value='e-comics'>
							E-Comics
						</option>
					</select>
				</div>

				{location === 'marketplace' && (
					<div className='mb-4'>
						<label className='block mb-2'>
							Price
						</label>
						<input
							type='number'
							value={price}
							onChange={(e) =>
								setPrice(
									e.target
										.value
								)
							}
							placeholder='Enter Comic Price'
							className='w-full p-2 border  text-gray-900  rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
						/>
					</div>
				)}

				<div className='mb-4'>
					<label className='block mb-2'>
						Age Limit (+18)
					</label>
					<select
						className='w-full p-2 border  text-gray-400  rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
						value={ageLimit}
						onChange={(e) =>
							setAgeLimit(
								e.target.value
							)
						}
					>
						<option value=''>
							Select Age Limit
						</option>
						<option value='yes'>Yes</option>
						<option value='no'>No</option>
					</select>
				</div>

				<button
					onClick={handleSubmit}
					className='w-full py-2 bg-yellow-500 text-gray-900 font-bold rounded-md hover:bg-yellow-400 transition'
				>
					{loading ? 'Uploading...' : 'Upload'}
				</button>
			</div>
		</div>
	);
};

export default UploadDetails;
