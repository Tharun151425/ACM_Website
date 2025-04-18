import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import images from './img.json';

// Your color theme
const colors = {
  midnightIndigo: "#0A1128",
  deepNavyBlue: "#001F54",
  oceanicBlue: "#034078", 
  electricAzure: "#0466C8",
  tealSky: "#1282A2",
  porcelainWhite: "#FEFCFB"
};

// Sample categories - replace with your actual categories
const categories = [
  "All", "Hackathons", "Workshops", "Activities", "Competitions", "Seminars"
];

// Sample image data - replace with your actual data
const sampleImages = [
    { id: 1, src: images.img1, alt: "Hackathon 2024", category: "Hackathons" },
    { id: 2, src: images.img2, alt: "Python Workshop", category: "Workshops" },
    { id: 3, src: images.img3, alt: "Code Rush", category: "Competitions" },
    { id: 4, src: images.img4, alt: "Team Building", category: "Activities" },
    { id: 5, src: images.img5, alt: "ML Workshop", category: "Workshops" },
    { id: 6, src: images.img6, alt: "Industry Talk", category: "Seminars" },
  ];

const InteractiveGridGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredImages, setFilteredImages] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Filter images based on selected category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredImages(sampleImages);
    } else {
      setFilteredImages(sampleImages.filter(img => img.category === selectedCategory));
    }
  }, [selectedCategory]);

  // Toggle dark/light mode
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  
  // Dynamic styles based on theme
  const theme = {
    bg: isDarkMode ? colors.midnightIndigo : colors.porcelainWhite,
    text: isDarkMode ? colors.porcelainWhite : colors.midnightIndigo,
    accent: colors.electricAzure,
    secondary: isDarkMode ? colors.tealSky : colors.oceanicBlue,
  };

  return (
    <div className="w-full" style={{ backgroundColor: theme.bg, color: theme.text }}>
      {/* Gallery Container */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Header with mode toggle */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">ACM RVCE Gallery</h2>
          <button 
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg"
            style={{ backgroundColor: theme.accent, color: colors.porcelainWhite }}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                selectedCategory === category ? 'font-bold scale-105' : ''
              }`}
              style={{ 
                backgroundColor: selectedCategory === category ? theme.accent : 'transparent',
                color: selectedCategory === category ? colors.porcelainWhite : theme.text,
                border: `1px solid ${theme.accent}`
              }}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredImages.map(image => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-lg shadow-lg group"
                style={{ backgroundColor: isDarkMode ? colors.deepNavyBlue : colors.porcelainWhite }}
              >
                {/* Image */}
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay with details */}
                <motion.div 
                  className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <h3 className="text-lg font-semibold text-white">{image.alt}</h3>
                  <span className="inline-block px-2 py-1 mt-2 text-xs rounded-full" 
                    style={{ backgroundColor: theme.accent, color: colors.porcelainWhite }}>
                    {image.category}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Empty state */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl">No images found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveGridGallery;