import React, { useState } from "react";
import {
  Home,
  FileText,
  Briefcase,
  Star,
  Layers,
  LogOut,
  Plus,
  ChevronRight,
  User,
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Services");

  // Updated Navigation Items
  const navItems = [
    { name: "Home Content", icon: <Home size={20} /> },
    { name: "Services", icon: <Briefcase size={20} /> },
    { name: "Blog", icon: <FileText size={20} /> },
    { name: "Portfolios", icon: <Layers size={20} /> },
    { name: "Testimonial", icon: <Star size={20} /> },
    { name: "Logout", icon: <LogOut size={20} /> },
  ];

  const portfolioItems = [
    { title: "Nano Banana", sub: "Golden Helix Study", type: "study" },
    { title: "Banana Energy Drink", sub: "Opck Design", type: "design" },
    { title: "Rack Dkere", sub: "Golden Project", type: "gold" },
    { title: "Fanana Enrgy Dnicer", sub: "Study", type: "design" },
    { title: "Digital Farming", sub: "AI Yield Optimization", type: "dark" },
  ];

  return (
    <div className="flex min-h-screen bg-[#111111] text-gray-300 font-sans p-4 md:p-8">
      {/* Main Container */}
      <div className="flex w-full max-w-7xl mx-auto bg-[#0A0A0A] rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.7)] border border-white/5">
        {/* SIDEBAR */}
        <aside className="w-64 bg-[#0F0F0F] border-r border-white/5 py-8 flex flex-col">
          {/* TOP LEFT: Profile Circle */}
          <div className="px-8 mb-12">
            <div className="w-14 h-14 rounded-full border-2 border-[#DD9735] p-1 shadow-[0_0_15px_rgba(221,151,53,0.3)] flex items-center justify-center overflow-hidden bg-[#1A1A1A]">
              <User size={30} className="text-[#DD9735]" />
              {/* If you have an actual image: <img src={profileImg} className="rounded-full object-cover" /> */}
            </div>
            <p className="text-[#DD9735] mt-3 text-xs font-bold uppercase tracking-widest">
              Admin Panel
            </p>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-4 px-8 py-3 transition-all relative ${
                  activeTab === item.name
                    ? "text-[#DD9735] bg-gradient-to-r from-[#DD9735]/10 to-transparent"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                }`}
              >
                {activeTab === item.name && (
                  <div className="absolute left-0 w-1 h-full bg-[#DD9735] shadow-[0_0_12px_#DD9735]" />
                )}
                <span
                  className={
                    activeTab === item.name ? "text-[#DD9735]" : "text-gray-500"
                  }
                >
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.name}</span>
                {item.name === "Blog" && (
                  <ChevronRight size={14} className="ml-auto opacity-50" />
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-10 relative overflow-y-auto">
          {/* Header Action Row */}
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Manage {activeTab}
            </h1>
            <button className="px-6 py-2 border border-[#DD9735] text-[#DD9735] rounded-lg text-sm font-semibold hover:bg-[#DD9735] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(221,151,53,0.1)]">
              Add {activeTab === "Home Content" ? "Section" : "Post"}
            </button>
          </div>

          {/* Section: Sub-items/Status */}
          <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex-shrink-0 text-center">
                <div className="w-16 h-16 rounded-xl bg-[#1A1A1A] border border-white/10 mb-2 overflow-hidden hover:border-[#DD9735]/50 transition-colors cursor-pointer">
                  <img
                    src={`https://picsum.photos/seed/${i + 40}/100`}
                    alt="thumb"
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-100"
                  />
                </div>
                <p className="text-[10px] text-gray-500">Draft {i}</p>
              </div>
            ))}
          </div>

          {/* Portfolio Grid Layout */}
          <section>
            <h2 className="text-xl font-medium text-gray-400 mb-6 uppercase tracking-[0.2em]">
              Recent {activeTab}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Highlight Featured Card */}
              <div className="col-span-1 lg:col-span-1 h-44 rounded-2xl border-2 border-[#DD9735]/40 bg-gradient-to-br from-[#DD9735]/20 to-black overflow-hidden relative group cursor-pointer">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10" />
                <img
                  src="https://picsum.photos/seed/admin/400/200"
                  className="absolute inset-0 w-full h-full object-cover"
                  alt=""
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <p className="text-[10px] font-bold text-[#DD9735] uppercase tracking-widest bg-black/60 px-2 py-1 rounded">
                    Featured
                  </p>
                </div>
              </div>

              {portfolioItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border border-white/5 flex flex-col justify-between h-44 transition-all hover:translate-y-[-4px] hover:border-[#DD9735]/40 cursor-pointer ${
                    item.type === "gold" ? "bg-[#DD9735]/5" : "bg-[#0F0F0F]"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-white font-semibold text-lg">
                        {item.title}
                      </h3>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#DD9735]" />
                        <div className="w-2 h-2 rounded-full bg-gray-700" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{item.sub}</p>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase text-gray-600 tracking-widest">
                    <span>Last edited: 2 days ago</span>
                    <ChevronRight size={16} className="text-[#DD9735]" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Floating Action Button */}
          <div className="absolute bottom-10 right-10 flex flex-col items-center gap-2 group">
            <button className="w-16 h-16 bg-black border-2 border-[#DD9735] text-[#DD9735] rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(221,151,53,0.4)] hover:scale-110 active:scale-95 transition-all">
              <Plus size={36} strokeWidth={2.5} />
            </button>
            <span className="text-[#DD9735] text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              New Project
            </span>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
