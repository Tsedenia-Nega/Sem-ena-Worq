import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState({ type: "", msg: "" });

  const query = new URLSearchParams(useLocation().search);
  const resetToken = query.get("token"); // Gets token from URL
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return setStatus({ type: "error", msg: "Passwords do not match" });
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/sem&worq/reset-password",
        {
          resetToken,
          newPassword,
        },
      );
      setStatus({ type: "success", msg: response.data.message });
      setTimeout(() => navigate("/login"), 3000); // Redirect to login after success
    } catch (err) {
      setStatus({
        type: "error",
        msg: err.response?.data?.error || "Link expired",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1a1a1a] p-8 rounded-lg border border-[#DD9735]/20 shadow-xl">
        <h2 className="text-3xl font-bold text-[#DD9735] mb-6 text-center">
          Set New Password
        </h2>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 rounded bg-black border border-[#DD9735]/50 text-white focus:outline-none focus:border-[#DD9735]"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full p-3 rounded bg-black border border-[#DD9735]/50 text-white focus:outline-none focus:border-[#DD9735]"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#DD9735] text-white font-bold py-3 rounded hover:bg-[#c6862f] transition-all"
          >
            Update Password
          </button>
        </form>

        {status.msg && (
          <div
            className={`mt-4 p-3 rounded text-sm border ${
              status.type === "success"
                ? "bg-green-500/10 text-green-500 border-green-500"
                : "bg-red-500/10 text-red-500 border-red-500"
            }`}
          >
            {status.msg}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
