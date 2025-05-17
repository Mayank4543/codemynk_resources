const Note = require('../Models/Notes');

// Format text in a note (bold, italic, etc.)
const formatNoteText = async (req, res) => {
  try {
    const { id } = req.params;
    const { formatType, selection, formattedText } = req.body;
    
    // Find the note
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    // Check if user owns this note when we have auth
    // if (note.createdBy.toString() !== req.user.id) {
    //   return res.status(401).json({ message: 'Not authorized' });
    // }

    // Get the original content
    let content = note.content;
    
    // Apply the formatting by replacing the selected text with formatted text
    if (selection && selection.start >= 0 && selection.end <= content.length) {
      content = 
        content.substring(0, selection.start) + 
        formattedText + 
        content.substring(selection.end);
    }
    
    // Update the note
    note.content = content;
    note.lastModified = new Date();
    
    // Save the updated note
    await note.save();
    
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Change text alignment for a note
const changeNoteAlignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { alignment } = req.body;
    
    // Find the note
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    // Check if user owns this note when we have auth
    // if (note.createdBy.toString() !== req.user.id) {
    //   return res.status(401).json({ message: 'Not authorized' });
    // }
    
    // Update the note with the new alignment preference
    note.textAlignment = alignment;
    note.lastModified = new Date();
    
    // Save the updated note
    await note.save();
    
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Change line spacing for a note
const changeLineSpacing = async (req, res) => {
  try {
    const { id } = req.params;
    const { lineSpacing } = req.body;
    
    // Find the note
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    // Check if user owns this note when we have auth
    // if (note.createdBy.toString() !== req.user.id) {
    //   return res.status(401).json({ message: 'Not authorized' });
    // }
    
    // Update the note with the new line spacing
    note.lineSpacing = lineSpacing;
    note.lastModified = new Date();
    
    // Save the updated note
    await note.save();
    
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  formatNoteText,
  changeNoteAlignment,
  changeLineSpacing
};
