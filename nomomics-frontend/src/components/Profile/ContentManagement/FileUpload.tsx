import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadedFileList from './FilesUploaded';
import UploadDetails from './UploadDetaiils';
import styles from '@/styles/common.module.css';
import Status from '../Status';
import statusLogo from '@/public/svgs/status.svg';
import Image from 'next/image';
import { pdfToBase64 } from '@/libs/fileConvert';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const FileUpload = () => {
  const [subTitle, setSubTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedFile, setUploadedFile] = useState<string>('');
  const [showUploadDetails, setShowUploadDetails] = useState<boolean>(false);
  const [myComics, setMyComics] = useState<any[]>([]);

  const onDrop = async (acceptedFiles: File[]) => {
    setUploadedFiles(acceptedFiles);
    console.log(acceptedFiles);
    const convertedFile = (await pdfToBase64(acceptedFiles[0])) as string;
    setUploadedFile(convertedFile);
    console.log(convertedFile);
  };

  const getMyComics = async () => {
    // fetch my comics
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comics/comics/user`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      );

      const data = await res.json();
      setMyComics(data);
    } catch (error) {
      console.log(error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
      'video/3gpp': ['.3gp'],
      'video/x-matroska': ['.mkv'],
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
    },
  });

  return (
    <div className='p-6 py-10 w-full font-inter flex gap-6 bg-white rounded-lg transition-all delay-0 duration-500 ease-in-out mx-auto'>
      {/* <Status
        message='Upload success'
        icon={<Image width={100} height={200} src={statusLogo} alt='status' />}
      /> */}
      {showUploadDetails ? (
        <div
          className={` w-full ${
            showUploadDetails ? styles['slide-in'] : styles['slide-out']
          }`}
        >
          <UploadDetails
            setShowUploadDetails={setShowUploadDetails}
            showUploadDetails={showUploadDetails}
            comicDetails={{ subTitle, author, description, uploadedFile }}
          />
        </div>
      ) : (
        <div
          className={`w-full ${
            showUploadDetails ? styles['slide-out'] : styles['slide-in']
          }`}
        >
          <h2 className='text-lg font-semibold mb-4'>File Upload</h2>

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
                Click or drag file to this area to upload
                <br />
                <span className='text-sm text-gray-500'>
                  Formats accepted are .mp4 .3gp .mkv .pdf .png
                </span>
              </p>
            )}
          </div>

          <div className='mt-4'>
            {uploadedFiles.length > 0 && (
              <ul className='list-disc list-inside text-sm'>
                {uploadedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>

          <div className='mt-6 space-y-4'>
            <div>
              <label htmlFor='subTitle' className='block text-sm font-medium '>
                Sub-Title
              </label>
              <input
                type='text'
                id='subTitle'
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                placeholder='Type your Sub-title'
                className='mt-1 block  w-full p-2 border-2 transition-all delay-0 duration-300 ease-in-out focus:border-primary rounded-md outline-none'
              />
            </div>

            <div>
              <label
                htmlFor='description'
                className='block text-sm font-medium '
              >
                Description
              </label>
              <input
                type='text'
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Type your Sub-title'
                className='mt-1 block  w-full p-2 border-2 transition-all delay-0 duration-300 ease-in-out focus:border-primary rounded-md outline-none'
              />
            </div>

            <div>
              <label htmlFor='author' className='block text-sm font-medium '>
                Author
              </label>
              <input
                type='text'
                id='author'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder='Type your Sub-title'
                className='mt-1 block  w-full p-2 border-2 transition-all delay-0 duration-300 ease-in-out focus:border-primary rounded-md outline-none'
              />
            </div>
          </div>

          <div className='mt-6 flex justify-end gap-8'>
            <button className='px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 font-medium'>
              Next file
            </button>
            <button
              onClick={() => {
                if (!uploadedFile || !subTitle || !author || !description) {
                  // toast.error('Please fill all fields.');
                  Swal.fire({
                    icon: 'info',
                    text: 'All fields are required!',
                  });
                  return;
                }
                setShowUploadDetails(!showUploadDetails);
              }}
              className='px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-md text-white font-medium'
            >
              {showUploadDetails ? 'Back' : 'Continue'}
            </button>
          </div>
        </div>
      )}

      <div className='w-full'>
        <UploadedFileList />
      </div>
    </div>
  );
};

export default FileUpload;
