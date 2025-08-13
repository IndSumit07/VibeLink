import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import "../index.css";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, userData, isLoggedIn } =
    useContext(AppContent);

  const [state, setState] = useState("Log In");
  const [fullname, setfullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // 🔹 New loading state

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader
    try {
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(
          backendUrl + "/api/auth/register",
          { fullname, username, email, password }
        );

        if (data.success) {
          setIsLoggedIn(true);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          backendUrl + "/api/auth/login",
          { email, password }
        );

        if (data.success) {
          setIsLoggedIn(true);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  useEffect(() => {
    isLoggedIn && userData && navigate("/");
  }, [isLoggedIn, userData]);

  return (
    <div className="relative min-h-screen min-w-full flex items-center justify-center overflow-hidden px-5 bg-transparent">
      {/* Dynamic Animated Gradient Background */}
      <div className="absolute inset-0 -z-20 animate-gradient bg-gradient-to-br from-[#fffbe6] via-[#f7e9c4] to-[#B89F73]"></div>
      <div className="absolute inset-0 -z-30 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-tr from-[#f0ce6f]/70 via-[#e0c52b]/60 to-[#B89F73]/70 opacity-80 animate-gradient"></div>
      </div>

      {/* Animated Blurry Circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#e0c52b]/80 rounded-full blur-[160px] animate-float1 animate-pulseCircle -z-10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d99829]/70 rounded-full blur-[160px] animate-float2 animate-pulseCircle -z-10"></div>
      <div className="absolute top-1/3 left-1/4 w-56 h-56 bg-[#e9a54d]/60 rounded-full blur-[120px] animate-float3 animate-pulseCircle -z-10"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[#f0ce6f]/50 rounded-full blur-[120px] animate-float4 animate-pulseCircle -z-10"></div>
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-[#f0960f]/60 rounded-full blur-[120px] animate-float5 animate-pulseCircle -z-10"></div>

      {/* Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white/90 rounded-full animate-spin"></div>
          <p className="mt-4 text-white font-semibold">Processing...</p>
        </div>
      )}

      {/* Glassmorphism Form Card */}
      <div
        key={state}
        className={`relative bg-white/30 backdrop-blur-xl border border-[#B89F73]/30 shadow-2xl p-10 rounded-3xl w-full sm:w-[400px] z-10 animate-fadeUp ${
          loading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {/* Logo/Title */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-tr from-[#B89F73] to-[#e0c52b] rounded-full flex items-center justify-center shadow-lg">
            <img src={assets.person_icon} alt="User" className="w-8 h-8" />
          </div>
          <span className="mt-2 text-xl font-extrabold text-[#B89F73] tracking-wide drop-shadow">
            VibeLink
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#B89F73] mt-2 text-center drop-shadow">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-gray-500 text-sm mb-6 text-center ">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account"}
        </p>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="space-y-4">
          {state === "Sign Up" && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setfullname(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 border border-[#B89F73]/40 rounded-xl bg-white/60 backdrop-blur focus:bg-white/80 outline-none focus:ring-2 focus:ring-[#B89F73]/50 transition-all shadow-sm"
                required
              />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 border border-[#B89F73]/40 rounded-xl bg-white/60 backdrop-blur focus:bg-white/80 outline-none focus:ring-2 focus:ring-[#B89F73]/50 transition-all shadow-sm"
                required
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-2 border border-[#B89F73]/40 rounded-xl bg-white/60 backdrop-blur focus:bg-white/80 outline-none focus:ring-2 focus:ring-[#B89F73]/50 transition-all shadow-sm"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-2 border border-[#B89F73]/40 rounded-xl bg-white/60 backdrop-blur focus:bg-white/80 outline-none focus:ring-2 focus:ring-[#B89F73]/50 transition-all shadow-sm"
            required
          />

          <p
            onClick={() => !loading && navigate("/reset-password")}
            className="text-[#B89F73] text-sm cursor-pointer hover:underline transition"
          >
            Forgot password?
          </p>

          <button
            disabled={loading}
            className="w-full py-2 bg-gradient-to-tr from-[#B89F73] to-[#e0c52b] hover:from-[#a18763] hover:to-[#e9a54d] text-white font-semibold rounded-xl shadow-lg transition-all duration-200"
          >
            {loading
              ? "Please wait..."
              : state === "Sign Up"
              ? "Register"
              : "Login"}
          </button>
        </form>

        {/* Toggle Link */}
        {state === "Sign Up" ? (
          <p className="mt-4 text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <span
              onClick={() => !loading && setState("Login")}
              className="text-[#B89F73] cursor-pointer underline hover:text-[#e0c52b] transition"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="mt-4 text-sm text-gray-500 text-center">
            Don't have an account?{" "}
            <span
              onClick={() => !loading && setState("Sign Up")}
              className="text-[#B89F73] cursor-pointer underline hover:text-[#e0c52b] transition"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
