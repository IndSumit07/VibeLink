import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative"
              >
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-800 hover:text-[#B89F73] px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 relative group overflow-hidden inline-block"
                >
                  <span className="relative z-10">{item.name}</span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-[#B89F73] to-[#D4AF37] rounded-md"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ zIndex: 0 }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Login/Signup Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <Link
                to="/login"
                className="text-gray-800 hover:text-[#B89F73] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 inline-block"
              >
                Log In
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <Link
                to="/signup"
                className="bg-[#B89F73] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors duration-200 inline-block"
              >
                Sign Up
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-800 hover:text-[#B89F73] focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-800 hover:text-[#B89F73] block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="text-gray-800 hover:text-[#B89F73] block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="bg-[#B89F73] text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-opacity-90 transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;