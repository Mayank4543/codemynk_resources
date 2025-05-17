import React, { useRef, useEffect } from 'react';

export default function HandwritingEditor({
  value,
  onChange,
  placeholder,
  fontClass,
  readOnly = false
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

      // Ensure proper line height
      textarea.style.lineHeight = '40px';
    }
  }, [value]);

  const handleInput = (e) => {
    if (onChange) {
      onChange(e);
    }

    // Dynamically adjust height
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
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
          textAlign: 'justify',
          textJustify: 'inter-word',
          paddingRight: '20px'
        }}
        readOnly={readOnly}
      />
    </div>
  );
}
