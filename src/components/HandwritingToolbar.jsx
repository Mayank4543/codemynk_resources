import React from 'react';
import { motion } from 'framer-motion';
import { FaPen, FaEraser, FaFont } from 'react-icons/fa';

export default function HandwritingToolbar({ 
  isHandwritten, 
  onToggleHandwriting, 
  fontFamily, 
  onChangeFontFamily,
  handwritingFonts 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-wrap items-center gap-2 p-3 bg-[#3a245e] rounded-md mb-3"
    >
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Handwriting:</span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleHandwriting}
          className={`flex items-center gap-1 px-2 py-1 rounded-md ${
            isHandwritten ? 'bg-purple-600 text-white' : 'bg-[#2c1a4e] hover:bg-[#4a2a6e]'
          }`}
        >
          {isHandwritten ? <FaFont /> : <FaPen />}
          <span>{isHandwritten ? 'Normal Text' : 'Handwriting'}</span>
        </motion.button>
      </div>

      {isHandwritten && (
        <>
          <div className="flex items-center space-x-2 ml-4">
            <span className="text-sm">Style:</span>
            <select
              value={fontFamily}
              onChange={onChangeFontFamily}
              className="bg-[#2c1a4e] text-white p-1 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
            >
              {handwritingFonts.map((font) => (
                <option key={font.name} value={font.value}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center ml-auto">
            <motion.div 
              animate={{ 
                x: [0, 2, -2, 1, -1, 0], 
                rotate: [0, 0.5, -0.5, 0.2, -0.2, 0] 
              }}
              transition={{ repeat: Infinity, duration: 5, repeatType: "reverse" }}
              className="text-purple-300 text-sm italic"
            >
              <FaPen className="inline mr-1" size={12} />
              Handwriting mode enabled
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  );
}
