import React, { Dispatch, SetStateAction } from 'react';

export const SideBarData = {
  'Create Profile': ['Profile Settings', 'Portfolio Showcase', 'Metrics'],
  'Content Management': ['Upload', 'Draft', 'Notification'],
  Monetizaton: ['Earn Overview', 'Payment', 'History', 'Convert'],
  Analysis: ['Users', 'Readers'],
  'Motion Comics': ['motions', 'comics'],
} as { [key: string]: string[] };
const Sidebar = (props: {
  sideBarActive: string;
  setSideBarActive: Dispatch<SetStateAction<string>>;
  setHeaderData: Dispatch<SetStateAction<string[]>>;
  setActive: Dispatch<SetStateAction<string>>;
  isCreator: boolean;
}) => {
  const { sideBarActive, setSideBarActive, setHeaderData, setActive, isCreator } = props;

  const [userSideBar, setUserSideBar] = React.useState<{
    [key: string]: string[];
  }>({
    'Create Profile': ['Profile Settings'],
    'Content Management': ['Notification'],
    Monetizaton: ['Payment', 'History', 'Convert'],
    // Analysis: ['Users', 'Readers'],
    // 'Motion Comics': ['motions', 'comics'],
  });

  return (
    <div className=' w-full dark:bg-slate-400  flex flex-wrap md:items-start max-md:justify-center  max-md:flex-row max-md:px-2 max-md:gap-4 flex-col max-md:py-4 px-10 py-10 '>
      {Object.keys(isCreator ? SideBarData : userSideBar).map((data: string, index) => (
        <div
          className='relative cursor-pointer py-2'
          key={index}
          onClick={() => {
            setSideBarActive(data);
            setHeaderData([]);
            setTimeout(() => {
              if (isCreator) {
                setHeaderData(SideBarData[data]);
                setActive(SideBarData[data][0]);
              } else {
                setHeaderData(userSideBar[data]);
                setActive(userSideBar[data][0]);
              }
            }, 20);
          }}
        >
          <h1
            className={` font-bold tracking-wider max-md:text-xs text-base transition-all delay-0 duration-500 ${
              sideBarActive === data ? 'text-[#1A1A1A] dark:text-black ' : 'text-[#909090] dark:text-gray-600'
            }`}
          >
            {data}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
