// Import the main component
import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';
import { useState } from 'react';

// Your render function
const PDFViewer = () => {
    const [fileBase64, setFileBase64] = useState<string>(''); // Fixed typo here

    const handlePDFReader = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFileBase64(base64String); // Fixed typo here
                console.log(base64String);
            };
            reader.readAsDataURL(file);
        }
    };
    const pdfUrl =
        'https://cors-anywhere.herokuapp.com/https://arxiv.org/pdf/quant-ph/0410100.pdf'; // Public PDF link
    return (
        <div className='flex flex-col w-full border gap-4 items-center'>
            <iframe
                src='https://arxiv.org/pdf/quant-ph/0410100.pdf'
                className='w-full min-h-screen border-none rounded-lg scrollbar-hide'
                title='PDF Viewer'
            ></iframe>
        </div>
    );
};

export default PDFViewer;

// components/pdfviewer.tsx
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
// import { useEffect, useRef, useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// import { FaLeftLong, FaRightLong } from 'react-icons/fa6';

// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.js`;

// export default function PDFViewer(props: any) {
//     const [numPages, setNumPages] = useState<number>(0);
//     const [pageNumber, setPageNumber] = useState<number>(1); // start on first page
//     const [loading, setLoading] = useState(true);
//     const [pageWidth, setPageWidth] = useState(0);

//     function onDocumentLoadSuccess({
//         numPages: nextNumPages,
//     }: {
//         numPages: number;
//     }) {
//         setNumPages(nextNumPages);
//     }

//     function onPageLoadSuccess() {
//         setPageWidth(window.innerWidth);
//         setLoading(false);
//     }

//     const options = {
//         cMapUrl: 'cmaps/',
//         cMapPacked: true,
//         standardFontDataUrl: 'standard_fonts/',
//     };

//     // Go to next page
//     function goToNextPage() {
//         setPageNumber((prevPageNumber) => prevPageNumber + 1);
//     }

//     function goToPreviousPage() {
//         setPageNumber((prevPageNumber) => prevPageNumber - 1);
//     }

//     return (
//         <>
//             <Nav pageNumber={pageNumber} numPages={numPages} />
//             <div
//                 hidden={loading}
//                 style={{ height: 'calc(100vh - 64px)' }}
//                 className='flex items-center'
//             >
//                 <div
//                     className={`flex items-center justify-between w-full absolute z-10 px-2`}
//                 >
//                     <button
//                         onClick={goToPreviousPage}
//                         disabled={pageNumber <= 1}
//                         className='relative h-[calc(100vh - 64px)] px-2 py-24 text-gray-400 hover:text-gray-50 focus:z-20'
//                     >
//                         <span className='sr-only'>Previous</span>
//                         <FaLeftLong className='h-10 w-10' aria-hidden='true' />
//                     </button>
//                     <button
//                         onClick={goToNextPage}
//                         disabled={pageNumber >= numPages!}
//                         className='relative h-[calc(100vh - 64px)] px-2 py-24 text-gray-400 hover:text-gray-50 focus:z-20'
//                     >
//                         <span className='sr-only'>Next</span>
//                         <FaRightLong className='h-10 w-10' aria-hidden='true' />
//                     </button>
//                 </div>

//                 <div className='h-full flex justify-center mx-auto'>
//                     <Document
//                         file={'./test.pdf'}
//                         onLoadSuccess={onDocumentLoadSuccess}
//                         options={options}
//                         renderMode='canvas'
//                         className=''
//                     >
//                         <Page
//                             className=''
//                             key={pageNumber}
//                             pageNumber={pageNumber}
//                             renderAnnotationLayer={false}
//                             renderTextLayer={false}
//                             onLoadSuccess={onPageLoadSuccess}
//                             onRenderError={() => setLoading(false)}
//                             width={Math.max(pageWidth * 0.8, 390)}
//                         />
//                     </Document>
//                 </div>
//             </div>
//         </>
//     );
// }

// function Nav({
//     pageNumber,
//     numPages,
// }: {
//     pageNumber: number;
//     numPages: number;
// }) {
//     return (
//         <nav className='bg-black'>
//             <div className='mx-auto px-2 sm:px-6 lg:px-8'>
//                 <div className='relative flex h-16 items-center justify-between'>
//                     <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
//                         <div className='flex flex-shrink-0 items-center'>
//                             <p className='text-2xl font-bold tracking-tighter text-white'>
//                                 Papermark
//                             </p>
//                         </div>
//                     </div>
//                     <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
//                         <div className='bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'>
//                             <span>{pageNumber}</span>
//                             <span className='text-gray-400'> / {numPages}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// }
