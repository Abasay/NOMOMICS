// components/WatchlistCard.tsx
import React, { useState } from 'react';

interface WatchlistItem {
    name: string;
    amount: number;
    isUp: boolean;
    icon?: JSX.Element;
}

const WatchlistCard: React.FC = () => {
    const [timeframe, setTimeframe] = useState('Weekly');

    const items: WatchlistItem[] = [
        {
            name: 'Cash',
            amount: 1658.0,
            isUp: true,
            icon: (
                <svg
                    width='59'
                    height='20'
                    viewBox='0 0 59 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M10.3519 2.07344C9.70323 6.28958 4.13576 10.5868 1.43311 12.2084V17.0732L57.7835 19.1002V12.2084L50.4863 2.07344L44.4053 7.34362L41.1621 12.2084L20.8922 7.34362L17.2436 12.2084C15.2166 7.07335 11.0005 -2.1427 10.3519 2.07344Z'
                        fill='url(#paint0_linear_2450_2542)'
                    />
                    <path
                        d='M1.43311 12.2084C4.13576 10.5868 9.70323 6.28958 10.3519 2.07344C11.0005 -2.1427 15.2166 7.07335 17.2436 12.2084L20.8922 7.34362L41.1621 12.2084L44.4053 7.34362L50.4863 2.07344L57.7835 12.2084'
                        stroke='#5DB48A'
                        stroke-linecap='round'
                    />
                    <defs>
                        <linearGradient
                            id='paint0_linear_2450_2542'
                            x1='27.3786'
                            y1='-1.16975'
                            x2='26.9732'
                            y2='19.1002'
                            gradientUnits='userSpaceOnUse'
                        >
                            <stop stop-color='#49A677' />
                            <stop
                                offset='1'
                                stop-color='white'
                                stop-opacity='0'
                            />
                        </linearGradient>
                    </defs>
                </svg>
            ),
        },
        {
            name: 'Token',
            amount: 1658.0,
            isUp: false,
            icon: (
                <svg
                    width='59'
                    height='22'
                    viewBox='0 0 59 22'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M10.2772 4.35887C9.62852 8.57501 4.06105 12.8722 1.3584 14.4938V19.3586L57.7088 21.3856V14.4938L50.4223 8.91578H43.526L33.9174 1.01209L20.8175 9.62904L17.4733 4.35887C15.4463 -0.776172 10.9258 0.142728 10.2772 4.35887Z'
                        fill='url(#paint0_linear_2450_2552)'
                    />
                    <path
                        d='M1.3584 14.4955C4.06105 12.8739 9.62852 8.57663 10.2772 4.36049C10.9258 0.144349 14.899 -0.864347 16.926 4.2707L20.8175 9.63067L34.0025 0.979123L43.7449 8.62997H50.4223L57.7088 14.4955'
                        stroke='#EB7487'
                        stroke-linecap='round'
                    />
                    <defs>
                        <linearGradient
                            id='paint0_linear_2450_2552'
                            x1='27.3039'
                            y1='1.11569'
                            x2='26.8985'
                            y2='21.3856'
                            gradientUnits='userSpaceOnUse'
                        >
                            <stop stop-color='#EB94A2' />
                            <stop
                                offset='1'
                                stop-color='#EB94A2'
                                stop-opacity='0'
                            />
                        </linearGradient>
                    </defs>
                </svg>
            ),
        },
        {
            name: 'Coins',
            amount: 1658.0,
            isUp: true,
            icon: (
                <svg
                    width='59'
                    height='19'
                    viewBox='0 0 59 19'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M10.2772 1.87032C9.62852 6.08646 4.06105 10.3837 1.3584 12.0053V16.8701L57.7088 18.897V12.0053L50.4116 1.87032L44.3306 7.14049L41.0874 12.0053L20.8175 7.14049L17.1689 12.0053C15.1419 6.87023 10.9258 -2.34583 10.2772 1.87032Z'
                        fill='url(#paint0_linear_2450_2562)'
                    />
                    <path
                        d='M1.3584 12.0053C4.06105 10.3837 9.62852 6.08646 10.2772 1.87032C10.9258 -2.34583 15.1419 6.87023 17.1689 12.0053L20.8175 7.14049L41.0874 12.0053L44.3306 7.14049L50.4116 1.87032L57.7088 12.0053'
                        stroke='#5DB48A'
                        stroke-linecap='round'
                    />
                    <defs>
                        <linearGradient
                            id='paint0_linear_2450_2562'
                            x1='27.3039'
                            y1='-1.37287'
                            x2='26.8985'
                            y2='18.897'
                            gradientUnits='userSpaceOnUse'
                        >
                            <stop stop-color='#49A677' />
                            <stop
                                offset='1'
                                stop-color='white'
                                stop-opacity='0'
                            />
                        </linearGradient>
                    </defs>
                </svg>
            ),
        },
    ];

    return (
        <div className='bg-white w-full rounded-xl shadow-lg p-4 px-5 py-12'>
            {/* Header */}
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-lg font-semibold'>Watchlist</h2>
                <div className='relative'>
                    <button
                        className='text-sm font-medium text-gray-500 hover:text-black'
                        onClick={() =>
                            setTimeframe(
                                timeframe === 'Weekly' ? 'Monthly' : 'Weekly'
                            )
                        }
                    >
                        {timeframe} ▾
                    </button>
                </div>
            </div>

            {/* Watchlist Items */}
            <div className='space-y-3'>
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`flex justify-between py-2  items-center ${
                            index !== 2 && 'border-b border-[#979797]'
                        }`}
                    >
                        <div className='flex items-center space-x-2'>
                            {/* Simulated small graph */}

                            <span className='font-semibold'>{item.name}</span>
                        </div>
                        <span>{item.icon}</span>
                        <div className='flex items-center space-x-1'>
                            <span className='font-semibold text-gray-800'>
                                {item.amount.toFixed(2)}
                            </span>
                            {item.isUp ? (
                                <span className='text-green-500'>↑</span>
                            ) : (
                                <span className='text-red-500'>↓</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Details Button */}
            <div className='mt-4 w-[50%] mx-auto'>
                <button className='w-full py-2 text-center text-blue-600 bg-blue-100 rounded-lg font-medium hover:bg-blue-200'>
                    Details
                </button>
            </div>
        </div>
    );
};

export default WatchlistCard;
