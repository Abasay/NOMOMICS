'use client';
import React, { useState } from 'react';

interface Props {
  menus: string[];
}

const Menu: React.FC<Props> = ({ menus }) => {
  const [selectedMenu, setSelectedMenu] = useState<string>('Drama');

  return (
    <div className='flex font-roboto font-medium text-lg max-md:text-base max-480:text-sm flex-wrap justify-center min-w-[250px] max-w-[1053px] mx-auto pt-12 gap-6  border-gray-300 p-2'>
      {menus.map((menu: string) => (
        <button
          key={menu}
          onClick={() => setSelectedMenu(menu)}
          className={` hover:underline tracking-widest hover:underline-offset-8 ${
            selectedMenu === menu ? ' font-semibold' : ''
          }`}
        >
          {menu}
        </button>
      ))}
    </div>
  );
};

export default Menu;
