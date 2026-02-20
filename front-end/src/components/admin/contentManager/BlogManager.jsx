import React, { useEffect, useState } from "react";
import api, { IMAGE_PATH } from "../../../api/axios";
import { Edit, Trash2, Plus, AlertCircle } from "lucide-react";

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    status: "published",
    author: "Admin",
    tags: "",
    image: null,
  });

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/blogs/get/admin");
      setBlogs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.response?.data?.error || "Failed to fetch blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEditClick = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || "",
      content: blog.content || "",
      category: blog.category || "",
      status: blog.status || "published",
      author: blog.author || "Admin",
      tags: blog.tags || "general",
      image: null, // Keep this null during edit unless a new file is picked
    });
    setPreview(`${IMAGE_PATH}/${blog.image}`);
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the actual file
    if (file) {
      setFormData((prev) => ({ ...prev, image: file })); // Store it in state
      setPreview(URL.createObjectURL(file)); // For UI preview
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!editingBlog && !formData.image) {
    alert("Please select an image");
    return;
  }

  const data = new FormData();
  data.append("title", formData.title);
  data.append("content", formData.content);
  data.append("category", formData.category);
  data.append("status", formData.status);
  data.append("author", formData.author);
  data.append("tags", formData.tags);

  if (formData.image instanceof File) {
    data.append("image", formData.image);
  }

  try {
    const config = {
      headers: {
       
        "Content-Type": "multipart/form-data",
      },
    };

    if (editingBlog) {
      await api.patch(`/blogs/edit/${editingBlog._id}`, data, config);
    } else {
      await api.post("/blogs/create", data, config);
    }

    resetModal();
    fetchBlogs();
    alert("Success!");
  } catch (err) {
    console.error("SUBMIT ERROR:", err.response?.data);
    alert(err.response?.data?.error || "Error");
  }
};

  const resetModal = () => {
    setShowModal(false);
    setEditingBlog(null);
    setPreview(null);
    setFormData({
      title: "",
      content: "",
      category: "",
      status: "published",
      author: "Admin",
      tags: "general",
      image: null,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/blogs/delete/${id}`);
      fetchBlogs();
    } catch (err) {
      alert(err.response?.data?.error || "Delete failed");
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#DD9735] text-black px-5 py-2.5 rounded-xl font-bold hover:scale-105 transition-all"
        >
          <Plus size={18} /> New Post
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 p-4 rounded-xl flex gap-2 text-red-400 items-center">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      <div className="bg-[#0A0A0A] rounded-2xl border border-white/5 overflow-hidden shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/5">
            <tr className="text-gray-400 text-[10px] uppercase tracking-[0.2em]">
              <th className="p-5">Article</th>
              <th className="p-5 text-center">Category</th>
              <th className="p-5 text-center">Status</th>
              <th className="p-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {blogs.map((blog) => (
              <tr
                key={blog._id}
                className="hover:bg-white/[0.02] transition-colors"
              >
                <td className="p-5 flex items-center gap-4">
                  <img
                    src={`${IMAGE_PATH}/${blog.image}`}
                    className="w-12 h-12 object-cover rounded-lg border border-white/10"
                    alt=""
                    onError={(e) => (e.target.src = "https://placehold.co/100")}
                  />
                  <span className="text-white font-medium">{blog.title}</span>
                </td>
                <td className="p-5 text-center text-gray-400">
                  {blog.category || "Uncategorized"}
                </td>
                <td className="p-5 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${blog.status === "published" ? "bg-green-500/10 text-green-400" : "bg-gray-500/10 text-gray-400"}`}
                  >
                    {blog.status}
                  </span>
                </td>
                <td className="p-5 text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => handleEditClick(blog)}
                      className="text-gray-400 hover:text-[#DD9735] transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
          <div className="bg-[#0F0F0F] border border-white/10 p-8 rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-[#DD9735] font-black uppercase tracking-widest text-xl mb-6">
              {editingBlog ? "Edit Article" : "Create Article"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-[#DD9735]"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    Category
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-[#DD9735]"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    Status
                  </label>
                  <select
                    className="w-full p-4 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-[#DD9735]"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. tech, health, news"
                  className="w-full p-4 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-[#DD9735]"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  Content
                </label>
                <textarea
                  rows="4"
                  className="w-full p-4 bg-black/40 border border-white/5 rounded-xl text-white outline-none focus:border-[#DD9735]"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  Image
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    className="text-xs text-gray-500 file:bg-white/5 file:border-0 file:text-white file:px-4 file:py-2 file:rounded-lg file:mr-4"
                    onChange={handleFileChange}
                  />
                  {preview && (
                    <img
                      src={preview}
                      className="w-16 h-16 object-cover rounded-lg border border-white/10"
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={resetModal}
                  className="text-gray-500 font-bold uppercase text-xs tracking-widest hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#DD9735] text-black px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-[#DD9735]/20"
                >
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManager;
