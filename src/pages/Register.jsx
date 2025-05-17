import React, { useState } from 'react';
import MultiStepForm from '../components/MultiStepForm';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

export default function Register() {
  const navigate = useNavigate();
  
  const handleRegistrationComplete = (userData) => {
    // In a real app, you would send data to the backend
    // For now, we'll simulate successful registration
    console.log("Registration completed with data:", userData);
    
    // Simulate token creation after successful registration
    localStorage.setItem('userToken', 'new-user-token');
    
    // Navigate to home page after a delay to show success screen
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#2d1b69] text-white">
      <MultiStepForm onComplete={handleRegistrationComplete} />
    </div>
  );
}