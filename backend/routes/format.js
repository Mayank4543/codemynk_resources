const express = require('express');
const router = express.Router();
const {
  formatNoteText,
  changeNoteAlignment,
  changeLineSpacing
} = require('../controller/formatController');

// Format text in a note
// PUT /api/format/:id/text
router.put('/:id/text', formatNoteText);

// Change text alignment for a note
// PUT /api/format/:id/alignment
router.put('/:id/alignment', changeNoteAlignment);

// Change line spacing for a note
// PUT /api/format/:id/spacing
router.put('/:id/spacing', changeLineSpacing);

module.exports = router;
