// components/TransactionTable.tsx
import React from 'react';

interface Transaction {
    id: number;
    narration: string;
    amount: number;
    date: string;
    status: 'Approved' | 'Cancelled';
}

const TransactionTable: React.FC = () => {
    const transactions: Transaction[] = [
        {
            id: 1,
            narration: 'Token',
            amount: 2500,
            date: '13-08-2024',
            status: 'Approved',
        },
        {
            id: 2,
            narration: 'Cash',
            amount: -2500,
            date: '13-08-2024',
            status: 'Approved',
        },
        {
            id: 3,
            narration: 'Cash',
            amount: 2500,
            date: '13-08-2024',
            status: 'Approved',
        },
        {
            id: 4,
            narration: 'Send',
            amount: 2500,
            date: '13-08-2024',
            status: 'Approved',
        },
        {
            id: 5,
            narration: 'Coins',
            amount: -2500,
            date: '13-08-2024',
            status: 'Approved',
        },
        {
            id: 6,
            narration: 'Coins',
            amount: 2500,
            date: '13-08-2024',
            status: 'Cancelled',
        },
        {
            id: 7,
            narration: 'Token',
            amount: -2500,
            date: '13-08-2024',
            status: 'Approved',
        },
    ];

    const getAmountClass = (amount: number) => {
        if (amount > 0) return 'text-green-500';
        if (amount < 0) return 'text-red-500';
        return 'text-yellow-500';
    };

    return (
        <div className='overflow-x-auto font-inter'>
            <table className='min-w-full bg-white rounded-lg shadow-md'>
                {/* Table Head */}
                <thead>
                    <tr className=' text-left text-sm font-medium text-[#000000]'>
                        <th className='py-3 px-6'>S/N</th>
                        <th className='py-3 px-6'>Narration</th>
                        <th className='py-3 px-6'>Amount</th>
                        <th className='py-3 px-6'>Date</th>
                        <th className='py-3 px-6'>Status</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={transaction.id} className=' text-sm'>
                            <td className='py-3 px-6'>{index + 1}</td>
                            <td className='py-3 px-6'>
                                {transaction.narration}
                            </td>
                            <td
                                className={`py-3 px-6 font-medium ${getAmountClass(
                                    transaction.amount
                                )}`}
                            >
                                ₦{Math.abs(transaction.amount).toLocaleString()}
                            </td>
                            <td className='py-3 px-6'>{transaction.date}</td>
                            <td className='py-3 px-6'>
                                <span
                                    className={`${
                                        transaction.status === 'Approved'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    } font-semibold`}
                                >
                                    {transaction.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;
