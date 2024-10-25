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
}) => {
  const { sideBarActive, setSideBarActive, setHeaderData, setActive } = props;
  return (
    <div className=' w-full flex flex-col  px-10 py-10 '>
      {Object.keys(SideBarData).map((data: string, index) => (
        <div
          className='relative cursor-pointer py-2'
          key={index}
          onClick={() => {
            setSideBarActive(data);
            setHeaderData([]);
            setTimeout(() => {
              setHeaderData(SideBarData[data]);
              setActive(SideBarData[data][0]);
            }, 20);
          }}
        >
          <h1
            className={` font-bold tracking-wider text-base transition-all delay-0 duration-500 ${
              sideBarActive === data ? 'text-[#1A1A1A]' : 'text-[#909090]'
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
