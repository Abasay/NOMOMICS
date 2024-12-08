import { imageToBase64 } from '@/libs/fileConvert';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const EpisodeCoverImage = (props: {
  coverImage: string;
  setCoverImage: (coverImage: string) => void;
}) => {
  const { setCoverImage } = props;

  const onDrop = async (acceptedFiles: File[]) => {
    const convertedImage = (await imageToBase64(acceptedFiles[0])) as string;
    setCoverImage(convertedImage);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png', '.jpeg', '.jpg', '.webp'],
    },
  });
  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 rounded-md text-center cursor-pointer ${
          isDragActive ? 'border-primary' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            Click or drag image to this area to upload
            <br />
            <span className='text-sm text-gray-500'>
              Formats accepted are .png .jpg .jpeg
            </span>
            <span className='text-sm text-gray-500'>
              Note: if not set, comic default cover image will be used
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default EpisodeCoverImage;
