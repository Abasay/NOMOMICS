// components/UploadDetails.tsx
import React, { useState } from 'react';
import { AiFillBackward } from 'react-icons/ai';
import { FaBackspace } from 'react-icons/fa';

interface UploadDetailsProps {
  setShowUploadDetails: (value: boolean) => void;
  showUploadDetails: boolean;
}

const UploadDetails: React.FC<UploadDetailsProps> = ({
  setShowUploadDetails,
  showUploadDetails,
}) => {
  const [title, setTitle] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [genre, setGenre] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [ageLimit, setAgeLimit] = useState('');

  const handleSubmit = () => {
    // Handle the form submission
    console.log({
      title,
      synopsis,
      genre,
      category,
      location,
      ageLimit,
    });
  };

  return (
    <div className=' bg-white flex flex-col justify-center items-center'>
      <div className=' w-full mb-2'>
        <button
          onClick={() => setShowUploadDetails(!showUploadDetails)}
          className=' py-2 flex gap-2 items-center text-lg  '
        >
          <FaBackspace />
          <span>Back</span>
        </button>
      </div>
      <div className='w-full  max-w-md'>
        <h1 className='text-lg font-semibold mb-6'>Upload Details</h1>

        <div className='mb-4'>
          <label className='block mb-2'>Title</label>
          <input
            type='text'
            className='w-full p-2 border  text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className='mb-4'>
          <label className='block mb-2'>Synopsis</label>
          <textarea
            className='w-full p-2 border  text-gray-400  rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
          />
        </div>

        <div className='mb-4'>
          <label className='block mb-2'>Genre</label>
          <select
            className='w-full p-2 border  text-gray-400  rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value=''>Select Genre</option>
            <option value='comedy'>Comedy</option>
            <option value='action'>Action</option>
            <option value='romance'>Romance</option>
            <option value='sci-fi'>Sci-Fi</option>
            <option value='thriller'>Thriller</option>
            <option value='superhero'>Superhero</option>
            <option value='18+'>18+</option>
          </select>
        </div>

        <div className='mb-4'>
          <label className='block mb-2'>Category</label>
          <select
            className='w-full p-2 border  text-gray-400  rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value=''>Select Category</option>
            <option value='fiction'>Friction</option>
            <option value='horror'>Horror</option>
            <option value='humor'>Humor</option>
            <option value='sci-fi'>Science-Friction</option>
          </select>
        </div>

        <div className='mb-4'>
          <label className='block mb-2'>Location</label>
          <select
            className='w-full p-2 border  text-gray-400  rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value=''>Select Location</option>
            <option value='marketplace'>Market Place</option>
            <option value='reelflow'>Reel Flow</option>
            <option value='e-comics'>E-Comics</option>
          </select>
        </div>

        <div className='mb-4'>
          <label className='block mb-2'>Age Limit (+18)</label>
          <select
            className='w-full p-2 border  text-gray-400  rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
            value={ageLimit}
            onChange={(e) => setAgeLimit(e.target.value)}
          >
            <option value=''>Select Age Limit</option>
            <option value='yes'>Yes</option>
            <option value='no'>No</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className='w-full py-2 bg-yellow-500 text-gray-900 font-bold rounded-md hover:bg-yellow-400 transition'
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default UploadDetails;
