// components/UploadStatus.tsx
import React from 'react';

interface UploadStatusProps {
  icon: JSX.Element; // Pass an icon component or image element
  message: string;
  iconColor?: string; // Optional prop to change icon color
}

const Status: React.FC<UploadStatusProps> = ({
  icon,
  message,
  iconColor = 'text-brown-600',
}) => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-white'>
      <div
        className={`rounded-full bg-brown-500 p-8 ${iconColor}`}
        style={{ backgroundColor: '#8A3C0C' }} // Tailoring the brown color as in the image
      >
        {icon}
      </div>
      <p className='text-xl font-semibold mt-4 text-brown-700'>{message}</p>
    </div>
  );
};

export default Status;
