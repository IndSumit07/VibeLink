import React, { useContext, useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(false);

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
    e.preventDefault();
    setLoading(true);
    try {
      const otpArray = inputRefs.current.map(el => el.value);
      const otp = otpArray.join('');
      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp });

      if (data.success) {
        toast.success(data.message);
        if (getUserData) getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn && userData && userData.isAccountVerified && navigate('/');
  }, [isLoggedIn, userData]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-5 bg-transparent">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-20 animate-gradient bg-gradient-to-br from-[#fffbe6] via-[#f7e9c4] to-[#B89F73]"></div>
      <div className="absolute inset-0 -z-30 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-tr from-[#f0ce6f]/70 via-[#e0c52b]/60 to-[#B89F73]/70 opacity-80 animate-gradient"></div>
      </div>

      {/* Animated Floating Circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#e0c52b]/80 rounded-full blur-[160px] animate-float1 -z-10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d99829]/70 rounded-full blur-[160px] animate-float2 -z-10"></div>
      <div className="absolute top-1/3 left-1/4 w-56 h-56 bg-[#e9a54d]/60 rounded-full blur-[120px] animate-float3 -z-10"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[#f0ce6f]/50 rounded-full blur-[120px] animate-float4 -z-10"></div>
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-[#f0960f]/60 rounded-full blur-[120px] animate-float5 -z-10"></div>

      {/* Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white/90 rounded-full animate-spin"></div>
          <p className="mt-4 text-white font-semibold">Verifying...</p>
        </div>
      )}

      {/* Card */}
      <form
        onSubmit={onSubmitHandler}
        className={`relative bg-white/30 backdrop-blur-xl border border-[#B89F73]/30 shadow-2xl p-10 rounded-3xl w-full sm:w-[400px] z-10 animate-fadeUp ${
          loading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {/* Title */}
        <h1 className="text-[#B89F73] text-2xl font-bold text-center mb-4">
          Email Verification
        </h1>
        <p className="text-center mb-6 text-gray-500">
          Enter the 6-digit code sent to your email
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                disabled={loading}
                className="w-12 h-12 border border-[#B89F73]/40 rounded-lg bg-white/60 backdrop-blur text-center text-xl text-gray-700 outline-none focus:ring-2 focus:ring-[#B89F73]/50"
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>

        {/* Button */}
        <button
          disabled={loading}
          className="w-full py-2 bg-gradient-to-tr from-[#B89F73] to-[#e0c52b] hover:from-[#a18763] hover:to-[#e9a54d] text-white font-semibold rounded-xl shadow-lg transition-all"
        >
          {loading ? "Please Wait..." : "Verify Email"}
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
