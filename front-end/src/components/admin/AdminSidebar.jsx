import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import {
  Home,
  FileText,
  Briefcase,
  Star,
  Layers,
  LogOut,
  User,
  Settings,
} from "lucide-react";

const AdminSidebar = ({ setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const adminData = JSON.parse(localStorage.getItem("adminUser"));
      const adminId = adminData?.id || adminData?._id;
      if (adminId) await api.post(`/logout/${adminId}`);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("user"); // Match the key in App.js
      localStorage.removeItem("token");
      localStorage.clear();
      if (setUser) {
        setUser(null);
      }
      navigate("/login");
    }
  };

  // Navigation Items
  const navItems = [
    { name: "Home Content", path: "/admin/home", icon: Home },
    { name: "Services", path: "/admin/services", icon: Briefcase },
    { name: "Blog", path: "/admin/blog", icon: FileText },
    { name: "Portfolios", path: "/admin/portfolios", icon: Layers },
    { name: "Testimonial", path: "/admin/testimonials", icon: Star },
  ];

  return (
    <aside className="w-72 bg-[#0F0F0F] border-r border-white/5 flex flex-col h-screen sticky top-0">
      {/* CENTRAL PROFILE SECTION */}
      <div className="flex flex-col items-center justify-center py-7">
        <button
          onClick={() => navigate("/admin/profile")}
          className="w-20 h-20 rounded-full border-2 border-[#DD9735] p-1.5 shadow-[0_0_20px_rgba(221,151,53,0.2)] flex items-center justify-center bg-[#1A1A1A] hover:scale-105 transition-transform"
        >
          <User size={40} className="text-[#DD9735]" />
        </button>
        <h2 className="text-[#DD9735] text-xl font-black uppercase tracking-[0.2em] mt-4">
          Admin Panel
        </h2>
      </div>

      
      <nav className="flex-1 px-4 space-y-2">
        {" "}
      
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-5 px-8 py-3 rounded-xl transition-all relative ${
                isActive
                  ? "text-[#DD9735] bg-[#DD9735]/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={22} />
              <span className="text-l font-bold tracking-tight">
                {item.name}
              </span>
            </Link>
          );
        })}
       
        {/* <Link
          to="/admin/settings"
          className="flex items-center gap-5 px-8 py-4 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <Settings size={22} />
          <span className="text-lg font-bold tracking-tight">Settings</span>
        </Link>
         */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-5 px-8  rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-500/5 transition-all mt-4 border-t border-white/5 pt-8"
        >
          <LogOut size={22} />
          <span className="text-lg font-bold tracking-tight">Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
