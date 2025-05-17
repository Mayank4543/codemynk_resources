// Simple authentication service for handling login/logout

// Check if we have a stored token
const getStoredToken = () => {
  return localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
};

// Check if the user is logged in
const isAuthenticated = () => {
  return !!getStoredToken();
};

// Login user (simplified for demo)
const login = async (email, password, rememberMe) => {
  try {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For demo purposes, accept any valid-format email with password length >= 6
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = password.length >= 6;
    
    if (!isValidEmail || !isValidPassword) {
      throw new Error('Invalid credentials');
    }
    
    // Demo token
    const token = 'demo-token-' + Math.random().toString(36).substring(2);
    
    // Store the token based on remember me preference
    if (rememberMe) {
      localStorage.setItem('userToken', token);
    } else {
      sessionStorage.setItem('userToken', token);
    }
    
    return {
      user: {
        email,
        name: email.split('@')[0]
      },
      token
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem('userToken');
  sessionStorage.removeItem('userToken');
};

const authService = {
  login,
  logout,
  isAuthenticated,
  getStoredToken
};

export default authService;
