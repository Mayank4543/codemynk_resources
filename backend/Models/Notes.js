const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  content: String, // Full content as a single string
  pages: [{ 
    content: String,
    pageNumber: Number
  }], // Array of page objects for pagination
  highlights: [{
    text: String,
    bulletType: String,
    createdAt: { type: Date, default: Date.now }
  }],
  totalPages: { type: Number, default: 1 },
  wordCount: { type: Number, default: 0 },
  language: String,
  fontStyle: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    date: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', noteSchema);
