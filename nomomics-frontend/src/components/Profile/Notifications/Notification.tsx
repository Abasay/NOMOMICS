import React from 'react';
import Image from 'next/image';

interface Notification {
	_id: string;
	type: string;
	message: string;
	fromUserId?: {
		fullName: string;
		profileImage: string;
		nickName?: string;
	};
	comicId?: {
		title: string;
		coverImage: string;
	};
	isRead: boolean;
	createdAt: string;
}

interface NotificationListProps {
	notifications: Notification[];
	markAsRead: (id: string) => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({
	notifications,
	markAsRead,
}) => {
	return (
		<div className='max-w-2xl mx-auto p-4 pl-0 pt-2'>
			<h2 className='text-lg font-semibold mb-4'>
				Notifications
			</h2>
			<ul className='space-y-4'>
				{notifications.map((notification) => (
					<li
						key={notification._id}
						className={`flex items-start gap-4 p-4 rounded-lg shadow ${
							!notification.isRead
								? 'bg-gray-100'
								: 'bg-white border border-gray-300'
						}`}
					>
						{/* Profile or Comic Image */}
						{notification.fromUserId
							?.profileImage && (
							<Image
								src={
									notification
										.fromUserId
										.profileImage
								}
								alt='User Profile'
								width={50}
								height={50}
								className='rounded-full h-[50px] w-[50px]'
							/>
						)}
						{/* Comic Cover Image */}
						{notification.comicId
							?.coverImage && (
							<Image
								src={
									notification
										.comicId
										.coverImage
								}
								alt='Comic Cover'
								width={50}
								height={50}
								className='rounded-md'
							/>
						)}

						{/* Notification Content */}
						<div className='flex-1'>
							<p className='text-sm text-gray-800'>
								{
									notification.message
								}
							</p>
							<p className='text-xs text-gray-500 mt-1'>
								{new Date(
									notification.createdAt
								).toLocaleString()}
							</p>
						</div>

						{/* Mark as Read Button */}
						{!notification.isRead && (
							<button
								onClick={() =>
									markAsRead(
										notification._id
									)
								}
								className='ml-auto text-sm text-blue-500 hover:underline'
							>
								Mark as Read
							</button>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};
