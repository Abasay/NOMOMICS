import React from 'react';
import FileUpload from './FileUpload';

const ContentManagement = () => {
  const [filesType, setFilesType] = React.useState<string>('');
  return (
    <>
      {filesType && <FileUpload filesType={filesType} />}
      {!filesType && (
        <div className='p-6 py-10 w-full font-inter flex gap-6 bg-white rounded-lg transition-all delay-0 duration-500 ease-in-out mx-auto'>
          <div>
            <label
              htmlFor='fileType'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Choose file type to upload:
            </label>
            <select
              id='fileType'
              value={filesType}
              onChange={(e) => setFilesType(e.target.value)}
              className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>Select file type</option>
              <option value='pdf'>PDF</option>
              <option value='images'>Images</option>
            </select>
          </div>
        </div>
      )}
    </>
  );
};

export default ContentManagement;
