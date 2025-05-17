import React, { useState } from 'react';
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
  FaHighlighter
} from 'react-icons/fa';
import { formatText, changeAlignment, changeLineSpacing } from '../services/api';

export default function TextFormatToolbar({ 
  noteId,
  onFormatApplied,
  activeFormats = {
    align: 'justify',
    lineSpacing: 1.5,
    fontSize: 'normal'
  }
}) {
  const [textColor, setTextColor] = useState('#000000');
  const [highlightColor, setHighlightColor] = useState('#FFFF00');
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showHighlightColorPicker, setShowHighlightColorPicker] = useState(false);
  
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

  const handleFormat = async (format, selection) => {
    if (!noteId) return;

    try {
      let response;
      
      if (format.startsWith('align-')) {
        const alignment = format.replace('align-', '');
        response = await changeAlignment(noteId, alignment);
      } else if (format.startsWith('line-spacing:')) {
        const spacing = parseFloat(format.split(':')[1]);
        response = await changeLineSpacing(noteId, spacing);
      } else {
        // For text formatting like bold, italic, etc.
        const formatData = {
          formatType: format,
          selection,
          formattedText: getFormattedText(format, selection.selectedText)
        };
        response = await formatText(noteId, formatData);
      }
      
      if (onFormatApplied) {
        onFormatApplied(response);
      }
    } catch (error) {
      console.error('Error applying format:', error);
    }
  };
  
  const getFormattedText = (format, text) => {
    switch(format) {
      case 'bold':
        return `**${text}**`;
      case 'italic':
        return `*${text}*`;
      case 'underline':
        return `__${text}__`;
      case 'strikethrough':
        return `~~${text}~~`;
      case 'bullet-list':
        return text.split('\n').map(line => `• ${line}`).join('\n');
      case 'numbered-list':
        return text.split('\n').map((line, i) => `${i+1}. ${line}`).join('\n');
      case 'indent':
        return text.split('\n').map(line => `  ${line}`).join('\n');
      case 'outdent':
        return text.split('\n').map(line => line.replace(/^  /, '')).join('\n');
      case 'text-color':
        return `<color:${textColor}>${text}</color>`;
      case 'highlight':
        return `<highlight:${highlightColor}>${text}</highlight>`;
      default:
        return text;
    }
  };

  return (
    <div className="text-format-toolbar bg-[#3a245e] rounded-md p-3 mb-3 flex flex-wrap items-center gap-2">
      {formatButtons.map((section, index) => (
        <div key={section.section} className="flex items-center space-x-1">
          {section.buttons.map((button) => (
            <motion.button
              key={button.format}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFormat(button.format)}
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
            onChange={(e) => handleFormat(`font-size:${e.target.value}`)}
            value={activeFormats.fontSize || 'normal'}
          >
            <option value="small">Small</option>
            <option value="normal">Normal</option>
            <option value="large">Large</option>
            <option value="x-large">X-Large</option>
          </select>
        </div>
        
        <div className="h-6 w-px bg-gray-600 mx-2"></div>
        
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowTextColorPicker(!showTextColorPicker)}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#2c1a4e] hover:bg-[#4a2a6e] text-white tooltip-container"
            aria-label="Text Color"
          >
            <FaPalette style={{ color: textColor }} />
            <span className="tooltip">Text Color</span>
          </motion.button>
          
          {showTextColorPicker && (
            <div className="absolute top-full left-0 mt-1 p-2 bg-white rounded-md shadow-lg z-10">
              <input 
                type="color" 
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-8 h-8"
              />
            </div>
          )}
        </div>
        
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHighlightColorPicker(!showHighlightColorPicker)}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#2c1a4e] hover:bg-[#4a2a6e] text-white tooltip-container"
            aria-label="Highlight"
          >
            <FaHighlighter style={{ color: highlightColor }} />
            <span className="tooltip">Highlight</span>
          </motion.button>
          
          {showHighlightColorPicker && (
            <div className="absolute top-full left-0 mt-1 p-2 bg-white rounded-md shadow-lg z-10">
              <input 
                type="color" 
                value={highlightColor}
                onChange={(e) => setHighlightColor(e.target.value)}
                className="w-8 h-8"
              />
            </div>
          )}
        </div>
        
        <div className="h-6 w-px bg-gray-600 mx-2"></div>
        
        <select 
          className="bg-[#2c1a4e] text-white p-1 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
          onChange={(e) => handleFormat(`line-spacing:${e.target.value}`)}
          value={activeFormats.lineSpacing || '1.5'}
        >
          <option value="1">Single</option>
          <option value="1.5">1.5</option>
          <option value="2">Double</option>
          <option value="2.5">2.5</option>
        </select>
      </div>
    </div>
  );
}
