import React, { useState } from 'react';

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [animating, setAnimating] = useState(false);

  // Animated icon: gently floating user avatar
  const AvatarIcon = (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      className="avatar-float"
      style={{ display: 'block', margin: '0 auto 18px auto' }}
    >
      <circle cx="28" cy="28" r="28" fill="#B89F73" />
      <ellipse cx="28" cy="23" rx="9" ry="9" fill="#F4F3EF" />
      <ellipse cx="28" cy="41" rx="14" ry="8" fill="#F4F3EF" />
    </svg>
  );

  const handleSwitch = (toLogin) => {
    setAnimating(true);
    setTimeout(() => {
      setIsLogin(toLogin);
      setError('');
      setPassword('');
      setConfirmPassword('');
      setFullName('');
      setUsername('');
      setEmail('');
      setAnimating(false);
    }, 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (isLogin) {
      // Handle login logic
      console.log('Login:', { username, password });
    } else {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      // Handle register logic
      console.log('Register:', { fullName, username, email, password, confirmPassword });
    }
  };

  return (
    <div className="login-bg-animated">
      {/* Animated background shapes */}
      <div className="bg-blob bg-blob1"></div>
      <div className="bg-blob bg-blob2"></div>
      <div className="bg-blob bg-blob3"></div>
      <form
        onSubmit={handleSubmit}
        className={`login-form shadow-lg glassy-form ${animating ? 'form-fadeOut' : 'form-fadeIn'}`}
        style={{
          position: "relative",
          overflow: "hidden",
          border: "none",
          borderRadius: "32px",
          background: "rgba(255,255,255,0.85)",
          width: 410,
          padding: 38,
          zIndex: 1,
        }}
      >
        <div>
          <div style={{ width: 70, height: 70 }}>
            {AvatarIcon}
          </div>
          <h2
            className="text-center font-bold mb-6"
            style={{
              color: "#B89F73",
              fontSize: "2rem",
              letterSpacing: "1px"
            }}
          >
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="fullName" className="block mb-2 font-semibold" style={{ color: "#B89F73" }}>Full Name</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
                style={{
                  border: "1.5px solid #B89F73",
                  background: "#F4F3EF",
                  color: "#B89F73",
                  fontWeight: 500,
                  fontFamily: "'Nova Square', 'Segoe UI', Arial, sans-serif"
                }}
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 font-semibold" style={{ color: "#B89F73" }}>Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
              style={{
                border: "1.5px solid #B89F73",
                background: "#F4F3EF",
                color: "#B89F73",
                fontWeight: 500,
                fontFamily: "'Nova Square', 'Segoe UI', Arial, sans-serif"
              }}
            />
          </div>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 font-semibold" style={{ color: "#B89F73" }}>Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded"
                  style={{
                    border: "1.5px solid #B89F73",
                    background: "#F4F3EF",
                    color: "#B89F73",
                    fontWeight: 500,
                    fontFamily: "'Nova Square', 'Segoe UI', Arial, sans-serif"
                  }}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-2 font-semibold" style={{ color: "#B89F73" }}>New Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded"
                  style={{
                    border: "1.5px solid #B89F73",
                    background: "#F4F3EF",
                    color: "#B89F73",
                    fontWeight: 500,
                    fontFamily: "'Nova Square', 'Segoe UI', Arial, sans-serif"
                  }}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block mb-2 font-semibold" style={{ color: "#B89F73" }}>Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded"
                  style={{
                    border: "1.5px solid #B89F73",
                    background: "#F4F3EF",
                    color: "#B89F73",
                    fontWeight: 500,
                    fontFamily: "'Nova Square', 'Segoe UI', Arial, sans-serif"
                  }}
                />
              </div>
            </>
          )}
          {isLogin && (
            <div className="mb-2">
              <label htmlFor="password" className="block mb-2 font-semibold" style={{ color: "#B89F73" }}>Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
                style={{
                  border: "1.5px solid #B89F73",
                  background: "#F4F3EF",
                  color: "#B89F73",
                  fontWeight: 500,
                  fontFamily: "'Nova Square', 'Segoe UI', Arial, sans-serif"
                }}
              />
              {/* Forgot password link */}
              <div className="text-right mt-1">
                <button
                  type="button"
                  className="underline"
                  style={{
                    color: "#B89F73",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Nova Square', 'Segoe UI', Arial, sans-serif",
                    fontSize: "0.97rem"
                  }}
                  onClick={() => alert('Forgot password functionality coming soon!')}
                >
                  Forgot password?
                </button>
              </div>
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 rounded font-bold"
            style={{
              background: "var(--color-accent)",
              color: "#fff",
              fontSize: "1.1rem",
              marginBottom: 8,
              border: "none",
              boxShadow: "none",
              fontFamily: "'Nova Square', 'Segoe UI', Arial, sans-serif",
              letterSpacing: "1px"
            }}
          >
            {isLogin ? 'Login' : 'Register'}
          </button>

          {/* Social media login options removed */}

          <div className="mt-4 text-center">
            {isLogin ? (
              <span style={{ color: "#B89F73" }}>
                New user?{' '}
                <button
                  type="button"
                  className="underline"
                  style={{ color: "#B89F73", background: "none", border: "none", cursor: "pointer", fontFamily: "'Nova Square', 'Segoe UI', Arial, sans-serif" }}
                  onClick={() => handleSwitch(false)}
                  disabled={animating}
                >
                  Register
                </button>
              </span>
            ) : (
              <span style={{ color: "#B89F73" }}>
                Already have an account?{' '}
                <button
                  type="button"
                  className="underline"
                  style={{ color: "#B89F73", background: "none", border: "none", cursor: "pointer", fontFamily: "'Nova Square', 'Segoe UI', Arial, sans-serif" }}
                  onClick={() => handleSwitch(true)}
                  disabled={animating}
                >
                  Login
                </button>
              </span>
            )}
          </div>
        </div>
      </form>
      <style>
        {`
          .avatar-float {
            animation: avatarFloat 2.5s ease-in-out infinite alternate;
          }
          @keyframes avatarFloat {
            0% { transform: translateY(0);}
            100% { transform: translateY(-14px);}
          }
          .login-bg-animated {
            position: relative;
            overflow: hidden;
            min-height: 100vh;
            width: 100vw;
            background: linear-gradient(135deg, #F4F3EF 0%, #B89F73 100%);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .bg-blob {
            position: absolute;
            border-radius: 50%;
            opacity: 0.32;
            z-index: 0;
            filter: blur(12px);
            animation: blob-move 18s ease-in-out infinite alternate;
          }
          .bg-blob1 {
            width: 340px;
            height: 340px;
            background: #B89F73;
            top: -80px;
            left: -80px;
            animation-delay: 0s;
          }
          .bg-blob2 {
            width: 220px;
            height: 220px;
            background: #F4F3EF;
            bottom: -60px;
            right: -60px;
            animation-delay: 4s;
          }
          .bg-blob3 {
            width: 180px;
            height: 180px;
            background: #B89F73;
            top: 60%;
            left: 70%;
            animation-delay: 8s;
          }
          @keyframes blob-move {
            0% {
              transform: scale(1) translate(0px, 0px);
            }
            50% {
              transform: scale(1.15) translate(30px, 20px);
            }
            100% {
              transform: scale(1) translate(-10px, -10px);
            }
          }
          .glassy-form {
            backdrop-filter: blur(8px);
            background: rgba(255,255,255,0.85);
            box-shadow: 0 8px 32px rgba(184,159,115,0.18);
          }
          .form-fadeIn {
            animation: fadeInUp 0.6s cubic-bezier(.39,.575,.565,1) both;
          }
          .form-fadeOut {
            animation: fadeOutDown 0.6s cubic-bezier(.39,.575,.565,1) both;
          }
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(40px) scale(0.98);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          @keyframes fadeOutDown {
            0% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
            100% {
              opacity: 0;
              transform: translateY(40px) scale(0.98);
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoginForm;