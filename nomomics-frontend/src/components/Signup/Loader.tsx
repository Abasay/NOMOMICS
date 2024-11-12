import React from 'react';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

interface LoaderProps {
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  return (
    <div
      style={{
        display: loading ? 'flex' : 'none',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
      }}
    >
      <ClipLoader color='#ffffff' loading={loading} size={150} />
      <h1 className='text-white max-480:text-sm text-base md:text-xl tracking-wider mt-4'>
        Verifying...
      </h1>
    </div>
  );
};

export default Loader;
