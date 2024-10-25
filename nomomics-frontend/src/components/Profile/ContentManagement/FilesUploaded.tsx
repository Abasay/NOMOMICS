import React, { useState } from 'react';
import dummy from '@/public/images/dummy.jpg';
import Image from 'next/image';

import { StaticImageData } from 'next/image';

interface FileItem {
  id: number;
  imageUrl: StaticImageData;
  title: string;
}

const UploadedFileList: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([
    { id: 1, imageUrl: dummy, title: 'Episode 2' },
    { id: 2, imageUrl: dummy, title: 'Episode 2' },
    { id: 3, imageUrl: dummy, title: 'Episode 2' },
    { id: 4, imageUrl: dummy, title: 'Episode 2' },
  ]);

  const removeFile = (id: number) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  return (
    <div className='p-6 bg-[#FAFAFA] flex flex-col justify-between h-full max-w-md mx-auto'>
      <div className='w-full'>
        <h2 className='text-lg font-semibold mb-4'>Uploaded file</h2>

        <div className='space-y-4'>
          {files.map((file) => (
            <div key={file.id} className='flex items-center space-x-4'>
              <Image
                src={file.imageUrl}
                alt={file.title}
                width={64}
                height={64}
                className='w-16 h-16 rounded-md object-cover'
              />
              <div className='flex-1'>
                <p className='text-md font-medium'>{file.title}</p>
                <button
                  onClick={() => removeFile(file.id)}
                  className='text-red-500 text-sm font-semibold'
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-8 flex justify-center'>
        <button className='px-8 py-2 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white font-semibold rounded-md'>
          Draft
        </button>
      </div>
    </div>
  );
};

export default UploadedFileList;
