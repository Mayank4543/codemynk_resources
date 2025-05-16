import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function SavedNotes({ onLoadNote }) {
  const [savedNotes, setSavedNotes] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSavedNotes();
  }, []);

  const loadSavedNotes = async () => {
    try {
      setLoading(true);
      // Import here to avoid circular dependencies
      const { getNotes } = await import('../services/api');
      const notes = await getNotes();
      
      // Process notes for display
      const processedNotes = notes.map(note => ({
        id: note._id,
        title: note.title || 'Untitled Note',
        timestamp: new Date(note.createdAt).toISOString(),
        preview: note.content.substring(0, 50) + (note.content.length > 50 ? '...' : ''),
        fontStyle: note.fontStyle || 'default',
        language: note.language || 'English'
      }));
      
      setSavedNotes(processedNotes);
      setLoading(false);
    } catch (e) {
      console.error('Error loading notes:', e);
      setError('Failed to load notes');
      setLoading(false);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      // Import here to avoid circular dependencies
      const { deleteNote } = await import('../services/api');
      await deleteNote(id);
      
      // Reload notes after deletion
      loadSavedNotes();
      setShowConfirmDelete(null);
    } catch (e) {
      console.error('Error deleting note:', e);
      alert('Failed to delete note');
    }
  };

  const handleLoadNote = async (id) => {
    try {
      // Import here to avoid circular dependencies
      const { getNote } = await import('../services/api');
      const note = await getNote(id);
      
      onLoadNote({
        title: note.title,
        content: note.content,
        language: note.language,
        fontStyle: note.fontStyle,
        id: note._id
      });
    } catch (e) {
      console.error('Error loading note:', e);
      alert('Failed to load note');
    }
  };

  return (
    <div className="bg-[#3a245e] rounded-md p-4 mb-4">
      <h3 className="font-semibold mb-3">Your Saved Notes</h3>
      {savedNotes.length === 0 ? (
        <p className="text-gray-400 text-center py-3">No saved notes yet</p>
      ) : (
        <div className="space-y-2 max-h-[250px] overflow-y-auto">
          {savedNotes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#2c1a4e] p-3 rounded-md flex justify-between items-center"
            >
              <div className="overflow-hidden">
                <h4 className="font-medium truncate" 
                    style={note.isHandwritten ? { fontFamily: "'Caveat', cursive" } : {}}
                >
                  {note.title}
                </h4>
                <p className="text-sm text-gray-400 truncate">{note.preview}</p>
                <span className="text-xs text-purple-400">
                  {new Date(note.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleLoadNote(note.id)}
                  className="text-green-400 hover:text-green-300 p-1"
                  title="Load note"
                >
                  <FaEdit />
                </button>
                {showConfirmDelete === note.id ? (
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="bg-red-500 text-white text-xs px-2 py-1 rounded-md"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setShowConfirmDelete(null)}
                      className="bg-gray-500 text-white text-xs px-2 py-1 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowConfirmDelete(note.id)}
                    className="text-red-400 hover:text-red-300 p-1"
                    title="Delete note"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
