import React, { useState, useEffect, useRef } from 'react';

export default function EnhancedTextarea({ 
  value, 
  onChange, 
  placeholder, 
  className,
  style,
  animate
}) {
  const textareaRef = useRef(null);
  const [preview, setPreview] = useState('');
  
  useEffect(() => {
    // Process the text to find drawings
    const processDrawings = () => {
      if (!value) return '';
      
      // Find all drawings in the text
      const drawingRegex = /\[Drawing: (.*?)\]\n(data:image\/png;base64,[^\n]+)/g;
      const drawings = [];
      let match;
      
      while ((match = drawingRegex.exec(value)) !== null) {
        drawings.push({
          text: match[0],
          timestamp: match[1],
          dataUrl: match[2],
          index: match.index
        });
      }
      
      if (drawings.length === 0) return '';
      
      // Create the preview HTML
      const previewDiv = document.createElement('div');
      previewDiv.className = 'drawing-preview-container';
      
      drawings.forEach(drawing => {
        const drawingDiv = document.createElement('div');
        drawingDiv.className = 'drawing-preview';
        drawingDiv.style.cssText = 'position: absolute; pointer-events: none; z-index: 2;';
        
        const img = document.createElement('img');
        img.src = drawing.dataUrl;
        img.style.cssText = 'max-width: 200px; max-height: 150px; border-radius: 4px; border: 1px solid rgba(139, 92, 246, 0.5);';
        
        drawingDiv.appendChild(img);
        previewDiv.appendChild(drawingDiv);
      });
      
      return previewDiv.outerHTML;
    };
    
    setPreview(processDrawings());
  }, [value]);
  
  // Position previews after the component is rendered
  useEffect(() => {
    if (!preview || !textareaRef.current) return;
    
    // Find all drawing placeholders in the textarea
    const drawingRegex = /\[Drawing: (.*?)\]\n(data:image\/png;base64,[^\n]+)/g;
    const drawings = [];
    let match;
    
    const text = value || '';
    while ((match = drawingRegex.exec(text)) !== null) {
      drawings.push({
        text: match[0],
        index: match.index
      });
    }
    
    // Get all preview elements
    const previewElements = document.querySelectorAll('.drawing-preview');
    if (previewElements.length !== drawings.length) return;
    
    // Position each preview
    drawings.forEach((drawing, i) => {
      const previewElement = previewElements[i];
      if (!previewElement) return;
      
      // Get the position of the placeholder text
      const textarea = textareaRef.current;
      const textBeforeDrawing = text.substring(0, drawing.index);
      const lines = textBeforeDrawing.split('\n');
      
      // Calculate the position
      const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight) || 18;
      const topOffset = lines.length * lineHeight + 10;
      
      // Set the position
      previewElement.style.top = `${topOffset}px`;
      previewElement.style.left = '10px';
    });
  }, [preview, value]);
  
  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        style={style}
      />
      {preview && (
        <div 
          className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
          dangerouslySetInnerHTML={{ __html: preview }}
        />
      )}
    </div>
  );
}
