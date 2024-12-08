// import { useEffect } from 'react';
// import PDFObject from 'pdfobject';

// interface PDFViewerProps {
//     pdfUrl: string;
// }

// const PDFViewer1: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             // Embed the PDF using PDFObject, but control using an iframe style
//             PDFObject.embed(
//                 'https://arxiv.org/pdf/quant-ph/0410100.pdf',
//                 '#pdf-viewer',
//                 {
//                     height: '100%',
//                     pdfOpenParams: {
//                         toolbar: 0, // This won't always work across all browsers
//                         navpanes: 0,
//                         statusbar: 0,
//                     },
//                 }
//             );
//         }
//     }, [pdfUrl]);

//     return (
//         <div className='flex justify-center items-center h-screen'>
//             <Image src/>
//             <iframe
//                 src={pdfUrl}
//                 className='w-full h-full max-w-5xl max-h-screen border rounded-lg shadow-lg'
//                 style={{ border: 'none' }}
//             ></iframe>
//         </div>
//     );
// };

// export default PDFViewer1;

// import { useEffect, useState } from 'react';
// import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
// import Image from 'next/image';

// if (typeof window !== 'undefined') {
//     GlobalWorkerOptions.workerSrc = `/pdfjs/pdf.worker.js`;
// }
// const PDFToImageViewer = (props: { pdfUrl: string }) => {
//     const { pdfUrl } = props;
//     const [pages, setPages] = useState<string[]>([]);

//     useEffect(() => {
//         const renderPDFToImages = async () => {
//             const pdf = await getDocument(pdfUrl).promise;
//             const renderedPages: string[] = [];

//             for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//                 const page = await pdf.getPage(pageNum);
//                 const viewport = page.getViewport({ scale: 1 });
//                 const canvas = document.createElement('canvas');
//                 const context = canvas.getContext(
//                     '2d'
//                 ) as unknown as CanvasRenderingContext2D;

//                 canvas.height = viewport.height;
//                 canvas.width = viewport.width;

//                 await page.render({
//                     canvasContext: context,
//                     viewport: viewport,
//                 }).promise;

//                 // Convert canvas to image
//                 const imgDataUrl = canvas.toDataURL();
//                 renderedPages.push(imgDataUrl);
//             }

//             setPages(renderedPages);
//         };

//         renderPDFToImages();
//     }, [pdfUrl]);

//     return (
//         <div className='flex flex-col items-center'>
//             {pages.length === 0 && <p>Loading PDF...</p>}
//             {pages.map((page, index) => (
//                 <div key={index} className='mb-4'>
//                     <Image
//                         src={page}
//                         alt={`Page ${index + 1}`}
//                         width={600}
//                         height={800}
//                     />
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default PDFToImageViewer;

// import { useState } from 'react';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// // Import the worker from pdfjs-dist
// import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';

// if (typeof window !== 'undefined') {
//     GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js`;
// }

// const PDFViewer = (props: { pdfUrl: string }) => {
//     const { pdfUrl } = props;
//     const [loading, setLoading] = useState(true);

//     const onDocumentLoadSuccess = () => {
//         setLoading(false);
//     };

//     return (
//         <div className='flex justify-center items-center min-h-screen'>
//             {loading && <p>Loading PDF...</p>}
//             <Worker
//                 workerUrl={`https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js`}
//             >
//                 <Viewer
//                     fileUrl={pdfUrl}
//                     onDocumentLoad={onDocumentLoadSuccess}
//                 />
//             </Worker>
//         </div>
//     );
// };

// export default PDFViewer;

// components/PdfViewer.tsx
// import { Document, Page, pdfjs } from 'react-pdf';
// import { useState } from 'react';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// // Load worker
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs`;

// console.log(pdfjs.version);

// interface PdfViewerProps {
//     fileUrl: string;
// }

// const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
//     const [numPages, setNumPages] = useState<number | null>(null);

//     const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//         console.log('numPages', numPages);
//         setNumPages(numPages);
//     };

//     return (
//         <div className='flex flex-col items-center'>
//             <p>Testing</p>
//             <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
//                 {Array.from(new Array(numPages), (el, index) => (
//                     <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//                 ))}
//             </Document>
//         </div>
//     );
// };

// export default PdfViewer;

import { useComics } from '@/app/contexts/Comics';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function ImageViewer() {
  const { comicId } = useParams();

  const { comics } = useComics();

  const episodeNumber = useSearchParams().get('episode');

  const [comic, setComic] = useState(
    comics
      .find((comic) => comic._id === comicId)
      ?.episodes.find(
        (episode) => episode.episodeNumber === Number(episodeNumber)
      )
  );

  useEffect(() => {
    setComic(
      comics
        .find((comic) => comic._id === comicId)
        ?.episodes.find(
          (episode) => episode.episodeNumber === Number(episodeNumber)
        )
    );
  }, [episodeNumber]);
  if (!comic) {
    Swal.fire({
      icon: 'error',
      text: 'Not found',
    });

    return;
  }

  console.log(comic);

  return (
    <main className=' rounded-lg'>
      {comic?.episodeFileUrl.map((fileUrl, index) => (
        <div key={index} className='flex justify-center items-center h-screen'>
          <Image
            src={fileUrl}
            alt={`Page ${index + 1}`}
            layout='fill'
            objectFit='cover'
          />
        </div>
      ))}
    </main>
  );
}
