import React from 'react';
import PDFViewer from './PDFReader';
import ReadPDF from './PDFReader';
import PDFViewer1 from './PDFReader';
import PDFToImageViewer from './PDFReader';
import MyPDFViewer from './PDFReader';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useComics } from '@/app/contexts/Comics';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Button1 from '../Common/Button1';
import Button from '../Common/Button';

const Viewer = () => {
  const { fullScreenMode, setFullScreenMode } = useComics();

  const router = useRouter();
  const pathName = usePathname();
  const params = useSearchParams();

  const handleFullScreen = (value: string) => {
    router.replace(`${pathName}?episode=${params.get('episode')}&fullscreen=${value}`, undefined);
    setFullScreenMode(value === 'true' ? true : false);
  };
  return (
    <>
      {/* <PDFViewer /> */}
      {/* <ReadPDF /> */}
      {/* <PDFViewer1  /> */}
      {/* <PDFToImageViewer pdfUrl='https://arxiv.org/pdf/quant-ph/0410100.pdf' /> */}
      {/* <PDFViewer fileUrl='/text.pdf' /> */}
      {fullScreenMode ? (
        <div className=' w-full -mt-20 pt-28  absolute z-[100] bg-opacity-80 inset-0 bg-black  top-0 grid place-items-center h-full'>
          <button className='absolute top-8 right-5 text-white' onClick={() => handleFullScreen('false')}>
            <IoCloseCircleOutline size={25} className=' w-10 h-10 text-white' />
          </button>
          <PDFViewer />
        </div>
      ) : (
        <div className=' w-full my-5 relative pt-16'>
          <Button
            onClickFunc={() => handleFullScreen('true')}
            text='Full Screen'
            className='py-1 bg-secondary w-max px-2 my-1 mb-2  absolute top-0 right-0'
          />
          <PDFViewer />
        </div>
      )}
    </>
  );
};

export default Viewer;
