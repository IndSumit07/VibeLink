import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContent);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [userData]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');

      if (data.success) {
        setIsLoggedIn(false);
        setUserData(null);
        navigate('/');
        toast.success('Logged out successfully');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendVerifyOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');
      if (data.success) {
        navigate('/email-verify');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#F4F3EF] shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-semibold text-[#B89F73]">VibeLink</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-800 hover:text-[#B89F73] text-sm font-medium transition-all duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right - Avatar if logged in, Login button if not */}
          <div className="hidden md:flex items-center space-x-3">
            {userData ? (
              <Link to="/dashboard">
              
              <div
                className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative cursor-pointer"
                onClick={() => setShowUserMenu((prev) => !prev)}
              >
                {userData.profileImage}
                
              </div>
              
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-[#B89F73] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90"
              >
                Log In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-800 hover:text-[#B89F73]"
            >
              {isMobileMenuOpen ? '✖' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-[#F4F3EF] shadow-lg"
        >
          <div className="px-4 py-3 space-y-2">
            {/* Mobile Avatar if logged in */}
            {userData && (
              <div
                className="w-10 h-10 flex justify-center items-center rounded-full bg-black text-white relative cursor-pointer mb-3"
                onClick={() => setShowUserMenu((prev) => !prev)}
              >
                {userData.fullname?.[0]?.toUpperCase()}
                {showUserMenu && (
                  <div className="absolute left-0 mt-12 z-10 text-black rounded shadow-lg bg-gray-100 text-sm min-w-[130px]">
                    {!userData.isAccountVerified && (
                      <button
                        onClick={() => {
                          sendVerifyOtp();
                          setShowUserMenu(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-200"
                      >
                        Verify Email
                      </button> 
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Links */}
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-gray-800 hover:text-[#B89F73] transition"
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Login button only if NOT logged in */}
            {!userData && (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-[#B89F73] border border-[#B89F73] rounded-md text-center hover:bg-[#B89F73] hover:text-white"
              >
                Log In
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
