'use client';

import { HiOutlineSun as SunIcon, HiOutlineMoon as MoonIcon } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => setMounted(true), []);

  if (!mounted) return <>...</>;

  const iconClasses = `
    h-20 w-20 
    max-1280:h-16 max-1280:w-16 
    max-1024:h-14 max-1024:w-14 
    max-md:h-12 max-md:w-12 
    max-480:h-10 max-480:w-10
    transition-transform duration-300 ease-in-out
  `;

  if (currentTheme === 'dark') {
    return <SunIcon className={`${iconClasses} text-yellow-400`} onClick={() => setTheme('light')} />;
  }

  if (currentTheme === 'light') {
    return <MoonIcon className={`${iconClasses} text-gray-900`} onClick={() => setTheme('dark')} />;
  }
}
