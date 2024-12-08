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
import { useProfile } from '@/app/contexts/Profile';
import EpisodeCoverImage from './EpisodeCoverImage';

const FileUpload = ({ filesType }: { filesType: string }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedFile, setUploadedFile] = useState<string>('');
  const [files, setFiles] = useState<string[]>([]);
  const [showUploadDetails, setShowUploadDetails] = useState<boolean>(false);
  const [exist, setExist] = useState<boolean>(false);
  const [episode, setEpisode] = useState('1');
  const [loading, setLoading] = useState<boolean>(false);
  const [episodeCoverImage, setEpisodeCoverImage] = useState<string>('');

  const onDrop = async (acceptedFiles: File[]) => {
    setUploadedFiles(acceptedFiles);
    console.log(acceptedFiles);
    const convertedFiles = await Promise.all(
      acceptedFiles.map(async (file) => {
        const convertedFile = (await pdfToBase64(file)) as string;
        return convertedFile;
      })
    );

    setFiles(convertedFiles);
    const convertedFile = (await pdfToBase64(acceptedFiles[0])) as string;
    setUploadedFile(convertedFile);
    console.log(convertedFile);
  };
  const { myComics, setMyComics } = useProfile();

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
      setMyComics(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept:
      filesType === 'pdf'
        ? {
            // 'video/mp4': ['.mp4'],
            // 'video/3gpp': ['.3gp'],
            // 'video/x-matroska': ['.mkv'],
            'application/pdf': ['.pdf'],
            // 'image/png': ['.png'],
          }
        : {
            'image/png': ['.png', '.jpg', '.jpeg'],
          },
  });

  useEffect(() => {
    const findComic = myComics.find(
      (comic) => comic.title === title && comic.author === author
    );

    setExist(findComic ? true : false);

    if (findComic) {
      setEpisode(findComic.episodes.length + 1);
    }
  }, [title, author]);

  const handleUploadFilesForUrls = async (file: string): Promise<string> => {
    let url;
    try {
      const url =
        filesType === 'pdf' ? '/upload-comic-as-pdf' : '/upload-comic-as-pic';
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comics${url}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
          body: JSON.stringify({
            base64File: file,
            // id: Cookies.get('id'),
            title: title,
          }),
        }
      );

      const response = await request.json();
      if (response.success) {
        return response.data.url;
      } else {
        return 'An error occurred';
      }
    } catch (error) {
      console.log(error);
      // throw new Error(error)
      return 'An error occurred';
    }
  };
  const handleSubmit = async () => {
    // Handle the form submission

    setLoading(true);
    Swal.fire({
      title: 'Uploading Comic',
      html: 'Please wait...',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const filesUrl = await Promise.all(
      files.map(async (file) => {
        return await handleUploadFilesForUrls(file);
      })
    );

    console.log(filesUrl);

    if (Array.isArray(filesUrl)) {
      try {
        // toast.loading('Uploading Comic...');

        const comicToUpload = myComics.find(
          (comic) => comic.title === title && comic.author === author
        );

        const reqBody =
          comicToUpload?.location === 'marketplace'
            ? {
                episode,
                title,
                author,
                description: description || comicToUpload?.description,
                synopsis: comicToUpload?.synopsis,
                genre: comicToUpload?.genre,
                category: comicToUpload?.category,
                location: comicToUpload?.location,
                ageLimit: comicToUpload?.ageLimit,
                coverImage: episodeCoverImage,
                subTitle: comicToUpload?.subTitle,
                filesType,
                files: filesUrl,
                price: comicToUpload?.price,
              }
            : {
                episode,
                title,
                author,
                description: description || comicToUpload?.description,
                synopsis: comicToUpload?.synopsis,
                genre: comicToUpload?.genre,
                category: comicToUpload?.category,
                location: comicToUpload?.location,
                ageLimit: comicToUpload?.ageLimit,
                coverImage: episodeCoverImage,
                subTitle: comicToUpload?.subTitle,
                filesType,
                files: filesUrl,
              };
        const request = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/comics/comic/upload`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify({
              // uploadedFile: filesUrl,
              episode,
              title,
              author,
              description: description || comicToUpload?.description,
              synopsis: comicToUpload?.synopsis,
              genre: comicToUpload?.genre,
              category: comicToUpload?.category,
              location: comicToUpload?.location,
              ageLimit: comicToUpload?.ageLimit,
              coverImage: episodeCoverImage,
              subTitle: comicToUpload?.subTitle,
              filesType,
              files: filesUrl,
            }),
          }
        );

        const response = await request.json();
        toast.dismiss();
        setLoading(false);
        if (response.success) {
          // toast.success('Comic successfully uploaded');
          Swal.fire({
            icon: 'success',
            text: 'Comic successfully uploaded!.',
          });

          getMyComics();
        } else {
          Swal.fire({
            icon: 'error',
            text: response.message,
          });
        }
      } catch (error: any) {
        console.log(error);
        // toast.error(error.message);
        Swal.fire({
          icon: 'error',
          text: error.message,
        });
      }
    }
  };

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
            comicDetails={{
              title,
              author,
              description,
              uploadedFile,
              files,
              filesType,
            }}
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
              <label htmlFor='title' className='block text-sm font-medium '>
                Title
              </label>
              <input
                type='text'
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='TItle of the Comic'
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
                placeholder='Type the Author'
                className='mt-1 block  w-full p-2 border-2 transition-all delay-0 duration-300 ease-in-out focus:border-primary rounded-md outline-none'
              />
            </div>

            {!exist && (
              <div>
                <label
                  htmlFor='description'
                  className={`block text-sm font-medium  ${
                    !exist ? styles['fade-in'] : styles['fade-out']
                  }`}
                >
                  Description
                </label>
                <input
                  type='text'
                  id='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='A description of the comic'
                  className='mt-1 block  w-full p-2 border-2 transition-all delay-0 duration-300 ease-in-out focus:border-primary rounded-md outline-none'
                />
              </div>
            )}

            {exist && (
              <div>
                <label
                  htmlFor='description'
                  className={`block text-sm font-medium  ${
                    exist ? styles['fade-in'] : styles['fade-out']
                  }`}
                >
                  Episode number
                </label>
                <input
                  type='number'
                  id='episode'
                  value={episode}
                  onChange={(e) => setEpisode(e.target.value as any)}
                  placeholder='What episode number is this?'
                  className='mt-1 block  w-full p-2 border-2 transition-all delay-0 duration-300 ease-in-out focus:border-primary rounded-md outline-none'
                />
                <EpisodeCoverImage
                  coverImage={episodeCoverImage}
                  setCoverImage={setEpisodeCoverImage}
                />
              </div>
            )}
          </div>

          <div className='mt-6 flex justify-end gap-8'>
            <button className='px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 font-medium'>
              Next file
            </button>
            {!exist ? (
              <button
                onClick={() => {
                  if (!uploadedFile || !title || !author || !description) {
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
            ) : (
              <button
                onClick={() => {
                  if (!uploadedFile || !title || !author || !episode) {
                    // toast.error('Please fill all fields.');
                    Swal.fire({
                      icon: 'info',
                      text: 'All fields are required!',
                    });
                    return;
                  }
                  handleSubmit();
                }}
                className='px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-md text-white font-medium'
              >
                {loading ? 'Uploading...' : 'Upload'}
              </button>
            )}
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
