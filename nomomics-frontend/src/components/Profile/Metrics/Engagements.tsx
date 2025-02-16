import React from 'react';
import {
	BookmarkIcon,
	ChatBubbleLeftIcon,
	HandThumbUpIcon,
	HandThumbDownIcon,
	EyeIcon,
} from '@heroicons/react/24/outline';
import { useProfile } from '@/app/contexts/Profile';

interface EngagementProps {
	label: string;
	value: string;
	icon: JSX.Element;
	color: string;
}

const EngagementItem: React.FC<EngagementProps> = ({
	label,
	value,
	icon,
	color,
}) => (
	<div className='flex justify-between items-center'>
		<div className='flex items-center space-x-2'>
			<div className={`p-1 rounded-full ${color}`}>
				{icon}
			</div>
			<span className='text-gray-700'>{label}</span>
		</div>
		<span className='text-gray-600'>{value}</span>
	</div>
);

const Engagements: React.FC = () => {
	const { metrics } = useProfile();
	return (
		<div className='p-6 w-full max-w-lg mx-auto bg-white shadow-md rounded-md'>
			<span className='text-lg font-semibold block mb-4'>
				Total Engagements
			</span>

			<div className='space-y-4'>
				<EngagementItem
					label='Saved'
					value={String(metrics.saved)}
					icon={
						<BookmarkIcon className='w-5 h-5 text-blue-600' />
					}
					color='bg-blue-100'
				/>
				<EngagementItem
					label='Comments'
					value={String(metrics.comments)}
					icon={
						<ChatBubbleLeftIcon className='w-5 h-5 text-green-500' />
					}
					color='bg-green-100'
				/>
				<EngagementItem
					label='Thumb up'
					value={String(metrics.likes)}
					icon={
						<HandThumbUpIcon className='w-5 h-5 text-purple-500' />
					}
					color='bg-purple-100'
				/>
				<EngagementItem
					label='Thumb down'
					value={String(metrics.dislikes)}
					icon={
						<HandThumbDownIcon className='w-5 h-5 text-yellow-500' />
					}
					color='bg-yellow-100'
				/>
				<EngagementItem
					label='Views'
					value={String(metrics.views)}
					icon={
						<EyeIcon className='w-5 h-5 text-indigo-500' />
					}
					color='bg-indigo-100'
				/>
			</div>
		</div>
	);
};

export default Engagements;
