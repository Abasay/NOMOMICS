import React from 'react';

const Error = (props: {
  message: string;
  type: string;
  message1?: string;
  w?: string;
}) => {
  const { message, type, message1, w } = props;
  return (
    <div
      className={`w-${
        w ? w : '[80%]'
      } transition-all delay-0 duration-500 ease-linear rounded-md tracking-wide py-2 text-zinc-100 mx-auto bg-bgError flex px-4 gap-3  items-center`}
    >
      {type === 'login' && (
        <span>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z'
              stroke='#F5F5F5'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M12 8V12'
              stroke='#F5F5F5'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M12 16H11.99'
              stroke='#F5F5F5'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </span>
      )}
      <p className=' flex flex-col overflow-x-hidden font-[200] h-auto'>
        <span className=' text-wrap'>{message}</span>
        <span className='text-wrap'>{message1}</span>
      </p>
    </div>
  );
};

export default Error;
