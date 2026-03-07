import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/sem&worq/forgot-password`,
        { email },
      );
      setMessage({ type: "success", text: res.data.message });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Connection failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-sans">
      <div className="w-full max-w-md p-8 bg-[#111111] border border-[#DD9735]/30 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#DD9735] tracking-tight mb-2">
            Sem & Worq
          </h1>
          <p className="text-white/60">Reset your admin access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full bg-black border border-white/10 text-white p-3 rounded-lg focus:outline-none focus:border-[#DD9735] transition-all"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
              loading
                ? "bg-[#DD9735]/50 cursor-not-allowed"
                : "bg-[#DD9735] hover:bg-[#c6862f] shadow-lg shadow-[#DD9735]/20"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message.text && (
          <div
            className={`mt-6 p-4 rounded-lg text-sm border ${
              message.type === "success"
                ? "bg-green-500/10 border-green-500/50 text-green-400"
                : "bg-red-500/10 border-red-500/50 text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href="/management-portal-xyz/login"
            className="text-white/40 hover:text-[#DD9735] text-sm transition-colors"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
