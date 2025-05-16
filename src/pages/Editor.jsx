import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiHome, FiFileText, FiPlus, FiLayout, FiDownload } from 'react-icons/fi';
import {
  FaBold,
  FaCode,
  FaListUl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaClipboard,
  FaPalette,
  FaLink,
  FaFont
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import HandwritingEditor from '../components/HandwritingEditor';
import RichTextEditor from '../components/RichTextEditor';

export default function Editor() {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedFont, setSelectedFont] = useState('dancing');
  const [pages, setPages] = useState(['']);
  const [lastModified, setLastModified] = useState(new Date());
  const [highlights, setHighlights] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const bulletTypes = ['star', 'circle', 'square', 'box'];

  const { id } = useParams();
  const navigate = useNavigate();

  // Load note if ID is provided
  useEffect(() => {
    if (id) {
      loadNote(id);
    }
  }, [id]);

  // Function to load a note from the database
  const loadNote = async (noteId) => {
    try {
      const { getNote } = await import('../services/api');
      const note = await getNote(noteId);

      setCurrentNoteId(note._id);
      setNoteTitle(note.title || '');
      setNoteContent(note.content || '');
      setSelectedLanguage(note.language || 'English');
      setSelectedFont(note.fontStyle || 'dancing');

      // Set pages from note data or create from content
      if (note.pages && note.pages.length > 0) {
        // Sort pages by page number
        const sortedPages = [...note.pages].sort((a, b) => a.pageNumber - b.pageNumber);
        setPages(sortedPages.map(page => page.content || ''));
      } else {
        handleContentChange({ target: { value: note.content || '' } });
      }

      // Set highlights
      if (note.highlights && note.highlights.length > 0) {
        setHighlights(note.highlights.map(h => ({
          id: h._id || Date.now() + Math.random(),
          text: h.text || '',
          bulletType: h.bulletType || 'star'
        })));
      }

      // Set last modified date
      if (note.lastModified) {
        setLastModified(new Date(note.lastModified));
      }
    } catch (error) {
      console.error('Error loading note:', error);
      alert('Failed to load note. Please try again.');
    }
  };

  const addHighlight = () => {
    setHighlights([
      ...highlights,
      { id: Date.now(), text: '', bulletType: 'star' }
    ]);
  };

  const updateHighlight = (id, text) => {
    setHighlights(highlights.map(h =>
      h.id === id ? { ...h, text } : h
    ));
  };

  const changeBulletType = (id, bulletType) => {
    setHighlights(highlights.map(h =>
      h.id === id ? { ...h, bulletType } : h
    ));
  };

  const deleteHighlight = (id) => {
    setHighlights(highlights.filter(h => h.id !== id));
  };

  const formatDate = (date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Split content into pages of 150 words each
  const handleContentChange = (e) => {
    const content = e.target.value;
    const words = content.split(/\s+/);
    const pagesArray = [];
    let currentPage = '';
    let wordCount = 0;

    words.forEach(word => {
      if (wordCount >= 150) {
        pagesArray.push(currentPage.trim());
        currentPage = '';
        wordCount = 0;
      }
      currentPage += word + ' ';
      wordCount++;
    });

    if (currentPage) {
      pagesArray.push(currentPage.trim());
    } setPages(pagesArray.length ? pagesArray : ['']);
    setNoteContent(content);
    setLastModified(new Date());
  }; const handleSave = async () => {
    try {
      // Format pages data
      const formattedPages = pages.map((pageContent, index) => ({
        content: pageContent,
        pageNumber: index + 1
      }));

      // Format highlights data
      const formattedHighlights = highlights.map(highlight => ({
        text: highlight.text,
        bulletType: highlight.bulletType
      }));

      // Calculate word count
      const wordCount = noteContent.split(/\s+/).filter(Boolean).length;

      const noteData = {
        title: noteTitle,
        content: noteContent,
        language: selectedLanguage,
        fontStyle: selectedFont,
        pages: formattedPages,
        highlights: formattedHighlights,
        totalPages: pages.length,
        wordCount: wordCount,
        lastModified: new Date()
      };

      let savedNote;

      // Import api functions
      const api = await import('../services/api');

      if (currentNoteId) {
        // Update existing note
        savedNote = await api.updateNote(currentNoteId, noteData);
        console.log('Note updated successfully:', savedNote);
      } else {
        // Create new note
        savedNote = await api.createNote(noteData);
        // Update the current note ID
        setCurrentNoteId(savedNote._id);
        console.log('New note saved successfully:', savedNote);
      }

      // Update last modified date
      setLastModified(new Date());

      // Show success message
      alert('Note saved successfully!');
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to save note. Please try again.');
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-indigo-600">NoteCanvas</h2>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded cursor-pointer text-gray-700">
              <FiHome className="text-gray-500" />
              <span>Dashboard</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded cursor-pointer text-gray-700">
              <FiFileText className="text-gray-500" />
              <span>My Notes</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded cursor-pointer text-gray-700">
              <FiPlus className="text-gray-500" />
              <span>New Note</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded cursor-pointer text-gray-700">
              <FiLayout className="text-gray-500" />
              <span>Templates</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded cursor-pointer text-gray-700">
              <FiDownload className="text-gray-500" />
              <span>PDF Export</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h1 className="text-xl text-gray-800">New Note</h1>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Save Note
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
            >
              Export to PDF
            </motion.button>
          </div>
        </div>        {/* Font and Language Selector */}
        <div className="border-b px-6 py-2 flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <FaFont className="text-gray-600 mr-2" />
              <select
                value={selectedFont}
                onChange={(e) => setSelectedFont(e.target.value)}
                className="border rounded-md px-3 py-1.5 text-sm bg-white shadow-sm hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="homemade">Homemade Apple</option>
                <option value="caveat">Caveat</option>
                <option value="dancing">Dancing Script</option>
                <option value="pacifico">Pacifico</option>
                <option value="sacramento">Sacramento</option>
              </select>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Language:</span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-auto">
          <div className="editor-container">           
             <div className="pages-container overflow-visible py-6">
              <div className="editor-pages w-full space-y-12">
                {pages.map((pageContent, index) => (
                  <div key={index} className="editor-page-content mb-10">
                    {index === 0 && (<div className="mb-4 mt-2 text-center relative z-10" style={{ minHeight: '80px' }}>
                      <div className="absolute left-0 right-0 flex items-center justify-between px-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <span className="text-3xl text-amber-600">★</span>
                        <span className="text-3xl text-amber-600">★</span>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Note Title"
                          value={noteTitle}
                          onChange={(e) => setNoteTitle(e.target.value)}
                          className={`w-full note-title-input px-12 py-2 focus:outline-none font-${selectedFont} text-center`}
                          style={{
                            background: 'transparent'
                          }}
                        />
                        <div className="absolute h-[2px] bg-amber-300 bottom-0 left-[10%] right-[10%]"></div>
                      </div>
                    </div>
                    )}                    <div className="handwriting-background relative">
                      <RichTextEditor
                        value={index === pages.length - 1 ? noteContent : pageContent}
                        onChange={handleContentChange}
                        placeholder={index === 0 ? "Start writing your note here..." : "Continue writing..."}
                        fontClass={`font-${selectedFont} placeholder-blue-300`}
                        readOnly={index !== pages.length - 1}
                        isHandwritten={true}
                      />
                    </div>
                    <div className="page-footer">
                      <div>
                        Last modified: {formatDate(lastModified)}
                      </div>
                      <div className="flex items-center gap-4">
                        <span>Words: {pageContent.trim().split(/\s+/).length}</span>
                        <span>Page {index + 1}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights Section - Now outside the pages */}
            <div className="highlights-container">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-[#8B4513]">Key Points</span>
                <button
                  onClick={addHighlight}
                  className="text-sm px-2 py-1 text-[#8B4513] hover:bg-[#DEB887]/20 rounded"
                >
                  + Add Point
                </button>
              </div>
              {highlights.map((highlight) => (
                <div key={highlight.id} className="highlight-item">
                  <div className="highlight-bullet">
                    <span className={`bullet-${highlight.bulletType}`}>
                      <div className="bullet-menu">
                        {bulletTypes.map(type => (
                          <div
                            key={type}
                            className="bullet-option"
                            onClick={() => changeBulletType(highlight.id, type)}
                          >
                            <span className={`bullet-${type}`}></span>
                          </div>
                        ))}
                      </div>
                    </span>
                  </div>
                  <textarea
                    className="highlight-input"
                    value={highlight.text}
                    onChange={(e) => updateHighlight(highlight.id, e.target.value)}
                    placeholder="Enter your point..."
                    rows={1}
                    onInput={e => {
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                  />
                  <button
                    onClick={() => deleteHighlight(highlight.id)}
                    className="absolute top-0 right-0 text-red-500 opacity-0 hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
