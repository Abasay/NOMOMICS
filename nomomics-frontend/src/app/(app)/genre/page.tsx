'use client';
import Comics from '@/components/Comics';
import ComicsSort from '@/components/Comics/ComicsSort';
import Menu from '@/components/Comics/Menus';
import { genres } from '@/components/Comics/MenusData';
import { useState } from 'react';

export default function GenresPage() {
  const [activeGenre, setActiveGenre] = useState<string>('all');
  return (
    <div className=' mt-20 pb-6 flex flex-col items-center justify-center'>
      <Menu menus={genres} active={activeGenre} setActive={setActiveGenre} />
      <ComicsSort title='' active={activeGenre} typeToSort={'genre'} />
    </div>
  );
}
