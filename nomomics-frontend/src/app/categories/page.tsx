'use client';
import Comics from '@/components/Comics';
import ComicsSort from '@/components/Comics/ComicsSort';
import Menu from '@/components/Comics/Menus';
import { Categories } from '@/components/Comics/MenusData';
import { useState } from 'react';

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  return (
    <div className='mt-20 pb-6'>
      <Menu
        menus={Categories}
        active={activeCategory}
        setActive={setActiveCategory}
      />
      <ComicsSort title='' active={activeCategory} typeToSort={'category'} />
    </div>
  );
}
