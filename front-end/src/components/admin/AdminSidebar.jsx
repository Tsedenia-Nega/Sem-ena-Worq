import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  Briefcase,
  Star,
  Layers,
  LogOut,
  User,
} from "lucide-react";

const navItems = [
  { name: "Home Content", path: "/admin/home", icon: Home },
  { name: "Services", path: "/admin/services", icon: Briefcase },
  { name: "Blog", path: "/admin/blog", icon: FileText },
  { name: "Portfolios", path: "/admin/portfolios", icon: Layers },
  { name: "Testimonial", path: "/admin/testimonials", icon: Star },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#0F0F0F] border-r border-white/5 py-8 flex flex-col">
      <div className="px-8 mb-12">
        <div className="w-14 h-14 rounded-full border-2 border-[#DD9735] p-1 shadow-[0_0_15px_rgba(221,151,53,0.3)] flex items-center justify-center bg-[#1A1A1A]">
          <User size={30} className="text-[#DD9735]" />
        </div>
        <p className="text-[#DD9735] mt-3 text-xs font-bold uppercase tracking-widest">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`w-full flex items-center gap-4 px-8 py-3 transition-all relative ${
                isActive
                  ? "text-[#DD9735] bg-gradient-to-r from-[#DD9735]/10 to-transparent"
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 w-1 h-full bg-[#DD9735] shadow-[0_0_10px_#DD9735]" />
              )}
              <Icon size={20} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-8 mt-6">
        <button className="flex items-center gap-3 text-gray-500 hover:text-red-500 transition-colors">
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
