import React from "react";
import AdminLayout from "../components/admin/AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout activeTab="dashboard">
      {(activeTab) => (
        <div className="text-gray-400">
          {/* Your dynamic content per tab goes here */}
          {/* Content for {activeTab} */}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
