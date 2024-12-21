import React, { useCallback, useEffect, useState } from 'react';
import {
	createEditor,
	Descendant,
	Editor,
	Transforms,
	Element as SlateElement,
	Range,
} from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import {
	AiOutlineBold,
	AiOutlineItalic,
	AiOutlineLink,
	AiOutlineFile,
	AiOutlinePicture,
} from 'react-icons/ai';
import { RiSendPlaneLine } from 'react-icons/ri';
import { css } from '@emotion/css';
import { Picker } from 'emoji-mart';
import SlateRenderer from './CommentRenderer';
import { useProfile } from '@/app/contexts/Profile';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { useComics } from '@/app/contexts/Comics';
import { useParams, useSearchParams } from 'next/navigation';
import { Comment } from '@/types/comic';
import Image from 'next/image';
import dummyImage from '@/public/images/default.jpg';

const initialValue: Descendant[] = [
	{
		type: 'paragraph',
		children: [{ text: '' }],
	},
] as any;

// Utility functions for handling formatting
const toggleFormat = (editor: any, format: any) => {
	const isActive = isFormatActive(editor, format);
	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
};

const isFormatActive = (editor: any, format: string) => {
	const marks = Editor.marks(editor) as [];
	return marks ? marks[format as any] === true : false;
};

// Leaf component to apply formatting to text
const Leaf = ({ attributes, children, leaf }: any) => {
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}
	if (leaf.italic) {
		children = <em>{children}</em>;
	}
	if (leaf.link) {
		children = (
			<a
				href={leaf.url}
				target='_blank'
				rel='noopener noreferrer'
				className='text-blue-500 underline'
			>
				{children}
			</a>
		);
	}
	return <span {...attributes}>{children}</span>;
};

// Image component
const ImageElement = ({ attributes, children, element }: any) => {
	return (
		<div {...attributes}>
			<div contentEditable={false}>
				<img
					src={element.url}
					alt=''
					className='max-w-full h-auto'
				/>
			</div>
			{children}
		</div>
	);
};

// Link component
const LinkElement = ({ attributes, children, element }: any) => {
	return (
		<a
			href={element.url}
			{...attributes}
			className='text-blue-500 underline'
		>
			{children}
		</a>
	);
};

