import React, { useEffect, useState } from "react";
import api, { IMAGE_PATH } from "../../../api/axios";
import { Edit, Trash2 } from "lucide-react";

const PortfolioManager = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    visibility: "public",
    image: null,
  });

  // ================= FETCH =================
  const fetchPortfolios = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/portfolio/get?page=${page}&limit=10`);
      setPortfolios(res.data.portfolios || []);
      setPagination(res.data.pagination || {});
    } catch (err) {
      console.error("Fetch portfolio error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  // ================= INPUT =================
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ================= CREATE / UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("tags", formData.tags);
      data.append("visibility", formData.visibility);

      if (formData.image instanceof File) {
        data.append("image", formData.image);
      }

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      if (editingPortfolio) {
        await api.put(
          `/portfolio/update/${editingPortfolio._id}`,
          data,
          config,
        );
      } else {
        await api.post(`/portfolio/create`, data, config);
      }

      resetModal();
      fetchPortfolios();
    } catch (err) {
      console.error("Submit error:", err);
      alert(err.response?.data?.error || "Submission failed");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this portfolio item?")) return;
    try {
      await api.delete(`/portfolio/delete/${id}`);
      fetchPortfolios();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setEditingPortfolio(item);
    setFormData({
      title: item.title,
      description: item.description,
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : item.tags,
      visibility: item.visibility || "public",
      image: null,
    });
    setShowModal(true);
  };

  const resetModal = () => {
    setShowModal(false);
    setEditingPortfolio(null);
    setFormData({
      title: "",
      description: "",
      tags: "",
      visibility: "public",
      image: null,
    });
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <button
        onClick={() => setShowModal(true)}
        className="mb-6 px-5 py-2 bg-[#DD9735] text-black font-semibold rounded-lg hover:bg-[#c6862d] transition-colors"
      >
        Add Portfolio
      </button>

      {loading && <p className="text-gray-400">Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((item) => (
          <div
            key={item._id}
            className="relative group bg-[#0F0F0F] p-6 rounded-2xl border border-white/20 flex flex-col shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-white/30 hover:shadow-[#DD9735]/10"
          >
            {/* 1. Visibility Badge (Now Absolute so it doesn't push the title) */}
            <span
              className={`absolute top-4 right-4 z-10 text-[10px] uppercase font-bold px-2 py-1 rounded shadow-md ${
                item.visibility === "public"
                  ? "bg-green-900/30 text-green-400"
                  : "bg-red-900/30 text-red-400"
              }`}
            >
              {item.visibility}
            </span>

            {/* 2. Image Container */}
            <div className="overflow-hidden rounded-lg mb-4">
              <img
                src={`${IMAGE_PATH}/${item.image}`}
                alt={item.title}
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* 3. Title - Now has full width of the container */}
            <div className="mb-2">
              <h3 className="text-white text-lg font-semibold leading-tight">
                {item.title}
              </h3>
            </div>

            {/* 4. Tags Section */}
            <div className="flex flex-wrap gap-2 mb-4">
              {(Array.isArray(item.tags)
                ? item.tags
                : item.tags?.split(",") || []
              ).map(
                (tag, idx) =>
                  tag.trim() && (
                    <span
                      key={idx}
                      className="text-[10px] bg-white/5 text-gray-400 px-2 py-1 rounded border border-white/10"
                    >
                      {tag.trim()}
                    </span>
                  ),
              )}
            </div>

            <p className="text-gray-500 text-sm line-clamp-2 mb-4">
              {item.description}
            </p>

            {/* 5. Buttons Section */}
            <div className="mt-auto pt-4 flex gap-6 border-t border-white/5">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-400 flex items-center gap-1 text-sm hover:text-blue-300 transition-colors"
              >
                <Edit size={14} /> Edit
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-400 flex items-center gap-1 text-sm hover:text-red-300 transition-colors"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-[#111] p-8 rounded-2xl w-full max-w-[480px] border border-white/10 text-white shadow-2xl">
            <h2 className="text-xl mb-6 font-bold text-[#DD9735]">
              {editingPortfolio ? "Edit Project" : "Add Project"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-gray-500 font-bold ml-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Project Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] border border-white/10 p-3 rounded-lg focus:outline-none focus:border-[#DD9735] text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase text-gray-500 font-bold ml-1">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Tell us about the project..."
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] border border-white/10 p-3 rounded-lg focus:outline-none focus:border-[#DD9735] text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase text-gray-500 font-bold ml-1">
                  Tags (Comma Separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  placeholder="React, Node.js, Tailwind..."
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] border border-white/10 p-3 rounded-lg focus:outline-none focus:border-[#DD9735] text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase text-gray-500 font-bold ml-1">
                  Visibility
                </label>
                <select
                  name="visibility"
                  value={formData.visibility}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] border border-white/10 p-3 rounded-lg focus:outline-none text-white"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase text-gray-500 font-bold ml-1">
                  Thumbnail Image
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#DD9735] file:text-black hover:file:bg-[#c6862d] transition-all"
                />
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={resetModal}
                  className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-[#DD9735] text-black font-bold rounded-lg shadow-lg shadow-[#DD9735]/20"
                >
                  {editingPortfolio ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {pagination.totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-10">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => fetchPortfolios(page)}
                className={`px-4 py-2 rounded font-bold transition-all ${
                  pagination.page === page
                    ? "bg-[#DD9735] text-black scale-110"
                    : "bg-[#1A1A1A] text-white hover:bg-white/10"
                }`}
              >
                {page}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default PortfolioManager;
