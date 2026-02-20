import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { User, Mail, Save, Trash2, ShieldCheck } from "lucide-react";

const Profile = () => {
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" });

  const adminData = JSON.parse(localStorage.getItem("adminUser"));
  const adminId = adminData?.id || adminData?._id;

  useEffect(() => {
    if (adminData) {
      setFormData({
        username: adminData.username || "",
        email: adminData.email || "",
      });
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", text: "" });

    try {
      const res = await api.patch(`/edit/${adminId}`, formData);
      setStatus({ type: "success", text: "Changes saved." });
      localStorage.setItem("adminUser", JSON.stringify(res.data.data));
    } catch (err) {
      setStatus({ type: "error", text: "Update failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-black min-h-screen flex flex-col items-center">
      <div className="w-full max-w-xl">
        {/* Header - More Compact */}
        <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
          <div className="w-10 h-10 rounded-lg bg-[#DD9735]/10 border border-[#DD9735]/30 flex items-center justify-center">
            <ShieldCheck className="text-[#DD9735]" size={20} />
          </div>
          <h1 className="text-xl font-bold uppercase tracking-widest text-white">
            Profile Settings
          </h1>
        </div>

        {/* Status Message */}
        {status.text && (
          <div
            className={`mb-6 p-3 rounded-lg text-xs font-bold border ${
              status.type === "success"
                ? "bg-green-500/10 border-green-500/20 text-green-500"
                : "bg-red-500/10 border-red-500/20 text-red-500"
            }`}
          >
            {status.text}
          </div>
        )}

        {/* Compact Form */}
        <form
          onSubmit={handleUpdate}
          className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl space-y-5"
        >
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1.5 ml-1">
                Admin Username
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                  size={14}
                />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full bg-black border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:border-[#DD9735] outline-none transition-all text-gray-200"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1.5 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                  size={14}
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-black border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:border-[#DD9735] outline-none transition-all text-gray-200"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#DD9735] text-black font-bold text-xs uppercase py-3 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              "Saving..."
            ) : (
              <>
                <Save size={16} /> Update Profile
              </>
            )}
          </button>
        </form>

        {/* Danger Zone - Tucked Away */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between px-2">
          <div>
            <h3 className="text-red-500 font-bold text-[10px] uppercase tracking-widest">
              Account Deletion
            </h3>
            <p className="text-gray-600 text-[9px] mt-0.5 uppercase tracking-tighter">
              This action is permanent and cannot be undone.
            </p>
          </div>
          <button
            onClick={() => {
              /* add delete logic here */
            }}
            className="text-gray-500 hover:text-red-500 transition-colors p-2"
            title="Delete Account"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
