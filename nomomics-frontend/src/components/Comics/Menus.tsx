'use client';
import React, { useState } from 'react';

interface Props {
  menus: string[];
  active: string;
  setActive: (value: string) => void;
}

const Menu: React.FC<Props> = ({ menus, active, setActive }) => {
  // const [selectedMenu, setSelectedMenu] = useState<string>('Drama');

  return (
    <div className='flex font-roboto font-medium text-lg max-md:text-base max-480:text-sm flex-wrap justify-center min-w-[250px] max-w-[1053px] mx-auto pt-12 gap-6  border-gray-300 p-2'>
      {menus.map((menu: string) => (
        <button
          key={menu}
          onClick={() => setActive(menu.toLowerCase())}
          className={` hover:underline tracking-widest hover:underline-offset-8 ${
            active.toLowerCase() === menu.toLowerCase()
              ? ' font-semibold underline tracking-widest underline-offset-8'
              : ''
          }`}
        >
          {menu}
        </button>
      ))}
    </div>
  );
};

export default Menu;
