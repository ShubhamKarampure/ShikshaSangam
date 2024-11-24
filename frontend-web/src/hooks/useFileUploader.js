import { useState } from 'react';
export default function useFileUploader(showPreview = true) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  /**
   * Handled the accepted files and shows the preview
   */
  const handleAcceptedFiles = (files, callback) => {
    let allFiles = [];
    if (showPreview) {
      files.map(file => Object.assign(file, {
        preview: file['type'].split('/')[0] === 'image' ? URL.createObjectURL(file) : null,
        formattedSize: formatBytes(file.size)
      }));
      allFiles = [...selectedFiles, ...files];
      setSelectedFiles(allFiles);
    }
    if (callback) callback(allFiles);
  };

  /**
   * Formats the size
   */
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  /*
   * Removes the selected file
   */
  const removeFile = file => {
    const newFiles = [...selectedFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setSelectedFiles(newFiles);
  };
  return {
    selectedFiles,
    handleAcceptedFiles,
    removeFile
  };
}