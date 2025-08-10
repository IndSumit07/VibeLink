import React, { useContext, useState } from "react";
import assets from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import "../index.css";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn } = useContext(AppContent);

  const [state, setState] = useState("Sign Up");
  const [fullname, setfullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
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
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white to-[#B89F73]">
      {/* Animated Blurry Circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#e0c52b] rounded-full blur-[100px] animate-float1 z-0"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d99829] rounded-full blur-[100px] animate-float2 z-0"></div>
      <div className="absolute top-1/3 left-1/4 w-56 h-56 bg-[#e9a54d] rounded-full blur-[100px] animate-float3 z-0"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[#f0ce6f] rounded-full blur-[100px] animate-float4 z-0"></div>
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-[#f0960f] rounded-full blur-[100px] animate-float5 z-0"></div>

      {/* Form Card with animation */}
      <div
        key={state} // Forces re-mount on toggle so animation plays again
        className="relative bg-white p-10 rounded-3xl shadow-xl w-full sm:w-96 z-10 animate-fadeUp"
      >
        {/* Icon */}
        <div className="mx-auto w-16 h-16 bg-[#B89F73] rounded-full flex items-center justify-center">
          <img src={assets.person_icon} alt="User" className="w-8 h-8" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#B89F73] mt-4 text-center">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-gray-500 text-sm mb-6 text-center">
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
                className="w-full px-4 py-2 border border-[#B89F73] rounded-lg outline-none focus:ring-2 focus:ring-[#B89F73]/50"
                required
              />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-[#B89F73] rounded-lg outline-none focus:ring-2 focus:ring-[#B89F73]/50"
                required
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-[#B89F73] rounded-lg outline-none focus:ring-2 focus:ring-[#B89F73]/50"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-[#B89F73] rounded-lg outline-none focus:ring-2 focus:ring-[#B89F73]/50"
            required
          />

          <p
            onClick={() => navigate("/reset-password")}
            className="text-[#B89F73] text-sm cursor-pointer"
          >
            Forgot password?
          </p>

          <button className="w-full py-2 bg-[#B89F73] hover:bg-[#a18763] text-white rounded-lg transition">
            {state === "Sign Up" ? "Register" : "Login"}
          </button>
        </form>

        {/* Toggle Link */}
        {state === "Sign Up" ? (
          <p className="mt-4 text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-[#B89F73] cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="mt-4 text-sm text-gray-500 text-center">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-[#B89F73] cursor-pointer underline"
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