const CommentBox = ({
	replyingComment,
	setReplyingComment,
}: {
	replyingComment: Comment | null;
	setReplyingComment: (comment: Comment | null) => void;
}) => {
	const { profile } = useProfile();

	const { comicId } = useParams();

	const { comics, setComments } = useComics();

	const episodeNumber = useSearchParams().get('episode');

	const [comic, setComic] = useState(
		comics
			.find((comic) => comic._id === comicId)
			?.episodes.find(
				(episode) =>
					episode.episodeNumber ===
					Number(episodeNumber)
			)
	);

	useEffect(() => {
		setComic(
			comics
				.find((comic) => comic._id === comicId)
				?.episodes.find(
					(episode) =>
						episode.episodeNumber ===
						Number(episodeNumber)
				)
		);
	}, [episodeNumber]);

	const [editor] = useState<any>(() =>
		withReact(withHistory(createEditor()))
	);
	const [value, setValue] = useState<Descendant[]>(initialValue);
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [showLinkInput, setShowLinkInput] = useState(false);
	const [linkUrl, setLinkUrl] = useState('');
	const [showImageInput, setShowImageInput] = useState(false);
	const [imageUrl, setImageUrl] = useState('');

	const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

	const renderElement = useCallback((props: any) => {
		switch (props.element.type) {
			case 'image':
				return <ImageElement {...props} />;
			case 'link':
				return <LinkElement {...props} />;
			default:
				return (
					<p {...props.attributes}>
						{props.children}
					</p>
				);
		}
	}, []);

	// Function to insert an image element into the editor
	const insertImage = (url: string) => {
		const text = { text: '' };
		const image = { type: 'image', url, children: [text] };
		Transforms.insertNodes(editor, image);
	};

	// Function to insert a link
	const insertLink = () => {
		if (!linkUrl) return;

		const { selection } = editor;
		const isCollapsed = selection && Range.isCollapsed(selection);

		if (isCollapsed) {
			Transforms.insertNodes(editor, {
				type: 'link',
				url: linkUrl,
				children: [{ text: linkUrl }],
			} as any);
		} else {
			Transforms.wrapNodes(
				editor,
				{
					type: 'link',
					url: linkUrl,
					children: [],
				} as any,
				{ split: true }
			);
			Transforms.collapse(editor, { edge: 'end' });
		}

		setLinkUrl(''); // Reset the input
		setShowLinkInput(false);
	};

	// Function to handle image file input
	const handleImageUpload = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = (event as any).target.files[0];
		const reader = new FileReader();
		reader.onload = () => {
			insertImage((reader as any).result);
		};
		reader.readAsDataURL(file); // Convert image to base64 URL
	};

	// Function to handle image URL input
	const handleImageUrlSubmit = () => {
		if (imageUrl) {
			insertImage(imageUrl);
			setImageUrl('');
			setShowImageInput(false);
		}
	};

	const handleBold = () => {
		toggleFormat(editor, 'bold');
	};

	const handleItalic = () => {
		toggleFormat(editor, 'italic');
	};

	const handleSubmit = async () => {
		console.log('Comment:', JSON.stringify(value));
		try {
			const { _id } = profile;

			if (!_id) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Please login to comment',
				});
				return;
			}

			if (!comic?._id) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Comic not found',
				});
				return;
			}

			Swal.fire({
				icon: 'info',
				title: 'Adding comment...',
				text: 'Please wait...',
			});
			Swal.isLoading();

			const postComment = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/comics/make-a-comment`,
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
						message: JSON.stringify(value),
						userId: _id,
						comicId: comicId,
						episodeId: comic?._id,
						parentCommentId:
							replyingComment?._id,
					}),
				}
			);
			const response = await postComment.json();
			Swal.close();

			if (response.success) {
				Swal.fire({
					icon: 'success',
					title: 'Comment added',
					text: 'Your comment has been added successfully',
				});

				setComments(response.data);
				setReplyingComment(null);
				setValue([]);
			} else {
				Swal.fire({
					icon: 'error',
					title: response.error,
				});
			}
		} catch (error: any) {
			console.error(error);
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: error.message,
			});
		}
	};

	const toggleLinkInput = () => {
		setShowLinkInput(!showLinkInput);
	};

	const addEmoji = (emoji: any) => {
		const { selection } = editor;
		if (selection) {
			Transforms.insertText(editor, emoji.native);
		}
	};

	return (
		<div
			className='w-full mx-auto my-3 mb-6 border border-gray-300 rounded-lg bg-white'
			onClick={() => {
				// setShowLinkInput(false);
				// setShowImageInput(false);
			}}
		>
			{replyingComment && (
				<div
					key={replyingComment._id}
					className='flex pl-4 gap-4 max-md:flex-col relative items-start mt-6'
				>
					<div className=' absolute top-0 h-full w-full bg-white bg-opacity-45'></div>
					<div className=' flex flex-row gap-4'>
						<Image
							src={
								replyingComment
									.userId
									.profileImage ||
								dummyImage
							}
							alt={
								replyingComment
									.userId
									.fullName
							}
							width={40}
							height={40}
							className='w-10 h-10 rounded-full'
						/>
						<div className='flex items-center space-x-2 text-[22px] leading-7 tracking-wider '>
							<span className='font-bold'>
								{
									replyingComment
										.userId
										.nickName
								}
							</span>
						</div>
					</div>

					<div className='flex-1 flex-col'>
						<p className='mt-1 text-[#272727] text-xl tracking-wider'>
							<SlateRenderer
								content={JSON.parse(
									replyingComment.content
								)}
							/>
						</p>

						{/* Nested Replies */}
					</div>
					<button
						className='absolute -top-5 right-2 w-12 h-12 max-md:w-9 max-md:h-9 max-480:w-6  max-480:h-6 bg-white rounded-full flex items-center justify-center'
						onClick={() =>
							setReplyingComment(null)
						}
					>
						<svg
							width='full'
							height='full'
							viewBox='0 0 32 32'
							enable-background='new 0 0 32 32'
							version='1.1'
							xmlSpace='preserve'
							xmlns='http://www.w3.org/2000/svg'
							xmlnsXlink='http://www.w3.org/1999/xlink'
						>
							<g id='Home' />

							<g id='Print' />

							<g id='Mail' />

							<g id='Camera' />

							<g id='Video' />

							<g id='Film' />

							<g id='Message' />

							<g id='Telephone' />

							<g id='User' />

							<g id='File' />

							<g id='Folder' />

							<g id='Map' />

							<g id='Download' />

							<g id='Upload' />

							<g id='Video_Recorder' />

							<g id='Schedule' />

							<g id='Cart' />

							<g id='Setting' />

							<g id='Search' />

							<g id='Pencils' />

							<g id='Group' />

							<g id='Record' />

							<g id='Headphone' />

							<g id='Music_Player' />

							<g id='Sound_On' />

							<g id='Sound_Off' />

							<g id='Lock' />

							<g id='Lock_open' />

							<g id='Love' />

							<g id='Favorite' />

							<g id='Film_1_' />

							<g id='Music' />

							<g id='Puzzle' />

							<g id='Turn_Off' />

							<g id='Book' />

							<g id='Save' />

							<g id='Reload' />

							<g id='Trash' />

							<g id='Tag' />

							<g id='Link' />

							<g id='Like' />

							<g id='Bad' />

							<g id='Gallery' />

							<g id='Add' />

							<g id='Close'>
								<path
									d='M26.6,5.4C23.8,2.6,20,1,16,1S8.2,2.6,5.4,5.4C2.6,8.2,1,12,1,16s1.6,7.8,4.4,10.6C8.2,29.4,12,31,16,31   s7.8-1.6,10.6-4.4C29.4,23.8,31,20,31,16S29.4,8.2,26.6,5.4z'
									fill='#FE9803'
								/>

								<path
									d='M17.4,16l5-5c0.2-0.2,0.3-0.5,0.3-0.7c0-0.3-0.1-0.5-0.3-0.7c-0.4-0.4-1-0.4-1.4,0l-5,4.9l-5-4.9   c-0.4-0.4-1-0.4-1.4,0c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7l5,5l-5,5c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7   c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3l5-5l5,5c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3c0.2-0.2,0.3-0.5,0.3-0.7   c0-0.3-0.1-0.5-0.3-0.7L17.4,16z'
									fill='#673AB7'
								/>
							</g>

							<g id='Forward' />

							<g id='Back' />

							<g id='Buy' />

							<g id='Mac' />

							<g id='Laptop' />
						</svg>
					</button>
				</div>
			)}
			{profile._id ? (
				<Slate
					editor={editor}
					initialValue={initialValue}
					onChange={(newValue: any) => {
						// console.log(newValue);
						setValue(newValue);
					}}
				>
					<Editable
						renderLeaf={renderLeaf}
						renderElement={renderElement}
						placeholder='Type your comment...'
						className={`${css`
							min-height: 60px;
							padding: 10px;
						`} focus-within:outline-none placeholder:p-3`}
					/>
					<div className='flex relative space-x-4 rounded-tr-md w-[150px] py-1 justify-between h-[46px] bg-gray-200 pl-4'>
						<div className=' flex gap-4'>
							<button
								onClick={
									handleBold
								}
								className='text-gray-700  text-xl hover:text-black'
							>
								<AiOutlineBold />
							</button>
							<button
								onClick={
									handleItalic
								}
								className='text-gray-700  text-xl hover:text-black'
							>
								<AiOutlineItalic />
							</button>

							{/* <button className='text-gray-700  text-xl hover:text-black'>
								<AiOutlineFile />
							</button> */}
							{/* <button
								onClick={() =>
									setShowImageInput(
										!showImageInput
									)
								}
								className='text-gray-700 text-xl hover:text-black'
							>
								<AiOutlinePicture />
							</button> */}
							{/* </div> */}

							{/* <div className=' flex gap-4'>
							<button
								onClick={
									toggleLinkInput
								}
								className='text-gray-700  text-xl hover:text-black'
							>
								<AiOutlineLink />
							</button> */}
							{/* <button
								onClick={() =>
									setShowEmojiPicker(
										!showEmojiPicker
									)
								}
								className='text-gray-600 hover:text-black'
							>
								😊
							</button> */}
						</div>

						<button
							onClick={handleSubmit}
							className='bg-gray-400 text-white px-2 rounded-lg flex items-center hover:bg-gray-500'
						>
							Send
						</button>

						{showLinkInput && (
							<div className='my-2 absolute bg-black rounded-md grid h-full place-content-center place-items-center bg-opacity-20 '>
								<input
									type='text'
									placeholder='Enter URL'
									value={
										linkUrl
									}
									onChange={(
										e
									) =>
										setLinkUrl(
											e
												.target
												.value
										)
									}
									className=' px-2 py-1 rounded-lg outline-none w-full focus-within:outline-primary focus-within:outline-4 transition-all duration-500 delay-none'
								/>
								<div className=' flex gap-2'>
									<button
										onClick={
											insertLink
										}
										className='bg-secondary text-white px-4 py-1 mt-1 rounded-md hover:bg-tertiary'
									>
										Add
										Link
									</button>
									<button
										onClick={() =>
											setShowLinkInput(
												false
											)
										}
										className='bg-secondary text-white px-4 py-1 mt-1 rounded-md hover:bg-tertiary'
									>
										Close
									</button>
								</div>
							</div>
						)}
						{/* {showEmojiPicker && (
                        <Picker onSelect={addEmoji} className='my-2' />
                    )} */}
						{showImageInput && (
							<div className='my-2 absolute w-full bg-black rounded-md grid h-full place-content-center place-items-center bg-opacity-20 '>
								<input
									type='text'
									placeholder='Enter image URL'
									value={
										imageUrl
									}
									onChange={(
										e
									) =>
										setImageUrl(
											e
												.target
												.value
										)
									}
									className=' px-2 py-1 rounded-lg outline-none w-full focus-within:outline-primary focus-within:outline-4 transition-all duration-500 delay-none'
								/>
								<div className=' flex gap-2'>
									<button
										onClick={
											handleImageUrlSubmit
										}
										className='bg-secondary text-white px-4 py-1 mt-1 rounded-md hover:bg-tertiary'
									>
										Insert
										Image
									</button>
									<button
										onClick={() =>
											setShowImageInput(
												false
											)
										}
										className='bg-secondary text-white px-4 py-1 mt-1 rounded-md hover:bg-tertiary'
									>
										Close
									</button>
									<label
										htmlFor='file-input'
										className='bg-secondary text-white px-4 py-1 mt-1 rounded-md hover:bg-tertiary'
									>
										Upload
										Image
									</label>
								</div>

								<input
									type='file'
									accept='image/*'
									onChange={
										handleImageUpload
									}
									className='hidden'
									id='file-input'
								/>
							</div>
						)}
					</div>
				</Slate>
			) : (
				<div className=' grid place-content-center place-items-center h-32'>
					<p>Please Log in to comment</p>
				</div>
			)}
		</div>
	);
};

export default CommentBox;
