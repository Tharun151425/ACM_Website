import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import i from './img.json'
const categories = [
  "View All", "Hackathons", "Workshops", "Activities", "Competitions", "Seminars"
];

const galleryItems = [
  { 
    id: 1, 
    src: i.img1, 
    alt: "Hackathon Event", 
    category: "Hackathon",
    title: "ACM Hackathon 2024",
    date: "March 15, 2024" 
  },
  { 
    id: 2, 
    src: i.img2, 
    alt: "AI Workshop", 
    category: "Workshops",
    title: "Introduction to Machine Learning",
    date: "February 22, 2024" 
  },
  { 
    id: 3, 
    src: i.img3, 
    alt: "Algorithms Session", 
    category: "Activities",
    title: "Advanced Graph Algorithms",
    date: "April 5, 2024" 
  },
  { 
    id: 4, 
    src: i.img4, 
    alt: "Beginners Workshop", 
    category: "Competitions",
    title: "Python for Beginners",
    date: "January 10, 2024" 
  },
  { 
    id: 5, 
    src: i.img5, 
    alt: "Community Meetup", 
    category: "Seminars",
    title: "ACM Community Networking Event",
    date: "March 30, 2024" 
  },
  { 
    id: 6, 
    src: i.img6, 
    alt: "Competitive Programming", 
    category: "Seminars",
    title: "Code Rush Challenge",
    date: "February 15, 2024" 
  },
  { 
    id: 7, 
    src: i.img1, 
    alt: "Web Development", 
    category: "Workshops",
    title: "Full Stack Development Workshop",
    date: "April 12, 2024" 
  },
  { 
    id: 8, 
    src: i.img2, 
    alt: "ACM Session", 
    category: "Hackathons",
    title: "Introduction to ACM",
    date: "January 25, 2024" 
  },
  { 
    id: 9, 
    src: i.img3, 
    alt: "Activities", 
    category: "Hackathons",
    title: "React Native Workshop",
    date: "March 8, 2024" 
  }
];

const ACMGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("View All");
  const [filteredItems, setFilteredItems] = useState(galleryItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  
  // Use the theme context
  const { theme, toggleTheme, colors } = useTheme();

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

  // Handle email subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Implementation for subscribing would go here
    alert(`Subscribed with email: ${email}`);
    setEmail("");
  };

  return (
    <div className="w-full" style={{ backgroundColor: colors.background, color: colors.text }}>
      {/* Gallery Header Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-2" style={{ color: colors.text }}>
          ACM RVCE GALLERY
        </h1>
        <p className="text-xl mb-8">Showcasing our events and activities</p>

        {/* Search and Subscribe Row */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 pl-10 rounded-full w-full md:w-64"
              style={{ 
                backgroundColor: theme === 'dark' ? colors.card : colors.background,
                borderColor: colors.accent,
                color: colors.text,
                borderWidth: '1px'
              }}
            />
            <span className="absolute left-3 top-2.5">🔍</span>
          </div>

          {/* Email Subscription */}
          {/* <form onSubmit={handleSubscribe} className="flex">
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-l-full w-full md:w-64"
              style={{ 
                backgroundColor: theme === 'dark' ? colors.card : colors.background,
                borderColor: colors.accent,
                color: colors.text,
                borderWidth: '1px',
                borderRight: 'none'
              }}
              required
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-r-full font-medium"
              style={{ backgroundColor: colors.accent, color: colors.background }}
            >
              Subscribe
            </button>
          </form> */}
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="px-4 py-2 rounded-full font-medium md:ml-4"
            style={{ backgroundColor: colors.secondary, color: colors.background }}
          >
            {theme === 'dark' ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300`}
              style={{ 
                backgroundColor: selectedCategory === category ? colors.accent : 'transparent',
                color: selectedCategory === category ? colors.background : colors.text,
                border: `1px solid ${selectedCategory === category ? colors.accent : colors.text}`
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg overflow-hidden shadow-lg"
                style={{ backgroundColor: colors.card }}
              >
                {/* Gallery Item Image */}
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={item.src} 
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Category Tag */}
                  <span 
                    className="absolute top-4 right-4 px-2 py-1 text-xs font-medium rounded"
                    style={{ backgroundColor: colors.accent, color: colors.background }}
                  >
                    {item.category}
                  </span>
                </div>
                
                {/* Gallery Item Details */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1" style={{ color: colors.text }}>
                    {item.title}
                  </h3>
                  <p className="text-sm opacity-75" style={{ color: colors.text }}>
                    {item.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-medium mb-2">No gallery items found</h3>
            <p>Try selecting a different category or adjusting your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ACMGallery;