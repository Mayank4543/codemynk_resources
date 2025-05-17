import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { Player } from '@lottiefiles/react-lottie-player';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [loginStatus, setLoginStatus] = useState({ success: false, message: '' });
  const navigate = useNavigate();

  const handleLoginSubmit = async ({ email, password, rememberMe }) => {
    try {
      await authService.login(email, password, rememberMe);
      
      setLoginStatus({
        success: true,
        message: 'Login successful! Redirecting...'
      });
      
      // Redirect after successful login
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      setLoginStatus({
        success: false,
        message: error.message || 'Login failed. Please check your credentials.'
      });
      throw error; // Rethrow to be caught by the form
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-100 via-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <Player
            autoplay
            loop
            src="/src/assets/Animation - 1741724947704.json"
            style={{ height: '160px', width: '160px', margin: '0 auto' }}
          />
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mt-2">NoteCanvas</h1>
          <p className="mt-2 text-gray-600 text-lg">Your digital notebook for beautiful notes</p>
        </div>
        
        {loginStatus.success ? (
          <div className="bg-green-50 text-green-700 p-5 rounded-xl text-center border-l-4 border-green-500 shadow-md">
            <div className="flex justify-center mb-2">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <p className="font-medium">{loginStatus.message}</p>
          </div>
        ) : (
          <LoginForm onSubmit={handleLoginSubmit} />
        )}
      </div>
      
      <div className="mt-12 text-center relative z-10">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} NoteCanvas. All rights reserved.
        </p>
      </div>
      
      {/* Add custom CSS for animation */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: scale(1); }
          33% { transform: scale(1.1); }
          66% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
