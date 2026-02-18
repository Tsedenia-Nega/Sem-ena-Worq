import React, { useState, useEffect } from "react";
import api from "../api/axios";
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
        // Ensure we handle different response shapes
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

  const filteredArticles = activeCategory === "All Articles"
    ? articles
    : articles.filter((art) => art.tags?.includes(activeCategory) || art.category === activeCategory);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-[#DD9735] tracking-widest uppercase">Loading Journal...</div>;

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-24 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <AnimatePresence mode="wait">
          {selectedArticle ? (
            /* --- FULL ARTICLE VIEW (Professional Reader) --- */
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

              <img
                src={
                  selectedArticle.image ||
                  "https://via.placeholder.com/1200x600?text=No+Image"
                }
                className="w-full h-[400px] object-cover rounded-3xl mb-12 border border-white/10 shadow-2xl"
                alt="header"
              />

              <div className="prose prose-invert prose-orange max-w-none">
                <p className="text-xl text-gray-300 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-[#DD9735] first-letter:mr-3 first-letter:float-left">
                  {selectedArticle.content}
                </p>
              </div>
            </motion.div>
          ) : (
            /* --- BLOG LIST VIEW (Editorial Grid) --- */
            <div className="pt-20">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div>
                  <h1 className="text-[#DD9735] text-sm tracking-[0.5em] uppercase mb-4">
                    Our Journal
                  </h1>
                  <h2 className="text-5xl font-bold">Latest Insights.</h2>
                </div>

                {/* Modern Category Pills */}
                <div className="flex flex-wrap gap-3">
                  {["All Articles", "Tech", "Design", "Strategy"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest border transition-all ${
                        activeCategory === cat
                          ? "bg-[#DD9735] border-[#DD9735] text-black"
                          : "border-white/10 text-gray-400 hover:border-[#DD9735]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {filteredArticles.map((article) => (
                  <article key={article._id} className="group flex flex-col">
                    <div
                      className="relative h-64 overflow-hidden rounded-2xl mb-6 cursor-pointer"
                      onClick={() => setSelectedArticle(article)}
                    >
                      <img
                        src={(() => {
                          if (!article.image)
                            return "https://via.placeholder.com/800x600?text=No+Data+Found";

                          // Check if the image is the MongoDB Buffer Object
                          if (
                            typeof article.image === "object" &&
                            article.image.data
                          ) {
                            // This converts the array of numbers directly into a usable Blob URL
                            const uint8Array = new Uint8Array(
                              article.image.data,
                            );
                            const blob = new Blob([uint8Array], {
                              type: "image/webp",
                            });
                            return URL.createObjectURL(blob);
                          }

                          // If it's already a string, ensure it has the prefix
                          if (typeof article.image === "string") {
                            return article.image.startsWith("data:")
                              ? article.image
                              : `data:image/webp;base64,${article.image}`;
                          }

                          return "https://via.placeholder.com/800x600?text=Invalid+Format";
                        })()}
                        alt={article.title}
                        onLoad={() =>
                          console.log(
                            `Image loaded successfully for: ${article.title}`,
                          )
                        }
                        onError={(e) =>
                          console.error(
                            `Image failed for: ${article.title}. Source was:`,
                            e.target.src.substring(0, 100),
                          )
                        }
                        className="w-full h-full object-cover rounded-2xl"
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