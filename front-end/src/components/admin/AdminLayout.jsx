import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#111111] text-gray-300 p-4 md:p-8">
      <div className="flex w-full max-w-7xl mx-auto bg-[#0A0A0A] rounded-3xl border border-white/5 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 p-10 overflow-y-auto">
          <AdminHeader />
          {/* The Manager components (Services, etc.) render here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
