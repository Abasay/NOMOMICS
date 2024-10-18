import React from 'react';
import PDFViewer from './PDFReader';
import ReadPDF from './PDFReader';
import PDFViewer1 from './PDFReader';
import PDFToImageViewer from './PDFReader';
import MyPDFViewer from './PDFReader';

const Viewer = () => {
    return (
        <>
            {/* <PDFViewer /> */}
            {/* <ReadPDF /> */}
            {/* <PDFViewer1  /> */}
            {/* <PDFToImageViewer pdfUrl='https://arxiv.org/pdf/quant-ph/0410100.pdf' /> */}
            {/* <PDFViewer fileUrl='/text.pdf' /> */}
            <div className=' w-full '>
                <PDFViewer />
            </div>
        </>
    );
};

export default Viewer;
