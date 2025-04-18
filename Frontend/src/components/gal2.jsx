import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  "All", "Hackathons", "Workshops", "Activities", "Competitions"
];

// Sample image data - replace with your actual data
const sampleImages = [
  { id: 1, src: images.img1, alt: "Hackathon 2024", category: "Hackathons", description: "Annual coding marathon" },
  { id: 2, src: images.img2, alt: "Python Workshop", category: "Workshops", description: "Hands-on ML session" },
  { id: 3, src: images.img3, alt: "Code Rush", category: "Competitions", description: "Speed coding challenge" },
  { id: 4, src: images.img4, alt: "Team Building", category: "Activities", description: "Collaborative exercises" },
  { id: 5, src: images.img5, alt: "ML Workshop", category: "Workshops", description: "Deep learning introduction" },
  { id: 6, src: images.img6, alt: "Algorithm Contest", category: "Competitions", description: "Problem solving competition" },
];

const MasonryGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
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
  
  // Open modal with selected image
  const openModal = (image) => setSelectedImage(image);
  
  // Close modal
  const closeModal = () => setSelectedImage(null);

  // Dynamic styles based on theme
  const theme = {
    bg: isDarkMode ? colors.midnightIndigo : colors.porcelainWhite,
    text: isDarkMode ? colors.porcelainWhite : colors.midnightIndigo,
    accent: isDarkMode ? colors.tealSky : colors.electricAzure,
    card: isDarkMode ? colors.deepNavyBlue : colors.porcelainWhite,
  };

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: theme.bg, color: theme.text }}>
      {/* Gallery Container */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Event Gallery</h2>
            <p className="text-sm opacity-80">Showcasing ACM RVCE's finest moments</p>
          </div>
          
          <button 
            onClick={toggleTheme}
            className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300"
            style={{ backgroundColor: theme.accent, color: colors.porcelainWhite }}
          >
            {isDarkMode ? "Switch to Light" : "Switch to Dark"}
          </button>
        </div>
        
        {/* Category filter - horizontal scrollable on mobile */}
        <div className="overflow-x-auto pb-4 mb-8">
          <div className="flex gap-2 min-w-max">
            {categories.map(category => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  backgroundColor: selectedCategory === category ? theme.accent : 'transparent',
                  color: selectedCategory === category ? colors.porcelainWhite : theme.text,
                  border: `1px solid ${selectedCategory === category ? theme.accent : theme.text}`
                }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Masonry gallery layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredImages.map(image => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="break-inside-avoid rounded-lg overflow-hidden shadow-md cursor-pointer transform transition-transform hover:-translate-y-1"
              onClick={() => openModal(image)}
              style={{ backgroundColor: theme.card }}
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover"
              />
              <div className="p-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{image.alt}</h3>
                  <span className="text-xs px-2 py-1 rounded-full" 
                    style={{ backgroundColor: theme.accent, color: colors.porcelainWhite }}>
                    {image.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Empty state */}
        {filteredImages.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-xl mb-2">No images in this category yet</p>
            <p>Try selecting another category</p>
          </motion.div>
        )}
      </div>
      
      {/* Modal for image detail view */}
      {selectedImage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={closeModal}
        >
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative max-w-4xl w-full max-h-full overflow-auto rounded-lg"
            onClick={e => e.stopPropagation()}
            style={{ backgroundColor: theme.card }}
          >
            <button 
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full z-10"
              onClick={closeModal}
              style={{ backgroundColor: theme.accent, color: colors.porcelainWhite }}
            >
              ✕
            </button>
            
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              className="w-full h-auto object-contain"
            />
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold">{selectedImage.alt}</h3>
                <span className="px-3 py-1 rounded-full text-sm" 
                  style={{ backgroundColor: theme.accent, color: colors.porcelainWhite }}>
                  {selectedImage.category}
                </span>
              </div>
              <p>{selectedImage.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MasonryGallery;