import React from "react";
import AdminLayout from "../components/admin/AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout activeTab="dashboard">
      {(activeTab) => (
        <div className="text-gray-400">
        
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
