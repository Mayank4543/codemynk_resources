import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Note API services
export const getNotes = async () => {
  try {
    const response = await axios.get(`${API_URL}/notes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

export const getNote = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching note ${id}:`, error);
    throw error;
  }
};

export const createNote = async (noteData) => {
  try {
    // Process the note data to ensure it has the right structure
    const processedData = {
      ...noteData,
      pages: noteData.pages || [],
      highlights: noteData.highlights || []
    };
    
    const response = await axios.post(`${API_URL}/notes`, processedData);
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

export const updateNote = async (id, noteData) => {
  try {
    const response = await axios.put(`${API_URL}/notes/${id}`, noteData);
    return response.data;
  } catch (error) {
    console.error(`Error updating note ${id}:`, error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting note ${id}:`, error);
    throw error;
  }
};
