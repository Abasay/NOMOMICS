// components/GenderDoughnutChart.tsx
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import React from 'react';

Chart.register(ArcElement);

const GenderDoughnutChart = () => {
    // Data for the gender doughnut chart
    const data = {
        labels: ['Male', 'Female', 'Other'],
        datasets: [
            {
                data: [68, 38, 12], // Percentages for Male, Female, Other
                backgroundColor: ['#007bff', '#38bdf8', '#22c55e'],
                hoverBackgroundColor: ['#0056b3', '#0ea5e9', '#15803d'],
                borderWidth: 0,
                cutout: '75%', // Size of the inner cutout, controls doughnut thickness
            },
        ],
    };

    // Custom chart options
    const options = {
        plugins: {
            legend: {
                display: false, // Hide default legend
            },
        },
        cutout: '75%',
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className='relative w-64 h-72'>
            {/* Doughnut chart */}
            <Doughnut data={data} options={options} />

            {/* Custom Percentage Labels */}
            <div className='absolute top-0 py-2 shadow-lg shadow-gray-600 bg-[#FFFFFF] w-12 h-12 rounded-full left-1/3 transform -translate-x-1/2 text-center'>
                <span className='text-lg font-semibold text-gray-800'>12%</span>
            </div>
            <div className='absolute bottom-16 py-2 shadow-lg shadow-gray-600 bg-[#FFFFFF] w-12 h-12 rounded-full left-1/5 transform -translate-x-1/2 text-center'>
                <span className='text-lg font-semibold text-gray-800'>38%</span>
            </div>
            <div className='absolute bottom-10 py-2 shadow-lg shadow-gray-600 bg-[#FFFFFF] w-12 h-12 rounded-full right-1/4 transform translate-x-1/2 text-center'>
                <span className='text-lg font-semibold text-gray-800'>68%</span>
            </div>

            {/* Center text */}
            <div className='absolute inset-0 flex items-center justify-center'>
                <span className='text-2xl  font-semibold text-black'>
                    Gender
                </span>
            </div>

            <div className=' w-[80%] mx-auto flex gap-4 justify-between items-center'>
                <div className=' flex items-center gap-2'>
                    <span className=' w-5 h-5 rounded-full bg-[#017EFA]'></span>
                    <span>Male</span>
                </div>
                <div className=' flex items-center gap-2'>
                    <span className=' w-5 h-5 rounded-full bg-[#51CBFF]'></span>
                    <span>Female</span>
                </div>
                <div className=' flex items-center gap-2'>
                    <span className=' w-5 h-5 rounded-full bg-[#30D887]'></span>
                    <span>Other</span>
                </div>
            </div>
        </div>
    );
};

export default GenderDoughnutChart;
