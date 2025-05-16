import React, { useState, useCallback, useRef, useEffect } from 'react';
import HandwritingEditor from './HandwritingEditor';
import TextFormatToolbar from './TextFormatToolbar';
import FormattedTextPreview from './FormattedTextPreview';
import AdvancedFormatting from './AdvancedFormatting';
import { parseFormattedText, applyFormatting, hasFormat } from '../utils/textFormatter';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  fontClass,
  readOnly = false,
  isHandwritten = true
}) {
  const [selection, setSelection] = useState(null);
  const [activeFormats, setActiveFormats] = useState({
    'align-justify': true, // Default to justify alignment
    'line-spacing': '1.5' // Default line spacing
  });
  const [textAlign, setTextAlign] = useState('justify');
  const [lineSpacing, setLineSpacing] = useState(1.5);
  const [showPreview, setShowPreview] = useState(false);

  const handleSelectionChange = useCallback((newSelection) => {
    setSelection(newSelection);
  }, []);
  const handleFormatText = useCallback((format) => {
    if (!selection && !['align-left', 'align-center', 'align-right', 'align-justify', 'line-spacing'].some(f => format.startsWith(f))) {
      // For most formatting options, we need a selection
      return;
    }

    // Create a copy of the current value
    let newText = value;
    
    // Check if we're toggling an existing format
    if (selection && ['bold', 'italic', 'underline', 'strikethrough'].includes(format)) {
      const hasCurrentFormat = hasFormat(value, format, selection);
      
      if (hasCurrentFormat) {
        // Remove the formatting
        const selectedText = selection.selectedText;
        let unformattedText;
        
        switch(format) {
          case 'bold':
            unformattedText = selectedText.replace(/^\*\*(.*)\*\*$/, '$1');
            break;
          case 'italic':
            unformattedText = selectedText.replace(/^\*(.*)\*$/, '$1');
            break;
          case 'underline':
            unformattedText = selectedText.replace(/^__(.*?)__$/, '$1');
            break;
          case 'strikethrough':
            unformattedText = selectedText.replace(/^~~(.*?)~~$/, '$1');
            break;
          default:
            unformattedText = selectedText;
        }
        
        newText = 
          value.substring(0, selection.start) + 
          unformattedText + 
          value.substring(selection.end);
      } else {
        // Apply the formatting
        newText = applyFormatting(value, format, selection);
      }
      
      // Update activeFormats
      setActiveFormats(prev => ({
        ...prev,
        [format]: !hasCurrentFormat
      }));
    } else if (format.startsWith('align-')) {
      const alignment = format.replace('align-', '');
      setTextAlign(alignment);
      setActiveFormats(prev => {
        const updated = { ...prev };
        // Deactivate all alignment formats
        ['align-left', 'align-center', 'align-right', 'align-justify'].forEach(f => {
          updated[f] = false;
        });
        // Activate the selected one
        updated[format] = true;
        return updated;
      });
      return; // Early return as we don't need to modify the text    } else if (['bullet-list', 'numbered-list', 'indent', 'outdent'].includes(format)) {
      newText = applyFormatting(value, format, selection);    } else if (format.startsWith('text-color:')) {
      const color = format.split(':')[1];
      newText = 
        value.substring(0, selection.start) + 
        `<color:${color}>${selection.selectedText}</color>` + 
        value.substring(selection.end);
    } else if (format.startsWith('highlight:')) {
      const color = format.split(':')[1];
      newText = 
        value.substring(0, selection.start) + 
        `<highlight:${color}>${selection.selectedText}</highlight>` + 
        value.substring(selection.end);
    } else if (format.startsWith('font-size:')) {
      const size = format.split(':')[1];
      newText = 
        value.substring(0, selection.start) + 
        `<size:${size}>${selection.selectedText}</size>` + 
        value.substring(selection.end);
    } else if (format.startsWith('line-spacing:')) {
      const spacing = parseFloat(format.split(':')[1]);
      setLineSpacing(spacing);
      setActiveFormats(prev => {
        return { ...prev, 'line-spacing': spacing };
      });
      return; // Early return as we don't need to modify the text
    }    // Update the value if text was changed
    if (newText !== value && onChange) {
      const mockEvent = {
        target: { value: newText }
      };
      onChange(mockEvent);
    }
  }, [value, selection, onChange]);
  
  // Add effect to detect formatting in selection
  useEffect(() => {
    if (!selection) return;
    
    // Check for formats in the selection
    const newActiveFormats = { ...activeFormats };
    
    // Check common formats
    ['bold', 'italic', 'underline', 'strikethrough'].forEach(format => {
      newActiveFormats[format] = hasFormat(value, format, selection);
    });
    
    setActiveFormats(newActiveFormats);
  }, [selection, value]);
  // Toggle preview mode
  const handleTogglePreview = () => {
    setShowPreview(prev => !prev);
  };
  // Handle advanced formatting
  const handleAdvancedFormat = useCallback((format) => {
    let newText = value;
    
    if (format === 'code-block') {
      if (selection) {
        newText = 
          value.substring(0, selection.start) + 
          '```\n' + selection.selectedText + '\n```' + 
          value.substring(selection.end);
      } else {
        newText = value + '\n```\ncode here\n```\n';
      }
    } else if (format === 'blockquote') {
      if (selection) {
        const lines = selection.selectedText.split('\n');
        const quotedLines = lines.map(line => `> ${line}`).join('\n');
        newText = 
          value.substring(0, selection.start) + 
          quotedLines + 
          value.substring(selection.end);
      } else {
        newText = value + '\n> Quote text here\n';
      }
    } else if (format === 'table') {
      const tableTemplate = `
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
`;
      newText = value + '\n' + tableTemplate;
    } else if (format.startsWith('image:')) {
      const imageUrl = format.split(':')[1];
      const imageMarkdown = `![Image](${imageUrl})`;
      
      if (selection) {
        newText = 
          value.substring(0, selection.start) + 
          imageMarkdown + 
          value.substring(selection.end);
      } else {
        newText = value + '\n' + imageMarkdown + '\n';
      }
    }
    
    if (newText !== value && onChange) {
      const mockEvent = {
        target: { value: newText }
      };
      onChange(mockEvent);
    }
  }, [value, selection, onChange]);

  return (
    <div className="rich-text-editor">
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex justify-between items-center">
          <TextFormatToolbar 
            onFormatText={handleFormatText} 
            activeFormats={activeFormats}
          />
          <button 
            onClick={handleTogglePreview}
            className="flex items-center gap-2 px-3 py-1 bg-[#3a245e] text-white rounded-md hover:bg-[#4a2a6e] transition-colors"
          >
            {showPreview ? <FaEyeSlash /> : <FaEye />}
            <span>{showPreview ? 'Edit Mode' : 'Preview'}</span>
          </button>
        </div>
        <AdvancedFormatting onFormat={handleAdvancedFormat} />
      </div>
      
      {showPreview ? (
        <div className={`preview-container ${fontClass}`} style={{ minHeight: '500px' }}>
          <FormattedTextPreview 
            text={value} 
            textAlign={textAlign} 
            lineSpacing={lineSpacing} 
            className={fontClass}
          />
        </div>
      ) : (
        <HandwritingEditor
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          fontClass={fontClass}
          readOnly={readOnly}
          textAlign={textAlign}
          lineSpacing={lineSpacing}
          onSelectionChange={handleSelectionChange}
        />
      )}
    </div>
  );
}
