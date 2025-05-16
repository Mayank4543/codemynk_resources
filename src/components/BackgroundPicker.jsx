import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function BackgroundPicker({ onSelectBackground }) {
  const [isOpen, setIsOpen] = useState(false);
  // Predefined background options
  const backgrounds = [
    { name: 'Light Lavender', value: '#f2ebfe' },
    { name: 'Soft Mint', value: '#e8f4f0' },
    { name: 'Light Peach', value: '#fdf0e9' },
    { name: 'Cream', value: '#fdf8e9' },
    { name: 'Pale Blue', value: '#e9f3fb' },
    { name: 'Soft Pink', value: '#fbeef3' }
  ];

  return (
    <div className="relative">      <button
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center gap-2 text-sm bg-white px-3 py-1 rounded-md hover:bg-[#f2ebfe] border border-[#d9c6fb] text-[#6d4aaa]"
    >
      <div className="w-3 h-3 rounded-full bg-[#f2ebfe] border border-[#d9c6fb]"></div>
      Paper Color
    </button>

      {isOpen && (<motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute left-0 top-full mt-1 p-2 bg-white rounded-md shadow-lg z-10 w-48 border border-[#d9c6fb]"
      >
        <div className="grid grid-cols-3 gap-2 mb-2">
          {backgrounds.map((bg, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer flex flex-col items-center"
              onClick={() => {
                onSelectBackground(bg.value);
                setIsOpen(false);
              }}
            >
              <div
                className="w-8 h-8 rounded-full border border-white"
                style={{ backgroundColor: bg.value }}
              ></div>
              <span className="text-xs mt-1">{bg.name.split(' ')[0]}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-2 pt-2 border-t border-gray-700">
          <div className="flex gap-2 items-center">
            <span className="text-xs">Custom:</span>
            <input
              type="color"
              className="w-6 h-6"
              onChange={(e) => onSelectBackground(e.target.value)}
            />
          </div>
        </div>
      </motion.div>
      )}
    </div>
  );
}
