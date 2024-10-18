// components/AudienceAge.tsx
import React from 'react';

const AudienceAge = () => {
    return (
        <div className='p-6 bg-[#FAFAFA] w-full rounded-lg shadow-md max-w-md'>
            {/* Audience Age Header with the Color Bar */}
            <div className='mb-4'>
                <h3 className='text-lg font-semibold text-gray-700'>
                    Audience Age
                </h3>
                <div className='h-2 mt-2 flex w-full'>
                    <div className='bg-pink-500 w-1/4'></div>
                    <div className='bg-blue-500 w-2/5'></div>
                    <div className='bg-green-500 w-1/5'></div>
                    <div className='bg-purple-500 w-1/10'></div>
                </div>
            </div>

            {/* Audience Age List */}
            <ul className='space-y-4'>
                <li className='flex justify-between items-center'>
                    <div className='flex items-center w-full'>
                        <span className='w-3 h-3 mr-2 bg-purple-500 rounded-full'></span>
                        <span className='text-gray-600'>
                            {'< 15 years old'}
                        </span>
                    </div>
                    <div className='flex justify-between w-full items-center'>
                        <span className='font-bold text-gray-800 w-full'>
                            21K
                        </span>
                        <div className='flex justify-between w-full items-center'>
                            <span className='ml-4 text-[#017EFA] w-10 h-10 mx-auto text-center py-[12px] text-xs rounded-full bg-[#E6F2FE] '>
                                27%
                            </span>
                        </div>
                    </div>
                </li>

                <li className='flex justify-between items-center'>
                    <div className='flex items-center w-full'>
                        <span className='w-3 h-3 mr-2 bg-purple-500 rounded-full'></span>
                        <span className='text-gray-600'>
                            {'20 - 35 years old'}
                        </span>
                    </div>
                    <div className='flex justify-between w-full items-center'>
                        <span className='font-bold text-gray-800 w-full'>
                            64K
                        </span>
                        <div className='flex justify-between w-full items-center'>
                            <span className='ml-4 text-[#017EFA] w-10 h-10 mx-auto text-center py-[12px] text-xs rounded-full bg-[#E6F2FE] '>
                                40%
                            </span>
                        </div>
                    </div>
                </li>

                <li className='flex justify-between items-center'>
                    <div className='flex items-center w-full'>
                        <span className='w-3 h-3 mr-2 bg-purple-500 rounded-full'></span>
                        <span className='text-gray-600'>
                            {'40 - 50 years old'}
                        </span>
                    </div>
                    <div className='flex justify-between w-full items-center'>
                        <span className='font-bold text-gray-800 w-full'>
                            18K
                        </span>
                        <div className='flex justify-between w-full items-center'>
                            <span className='ml-4 text-[#017EFA] w-10 h-10 mx-auto text-center py-[12px] text-xs rounded-full bg-[#E6F2FE] '>
                                16%
                            </span>
                        </div>
                    </div>
                </li>

                <li className='flex justify-between items-center'>
                    <div className='flex items-center w-full'>
                        <span className='w-3 h-3 mr-2 bg-purple-500 rounded-full'></span>
                        <span className='text-gray-600'>
                            {'> 50 years old'}
                        </span>
                    </div>
                    <div className='flex justify-between w-full items-center'>
                        <span className='font-bold text-gray-800 w-full'>
                            5K
                        </span>
                        <div className='flex justify-between w-full items-center'>
                            <span className='ml-4 text-[#017EFA] w-10 h-10 mx-auto text-center py-[12px] text-xs rounded-full bg-[#E6F2FE] '>
                                8%
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default AudienceAge;
