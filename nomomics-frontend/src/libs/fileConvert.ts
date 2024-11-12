export const imageToBase64 = async (imgFile: Blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(imgFile);
  const data = new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (err) => {
      reject(err);
    };
  });

  return data;
};

export const pdfToBase64 = async (pdfFile: Blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(pdfFile);
  const data = new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (err) => {
      reject(err);
    };
  });

  return data;
};
