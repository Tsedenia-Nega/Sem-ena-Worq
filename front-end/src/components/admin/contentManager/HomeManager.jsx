import React, { useEffect, useState } from "react";
import {
  Trash2,
  Eye,
  Mail,
  Calendar,
  User,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import api from "../../../api/axios";

const HomeManager = () => {
  // Initialize as empty array to prevent .length errors
  const [contacts, setContacts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchContacts = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
     
      const response = await api.get(
        `/contacts/getContacts?page=${page}&limit=8`,
      );

      
      const fetchedMessages = response.data?.data || [];
      const fetchedPagination = response.data?.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
      };

      // 3. Update state
      setContacts(fetchedMessages);
      setPagination(fetchedPagination);
    } catch (err) {
      if (err.response?.status === 401) {
       
        alert("Session expired. Please login again.");
        window.location.href = "/management-portal-xyz/login";
        return;
      }
      setError(
        err.response?.data?.message || "Session expired login again.",
      );
      setContacts([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await api.delete(`/contacts/${id}`);
        setContacts((prev) => prev.filter((c) => c._id !== id));
      } catch (err) {
        alert("Failed to delete message");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white p-4 md:p-8 font-itim">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="bg-[#DD9735] px-6 py-2 rounded-lg shadow-lg">
            <span className="text-white font-bold">
              Total Items: {pagination.totalItems || 0}
            </span>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-500">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        {/* Table Container */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-zinc-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100 dark:bg-zinc-800/50 text-[#DD9735] text-xs uppercase tracking-widest font-bold">
                  <th className="p-5">User Details</th>
                  <th className="p-5">Subject</th>
                  <th className="p-5">Sent Date</th>
                  <th className="p-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="p-20 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-4 border-[#DD9735] border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-gray-500">
                          Fetching messages...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : contacts?.length > 0 ? (
                  contacts.map((contact) => (
                    <tr
                      key={contact._id}
                      className="hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-all group"
                    >
                      <td className="p-5">
                        <div className="font-bold">
                          {contact.firstName} {contact.lastName}
                        </div>
                        <div className="text-xs text-gray-400 font-sans">
                          {contact.email}
                        </div>
                      </td>
                      <td className="p-5 font-sans text-sm italic text-gray-600 dark:text-gray-400">
                        {contact.subject}
                      </td>
                      <td className="p-5 text-sm font-sans opacity-70">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-5">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => setSelectedMessage(contact)}
                            className="p-2 bg-blue-500/10 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-all"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(contact._id)}
                            className="p-2 bg-red-500/10 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-20 text-center text-gray-500 italic"
                    >
                      No contact messages found in the database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {contacts?.length > 0 && (
            <div className="p-5 bg-gray-50 dark:bg-zinc-800/20 border-t border-gray-100 dark:border-zinc-800 flex justify-between items-center">
              <button
                disabled={pagination.currentPage === 1}
                onClick={() => fetchContacts(pagination.currentPage - 1)}
                className="px-4 py-2 text-sm font-bold bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-lg disabled:opacity-30 transition-all hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="text-xs uppercase tracking-widest font-bold text-gray-500">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                disabled={pagination.currentPage === pagination.totalPages}
                onClick={() => fetchContacts(pagination.currentPage + 1)}
                className="px-4 py-2 text-sm font-bold bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-lg disabled:opacity-30 transition-all hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
            {/* Top Header - Sleeker & Slimmer */}
            <div className="bg-[#DD9735] px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageSquare size={18} className="text-black" />
                <h3 className="text-black font-bold uppercase tracking-widest text-sm">
                  Inquiry Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-black hover:bg-black/10 p-1 rounded-full transition-colors"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              {/* Info Grid: Name, Email, Date */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-zinc-100 dark:border-zinc-800 pb-6">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase text-[#DD9735] font-bold tracking-widest">
                    From
                  </p>
                  <p className="text-sm font-semibold truncate flex items-center gap-2">
                    {selectedMessage.firstName} {selectedMessage.lastName}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase text-[#DD9735] font-bold tracking-widest">
                    Email
                  </p>
                  <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 truncate">
                    {selectedMessage.email}
                  </p>
                </div>
                <div className="space-y-1 md:text-right">
                  <p className="text-[10px] uppercase text-[#DD9735] font-bold tracking-widest">
                    Received
                  </p>
                  <p className="text-sm font-medium text-zinc-500">
                    {new Date(selectedMessage.createdAt).toLocaleDateString(
                      undefined,
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>

              {/* Subject Header */}
              <div className="space-y-1">
                <p className="text-[10px] uppercase text-zinc-400 font-bold tracking-widest">
                  Subject
                </p>
                <h4 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
                  {selectedMessage.subject || "No Subject Provided"}
                </h4>
              </div>

              {/* The Message Content - Now constrained and professional */}
              <div className="space-y-2">
                <p className="text-[10px] uppercase text-zinc-400 font-bold tracking-widest">
                  Message Content
                </p>
                <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-md p-5 border border-zinc-100 dark:border-zinc-800">
                  <div className="max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans text-[15px] whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-8 py-4 bg-zinc-50 dark:bg-zinc-800/30 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                className="text-[#DD9735] hover:text-[#B37216] text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
              >
                <Mail size={14} /> Reply via Email
              </a>
              <button
                onClick={() => setSelectedMessage(null)}
                className="bg-[#DD9735] hover:bg-[#B37216] text-black font-bold px-6 py-2 rounded text-xs uppercase tracking-widest transition-all shadow-md active:scale-95"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeManager;
