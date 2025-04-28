import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import images from './img.json';

type Category = 'View All' | 'Hackathons' | 'Workshops' | 'Activities' | 'Competitions' | 'Seminars';

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
  date: string;
  description?: string;
}

const categories: Category[] = [
  "View All", "Hackathons", "Workshops", "Activities", "Competitions", "Seminars"
];

const galleryItems: GalleryItem[] = [
  { 
    id: 1, 
    src: images.img1, 
    alt: "Hackathon Event", 
    category: "Hackathons",
    title: "ACM Hackathon 2024",
    date: "March 15, 2024",
    description: "Annual coding marathon with participants from across the region competing to build innovative solutions."
  },
  { 
    id: 2, 
    src: images.img2, 
    alt: "AI Workshop", 
    category: "Workshops",
    title: "Introduction to Machine Learning",
    date: "February 22, 2024",
    description: "Hands-on workshop covering the basics of machine learning algorithms and practical applications."
  },
  { 
    id: 3, 
    src: images.img3, 
    alt: "Algorithms Session", 
    category: "Activities",
    title: "Advanced Graph Algorithms",
    date: "April 5, 2024",
    description: "Deep dive into complex graph algorithms and their real-world applications in computer science."
  },
  { 
    id: 4, 
    src: images.img4, 
    alt: "Beginners Workshop", 
    category: "Competitions",
    title: "Python for Beginners",
    date: "January 10, 2024",
    description: "Introduction to Python programming language for newcomers to the world of coding."
  },
  { 
    id: 5, 
    src: images.img5, 
    alt: "Community Meetup", 
    category: "Seminars",
    title: "ACM Community Networking Event",
    date: "March 30, 2024",
    description: "Networking opportunity for ACM members to connect with industry professionals and peers."
  },
  { 
    id: 6, 
    src: images.img6, 
    alt: "Competitive Programming", 
    category: "Competitions",
    title: "Code Rush Challenge",
    date: "February 15, 2024",
    description: "Fast-paced coding competition testing algorithmic thinking and problem-solving skills."
  },
  { 
    id: 7, 
    src: images.img1, 
    alt: "Web Development", 
    category: "Workshops",
    title: "Full Stack Development Workshop",
    date: "April 12, 2024",
    description: "Comprehensive workshop covering both frontend and backend technologies for web development."
  },
  { 
    id: 8, 
    src: images.img2, 
    alt: "ACM Session", 
    category: "Hackathons",
    title: "Introduction to ACM",
    date: "January 25, 2024",
    description: "Orientation session for new ACM members explaining the club's activities and opportunities."
  },
  { 
    id: 9, 
    src: images.img3, 
    alt: "React Workshop", 
    category: "Workshops",
    title: "React Native Workshop",
    date: "March 8, 2024",
    description: "Hands-on workshop for building cross-platform mobile applications using React Native."
  }
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("View All");
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>(galleryItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // Handle mounting for SSR
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Check if dark mode is active
  const isDarkMode = mounted && theme === 'dark';
  
  // Filter gallery items based on selected category and search query
  useEffect(() => {
    let items = [...galleryItems];
    
    // Apply category filter
    if (selectedCategory !== "View All") {
      items = items.filter(item => item.category === selectedCategory);
    }
    
    // Apply search filter if there's a query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredItems(items);
  }, [selectedCategory, searchQuery]);

  // Simulate loading for animations
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  // Open modal with selected image
  const openModal = (image: GalleryItem) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Navigation controls for modal
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[prevIndex]);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[nextIndex]);
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') {
          const currentIndex = filteredItems.findIndex(img => img.id === selectedImage.id);
          const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
          setSelectedImage(filteredItems[prevIndex]);
        }
        if (e.key === 'ArrowRight') {
          const currentIndex = filteredItems.findIndex(img => img.id === selectedImage.id);
          const nextIndex = (currentIndex + 1) % filteredItems.length;
          setSelectedImage(filteredItems[nextIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, filteredItems]);

  // If not mounted yet (for SSR), return empty div
  if (!mounted) return <div />;

  return (
    <div className="w-full">
      {/* Gallery Header Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-2">
          ACM RVCE GALLERY
        </h1>
        <p className="text-xl mb-8">Showcasing our events and activities</p>

        {/* Search and Theme Toggle Row */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 pl-10 rounded-full w-full md:w-64 border"
            />
            <span className="absolute left-3 top-2.5">🔍</span>
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
            className="px-4 py-2 rounded-full font-medium bg-blue-600 text-white"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 
                ${selectedCategory === category 
                  ? 'bg-blue-600 text-white'
                  : 'bg-transparent border'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {isLoading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, index) => (
              <div 
                key={index}
                className="animate-pulse rounded-lg h-64 bg-gray-200 dark:bg-gray-800"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer group"
                  onClick={() => openModal(item)}
                >
                  {/* Gallery Item Image */}
                  <div className="relative overflow-hidden aspect-video">
                    <img 
                      src={item.src} 
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Hover Overlay with details - from gal3 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-all duration-300 
                      translate-y-2 group-hover:translate-y-0 flex flex-col justify-end p-6">
                      <h3 className="text-white font-semibold text-lg leading-tight mb-1">{item.title}</h3>
                      <p className="text-gray-200 text-sm mb-2">{item.description}</p>
                      <div className="flex items-center mt-2">
                        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-300 text-sm ml-1">{item.date}</span>
                      </div>
                      <span 
                        className="mt-2 inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-600 text-white"
                      >
                        {item.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Gallery Item Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">
                      {item.title}
                    </h3>
                    <p className="text-sm opacity-75 text-gray-700 dark:text-gray-300">
                      {item.date}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
        
        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-medium mb-2">No gallery items found</h3>
            <p>Try selecting a different category or adjusting your search.</p>
          </div>
        )}
      </div>

      {/* Modal for image detail view - from gal2 */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-6xl w-full rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-3/4 bg-gray-900 relative">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain max-h-[80vh]"
                />
                
                {/* Navigation controls - from gal3 */}
                <button 
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-3 rounded-full transition-colors duration-200"
                  onClick={handlePrevImage}
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button 
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-3 rounded-full transition-colors duration-200"
                  onClick={handleNextImage}
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <div className="md:w-1/4 p-6 flex flex-col justify-between text-gray-900 dark:text-gray-100">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
                      <p className="text-base opacity-75">{selectedImage.date}</p>
                    </div>
                    <button
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      onClick={closeModal}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <p className="mb-4">{selectedImage.description}</p>
                  
                  <div className="mt-4">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-sm bg-blue-600 text-white"
                    >
                      {selectedImage.category}
                    </span>
                  </div>
                </div>
                
                <div className="text-xs opacity-75 mt-6">
                  Image ID: ACM-{selectedImage.id.toString().padStart(3, '0')}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Gallery; 