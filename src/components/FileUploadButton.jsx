import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';

export default function FileUploadButton({ onFileUploaded }) {
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload an image file (JPEG, PNG, GIF, SVG)');
      return;
    }
    
    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('File is too large. Maximum size is 5MB.');
      return;
    }
    
    setIsUploading(true);
    
    // Here we would typically upload to a server
    // For this demo, we'll use a FileReader to get a data URL
    try {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        onFileUploaded(dataUrl);
        setIsUploading(false);
      };
      reader.onerror = () => {
        alert('Error reading file');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error handling file:', error);
      alert('Error processing file');
      setIsUploading(false);
    }
  };
  
  return (
    <div className="inline-block relative">
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <button 
        className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#2c1a4e] hover:bg-[#4a2a6e] text-white"
        disabled={isUploading}
      >
        <FaUpload />
        <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
      </button>
    </div>
  );
}
