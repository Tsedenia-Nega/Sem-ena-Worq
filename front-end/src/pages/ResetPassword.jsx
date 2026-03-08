import React, { useState } from "react";
import { useLocation, useNavigate ,useSearchParams} from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
const [searchParams] = useSearchParams();
const resetToken = searchParams.get("token");

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setMessage({ type: "error", text: "Passwords do not match" });
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/sem&worq/reset-password`,
        {
          resetToken,
          newPassword: password,
        },
      );
      setMessage({ type: "success", text: "Password updated! Redirecting..." });
      setTimeout(() => navigate("/management-portal-xyz/login"), 2500);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Link expired or invalid",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-sans">
      <div className="w-full max-w-md p-8 bg-[#111111] border border-[#DD9735]/30 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-[#DD9735] mb-6 text-center">
          New Password
        </h2>

        <form onSubmit={handleReset} className="space-y-5">
          <input
            type="password"
            placeholder="New Password"
            className="w-full bg-black border border-white/10 text-white p-3 rounded-lg focus:outline-none focus:border-[#DD9735]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full bg-black border border-white/10 text-white p-3 rounded-lg focus:outline-none focus:border-[#DD9735]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#DD9735] hover:bg-[#c6862f] py-3 rounded-lg font-bold text-white shadow-lg"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        {message.text && (
          <div
            className={`mt-6 p-4 rounded-lg text-sm border ${
              message.type === "success"
                ? "bg-green-500/10 text-green-400 border-green-500/50"
                : "bg-red-500/10 text-red-400 border-red-500/50"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
