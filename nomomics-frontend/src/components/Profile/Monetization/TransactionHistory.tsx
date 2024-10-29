import React from 'react';
import TransactionModal from './TransactionModal';

interface Transaction {
  id: number;
  narration: string;
  amount: string;
  date: string;
  duration: string;
  status: string;
}

const transactions: Transaction[] = [
  {
    id: 1,
    narration: 'Narration',
    amount: '₦2,500',
    date: '13-08-2024',
    duration: '7 months',
    status: 'Approved',
  },
  {
    id: 2,
    narration: 'Narration',
    amount: '₦2,500',
    date: '13-08-2024',
    duration: '7 months',
    status: 'Approved',
  },
  {
    id: 3,
    narration: 'Narration',
    amount: '₦2,500',
    date: '13-08-2024',
    duration: '7 months',
    status: 'Approved',
  },
  {
    id: 4,
    narration: 'Narration',
    amount: '₦2,500',
    date: '13-08-2024',
    duration: '7 months',
    status: 'Approved',
  },
  {
    id: 5,
    narration: 'Narration',
    amount: '₦2,500',
    date: '13-08-2024',
    duration: '7 months',
    status: 'Approved',
  },
  // Add more rows as needed
];

const TransactionTable: React.FC = () => {
  return (
    <div className='overflow-x-auto  p-4 py-10  max-[1110px]:w-full max-w-2xl'>
      {/* <TransactionModal isOpen={true} onClose={false} /> */}
      <table className='min-w-[700px] table-auto flex justify-between items-center  '>
        <span>
          <thead className=' text-gray-700'>
            <tr>
              <th className='  px-4 py-3 text-left'>S/N</th>
              <th className='  px-4 py-3 text-left'>Narration</th>
            </tr>
          </thead>
          <tbody className='text-gray-800'>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id} className=''>
                <td className='px-4 py-3 text-sm'>{index + 1}</td>
                <td className='px-4 py-3 text-sm'>{transaction.narration}</td>
              </tr>
            ))}
          </tbody>
        </span>

        <span>
          <thead className=' text-gray-700'>
            <tr>
              <th className=' px-4 py-3 text-left'>Amount</th>
              <th className=' px-4 py-3 text-left'>Date</th>
              <th className=' px-4 py-3 text-left'>Duration</th>
              <th className=' px-4 py-3 text-left'>Status</th>
            </tr>
          </thead>
          <tbody className='text-gray-800'>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id} className=''>
                <td className='  px-4 py-3 text-sm'>{transaction.amount}</td>
                <td className='  px-4 py-3 text-sm'>{transaction.date}</td>
                <td className='  px-4 py-3 text-sm'>{transaction.duration}</td>
                <td className='  px-4 py-3 text-sm text-green-500 font-semibold'>
                  {transaction.status}
                </td>
              </tr>
            ))}
          </tbody>
        </span>
      </table>
    </div>
  );
};

export default TransactionTable;
