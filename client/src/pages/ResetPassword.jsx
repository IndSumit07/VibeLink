import React, { useContext, useState, useRef } from 'react';
import assets from '../assets/assets';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const inputRefs = useRef([]);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/send-reset-otp", { email });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map(e => e.value);
    setOtp(otpArray.join(''));
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/reset-password", { email, otp, newPassword });
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) navigate('/login'); // Fixed spelling
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white to-[#B89F73]">
      {/* Floating Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#e0c52b] rounded-full blur-[100px] animate-float1"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d99829] rounded-full blur-[100px] animate-float2"></div>
      <div className="absolute top-1/3 left-1/4 w-56 h-56 bg-[#e9a54d] rounded-full blur-[100px] animate-float3"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[#f0ce6f] rounded-full blur-[100px] animate-float4"></div>
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-[#f0960f] rounded-full blur-[100px] animate-float5"></div>

      {/* Loader */}
      {loading && (
        <div className="absolute top-5 right-5 flex items-center gap-2 text-[#B89F73]">
          <div className="w-4 h-4 border-2 border-t-transparent border-[#B89F73] rounded-full animate-spin"></div>
          <span className="text-sm">Processing...</span>
        </div>
      )}

      {/* Email Form */}
      {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className="relative bg-white p-8 sm:p-10 rounded-3xl shadow-xl w-full sm:w-96 z-10 animate-fadeUp text-sm">
          <h1 className="text-[#B89F73] text-2xl font-bold text-center mb-4">Reset Password</h1>
          <p className="text-center mb-6 text-gray-500">Enter your registered email address</p>
          <div className="mb-5 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#F8F8F8] border border-gray-200 focus-within:border-[#B89F73] transition">
            <img src={assets.mail_icon} alt="email" className="w-5 h-5 opacity-70" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email ID"
              className="bg-transparent outline-none w-full text-gray-700"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#B89F73] hover:bg-[#a18b5e] text-white py-3 rounded-full font-semibold transition duration-200 shadow-md hover:shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            Submit
          </button>
        </form>
      )}

      {/* OTP Form */}
      {!isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitOtp} className="relative bg-white p-10 rounded-3xl shadow-xl w-full sm:w-96 z-10 animate-fadeUp text-sm">
          <h1 className="text-[#B89F73] text-2xl font-bold text-center mb-4">Reset Password OTP</h1>
          <p className="text-center mb-6 text-gray-500">Enter the 6-digit code sent to your email</p>
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
          <button
            className={`w-full py-2.5 bg-[#B89F73] hover:bg-[#a18763] text-white rounded-lg transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            Submit
          </button>
        </form>
      )}

      {/* New Password Form */}
      {isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitNewPassword} className="relative bg-white p-8 sm:p-10 rounded-3xl shadow-xl w-full sm:w-96 z-10 animate-fadeUp text-sm">
          <h1 className="text-[#B89F73] text-2xl font-bold text-center mb-4">New Password</h1>
          <p className="text-center mb-6 text-gray-500">Enter your new password</p>
          <div className="mb-5 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#F8F8F8] border border-gray-200 focus-within:border-[#B89F73] transition">
            <img src={assets.lock_icon} alt="lock" className="w-5 h-5 opacity-70" />
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none w-full text-gray-700"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#B89F73] hover:bg-[#a18b5e] text-white py-3 rounded-full font-semibold transition duration-200 shadow-md hover:shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
