import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaQuoteRight, FaTable, FaImage, FaUpload } from 'react-icons/fa';
import FileUploadButton from './FileUploadButton';

export default function AdvancedFormatting({ onFormat, className = '' }) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  
  const handleCodeBlock = () => {
    onFormat('code-block');
  };
  
  const handleQuote = () => {
    onFormat('blockquote');
  };
  
  const handleTable = () => {
    onFormat('table');
  };
    const handleImage = () => {
    setShowImageModal(true);
  };
  
  const handleFileUploaded = (dataUrl) => {
    onFormat(`image:${dataUrl}`);
  };
  
  const insertImage = () => {
    if (imageUrl) {
      onFormat(`image:${imageUrl}`);
      setImageUrl('');
      setShowImageModal(false);
    }
  };
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCodeBlock}
        className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#2c1a4e] hover:bg-[#4a2a6e] text-white tooltip-container"
        aria-label="Code Block"
      >
        <FaCode />
        <span className="tooltip">Code Block</span>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleQuote}
        className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#2c1a4e] hover:bg-[#4a2a6e] text-white tooltip-container"
        aria-label="Blockquote"
      >
        <FaQuoteRight />
        <span className="tooltip">Quote</span>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleTable}
        className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#2c1a4e] hover:bg-[#4a2a6e] text-white tooltip-container"
        aria-label="Table"
      >
        <FaTable />
        <span className="tooltip">Table</span>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleImage}
        className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#2c1a4e] hover:bg-[#4a2a6e] text-white tooltip-container"
        aria-label="Insert Image"
      >
        <FaImage />
        <span className="tooltip">Insert Image</span>
      </motion.button>
      
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md w-96">
            <h3 className="text-lg font-semibold mb-3">Insert Image</h3>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="w-full p-2 border rounded mb-3"
            />
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button 
                onClick={insertImage}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
