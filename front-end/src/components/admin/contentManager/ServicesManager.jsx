import React, { useEffect, useState } from "react";
import api, { IMAGE_PATH } from "../../../api/axios"; // adjust path if needed
import { Edit, Trash2 } from "lucide-react";

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  // ================= FETCH =================
  const fetchServices = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/services/get?page=${page}&limit=10`);

      setServices(res.data.services);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error("Fetch services error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
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
      if (formData.image) data.append("image", formData.image);

      if (editingService) {
        await api.put(`/services/update/${editingService._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post(`/services/create`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      resetModal();
      fetchServices();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await api.delete(`/services/delete/${id}`);
      fetchServices();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ================= EDIT =================
  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      image: null,
    });
    setShowModal(true);
  };

  const resetModal = () => {
    setShowModal(false);
    setEditingService(null);
    setFormData({ title: "", description: "", image: null });
  };

  return (
    <div>
      {/* ADD BUTTON */}
      <button
        onClick={() => setShowModal(true)}
        className="mb-6 px-5 py-2 bg-[#DD9735] text-black font-semibold rounded-lg"
      >
        Add Service
      </button>

      {/* LOADING */}
      {loading && <p className="text-gray-400">Loading...</p>}

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-[#0F0F0F] p-6 rounded-2xl border border-white/5"
          >
            <img
              src={`${IMAGE_PATH}/${service.image}`}
              alt={service.title}
              className="h-40 w-full object-cover rounded-lg mb-4"
            />

            <h3 className="text-white text-lg font-semibold">
              {service.title}
            </h3>

            <p className="text-gray-500 text-sm mt-2">{service.description}</p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleEdit(service)}
                className="text-blue-400 flex items-center gap-1"
              >
                <Edit size={16} /> Edit
              </button>

              <button
                onClick={() => handleDelete(service._id)}
                className="text-red-400 flex items-center gap-1"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#111] p-8 rounded-2xl w-[420px] border border-white/10">
            <h2 className="text-white text-xl mb-6">
              {editingService ? "Edit Service" : "Add Service"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] border border-white/10 p-3 rounded-lg"
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] border border-white/10 p-3 rounded-lg"
              />

              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full text-sm"
              />

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={resetModal}
                  className="px-4 py-2 bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-[#DD9735] text-black rounded-lg"
                >
                  {editingService ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center gap-3 mt-10">
        {Array.from(
          { length: pagination.totalPages || 1 },
          (_, i) => i + 1,
        ).map((page) => (
          <button
            key={page}
            onClick={() => fetchServices(page)}
            className="px-3 py-1 bg-[#1A1A1A] rounded"
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServicesManager;
