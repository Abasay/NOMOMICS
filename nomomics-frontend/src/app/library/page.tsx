'use client';
import ComicsSort from '@/components/Comics/ComicsSort';
import Menu from '@/components/Comics/Menus';
import { library } from '@/components/Comics/MenusData';
import { useState } from 'react';
export default function CategoriesPage() {
  const [active, setActive] = useState<string>('E-Comics');
  return (
    <div className='min-h-screen pb-6 flex flex-col items-center justify-center'>
      <Menu menus={library} active={active} setActive={setActive} />
      {/* <Comics title='' /> */}
      <ComicsSort title='' active={active} typeToSort='category' />
    </div>
  );
}
