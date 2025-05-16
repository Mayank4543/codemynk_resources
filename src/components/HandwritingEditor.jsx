import React, { useRef, useEffect, useCallback } from 'react';

export default function HandwritingEditor({
  value,
  onChange,
  placeholder,
  fontClass,
  readOnly = false,
  textAlign = 'justify',
  lineSpacing = 1.5,
  formatText,
  onSelectionChange
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;

      // Calculate content height based on number of lines
      const lines = (textarea.value.match(/\n/g) || []).length + 1;
      const minHeight = Math.max(500, lines * 40); // At least 500px or content height

      // Reset height first to get accurate scrollHeight
      textarea.style.height = 'auto';

      // Set final height - use the larger of minHeight or content height
      const contentHeight = Math.max(minHeight, textarea.scrollHeight);
      textarea.style.height = `${contentHeight}px`;

      // Ensure proper line height based on lineSpacing prop
      textarea.style.lineHeight = `${40 * lineSpacing}px`;
    }
  }, [value, lineSpacing]);

  const handleInput = (e) => {
    if (onChange) {
      onChange(e);
    }

    // Dynamically adjust height
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSelectionChange = useCallback(() => {
    if (!onSelectionChange || !textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    if (start !== end) {
      onSelectionChange({
        start,
        end,
        selectedText: value.substring(start, end)
      });
    } else {
      onSelectionChange(null);
    }
  }, [value, onSelectionChange]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.addEventListener('mouseup', handleSelectionChange);
    textarea.addEventListener('keyup', handleSelectionChange);
    
    return () => {
      textarea.removeEventListener('mouseup', handleSelectionChange);
      textarea.removeEventListener('keyup', handleSelectionChange);
    };
  }, [handleSelectionChange]);

  return (
    <div className="relative min-h-[500px] h-full w-full flex">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        placeholder={placeholder}
        className={`w-full h-full resize-none handwriting-text ${fontClass}`}
        style={{
          caretColor: '#8B4513',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          overflowY: 'hidden',
          textAlign: textAlign,
          textJustify: textAlign === 'justify' ? 'inter-word' : 'auto',
          lineHeight: `${40 * lineSpacing}px`,
          paddingRight: '20px'
        }}
        readOnly={readOnly}
      />
    </div>
  );
}
