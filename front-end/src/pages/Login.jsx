import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import logo from "./../assets/Logo.PNG";
import Hexagons from "./../components/Hexagons";
import api from "../api/axios";

function LoginPage({setUser}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // This is crucial to stop the reload
    setLoading(true);
   
    try {
      const response = await api.post(
        "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        navigate("/admin");
      }
    } catch (err) {
      setError("Invalid email or password. please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Logo */}
      <Link to="/" className="fixed top-8 left-8 z-50">
        <img
          src={logo}
          alt="Logo"
          className="w-14 h-14 hover:scale-110 transition-transform"
        />
      </Link>

      {/* Background - Z-index lowered to ensure it stays behind */}
      <div className="absolute inset-0 z-0">
        <Hexagons />
      </div>

      {/* Login Card Container - Fixed width to prevent jumping */}
      <div className="relative z-10 w-full max-w-[450px] px-6">
        <div className="bg-[#0c0c0c] border border-[#DD9735]/40 p-10 rounded-2xl shadow-[0_0_50px_rgba(221,151,53,0.1)] transition-all duration-500">
          <h2 className="text-3xl font-bold text-white text-center mb-2 uppercase tracking-tighter">
            Admin <span className="text-[#DD9735]">Login</span>
          </h2>
          <div className="w-10 h-[1px] bg-[#DD9735] mx-auto mb-10"></div>

          {/* Error Message - Absolute height container to prevent layout shift */}
          <div className="min-h-[50px]">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-center text-[10px] font-bold uppercase tracking-widest animate-pulse">
                {error}
              </div>
            )}
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[#DD9735] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                Email Address
              </label>
              <div className="relative group">
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#DD9735] transition-all"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(""); // Clears error when user starts fixing it
                  }}
                  required
                />
                <FaUser className="text-white/20 group-focus-within:text-[#DD9735] absolute right-4 top-1/2 -translate-y-1/2 transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-[#DD9735] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                Password
              </label>
              <div className="relative group">
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#DD9735] transition-all"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(""); // Clears error when user starts fixing it
                  }}
                  required
                />
                <FaLock className="text-white/20 group-focus-within:text-[#DD9735] absolute right-4 top-1/2 -translate-y-1/2 transition-colors" />
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                size="sm"
                className="text-[10px] text-white/30 hover:text-[#DD9735] uppercase font-bold tracking-widest transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              className="w-full py-4 bg-[#DD9735] text-black font-black uppercase tracking-widest text-xs rounded-lg hover:bg-white transition-all active:scale-95 shadow-lg shadow-[#DD9735]/20"
              type="submit"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
