import React, { useState } from "react";
import image1 from "./../assets/img1.jpg";
import image2 from "./../assets/img2.jpg";
import image3 from "./../assets/img3.jpg";
import image4 from "./../assets/img4.jpg";
import image5 from "./../assets/img5.jpg";
import image6 from "./../assets/img6.jpg";
import image from "./../assets/image.jpg";
const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [selectedArticle, setSelectedArticle] = useState(null);
const hexagons = [
  { id: 1, top: "-15%", left: "48%", rotation: "90deg" },
  { id: 2, top: "30%", left: "58%", rotation: "90deg" },
  { id: 3, top: "60%", left: "83%", rotation: "90deg" },
  { id: 4, top: "75%", left: "50%", rotation: "90deg" },
];
  const articles = [
    {
      category: "Category 1",
      title: "Article name- headline for an article",
      content: "This is a brief summary of Article 1.",
      detailedDescription: "This is the detailed description of Article 1.",
      imageUrl: image1,
    },
    {
      category: "Category 2",
      title: "Article name- headline for an article",
      content: "This is a brief summary of Article 2.",
      detailedDescription: "This is the detailed description of Article 2.",
      imageUrl: image2,
    },
    {
      category: "Category 3",
      title: "Article name- headline for an article",
      content: "This is a brief summary of Article 3.",
      detailedDescription: "This is the detailed description of Article 3.",
      imageUrl: image3,
    },
    // ... add other articles as needed
  ];

  const filteredArticles =
    activeCategory === "All Articles"
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  return (
    <div className="bg-[#000000] text-white min-h-screen pb-24 font-itim relative overflow-hidden">
   

      <div className="max-w-7xl mx-auto px-10 md:px-20 relative z-10">
        {selectedArticle ? (
          /* DETAILED ARTICLE VIEW */
          <div className="pt-20">
            <h1 className="text-[#DD9735] text-4xl mb-12 tracking-widest uppercase">
              Blog
            </h1>
            <div className="flex flex-col items-center">
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                className="w-full max-w-3xl rounded-sm mb-10 border border-[#DD9735]/20 shadow-2xl"
              />
              <h3 className="text-[#DD9735] text-3xl mb-6">
                {selectedArticle.title}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-3xl text-center">
                {selectedArticle.detailedDescription}
              </p>
              <button
                onClick={() => setSelectedArticle(null)}
                className="mt-12 text-[#DD9735] border-b border-[#DD9735] pb-1 hover:text-white hover:border-white transition-all"
              >
                &larr; Back to Articles
              </button>
            </div>
          </div>
        ) : (
          /* MAIN BLOG LIST VIEW */
          <div className="pt-20">
            <h1 className="text-[#DD9735] text-4xl mb-16 tracking-widest uppercase">
              Blog
            </h1>

            {/* Category Navigation */}
            <div className="flex flex-wrap gap-8 mb-16 border-b border-white/5 pb-4">
              {["All Articles", "Category 1", "Category 2", "Category 3"].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xl transition-all ${
                      activeCategory === cat
                        ? "text-[#DD9735] border-b-2 border-[#DD9735]"
                        : "text-gray-500 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ),
              )}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredArticles.map((article, index) => (
                <div key={index} className="flex flex-col group">
                  {/* Article Image */}
                  <div className="aspect-video overflow-hidden mb-6 border border-white/10 shadow-lg">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>

                  {/* Article Headline */}
                  <h3 className="text-[#DD9735] text-lg mb-4 leading-snug">
                    {article.title}
                  </h3>

                  {/* Read More Link Aligned Right */}
                  <div className="flex justify-end mt-auto">
                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="text-white text-xl border-b border-white hover:text-[#DD9735] hover:border-[#DD9735] transition-all"
                    >
                      Read more
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

     
      {hexagons.map((hex) => (
        <div
          key={hex.id}
          className="hexagon"
          style={{
            position: "fixed",
            top: hex.top || "auto",
            bottom: hex.bottom || "auto",
            left: hex.left,
            transform: `rotate(${hex.rotation})`,
            zIndex: 1,
            opacity: 0.2,
          }}
        >
          <img
            src={image}
            alt={`Hexagon ${hex.id}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default Blog;
