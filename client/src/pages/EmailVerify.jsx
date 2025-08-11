import React, { useContext, useEffect } from 'react';
import { AppContent } from "../context/AppContext";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "../index.css";

const EmailVerify = () => {

  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContent);
  const navigate = useNavigate();
  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value);
      const otp = otpArray.join('');
      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp });

      if (data.success) {
        toast.success(data.message);
        getUserData;
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    isLoggedIn && userData && userData.isAccountVerified && navigate('/')
  }, [isLoggedIn, userData])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white to-[#B89F73]">
      {/* Animated Blurry Circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#e0c52b] rounded-full blur-[100px] animate-float1 z-0"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d99829] rounded-full blur-[100px] animate-float2 z-0"></div>
      <div className="absolute top-1/3 left-1/4 w-56 h-56 bg-[#e9a54d] rounded-full blur-[100px] animate-float3 z-0"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[#f0ce6f] rounded-full blur-[100px] animate-float4 z-0"></div>
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-[#f0960f] rounded-full blur-[100px] animate-float5 z-0"></div>

      {/* Card */}
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-3xl shadow-xl w-full sm:w-96 z-10 animate-fadeUp text-sm"
      >
        {/* Title */}
        <h1 className="text-[#B89F73] text-2xl font-bold text-center mb-4">Email Verification</h1>
        <p className="text-center mb-6 text-gray-500">Enter the 6-digit code sent to your email</p>

        {/* OTP Inputs */}
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input
              type="text"
              maxLength="1"
              key={index}
              required
              className="w-12 h-12 border border-[#B89F73] rounded-lg text-center text-xl text-gray-700 outline-none focus:ring-2 focus:ring-[#B89F73]/50"
              ref={e => inputRefs.current[index] = e}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        {/* Button */}
        <button className="w-full py-2 bg-[#B89F73] hover:bg-[#a18763] text-white rounded-lg transition">
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
