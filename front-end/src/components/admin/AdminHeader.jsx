import { useLocation } from "react-router-dom";

const AdminHeader = () => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const currentTab = segments[segments.length - 1] || "Dashboard";

  return (
    <div className="flex justify-between items-center mb-10">
      <h1 className="text-3xl font-bold text-[#DD9735] tracking-tight capitalize">
        Manage {currentTab.replace("-", " ")}
      </h1>
    </div>
  );
};

export default AdminHeader;
