/**
 * Utility functions for text formatting
 */

/**
 * Parses marked-up text and returns HTML with appropriate formatting
 * @param {string} text - The text with markup to parse
 * @returns {string} HTML formatted text
 */
export const parseFormattedText = (text) => {
  if (!text) return '';
  
  // Process bold text (**text**)
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Process italic text (*text*)
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Process underline (__text__)
  text = text.replace(/__(.*?)__/g, '<u>$1</u>');
  
  // Process strikethrough (~~text~~)
  text = text.replace(/~~(.*?)~~/g, '<s>$1</s>');
  
  // Process color tags
  text = text.replace(/<color:(#[0-9a-fA-F]{3,6}|[a-z]+)>(.*?)<\/color>/g, 
    '<span style="color:$1">$2</span>');
    // Process highlight tags
  text = text.replace(/<highlight(?::|)([^>]*)>(.*?)<\/highlight>/g, 
    (_, color, content) => {
      const highlightColor = color ? color : '#fff3cd';
      return `<span style="background-color:${highlightColor}; padding:0.125rem 0.25rem; border-radius:0.25rem;">${content}</span>`;
    });
  
  // Process size tags
  text = text.replace(/<size:([^>]+)>(.*?)<\/size>/g, 
    (_, size, content) => {
      // Map size names to actual sizes
      const sizeMap = {
        'small': '0.875rem',
        'normal': '1rem',
        'large': '1.25rem',
        'x-large': '1.5rem'
      };
      const fontSize = sizeMap[size] || size;
      return `<span style="font-size:${fontSize}">${content}</span>`;
    });
  
  // Process bullet lists
  text = text.replace(/^\s*•\s*(.*?)$/gm, '<li>$1</li>');
  
  // Process numbered lists
  text = text.replace(/^\s*(\d+)\.\s*(.*?)$/gm, '<li value="$1">$2</li>');
    // Process code blocks
  text = text.replace(/```([\s\S]*?)```/g, '<pre class="code-block"><code>$1</code></pre>');
  
  // Process blockquotes
  text = text.replace(/^>\s*(.*)$/gm, '<blockquote>$1</blockquote>');
  
  // Process tables
  text = text.replace(/\|(.+)\|/g, '<tr><td>$1</td></tr>').replace(/<tr><td>(.+)<\/td><\/tr>/g, function(match) {
    return match.replace(/\|/g, '</td><td>');
  });
  text = text.replace(/(<tr>(?:<td>.*?<\/td>)+<\/tr>){2,}/g, '<table border="1">$&</table>');
  
  // Process images
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto;" />');
  
  // Wrap consecutive list items
  let lines = text.split('\n');
  let inList = false;
  let listType = '';
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('<li') && !inList) {
      inList = true;
      listType = lines[i].startsWith('<li value') ? 'ol' : 'ul';
      lines[i] = `<${listType}>${lines[i]}`;
    } else if (!lines[i].startsWith('<li') && inList) {
      inList = false;
      lines[i-1] += `</${listType}>`;
    }
  }
  
  if (inList) {
    lines[lines.length-1] += `</${listType}>`;
  }
  
  // Combine consecutive blockquotes
  let result = lines.join('\n');
  result = result.replace(/<\/blockquote>\s*<blockquote>/g, '<br>');
  
  return result;
};

/**
 * Applies text formatting to the editor content
 * @param {string} text - The text to format
 * @param {string} formatType - The type of formatting to apply
 * @param {Object} selection - The selected text range
 * @returns {string} The formatted text
 */
export const applyFormatting = (text, formatType, selection) => {
  if (!selection || selection.start === selection.end) {
    return text;
  }
  
  const selectedText = text.substring(selection.start, selection.end);
  let formattedText = selectedText;
  
  switch (formatType) {
    case 'bold':
      formattedText = `**${selectedText}**`;
      break;
    case 'italic':
      formattedText = `*${selectedText}*`;
      break;
    case 'underline':
      formattedText = `__${selectedText}__`;
      break;
    case 'strikethrough':
      formattedText = `~~${selectedText}~~`;
      break;
    case 'bullet-list':
      formattedText = selectedText
        .split('\n')
        .map(line => `• ${line}`)
        .join('\n');
      break;
    case 'numbered-list':
      formattedText = selectedText
        .split('\n')
        .map((line, i) => `${i+1}. ${line}`)
        .join('\n');
      break;
    // Add other format types as needed
    default:
      break;
  }
  
  return text.substring(0, selection.start) + formattedText + text.substring(selection.end);
};

/**
 * Check if the selection has a specific format
 * @param {string} text - The text to check
 * @param {string} formatType - The type of formatting to check
 * @param {Object} selection - The selected text range
 * @returns {boolean} Whether the selection has the specified format
 */
export const hasFormat = (text, formatType, selection) => {
  if (!selection || selection.start === selection.end) {
    return false;
  }
  
  const selectedText = text.substring(selection.start, selection.end);
  
  switch (formatType) {
    case 'bold':
      return /^\*\*(.*)\*\*$/.test(selectedText);
    case 'italic':
      return /^\*(.*)\*$/.test(selectedText);
    case 'underline':
      return /^__(.*?)__$/.test(selectedText);
    case 'strikethrough':
      return /^~~(.*?)~~$/.test(selectedText);
    // Add other format types as needed
    default:
      return false;
  }
};
