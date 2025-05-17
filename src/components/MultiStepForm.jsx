import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiCamera, FiCheck, FiAlertCircle, FiPhone } from 'react-icons/fi';
import { FaEye, FaEyeSlash, FaUserCircle, FaGraduationCap, FaBook } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import './MultiStepForm.css';

export default function MultiStepForm({ onComplete }) {
  // Form state
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    skill: '',
    photo: null,
    phoneNumber: '',
    verificationCode: '',
  });
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  // Skills list
  const skillOptions = [
    'Machine Learning',
    'Fullstack',
    'Frontend',
    'Backend',
    'DevOps',
    'Data Analyst',
    'Other'
  ];
  
  // Handle countdown for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  
  // Validation functions
  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.username.trim())
      newErrors.username = "Username is required";
      
    if (!formData.email.trim())
      newErrors.email = "Email is required";
    else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
      
    if (!formData.password)
      newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
      
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    
    if (!formData.skill)
      newErrors.skill = "Please select your primary skill";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    else if (!/^\\d{10}$/.test(formData.phoneNumber.replace(/[^0-9]/g, '')))
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    
    if (!isVerified)
      newErrors.verification = "Phone verification is required";
    
    if (!formData.photo && !photoPreview)
      newErrors.photo = "Profile photo is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
    else if (step === 2 && validateStep2()) {
      // Move to final success page
      setStep(3);
      
      // Pass the completed form data to parent
      if (onComplete) {
        onComplete(formData);
      }
    }
  };
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        photo: file
      });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Clear error
      if (errors.photo) {
        setErrors({
          ...errors,
          photo: null
        });
      }
    }
  };
  
  // Handle taking a selfie (this would require webcam integration in a real app)
  const handleTakeSelfie = () => {
    // In a real app, integrate webcam capture
    // For now, simulate with a placeholder image
    const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='40' r='25' fill='%236C5CE7'/%3E%3Crect x='25' y='70' width='50' height='30' fill='%236C5CE7'/%3E%3C/svg%3E";
    
    setPhotoPreview(placeholderImage);
    setFormData({
      ...formData,
      photo: 'selfie-placeholder'
    });
    
    // Clear error
    if (errors.photo) {
      setErrors({
        ...errors,
        photo: null
      });
    }
  };
  
  // Handle sending verification code
  const handleSendCode = () => {
    if (!formData.phoneNumber || !/^\\d{10}$/.test(formData.phoneNumber.replace(/[^0-9]/g, ''))) {
      setErrors({
        ...errors,
        phoneNumber: "Please enter a valid 10-digit phone number"
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call to send code
    setTimeout(() => {
      setIsCodeSent(true);
      setLoading(false);
      setCountdown(30); // 30 seconds countdown for resend
    }, 1500);
  };
  
  // Handle verifying the code
  const handleVerifyCode = () => {
    if (!formData.verificationCode || formData.verificationCode.length !== 6) {
      setErrors({
        ...errors,
        verificationCode: "Please enter a valid 6-digit code"
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate verification
    setTimeout(() => {
      setIsVerified(true);
      setLoading(false);
      
      // Clear error
      if (errors.verification) {
        setErrors({
          ...errors,
          verification: null
        });
      }
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex">
      {/* Left sidebar with steps */}
      <div className="hidden md:flex md:w-1/4 lg:w-1/5 flex-col bg-[#241454] p-8">
        <h2 className="text-2xl font-bold mb-8">Multi-Step Form</h2>
        
        <div className="space-y-4 mt-4">
          <h3 className="text-sm text-indigo-300 mb-2">REGISTRATION STEPS</h3>
          
          <div className={`flex items-center p-3 rounded-lg ${step === 1 ? 'bg-[#382a74]' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${step >= 1 ? 'bg-indigo-600' : 'bg-[#382a74]'}`}>
              <span>1</span>
            </div>
            <span className="font-medium">User Information</span>
          </div>
          
          <div className={`flex items-center p-3 rounded-lg ${step === 2 ? 'bg-[#382a74]' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${step >= 2 ? 'bg-indigo-600' : 'bg-[#382a74]'}`}>
              <span>2</span>
            </div>
            <span className="font-medium">Verification</span>
          </div>
          
          <div className={`flex items-center p-3 rounded-lg ${step === 3 ? 'bg-[#382a74]' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${step >= 3 ? 'bg-indigo-600' : 'bg-[#382a74]'}`}>
              <span>3</span>
            </div>
            <span className="font-medium">Completion</span>
          </div>
        </div>
        
        <div className="mt-auto space-y-4">
          <h3 className="text-sm text-indigo-300 mb-2">HELP</h3>
          
          <div className="flex items-center p-2">
            <FaBook className="mr-3 text-indigo-300" />
            <span>FAQ</span>
          </div>
          
          <div className="flex items-center p-2">
            <FiMail className="mr-3 text-indigo-300" />
            <span>Contact Support</span>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-indigo-800 flex items-center">
          <FaUserCircle className="text-2xl mr-3" />
          <div>
            <p className="font-medium">Guest User</p>
            <p className="text-sm text-indigo-300">Complete registration</p>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 p-4 md:p-8">
        {/* Step 1: User Information */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-[#362480] p-8 rounded-xl shadow-xl"
          >
            <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
            <p className="text-indigo-200 mb-8">Complete the form below to get started with your registration</p>
            
            <div className="mb-8">
              <div className="flex items-center">
                <div className="bg-indigo-600 w-10 h-10 rounded-full flex items-center justify-center">
                  <span>1</span>
                </div>
                <div className="ml-3">
                  <h2 className="font-semibold text-lg">Account Details</h2>
                  <p className="text-sm text-indigo-200">Create your credentials</p>
                </div>
              </div>
              
              <div className="ml-5 mt-3 pl-5 border-l-2 border-indigo-500 opacity-50">
                <div className="flex items-center">
                  <div className="bg-[#483a91] w-10 h-10 rounded-full flex items-center justify-center">
                    <span>2</span>
                  </div>
                  <div className="ml-3">
                    <h2 className="font-semibold text-lg">Verification</h2>
                    <p className="text-sm text-indigo-200">Verify your identity</p>
                  </div>
                </div>
              </div>
              
              <div className="ml-5 mt-3 pl-5 border-l-2 border-indigo-500 opacity-50">
                <div className="flex items-center">
                  <div className="bg-[#483a91] w-10 h-10 rounded-full flex items-center justify-center">
                    <span>3</span>
                  </div>
                  <div className="ml-3">
                    <h2 className="font-semibold text-lg">Completion</h2>
                    <p className="text-sm text-indigo-200">Access your account</p>
                  </div>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Username */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-indigo-300" />
                    </div>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 bg-[#483a91] border-0 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none text-white placeholder-indigo-300"
                      placeholder="Enter your username"
                    />
                  </div>
                  {errors.username && (
                    <p className="text-red-400 text-sm mt-1">{errors.username}</p>
                  )}
                </div>
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-indigo-300" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 bg-[#483a91] border-0 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none text-white placeholder-indigo-300"
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                
                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="text-indigo-300" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-10 py-3 bg-[#483a91] border-0 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none text-white placeholder-indigo-300"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-indigo-300" />
                      ) : (
                        <FaEye className="text-indigo-300" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                  )}
                </div>
                
                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="text-indigo-300" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-10 py-3 bg-[#483a91] border-0 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none text-white placeholder-indigo-300"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="text-indigo-300" />
                      ) : (
                        <FaEye className="text-indigo-300" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
                
                {/* Skills */}
                <div>
                  <label htmlFor="skill" className="block text-sm font-medium mb-1">
                    Primary Skill
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaGraduationCap className="text-indigo-300" />
                    </div>
                    <select
                      id="skill"
                      name="skill"
                      value={formData.skill}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 bg-[#483a91] border-0 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none text-white placeholder-indigo-300 appearance-none"
                    >
                      <option value="">Select your primary skill</option>
                      {skillOptions.map((skill) => (
                        <option key={skill} value={skill}>{skill}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                  {errors.skill && (
                    <p className="text-red-400 text-sm mt-1">{errors.skill}</p>
                  )}
                </div>
                
                {/* Next Button */}
                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-indigo-500 hover:bg-indigo-600 rounded-lg flex items-center justify-center font-medium transition-colors"
                  >
                    Continue to Verification
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
        
        {/* Step 2: Verification */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-[#362480] p-8 rounded-xl shadow-xl"
          >
            <h1 className="text-3xl font-bold mb-2">Verify Your Identity</h1>
            <p className="text-indigo-200 mb-8">We need to verify your identity to complete registration</p>
            
            <div className="mb-8">
              <div className="flex items-center opacity-50">
                <div className="bg-indigo-600 w-10 h-10 rounded-full flex items-center justify-center">
                  <FiCheck className="text-white" />
                </div>
                <div className="ml-3">
                  <h2 className="font-semibold text-lg">Account Details</h2>
                  <p className="text-sm text-indigo-200">Create your credentials</p>
                </div>
              </div>
              
              <div className="ml-5 mt-3 pl-5 border-l-2 border-indigo-500">
                <div className="flex items-center">
                  <div className="bg-indigo-600 w-10 h-10 rounded-full flex items-center justify-center">
                    <span>2</span>
                  </div>
                  <div className="ml-3">
                    <h2 className="font-semibold text-lg">Verification</h2>
                    <p className="text-sm text-indigo-200">Verify your identity</p>
                  </div>
                </div>
              </div>
              
              <div className="ml-5 mt-3 pl-5 border-l-2 border-indigo-500 opacity-50">
                <div className="flex items-center">
                  <div className="bg-[#483a91] w-10 h-10 rounded-full flex items-center justify-center">
                    <span>3</span>
                  </div>
                  <div className="ml-3">
                    <h2 className="font-semibold text-lg">Completion</h2>
                    <p className="text-sm text-indigo-200">Access your account</p>
                  </div>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Photo Upload Section */}
                <div className="bg-[#483a91] p-6 rounded-lg">
                  <h3 className="font-medium mb-4">Profile Photo</h3>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-indigo-900 flex items-center justify-center mb-4 overflow-hidden">
                      {photoPreview ? (
                        <img 
                          src={photoPreview} 
                          alt="Profile preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaUserCircle className="text-5xl text-indigo-300" />
                      )}
                    </div>
                    
                    <div className="flex gap-2 mb-2">
                      <label className="py-2 px-4 bg-indigo-500 hover:bg-indigo-600 rounded-lg cursor-pointer text-sm flex items-center justify-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                        Upload Photo
                      </label>
                      
                      <button
                        type="button"
                        onClick={handleTakeSelfie}
                        className="py-2 px-4 bg-indigo-700 hover:bg-indigo-800 rounded-lg text-sm flex items-center"
                      >
                        <FiCamera className="mr-2" /> Take Selfie
                      </button>
                    </div>
                    
                    {errors.photo && (
                      <p className="text-red-400 text-sm mt-1">{errors.photo}</p>
                    )}
                  </div>
                </div>
                
                {/* Phone Verification Section */}
                <div className="bg-[#483a91] p-6 rounded-lg">
                  <h3 className="font-medium mb-4">Phone Verification</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiPhone className="text-indigo-300" />
                        </div>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          className="block w-full pl-10 pr-3 py-2 bg-[#382a74] border-0 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none text-white placeholder-indigo-300"
                          disabled={isCodeSent}
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p className="text-red-400 text-sm mt-1">{errors.phoneNumber}</p>
                      )}
                    </div>
                    
                    {!isCodeSent ? (
                      <button
                        type="button"
                        onClick={handleSendCode}
                        disabled={loading}
                        className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 rounded-lg flex items-center justify-center font-medium transition-colors disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending Code...
                          </>
                        ) : (
                          'Send Verification Code'
                        )}
                      </button>
                    ) : isVerified ? (
                      <div className="bg-green-900/30 text-green-400 p-3 rounded-lg flex items-center">
                        <FiCheck className="mr-2" /> Phone verified successfully
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div>
                          <label htmlFor="verificationCode" className="block text-sm font-medium mb-1">
                            Verification Code
                          </label>
                          <input
                            type="text"
                            id="verificationCode"
                            name="verificationCode"
                            value={formData.verificationCode}
                            onChange={handleChange}
                            placeholder="Enter 6-digit code"
                            className="block w-full py-2 bg-[#382a74] border-0 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none text-white placeholder-indigo-300 text-center text-lg tracking-widest"
                            maxLength={6}
                          />
                          {errors.verificationCode && (
                            <p className="text-red-400 text-sm mt-1">{errors.verificationCode}</p>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <button
                            type="button"
                            disabled={countdown > 0}
                            onClick={handleSendCode}
                            className="text-sm text-indigo-300 hover:text-white transition-colors disabled:opacity-50"
                          >
                            {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
                          </button>
                          
                          <button
                            type="button"
                            onClick={handleVerifyCode}
                            disabled={loading}
                            className="py-2 px-4 bg-indigo-500 hover:bg-indigo-600 rounded-lg flex items-center justify-center font-medium transition-colors disabled:opacity-50"
                          >
                            {loading ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Verifying...
                              </>
                            ) : (
                              'Verify'
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {errors.verification && (
                      <p className="text-red-400 text-sm mt-1">{errors.verification}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-2 px-4 bg-[#483a91] hover:bg-[#554a9d] rounded-lg flex items-center justify-center transition-colors"
                >
                  Back
                </button>
                
                <button
                  type="submit"
                  className="py-3 px-6 bg-indigo-500 hover:bg-indigo-600 rounded-lg flex items-center justify-center font-medium transition-colors"
                >
                  Complete Registration
                </button>
              </div>
            </form>
          </motion.div>
        )}
        
        {/* Step 3: Completion */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-[#362480] p-8 rounded-xl shadow-xl"
          >
            <div className="flex flex-col items-center mb-10">
              <div className="bg-green-500 p-5 rounded-full mb-4">
                <FiCheck className="text-white text-4xl" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Welcome Aboard!</h1>
              <p className="text-indigo-200 text-center">
                Your registration is complete and your account is now active. You can now access all features and resources.
              </p>
            </div>
            
            <div className="bg-[#483a91] p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold mb-4">Account Summary</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-indigo-300 text-sm">Username</h3>
                  <p className="font-medium">{formData.username}</p>
                </div>
                <div>
                  <h3 className="text-indigo-300 text-sm">Email Address</h3>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <div>
                  <h3 className="text-indigo-300 text-sm">Account Type</h3>
                  <p className="font-medium">Standard Access</p>
                </div>
                <div>
                  <h3 className="text-indigo-300 text-sm">Registration Date</h3>
                  <p className="font-medium">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#483a91] p-5 rounded-lg text-center">
                  <div className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaUserCircle className="text-xl" />
                  </div>
                  <h3 className="font-medium mb-2">Complete Your Profile</h3>
                  <p className="text-sm text-indigo-300">Add more details to personalize your experience</p>
                </div>
                
                <div className="bg-[#483a91] p-5 rounded-lg text-center">
                  <div className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaBook className="text-xl" />
                  </div>
                  <h3 className="font-medium mb-2">Explore Tutorials</h3>
                  <p className="text-sm text-indigo-300">Learn how to make the most of our platform</p>
                </div>
                
                <div className="bg-[#483a91] p-5 rounded-lg text-center">
                  <div className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <IoIosPeople className="text-xl" />
                  </div>
                  <h3 className="font-medium mb-2">Join Community</h3>
                  <p className="text-sm text-indigo-300">Connect with other users and share experiences</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}