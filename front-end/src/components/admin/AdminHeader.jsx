import { useLocation } from "react-router-dom";

const AdminHeader = () => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const currentTab = segments[segments.length - 1] || "Dashboard";

  return (
    <div className="flex justify-between items-center mb-10">
      <h1 className="text-3xl font-bold text-white tracking-tight capitalize">
        Manage {currentTab.replace("-", " ")}
      </h1>
      <div className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
        System Active
      </div>
    </div>
  );
};

export default AdminHeader;
