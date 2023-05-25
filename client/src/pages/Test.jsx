import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Test() {
  const onDrop = useCallback((acceptedFiles) => {
    // Xử lý tệp tin đã chọn ở đây
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg p-4 text-center ${
        isDragActive ? "border-blue-500" : ""
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Kéo thả ảnh vào đây...</p>
      ) : (
        <p>Click hoặc kéo thả ảnh vào đây</p>
      )}
    </div>
  );
}

export default Test;
