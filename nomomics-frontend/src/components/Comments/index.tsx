import React from 'react';
import CommentBox from './CommentBox';

const Comment = () => {
    const comments = [
        {
            id: 1,
            avatar: '/user.png', // Replace with actual avatar image
            name: 'User 1',
            time: '14 min',
            comment:
                "That's a fantastic new app feature. You and your team did an excellent job of incorporating user testing feedback.",
            likes: 12,
            replies: [
                {
                    id: 12,
                    avatar: '/user.png',
                    name: 'User 3',
                    time: '26 min',
                    comment:
                        'This could be due to them taking their time to release a stable version.',
                    likes: 12,
                },
                {
                    id: 19,
                    avatar: '/user.png',
                    name: 'User 3',
                    time: '26 min',
                    comment:
                        'This could be due to them taking their time to release a stable version.',
                    likes: 13,
                },
                {
                    id: 11,
                    avatar: '/user.png',
                    name: 'User 3',
                    time: '26 min',
                    comment:
                        'This could be due to them taking their time to release a stable version.',
                    likes: 22,
                },
            ],
        },
        {
            id: 2,
            avatar: '/user.png',
            name: 'User 2',
            time: '24 min',
            comment:
                "But don't you think the timing is off because many other apps have done this even earlier, causing people to switch apps?",
            likes: 1,
            replies: [
                {
                    id: 3,
                    avatar: '/user.png',
                    name: 'User 3',
                    time: '26 min',
                    comment:
                        'This could be due to them taking their time to release a stable version.',
                    likes: 12,
                },
            ],
        },
    ];

    const renderComment = (comment: any) => (
        <div key={comment.id} className='flex flex-col items-start mt-6'>
            <div className=' flex flex-row gap-4'>
                <img
                    src={comment.avatar}
                    alt={comment.name}
                    className='w-10 h-10 rounded-full'
                />
                <div className='flex items-center space-x-2 text-[22px] leading-7 tracking-wider '>
                    <span className='font-bold'>{comment.name}</span>
                    <span className='text-sm text-gray-500'>
                        {comment.time} ago
                    </span>
                </div>
            </div>

            <div className='flex-1 flex-col'>
                <p className='mt-1 text-[#272727] text-xl tracking-wider'>
                    {comment.comment}
                </p>
                <div className='flex items-center text-[#8991A0] space-x-4 mt-2 text-sm'>
                    <button className='flex items-center space-x-1 text-gray-500 hover:text-gray-700'>
                        <span>{comment.likes} Likes</span>
                    </button>
                    <button className='flex items-center space-x-1  text-gray-500 hover:text-gray-700'>
                        <span>
                            <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M15 14L20 9L15 4'
                                    stroke='#8991A0'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                                <path
                                    d='M4 20V13C4 11.9391 4.42143 10.9217 5.17157 10.1716C5.92172 9.42143 6.93913 9 8 9H20'
                                    stroke='#8991A0'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                            </svg>
                        </span>
                        <span>Reply</span>
                    </button>
                    <button className=' space-x-4 items-end'>
                        <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z'
                                stroke='#8991A0'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            />
                        </svg>
                    </button>
                </div>

                {/* Nested Replies */}
                {comment.replies && comment?.replies?.length > 0 && (
                    <div className='ml-20 my-10'>
                        {comment.replies.map((reply: any) =>
                            renderComment(reply)
                        )}
                    </div>
                )}
            </div>
        </div>
    );
    return (
        <div className=' flex flex-col w-full gap-0 h-auto font-roboto'>
            <div className=' w-full pb-4 flex justify-end px-8 border-b-[2.5px] border-gray-200'>
                <div className=' flex gap-3 justify-center'>
                    <p className=' flex gap-2 items-center'>
                        <span>
                            <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M15.5799 11.9999C15.5799 13.9799 13.9799 15.5799 11.9999 15.5799C10.0199 15.5799 8.41992 13.9799 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C13.9799 8.41992 15.5799 10.0199 15.5799 11.9999Z'
                                    stroke='#292D32'
                                    stroke-width='1.5'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                                <path
                                    d='M11.9998 20.2697C15.5298 20.2697 18.8198 18.1897 21.1098 14.5897C22.0098 13.1797 22.0098 10.8097 21.1098 9.39973C18.8198 5.79973 15.5298 3.71973 11.9998 3.71973C8.46984 3.71973 5.17984 5.79973 2.88984 9.39973C1.98984 10.8097 1.98984 13.1797 2.88984 14.5897C5.17984 18.1897 8.46984 20.2697 11.9998 20.2697Z'
                                    stroke='#292D32'
                                    stroke-width='1.5'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                            </svg>
                        </span>
                        <span className=' text-base'>1234</span>
                    </p>
                    <p className=' flex gap-2 items-center'>
                        <span>
                            <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M6.00002 9H4.00002C2.89545 9 2.00002 9.89543 2.00002 11V18C2.00002 19.1046 2.89545 20 4.00002 20H6.00002C7.10459 20 8.00002 19.1046 8.00002 18V11C8.00002 9.89543 7.10459 9 6.00002 9Z'
                                    stroke='#28303F'
                                    stroke-width='1.5'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                                <path
                                    d='M15.8769 21H12.2111C11.4214 21 10.6494 20.7662 9.99232 20.3282L8.44532 19.2969C8.16712 19.1114 8.00002 18.7992 8.00002 18.4648V10.2656C8.00002 10.0915 8.04543 9.92052 8.13178 9.76943L12 3H13.3287C15.3255 3 16.5164 5.22536 15.4089 6.88675L14 9H19.4385C20.7396 9 21.6943 10.2228 21.3788 11.4851L19.7575 17.9701C19.3123 19.7508 17.7124 21 15.8769 21Z'
                                    stroke='#28303F'
                                    stroke-width='1.5'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                            </svg>
                        </span>
                        <span className=' text-base'>1234</span>
                    </p>
                    <p className=' flex gap-2 items-center'>
                        <span>
                            <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M6.00002 15H4.00002C2.89545 15 2.00002 14.1046 2.00002 13V6C2.00002 4.89543 2.89545 4 4.00002 4H6.00002C7.10459 4 8.00002 4.89543 8.00002 6V13C8.00002 14.1046 7.10459 15 6.00002 15Z'
                                    stroke='#28303F'
                                    stroke-width='1.5'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                                <path
                                    d='M15.8769 3H12.2111C11.4214 3 10.6494 3.23375 9.99232 3.6718L8.44532 4.70313C8.16712 4.8886 8.00002 5.20083 8.00002 5.53518V13.7344C8.00002 13.9085 8.04543 14.0795 8.13178 14.2306L12 21H13.3287C15.3255 21 16.5164 18.7746 15.4089 17.1133L14 15H19.4385C20.7396 15 21.6943 13.7772 21.3788 12.5149L19.7575 6.02986C19.3123 4.24919 17.7124 3 15.8769 3Z'
                                    stroke='#28303F'
                                    stroke-width='1.5'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                            </svg>
                        </span>
                        <span className=' text-base'>12</span>
                    </p>
                    <p>
                        <span>
                            <svg
                                width='25'
                                height='24'
                                viewBox='0 0 25 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M18.91 8.78414C20.8926 8.78414 22.4998 7.26546 22.4998 5.39207C22.4998 3.51868 20.8926 2 18.91 2C16.9275 2 15.3203 3.51868 15.3203 5.39207C15.3203 7.26546 16.9275 8.78414 18.91 8.78414Z'
                                    stroke='#292D32'
                                    stroke-width='1.5'
                                    stroke-miterlimit='10'
                                />
                                <path
                                    d='M6.08973 16.4931C8.07229 16.4931 9.67949 14.9744 9.67949 13.1011C9.67949 11.2277 8.07229 9.70898 6.08973 9.70898C4.10717 9.70898 2.5 11.2277 2.5 13.1011C2.5 14.9744 4.10717 16.4931 6.08973 16.4931Z'
                                    stroke='#292D32'
                                    stroke-width='1.5'
                                    stroke-miterlimit='10'
                                />
                                <path
                                    d='M18.91 22C20.8926 22 22.4998 20.4813 22.4998 18.6079C22.4998 16.7345 20.8926 15.2158 18.91 15.2158C16.9275 15.2158 15.3203 16.7345 15.3203 18.6079C15.3203 20.4813 16.9275 22 18.91 22Z'
                                    stroke='#292D32'
                                    stroke-width='1.5'
                                    stroke-miterlimit='10'
                                />
                                <line
                                    y1='-0.5'
                                    x2='8.26491'
                                    y2='-0.5'
                                    transform='matrix(0.846108 -0.533011 0.576484 0.817109 9.49219 11.9121)'
                                    stroke='#292D32'
                                />
                                <line
                                    y1='-0.5'
                                    x2='7.3317'
                                    y2='-0.5'
                                    transform='matrix(0.953805 0.300427 -0.332667 0.943044 9.49219 15.2158)'
                                    stroke='#292D32'
                                />
                            </svg>
                        </span>
                    </p>
                </div>
            </div>
            <div className=' border rounded-md shadow-lg '>
                <div className=' flex border-b-[1px] border-slate-100 pb-10 pt-3 flex-row px-0 justify-between'>
                    <h1 className=' px-4  text-2xl tracking-widest'>
                        Comments
                    </h1>
                </div>
                <div className=' py-4  w-full flex flex-col px-4'>
                    <div className=' w-full'>
                        <div className='w-[90%] mx-auto mt-8 space-y-6'>
                            <div className='w-full mx-auto mt-8 space-y-6'>
                                {comments.map((comment) =>
                                    renderComment(comment)
                                )}
                            </div>
                            <div className=' py-10 pt-0 w-full'>
                                <CommentBox />
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;
