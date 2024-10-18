// components/Followers.tsx
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import React from 'react';
import AudienceAge from './Audience';
import GenderDoughnutChart from './Chart';

Chart.register(ArcElement);

const Followers = () => {
    // Data for the gender chart
    const genderData = {
        labels: ['Male', 'Female', 'Other'],
        datasets: [
            {
                data: [68, 38, 12], // Male, Female, Other percentages
                backgroundColor: ['#007bff', '#38bdf8', '#22c55e'],
                hoverBackgroundColor: ['#0056b3', '#0ea5e9', '#15803d'],
                borderWidth: 0,
            },
        ],
    };

    return (
        <div className=' w-full p-6 px-0 bg-white rounded-lg shadow-md'>
            {/* Header */}
            <h2 className='text-2xl px-6 flex gap-4 py-5 border-b border-[#DADADA]  font-semibold text-gray-800 mb-4'>
                <span>
                    <svg
                        width='34'
                        height='34'
                        viewBox='0 0 34 34'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <circle cx='17' cy='17' r='17' fill='#017EFA' />
                        <path
                            fill-rule='evenodd'
                            clip-rule='evenodd'
                            d='M11.3066 22.3808C11.645 22.8977 12.0438 23.3762 12.4967 23.8055C13.6189 24.8691 15.0252 25.5848 16.5456 25.8659C18.066 26.1469 19.6353 25.9814 21.0636 25.3893C22.4919 24.7972 23.718 23.8039 24.5936 22.5296C25.4692 21.2552 25.9567 19.7544 25.9972 18.2088C26.0378 16.6632 25.6295 15.1389 24.8219 13.8204C24.0143 12.502 22.8419 11.4458 21.4466 10.7797C20.5023 10.3289 19.4832 10.0698 18.4479 10.0117L19.0031 12.0836C19.5482 12.1761 20.0808 12.3439 20.5849 12.5845C21.6314 13.0841 22.5107 13.8763 23.1164 14.8651C23.7221 15.854 24.0283 16.9972 23.9979 18.1564C23.9675 19.3156 23.6019 20.4412 22.9452 21.397C22.2885 22.3527 21.3689 23.0977 20.2977 23.5418C19.2265 23.9859 18.0495 24.11 16.9092 23.8992C15.7689 23.6884 14.7141 23.1516 13.8725 22.3539C13.6968 22.1874 13.5319 22.0109 13.3785 21.8257L11.3066 22.3808Z'
                            fill='white'
                        />
                        <path
                            d='M11.9124 10.0665C12.6892 9.47037 13.548 8.99272 14.4604 8.64739C14.8798 8.48868 15.0895 8.40932 15.2869 8.51053C15.4844 8.61174 15.5465 8.84338 15.6706 9.30667L17.7412 17.0341C17.8632 17.4894 17.9242 17.7171 17.8206 17.8964C17.7171 18.0758 17.4894 18.1368 17.0341 18.2588L9.30667 20.3294C8.84338 20.4535 8.61174 20.5156 8.42535 20.3952C8.23896 20.2747 8.20284 20.0535 8.13061 19.6109C7.97344 18.6481 7.95774 17.6656 8.08555 16.6947C8.25696 15.3928 8.68314 14.1373 9.33975 13C9.99636 11.8627 10.8705 10.8659 11.9124 10.0665Z'
                            stroke='white'
                            stroke-width='2'
                        />
                    </svg>
                </span>
                <span>Followers</span>
            </h2>

            {/* Gender and Audience Stats Container */}
            <div className='flex w-full gap-6 px-8 justify-center items-center'>
                {/* Gender Chart */}
                <div className=' w-full'>
                    <GenderDoughnutChart />
                </div>

                <div className=' w-full'>
                    <AudienceAge />
                </div>
            </div>
        </div>
    );
};

export default Followers;
