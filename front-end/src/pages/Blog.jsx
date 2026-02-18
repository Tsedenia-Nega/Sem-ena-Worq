import React, { useState, useEffect } from "react";
import api, { IMAGE_PATH } from "../api/axios"; // 1. Import IMAGE_PATH
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, ArrowRight, ChevronLeft } from "lucide-react";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Articles");
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

  const filteredArticles =
    activeCategory === "All Articles"
      ? articles
      : articles.filter(
          (art) =>
            art.tags?.includes(activeCategory) ||
            art.category === activeCategory,
        );

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-[#DD9735] tracking-widest uppercase">
        Loading Journal...
      </div>
    );

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-24 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <AnimatePresence mode="wait">
          {selectedArticle ? (
            /* --- FULL ARTICLE VIEW --- */
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="pt-20 max-w-4xl mx-auto"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="flex items-center gap-2 text-gray-500 hover:text-[#DD9735] transition-colors mb-8 group"
              >
                <ChevronLeft
                  size={20}
                  className="group-hover:-translate-x-1 transition-transform"
                />{" "}
                Back to Journal
              </button>

              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4 text-[#DD9735] text-sm tracking-widest uppercase">
                  <span>{selectedArticle.category || "Insight"}</span>
                  <span className="w-10 h-[1px] bg-[#DD9735]/30"></span>
                  <span>
                    {new Date(selectedArticle.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  {selectedArticle.title}
                </h1>
                <div className="flex items-center gap-6 text-gray-400 text-sm">
                  <div className="flex items-center gap-2">
                    <User size={16} /> {selectedArticle.author || "Admin"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} /> 5 min read
                  </div>
                </div>
              </div>

              {/* 2. Simplified Image for Full View */}
              <img
                src={
                  selectedArticle.image
                    ? `${IMAGE_PATH}/${selectedArticle.image}`
                    : "https://via.placeholder.com/1200x600?text=No+Image"
                }
                crossOrigin="anonymous"
                className="w-full h-[400px] object-cover rounded-3xl mb-12 border border-white/10 shadow-2xl"
                alt={selectedArticle.title}
              />

              <div className="prose prose-invert prose-orange max-w-none">
                <p className="text-xl text-gray-300 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-[#DD9735] first-letter:mr-3 first-letter:float-left">
                  {selectedArticle.content}
                </p>
              </div>
            </motion.div>
          ) : (
            /* --- BLOG LIST VIEW --- */
            <div className="pt-20">
              {/* Header and Categories omitted for brevity, keep your existing code here */}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mt-16">
                {filteredArticles.map((article) => (
                  <article key={article._id} className="group flex flex-col">
                    <div
                      className="relative h-64 overflow-hidden rounded-2xl mb-6 cursor-pointer"
                      onClick={() => setSelectedArticle(article)}
                    >
                      {/* 3. Simplified Image for Grid Cards */}
                      <img
                        src={
                          article.image
                            && `${IMAGE_PATH}/${article.image}`
                        }
                        alt={article.title}
                        loading="lazy"
                        crossOrigin="anonymous"
                        className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
                        
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    <div className="flex items-center gap-3 text-[#DD9735] text-[10px] tracking-[0.2em] uppercase mb-4">
                      <span>
                        {new Date(article.createdAt).toLocaleDateString()}
                      </span>
                      <span className="w-4 h-[1px] bg-[#DD9735]"></span>
                      <span>{article.category || "Article"}</span>
                    </div>

                    <h3
                      className="text-2xl font-bold mb-4 line-clamp-2 group-hover:text-[#DD9735] transition-colors cursor-pointer"
                      onClick={() => setSelectedArticle(article)}
                    >
                      {article.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6">
                      {article.content}
                    </p>

                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="mt-auto flex items-center gap-2 text-white font-bold text-sm group-hover:gap-4 transition-all"
                    >
                      READ MORE{" "}
                      <ArrowRight size={16} className="text-[#DD9735]" />
                    </button>
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
