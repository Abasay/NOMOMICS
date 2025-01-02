import { useEffect, useState } from 'react';
import { NotificationList } from './Notification';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const dummyNotifications = [
	{
		_id: '1',
		type: 'NEW_COMMENT',
		message: 'John Doe commented on your comic "Epic Adventure".',
		fromUserId: {
			fullName: 'John Doe',
			profileImage:
				'https://res.cloudinary.com/dsx79mhvl/image/upload/v1733609360/Nomomic_Users/rtzqrfpn3g0c2lwdh2do.png',
			nickName: 'johndoe123',
		},
		comicId: {
			title: 'Epic Adventure',
			coverImage: 'https://res.cloudinary.com/dsx79mhvl/image/upload/v1733609360/Nomomic_Users/rtzqrfpn3g0c2lwdh2do.png',
		},
		isRead: false,
		createdAt: new Date().toISOString(),
	},
	{
		_id: '2',
		type: 'NEW_FOLLOWER',
		message: 'Jane Smith started following you.',
		fromUserId: {
			fullName: 'Jane Smith',
			profileImage:
				'https://res.cloudinary.com/dsx79mhvl/image/upload/v1733609360/Nomomic_Users/rtzqrfpn3g0c2lwdh2do.png',
		},
		isRead: true,
		createdAt: new Date().toISOString(),
	},
];

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

const NotificationsPage = ({
	notifications,
	setNotifications,
	loading,
}: {
	notifications: Notification[];
	setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
	loading: boolean;
}) => {
	// const [notifications, setNotifications] =
	// 	useState(dummyNotifications);

	const markAsRead = async (id: string) => {
		try {
			const request = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/users/user/read-notification/${id}`,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get(
							'token'
						)}`,
					},
				}
			);

			const response = await request.json();
			if (response.success) {
				// getNotifications();
				setNotifications((prev) =>
					prev.map((notif) =>
						notif._id === id
							? {
									...notif,
									isRead: true,
							  }
							: notif
					)
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	// useEffect(() => {
	// 	getNotifications();
	// }, []);

	if (loading) {
		return <div className=' py-8 w-[80%] mx-auto '>Loading...</div>;
	}

	return (
		<div className='min-h-screen w-full  py-8'>
			<NotificationList
				notifications={notifications}
				markAsRead={markAsRead}
			/>
		</div>
	);
};

export default NotificationsPage;
