import React, { useMemo } from 'react';
import { parseFormattedText } from '../utils/textFormatter';

export default function FormattedTextPreview({ text, className = '', lineSpacing = 1.5, textAlign = 'justify' }) {
  // Parse the text to HTML with formatting
  const formattedHtml = useMemo(() => {
    return parseFormattedText(text);
  }, [text]);
  
  return (
    <div 
      className={`formatted-text-preview ${className}`}
      style={{ 
        lineHeight: lineSpacing,
        textAlign: textAlign
      }}
      dangerouslySetInnerHTML={{ __html: formattedHtml }}
    />
  );
}
