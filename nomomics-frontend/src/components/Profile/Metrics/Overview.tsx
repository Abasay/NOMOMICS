import React from 'react';

interface StatProps {
    label: string;
    value: string;
    color: string;
}

const Stat: React.FC<StatProps> = ({ label, value, color }) => (
    <div className='flex justify-between items-center'>
        <span className='text-gray-700'>{label}</span>
        <div className='flex items-center space-x-2'>
            <div className={`w-64 h-2 ${color} rounded`}></div>
            <span className='text-gray-600'>{value}</span>
        </div>
    </div>
);

const Overview: React.FC = () => {
    return (
        <div className='p-6 w-full max-w-lg mx-auto bg-white shadow-md rounded-md'>
            <div className='flex justify-between items-center mb-4'>
                <span className='text-lg font-semibold'>Overview</span>
                <span className='text-sm text-gray-500'>
                    Week
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-4 h-4 inline-block ml-1'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M6 9l6 6 6-6'
                        />
                    </svg>
                </span>
            </div>

            <div className='space-y-4'>
                <Stat label='Saved' value='12k' color='bg-blue-600' />
                <Stat label='Views' value='12k' color='bg-orange-500' />
                <Stat label='Comments' value='12k' color='bg-yellow-400' />
                <Stat label='Thumb up' value='12k' color='bg-purple-500' />
                <Stat label='Thumb down' value='12k' color='bg-green-500' />
            </div>
        </div>
    );
};

export default Overview;
