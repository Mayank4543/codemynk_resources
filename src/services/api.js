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

// User Authentication Services
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    // Store the token in localStorage
    if (response.data.token) {
      localStorage.setItem('userToken', response.data.token);
      axios.defaults.headers.common['x-auth-token'] = response.data.token;
    }
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('userToken');
  delete axios.defaults.headers.common['x-auth-token'];
};

export const getUserProfile = async () => {
  try {
    // Set the token in headers
    const token = localStorage.getItem('userToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.get(`${API_URL}/users/profile`, {
      headers: { 'x-auth-token': token }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const token = localStorage.getItem('userToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await axios.put(`${API_URL}/users/profile`, profileData, {
      headers: { 'x-auth-token': token }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Text Formatting Services
export const formatText = async (noteId, formatData) => {
  try {
    const response = await axios.put(`${API_URL}/format/${noteId}/text`, formatData);
    return response.data;
  } catch (error) {
    console.error('Error formatting text:', error);
    throw error;
  }
};

export const changeAlignment = async (noteId, alignment) => {
  try {
    const response = await axios.put(`${API_URL}/format/${noteId}/alignment`, { alignment });
    return response.data;
  } catch (error) {
    console.error('Error changing text alignment:', error);
    throw error;
  }
};

export const changeLineSpacing = async (noteId, lineSpacing) => {
  try {
    const response = await axios.put(`${API_URL}/format/${noteId}/spacing`, { lineSpacing });
    return response.data;
  } catch (error) {
    console.error('Error changing line spacing:', error);
    throw error;
  }
};

// Setup interceptor to add authentication token to all requests
const setupAxiosInterceptors = () => {
  const token = localStorage.getItem('userToken');
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  }
};

// Call this when your app initializes
setupAxiosInterceptors();

// Re-export all services
export {
  API_URL,
  setupAxiosInterceptors
};
