import React, { useState, useEffect } from "react";
import api, { IMAGE_PATH } from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, User, Calendar } from "lucide-react";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs/get");
        const data = Array.isArray(res.data) ? res.data : res.data.blogs || [];
        setArticles(data);
      } catch (err) {
        console.error("Error loading blogs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#DD9735] text-xs tracking-widest uppercase">
        Loading...
      </div>
    );

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-20 font-sans selection:bg-[#DD9735]/30">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <AnimatePresence mode="wait">
          {selectedArticle ? (
            /* --- STANDARDIZED DETAIL VIEW --- */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-20 flex flex-col items-center"
            >
              {/* 1. Back Button */}
              <div className="w-full max-w-xl flex justify-start mb-8">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                  <ChevronLeft size={16} /> Back to Blog
                </button>
              </div>

              {/* 2. Image at the Top */}
              <div className="w-full max-w-xl mb-10">
                <img
                  src={
                    selectedArticle.image
                      ? `${IMAGE_PATH}/${selectedArticle.image}`
                      : "https://via.placeholder.com/800x450"
                  }
                  crossOrigin="anonymous"
                  className="w-full h-auto max-h-[350px] object-cover rounded-lg border border-white/10 shadow-lg"
                  alt={selectedArticle.title}
                />
              </div>

              {/* 3. Title & Meta Section (Aligned to image start) */}
              <header className="max-w-xl w-full text-left space-y-4 mb-10">
                <p className="text-[#DD9735] text-[11px] font-bold tracking-[0.2em] uppercase">
                  {selectedArticle.category || "Insight"}
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  {selectedArticle.title}
                </h1>
                {/* Author and Date below Title */}
                <div className="flex items-center gap-4 text-gray-500 text-sm pt-2">
                  <span className="flex items-center gap-1.5">
                    <User size={14} className="text-[#DD9735]" />{" "}
                    {selectedArticle.author || "Admin"}
                  </span>
                  <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-[#DD9735]" />{" "}
                    {new Date(selectedArticle.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </header>

              {/* 4. Content Body */}
              <article className="max-w-xl w-full text-left">
                <p className="text-gray-300 leading-relaxed text-[17px] whitespace-pre-wrap font-normal">
                  {selectedArticle.content}
                </p>
              </article>
            </motion.div>
          ) : (
            /* --- NORMAL 3-COLUMN GRID --- */
            <div className="pt-20">
              <div className="text-center mb-16 space-y-3">
                {/* <h2 className="text-[#DD9735] text-2xl  uppercase font-bold">
                  Blog Posts
                </h2> */}
                <h2 className="text-4xl bg-gradient-to-r from-[#DD9735] to-[#f9d423] bg-clip-text text-transparent font-bold">
                  Latest Blogs
                </h2>
                <p className="text-gray-500 text-md max-w-lg mx-auto">
                  Latest updates and insights from our team.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <article
                    key={article._id}
                    className="flex flex-col group border border-white/5 bg-white/[0.01] p-4 rounded-xl hover:bg-white/[0.03] transition-all duration-300"
                  >
                    <div
                      className="relative aspect-video w-full overflow-hidden rounded-lg mb-5 cursor-pointer"
                      onClick={() => setSelectedArticle(article)}
                    >
                      <img
                        src={article.image && `${IMAGE_PATH}/${article.image}`}
                        alt={article.title}
                        loading="lazy"
                        crossOrigin="anonymous"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-col flex-1">
                      <p className="text-[#DD9735] text-[10px] font-bold tracking-widest uppercase mb-2">
                        {new Date(article.createdAt).toLocaleDateString()}
                      </p>
                      <h3
                        className="text-lg font-bold mb-3 group-hover:text-[#DD9735] transition-colors cursor-pointer line-clamp-2 leading-normal py-1"
                        onClick={() => setSelectedArticle(article)}
                      >
                        {article.title}
                      </h3>
                      <p className="text-gray-400 text-[14px] leading-relaxed line-clamp-3 mb-5 font-normal">
                        {article.content}
                      </p>
                      <button
                        onClick={() => setSelectedArticle(article)}
                        className="mt-auto flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider group-hover:text-[#DD9735] transition-colors"
                      >
                        Read More <ArrowRight size={14} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Blog;
