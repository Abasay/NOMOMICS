'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import menuData from './menuData';
import logo from '@/public/svgs/signup-logo-1.svg';
import styles from '@/styles/common.module.css';
import Cookies from 'js-cookie';
import { useProfile } from '@/app/contexts/Profile';
import defaultLogo from '@/public/images/default.jpg';

const Header = () => {
  const isLoggedIn = Cookies.get('isLoggedIn');
  const router = useRouter();

  const { profile, updateProfile } = useProfile();

  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const [authOpen, setAuthOpen] = useState<boolean>(false);

  const authToggleHandler = () => {
    setAuthOpen(!authOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleStickyNavbar);
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: any) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const usePathName = usePathname();

  return (
    <div className=' overflow-hidden'>
      <nav
        className={`header font-montserrat left-0 top-0 z-40 h-[92px] font-semibold max-480:text-sm text-[16px] text-black tracking-widest leading-6 flex w-full items-center ${
          sticky
            ? 'fixed z-[9999] bg-secondary !bg-opacity-80 shadow-sticky backdrop-blur-sm transition dark:bg-gray-dark dark:shadow-sticky-dark'
            : 'absolute bg-secondary'
        }`}
      >
        <div className='container w-[95%] mx-auto'>
          <div className='relative flex items-center justify-between gap-6 '>
            <div className=' w-60'>
              <Link href='/' className={`header-logo block w-full ${sticky ? 'py-3 lg:py-2' : 'py-3'} `}>
                <Image src={logo} alt='Nomomics Logo' width={140} height={30} className='w-full h-full  ' />
              </Link>
            </div>
            <div className='flex items-center justify-between'>
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id='navbarToggler'
                  aria-label='Mobile Menu'
                  className='absolute right-2 top-1/2 block translate-y-[-50%] rounded-lg px-3   lg:hidden'
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300  ${
                      navbarOpen ? ' top-[7px] rotate-45' : ' '
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300  ${
                      navbarOpen ? 'opacity-0 ' : ' '
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300  ${
                      navbarOpen ? ' top-[-8px] -rotate-45' : ' '
                    }`}
                  />
                </button>
                <nav
                  id='navbarCollapse'
                  className={` absolute right-0 z-50 w-[250px] rounded border-[.5px] border-body-color/50 bg-white dark:bg-gray-600 dark:text-white py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen ? 'visibility top-full opacity-100 px-5 text-black' : 'invisible top-[120%] opacity-0'
                  }`}
                >
                  <ul className='block lg:flex items-center lg:space-x-6'>
                    {menuData.map((menuItem, index) => (
                      <li key={index} className=' relative'>
                        {menuItem.path ? (
                          <Link
                            href={menuItem.path}
                            className={`flex w-auto py-2 min-w-16 text-base max-480:text-sm lg:mr-0 lg:inline-flex lg:px-0  ${
                              usePathName === menuItem.path
                                ? '  border-b-4 border-white'
                                : 'text-dark hover:text-onHover max-1024:hover:text-secondary '
                            }`}
                          >
                            {menuItem.title}
                          </Link>
                        ) : (
                          <div>
                            <p
                              onClick={() => handleSubmenu(index)}
                              className='flex cursor-pointer items-center justify-between py-2 text-base max-480:text-sm text-dark group-hover:text-onHover lg:mr-0 lg:inline-flex lg:px-0 lg:py-6'
                            >
                              {menuItem.title}
                              <span className='pl-3'>
                                <svg width='25' height='24' viewBox='0 0 25 24'>
                                  <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z'
                                    fill='currentColor'
                                  />
                                </svg>
                              </span>
                            </p>
                            {/* <div
																className={`submenu relative left-0 z-50 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100  lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full text-black ${
																	openIndex ===
																	index
																		? 'block'
																		: 'hidden'
																}`}
															>
																{menuItem?.submenu?.map(
																	(
																		submenuItem: any,
																		index
																	) => (
																		<Link
																			href={
																				submenuItem.path as string
																			}
																			key={
																				index
																			}
																			className='block rounded py-2.5 text-sm text-dark hover:text-secondary /70  lg:px-3'
																		>
																			{
																				submenuItem.title
																			}
																		</Link>
																	)
																)}
															</div> */}
                          </div>
                        )}
                      </li>
                    ))}
                    {isLoggedIn ? (
                      <>
                        <div className='hidden max-1024:flex flex-col gap-4'>
                          <button
                            onClick={() => router.push('/profile')}
                            title='Profile'
                            className=' py-2 text-base max-480:text-sm font-medium rounded-full text-dark hover:opacity-70  md:block'
                          >
                            <Image
                              src={profile.profileImage ? profile.profileImage : defaultLogo}
                              alt='Nomomics User profile Picture'
                              width={140}
                              height={30}
                              className='w-8 h-8 rounded-full  '
                              priority
                            />
                          </button>
                          <button
                            onClick={() => {
                              Cookies.remove('isLoggedIn');
                              Cookies.remove('token');
                              updateProfile({});
                              router.push('/signin');
                            }}
                            className='ease-in-up hidden rounded-full bg-primary px-8 py-2 text-base max-480:text-sm font-medium text-white shadow-btn transition duration-300 hover:bg-opacity-90 h-[80%] w-[80%]  hover:shadow-btn-hover md:block md:px-9 lg:px-6 xl:px-9'
                          >
                            Logout
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className='hidden max-md:flex max-1024:flex flex-col gap-4'>
                        <Link
                          href='/signin'
                          className=' py-2 text-base max-480:text-sm font-semibold text-dark hover:text-secondary  md:block'
                        >
                          Log In
                        </Link>
                        <Link
                          href='/signup'
                          className='ease-in-up  rounded-sm bg-primary px-8 py-2 text-base max-480:text-sm font-medium text-white shadow-btn transition duration-300 hover:bg-opacity-90 hover:shadow-btn-hover md:block md:px-9 lg:px-6 xl:px-9'
                        >
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </ul>
                </nav>
              </div>
            </div>

            <div className='flex items-center gap-4 pr-20 justify-end lg:pr-0'>
              {isLoggedIn ? (
                <div className='max-1280:hidden flex items-center gap-4'>
                  <button
                    onClick={() => router.push('/profile')}
                    title='Profile'
                    className=' py-2 text-base max-480:text-sm font-medium rounded-full text-dark hover:opacity-70  md:block'
                  >
                    <Image
                      src={profile.profileImage ? profile.profileImage : defaultLogo}
                      alt='Nomomics User profile Picture'
                      width={140}
                      height={30}
                      className='w-8 h-8 rounded-full  '
                      priority
                    />
                  </button>
                  <button
                    onClick={() => {
                      Cookies.remove('isLoggedIn');
                      Cookies.remove('token');
                      router.push('/signin');
                    }}
                    className='ease-in-up hidden rounded-full bg-primary px-8 py-2 text-base max-480:text-sm font-medium text-white shadow-btn transition duration-300 hover:bg-opacity-90 h-[80%] w-[80%]  hover:shadow-btn-hover md:block md:px-9 lg:px-6 xl:px-9'
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className='max-1280:hidden flex gap-4'>
                  <Link
                    href='/signin'
                    className='hidden py-2 text-base max-480:text-sm font-medium text-dark hover:text-white  md:block'
                  >
                    Log In
                  </Link>
                  <Link
                    href='/signup'
                    className='ease-in-up hidden rounded-sm bg-primary px-8 py-2 text-base max-480:text-sm font-medium text-white shadow-btn transition duration-300 hover:bg-opacity-90 hover:shadow-btn-hover md:block md:px-9 lg:px-6 xl:px-9'
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              <button
                onClick={authToggleHandler}
                id='authToggler'
                aria-label='Mobile Menu'
                className='absolute -right-4 max-1024:hidden top-1/2 translate-y-[-50%] block rounded-lg px-3 min-1280:hidden '
              >
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 ${
                    authOpen ? 'top-[7px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 ${
                    authOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                    authOpen ? 'top-[-8px] -rotate-45' : ''
                  }`}
                />
              </button>

              {authOpen && (
                <div className='border-[.5px] min-1280:hidden max-1024:hidden border-body-color/50 absolute top-full flex flex-col bg-white opacity-100 px-5  text-black transition-all ease-in-out duration-500 delay-0'>
                  {isLoggedIn ? (
                    <div className='flex gap-2 py-4 items-center'>
                      <button
                        onClick={() => router.push('/profile')}
                        title='Profile'
                        className=' py-2 text-base max-480:text-sm font-medium rounded-full text-dark hover:opacity-70  md:block'
                      >
                        <Image
                          src={profile.profileImage ? profile.profileImage : defaultLogo}
                          alt='Nomomics User profile Picture'
                          width={140}
                          height={39}
                          className='w-8 h-8 rounded-full'
                          priority
                        />
                      </button>
                      <button
                        onClick={() => {
                          Cookies.remove('isLoggedIn');
                          Cookies.remove('token');
                          updateProfile({});

                          router.push('/signin');
                        }}
                        className='ease-in-up  rounded-full bg-primary px-8 py-2 text-base max-480:text-sm font-medium text-white shadow-btn transition duration-300 hover:bg-opacity-90 h-[80%] w-[80%]  hover:shadow-btn-hover md:block md:px-9 lg:px-6 xl:px-9'
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <>
                      <Link
                        href='/signin'
                        className='py-2 text-base max-480:text-sm font-medium text-dark hover:text-secondary'
                      >
                        Log In
                      </Link>
                      <Link
                        href='/signup'
                        className='ease-in-up rounded-sm py-2 text-base max-480:text-sm font-medium shadow-btn transition duration-300 hover:bg-opacity-90 hover:shadow-btn-hover hover:text-secondary'
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
              {authOpen && (
                <div className='border-[.5px] min-1279:hidden max-1281:hidden border-body-color/50 absolute top-full flex flex-col bg-white opacity-100 px-5  text-black transition-all ease-in-out duration-500 delay-0'>
                  {isLoggedIn ? (
                    <div className='flex gap-2 py-4 items-center'>
                      <button
                        onClick={() => router.push('/profile')}
                        title='Profile'
                        className=' py-2 text-base max-480:text-sm font-medium rounded-full text-dark hover:opacity-70  md:block'
                      >
                        <Image
                          src={profile.profileImage ? profile.profileImage : defaultLogo}
                          alt='Nomomics User profile Picture'
                          width={140}
                          height={39}
                          className='w-8 h-8 rounded-full'
                          priority
                        />
                      </button>
                      <button
                        onClick={() => {
                          Cookies.remove('isLoggedIn');
                          Cookies.remove('token');
                          updateProfile({});

                          router.push('/signin');
                        }}
                        className='ease-in-up  rounded-full bg-primary px-8 py-2 text-base max-480:text-sm font-medium text-white shadow-btn transition duration-300 hover:bg-opacity-90 h-[80%] w-[80%]  hover:shadow-btn-hover md:block md:px-9 lg:px-6 xl:px-9'
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <>
                      <Link
                        href='/signin'
                        className='py-2 text-base max-480:text-sm hover:text-onHover font-medium text-dark hover:opacity-70'
                      >
                        Log In
                      </Link>
                      <Link
                        href='/signup'
                        className='ease-in-up rounded-sm py-2 text-base max-480:text-sm font-medium shadow-btn transition duration-300 hover:bg-opacity-90 hover:shadow-btn-hover hover:text-onHover'
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
