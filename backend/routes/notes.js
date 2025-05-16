const express = require('express');
const router = express.Router();
const Note = require('../Models/Notes');

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({}).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a specific note
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new note
router.post('/', async (req, res) => {
  try {
    const { title, content, language, fontStyle, highlights = [], pages = [] } = req.body;
    
    // Calculate word count
    const wordCount = content ? content.split(/\s+/).filter(Boolean).length : 0;
    
    // Process pages if not provided directly
    let processedPages = pages;
    if (!pages.length && content) {
      // Split content into pages of ~150 words if pages aren't provided
      const words = content.split(/\s+/);
      const pagesArray = [];
      let currentPage = '';
      let wordCounter = 0;
      let pageNumber = 1;
      
      words.forEach(word => {
        if (wordCounter >= 150) {
          pagesArray.push({
            content: currentPage.trim(),
            pageNumber: pageNumber++
          });
          currentPage = '';
          wordCounter = 0;
        }
        currentPage += word + ' ';
        wordCounter++;
      });
      
      if (currentPage.trim()) {
        pagesArray.push({
          content: currentPage.trim(),
          pageNumber: pageNumber
        });
      }
      
      processedPages = pagesArray;
    }
    
    const newNote = new Note({
      title,
      content,
      pages: processedPages,
      highlights,
      totalPages: processedPages.length,
      wordCount,
      language,
      fontStyle,
      lastModified: new Date()
      // When we have authentication:
      // createdBy: req.user.id
    });
    
    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a note
router.put('/:id', async (req, res) => {
  try {
    const { title, content, language, fontStyle, highlights = [], pages = [] } = req.body;
    
    let note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    // Check if user owns this note when we have auth
    // if (note.createdBy.toString() !== req.user.id) {
    //   return res.status(401).json({ message: 'Not authorized' });
    // }
    
    // Calculate word count
    const wordCount = content ? content.split(/\s+/).filter(Boolean).length : 0;
    
    // Process pages if not provided directly
    let processedPages = pages;
    if (!pages.length && content) {
      // Split content into pages of ~150 words if pages aren't provided
      const words = content.split(/\s+/);
      const pagesArray = [];
      let currentPage = '';
      let wordCounter = 0;
      let pageNumber = 1;
      
      words.forEach(word => {
        if (wordCounter >= 150) {
          pagesArray.push({
            content: currentPage.trim(),
            pageNumber: pageNumber++
          });
          currentPage = '';
          wordCounter = 0;
        }
        currentPage += word + ' ';
        wordCounter++;
      });
      
      if (currentPage.trim()) {
        pagesArray.push({
          content: currentPage.trim(),
          pageNumber: pageNumber
        });
      }
      
      processedPages = pagesArray;
    }
    
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        content, 
        language, 
        fontStyle,
        pages: processedPages,
        highlights,
        totalPages: processedPages.length,
        wordCount,
        lastModified: new Date()
      },
      { new: true }
    );
    
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a note
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    // Check if user owns this note when we have auth
    // if (note.createdBy.toString() !== req.user.id) {
    //   return res.status(401).json({ message: 'Not authorized' });
    // }
    
    await Note.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Note removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
