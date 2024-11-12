'use client';
import React, { useState } from 'react';

const genres = [
  'All',
  'Hero',
  'Supernatural',
  'Fantasy',
  'Comedy',
  'Action',
  'Romance',
  'Thriller',
];

const GenreFilter: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  return (
    <div className='flex pt-40 flex-wrap min-w-[250px] mx-auto max-w-[1058px] gap-6 p-4'>
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => setSelectedGenre(genre)}
          className={`px-4 py-2 tracking-wide text-lg rounded-full max-md:text-sm font-semibold ${
            selectedGenre === genre
              ? 'bg-black text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
