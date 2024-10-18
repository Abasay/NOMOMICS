import React, { Dispatch, SetStateAction } from 'react';

export const SideBarData = [
    'Create Profile',
    'Content Management',
    'Monetizaton',
    'Analysis',
    'Motion Comics',
];
const Sidebar = (props: {
    sideBarActive: string;
    setSideBarActive: Dispatch<SetStateAction<string>>;
}) => {
    const { sideBarActive, setSideBarActive } = props;
    return (
        <div className=' flex flex-col border-r-2 px-10 py-10 border-[#909090]'>
            {SideBarData.map((data, index) => (
                <div
                    className='relative cursor-pointer py-2'
                    key={index}
                    onClick={() => setSideBarActive(data)}
                >
                    <h1
                        className={` font-bold text-base transition-all delay-0 duration-500 ${
                            sideBarActive === data
                                ? 'text-[#1A1A1A]'
                                : 'text-[#909090]'
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
