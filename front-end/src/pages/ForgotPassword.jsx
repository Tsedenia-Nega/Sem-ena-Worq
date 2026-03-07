import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/sem&worq/forgot-password",
        { email },
      );
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1a1a1a] p-8 rounded-lg border border-[#DD9735]/20 shadow-xl">
        <h2 className="text-3xl font-bold text-[#DD9735] mb-2">
          Forgot Password?
        </h2>
        <p className="text-white/60 mb-6">
          Enter your email to receive a reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">Email Address</label>
            <input
              type="email"
              className="w-full p-3 rounded bg-black border border-[#DD9735]/50 text-white focus:outline-none focus:border-[#DD9735]"
              placeholder="admin@semworq.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#DD9735] text-white font-bold py-3 rounded hover:bg-[#c6862f] transition-colors"
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <p className="mt-4 text-green-500 text-sm bg-green-500/10 p-2 rounded border border-green-500/20">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-4 text-red-500 text-sm bg-red-500/10 p-2 rounded border border-red-500/20">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
