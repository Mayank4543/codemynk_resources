import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaBold, 
  FaItalic, 
  FaUnderline, 
  FaStrikethrough, 
  FaAlignLeft, 
  FaAlignCenter, 
  FaAlignRight, 
  FaAlignJustify, 
  FaListUl, 
  FaListOl,
  FaIndent,
  FaOutdent,
  FaPalette,
  FaHighlighter,
  FaArrowsAltV
} from 'react-icons/fa';

export default function TextFormatToolbar({ 
  onFormatText, 
  activeFormats = {},
  className = ''
}) {
  // Format buttons configuration
  const formatButtons = [
    { 
      section: 'text',
      buttons: [
        { icon: <FaBold />, format: 'bold', tooltip: 'Bold' },
        { icon: <FaItalic />, format: 'italic', tooltip: 'Italic' },
        { icon: <FaUnderline />, format: 'underline', tooltip: 'Underline' },
        { icon: <FaStrikethrough />, format: 'strikethrough', tooltip: 'Strikethrough' }
      ] 
    },
    { 
      section: 'alignment',
      buttons: [
        { icon: <FaAlignLeft />, format: 'align-left', tooltip: 'Align Left' },
        { icon: <FaAlignCenter />, format: 'align-center', tooltip: 'Align Center' },
        { icon: <FaAlignRight />, format: 'align-right', tooltip: 'Align Right' },
        { icon: <FaAlignJustify />, format: 'align-justify', tooltip: 'Justify' }
      ] 
    },
    { 
      section: 'lists',
      buttons: [
        { icon: <FaListUl />, format: 'bullet-list', tooltip: 'Bullet List' },
        { icon: <FaListOl />, format: 'numbered-list', tooltip: 'Numbered List' }
      ] 
    },
    { 
      section: 'indentation',
      buttons: [
        { icon: <FaIndent />, format: 'indent', tooltip: 'Increase Indent' },
        { icon: <FaOutdent />, format: 'outdent', tooltip: 'Decrease Indent' }
      ] 
    }
  ];

  const handleClick = (format) => {
    if (onFormatText) {
      onFormatText(format);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-wrap items-center gap-2 p-3 bg-[#3a245e] rounded-md mb-3 ${className}`}
    >
      {formatButtons.map((section, index) => (
        <div key={section.section} className="flex items-center space-x-1">
          {section.buttons.map((button) => (
            <motion.button
              key={button.format}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(button.format)}
              className={`flex items-center gap-1 px-2 py-1 rounded-md tooltip-container 
                ${activeFormats[button.format] ? 'bg-purple-600 text-white' : 'bg-[#2c1a4e] hover:bg-[#4a2a6e] text-white'}`}
              aria-label={button.tooltip}
            >
              {button.icon}
              <span className="tooltip">{button.tooltip}</span>
            </motion.button>
          ))}
          {index < formatButtons.length - 1 && (
            <div className="h-6 w-px bg-gray-600 mx-2"></div>
          )}
        </div>
      ))}
      
      <div className="flex items-center space-x-1 ml-auto">
        <div className="flex items-center space-x-2">
          <select 
            className="bg-[#2c1a4e] text-white p-1 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
            onChange={(e) => handleClick(`font-size:${e.target.value}`)}
          >
            <option value="small">Small</option>
            <option value="normal" selected>Normal</option>
            <option value="large">Large</option>
            <option value="x-large">X-Large</option>
          </select>
        </div>
        
        <div className="h-6 w-px bg-gray-600 mx-2"></div>
          <div className="relative group">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#2c1a4e] hover:bg-[#4a2a6e] text-white tooltip-container"
            aria-label="Text Color"
          >
            <FaPalette />
            <span className="tooltip">Text Color</span>
          </motion.button>
          
          <div className="absolute hidden group-hover:flex flex-wrap gap-1 p-2 bg-[#2c1a4e] rounded-md shadow-lg z-10 top-full left-0 w-32 mt-1">
            {['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#ffffff', '#000000'].map(color => (
              <div
                key={color}
                className="w-6 h-6 rounded-full cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => handleClick(`text-color:${color}`)}
              />
            ))}
          </div>
        </div>
        
        <div className="relative group">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#2c1a4e] hover:bg-[#4a2a6e] text-white tooltip-container"
            aria-label="Highlight"
          >
            <FaHighlighter />
            <span className="tooltip">Highlight</span>
          </motion.button>
          
          <div className="absolute hidden group-hover:flex flex-wrap gap-1 p-2 bg-[#2c1a4e] rounded-md shadow-lg z-10 top-full left-0 w-32 mt-1">
            {['#fef3c7', '#dcfce7', '#dbeafe', '#f3e8ff', '#ffe4e6', '#f3f4f6'].map(color => (
              <div
                key={color}
                className="w-6 h-6 rounded-full cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => handleClick(`highlight:${color}`)}
              />
            ))}
          </div>
        </div>
        
        <div className="h-6 w-px bg-gray-600 mx-2"></div>
        
        <select 
          className="bg-[#2c1a4e] text-white p-1 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
          onChange={(e) => handleClick(`line-spacing:${e.target.value}`)}
        >
          <option value="1">Single</option>
          <option value="1.5" selected>1.5</option>
          <option value="2">Double</option>
          <option value="2.5">2.5</option>
        </select>
      </div>
    </motion.div>
  );
}
