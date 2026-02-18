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
    tags: "general",
    image: null,
  });

  
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/blogs/get/admin"); // admin fetch
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
      image: null,
    });

    // preview existing image
    setPreview(`${IMAGE_PATH}/${blog.image}`);

    setShowModal(true);
  };

  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append all fields
    ["title", "content", "category", "status", "author", "tags"].forEach(
      (field) => {
        data.append(field, formData[field]);
      },
    );

    // Append image only if user selected a new file
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }

    try {
      if (editingBlog) {
        await api.patch(`/blogs/edit/${editingBlog._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

      } else {
        if (!formData.image)
          return alert("Please select an image for the new post");
        await api.post("/blogs/create", data);
      }

      resetModal();
      fetchBlogs();
    } catch (err) {
      console.error("BACKEND ERROR:", err.response?.data);
      alert(
        `Error: ${err.response?.data?.error || "Check console for details"}`,
      );
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

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await api.delete(`/blogs/delete/${id}`);
      fetchBlogs();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white uppercase">
          Blog Manager
        </h2>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#DD9735] px-5 py-2.5 rounded-xl font-bold"
        >
          <Plus size={18} /> New Post
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-500/10 p-4 rounded-xl flex gap-2 text-red-400">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="bg-[#0A0A0A] rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/5">
            <tr className="text-gray-400 text-xs uppercase tracking-widest">
              <th className="p-5">Article</th>
              <th className="p-5 text-center">Category</th>
              <th className="p-5 text-center">Status</th>
              <th className="p-5 text-center">Author</th>
              <th className="p-5 text-center">Tags</th>
              <th className="p-5 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5 text-sm">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-5 flex items-center gap-4">
                    <img
                      src={`${IMAGE_PATH}/${blog.image}`}
                      className="w-12 h-12 object-cover rounded-lg border border-white/10"
                      alt=""
                      onError={(e) =>
                        (e.target.src = "https://placehold.co/100")
                      }
                    />
                    <div>
                      <p className="text-white font-medium">{blog.title}</p>
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    {blog.category || "Uncategorized"}
                  </td>
                  <td className="p-5 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        blog.status === "published"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-gray-500/10 text-gray-400"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td className="p-5 text-center">{blog.author}</td>
                  <td className="p-5 text-center">{blog.tags}</td>
                  <td className="p-5 text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleEditClick(blog)}
                        className="text-gray-400 hover:text-[#DD9735] transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-10 text-center text-gray-500">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center">
          <div className="bg-[#0F0F0F] p-6 rounded-2xl w-full max-w-2xl">
            <h3 className="text-[#DD9735] font-bold mb-4">
              {editingBlog ? "Edit Blog" : "Create Blog"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                className="w-full p-3 bg-black/40 rounded-xl"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />

              <input
                type="text"
                placeholder="Category"
                className="w-full p-3 bg-black/40 rounded-xl"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
           
              <textarea
                rows="4"
                placeholder="Content"
                className="w-full p-3 bg-black/40 rounded-xl"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                required
              />

              {/* IMAGE */}
              <input type="file" onChange={handleFileChange} />

              {preview && (
                <img
                  src={preview}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={resetModal}>
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-[#DD9735] px-6 py-2 rounded-xl"
                >
                  Save
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
