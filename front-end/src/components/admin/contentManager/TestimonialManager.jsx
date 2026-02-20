import React, { useEffect, useState } from "react";
import api,{IMAGE_PATH} from "../../../api/axios";
import { Edit, Trash2, Quote, User } from "lucide-react";

const TestimonialManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
    company: "",
    visibility: "public",
    image: null,
  });

  const fetchTestimonials = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/testimony/get?page=${page}&limit=10`);
      setTestimonials(res.data.testimonials || []);
      setPagination(res.data.pagination || {});
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) data.append(key, formData[key]);
      });

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      if (editingItem) {
        await api.patch(`/testimony/edit/${editingItem._id}`, data, config);
      } else {
        await api.post(`/testimony/create`, data, config);
      }

      
      await fetchTestimonials(); 
      resetModal();
      
    } catch (err) {
      alert(err.response?.data?.error || "Action failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await api.delete(`/testimony/delete/${id}`);
      fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      email: item.email,
      content: item.content,
      company: item.company,
      visibility: item.visibility || "public",
      image: null,
    });
    setShowModal(true);
  };

  const resetModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      name: "",
      email: "",
      content: "",
      company: "",
      visibility: "public",
      image: null,
    });
  };

  const renderImage = (imgData) => {
    if (!imgData) return null;
    if (typeof imgData === "string") return imgData;   
    const base64String = btoa(
      new Uint8Array(imgData.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        "",
      ),
    );
    return `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      
      <div className="flex justify-between items-center mb-10">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-[#DD9735] text-black font-bold rounded-xl hover:bg-[#c6862d] transition-all shadow-lg"
        >
          + Add Testimony
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-6">
          <p className="text-gray-400 text-sm">Total Testimonials</p>
          <h2 className="text-2xl font-bold mt-2">{testimonials.length}</h2>
        </div>

        <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-6">
          <p className="text-gray-400 text-sm">Public</p>
          <h2 className="text-2xl font-bold mt-2">
            {testimonials.filter((t) => t.visibility === "public").length}
          </h2>
        </div>

        <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-6">
          <p className="text-gray-400 text-sm">Private</p>
          <h2 className="text-2xl font-bold mt-2">
            {testimonials.filter((t) => t.visibility === "private").length}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {testimonials.map((item) => (
          <div
            key={item._id}
            className="group bg-[#0F0F0F] border border-zinc-700 rounded-2xl p-6 flex flex-col justify-between hover:border-[#DD9735]/40 transition-all duration-300"
          >
            
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5 border border-zinc-700">
                  {item.image ? (
                    <img
                      src={`${IMAGE_PATH}/${item.image}`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      <User size={24} />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-[#DD9735] text-xs">{item.company}</p>
                  <p className="text-gray-600 text-xs">{item.email}</p>
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed line-clamp-4">
                “{item.content}”
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
              <span
                className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full ${
                  item.visibility === "public"
                    ? "bg-green-900/30 text-green-400"
                    : "bg-red-900/30 text-red-400"
                }`}
              >
                {item.visibility}
              </span>

              <div className="flex gap-5 opacity-70 group-hover:opacity-100 transition">
                <button
                  onClick={() => handleEdit(item)}
                  className="hover:text-blue-400"
                >
                  <Edit size={18} />
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="hover:text-red-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-[#111] w-full max-w-lg rounded-2xl border border-white/10 overflow-hidden">
            <div className="bg-[#0F0F0F] px-8 py-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-[#DD9735]">
                {editingItem ? "Edit Testimony" : "Create New Testimony"}
              </h2>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Client Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-[#1A1A1A] border border-white/10 p-3 rounded-xl w-full"
                    required
                  />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company/Role"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-[#1A1A1A] border border-white/10 p-3 rounded-xl w-full"
                    required
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Client Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-[#1A1A1A] border border-white/10 p-3 rounded-xl w-full"
                  required
                />

                <textarea
                  name="content"
                  placeholder="Testimonial content..."
                  rows="4"
                  value={formData.content}
                  onChange={handleChange}
                  className="bg-[#1A1A1A] border border-white/10 p-3 rounded-xl w-full"
                  required
                />

                <div className="flex gap-4 items-center">
                  <select
                    name="visibility"
                    value={formData.visibility}
                    onChange={handleChange}
                    className="bg-[#1A1A1A] border border-white/10 p-3 rounded-xl flex-1"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>

                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="text-xs file:bg-[#DD9735] file:border-0 file:px-3 file:py-1 file:rounded-md"
                  />
                </div>

                <div className="flex justify-end gap-4 pt-6">
                  <button
                    type="button"
                    onClick={resetModal}
                    className="px-6 py-2 bg-gray-800 rounded-xl"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#DD9735] text-black font-bold rounded-xl"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialManager;
