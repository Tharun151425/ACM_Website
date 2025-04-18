import React, { useState, useEffect } from 'react';
import images from './img.json';

type Category = 'all' | 'events' | 'conferences' | 'workshops' | 'projects';

interface GalleryImage {
  id: number;
  src: string;
  category: Category[];
  title: string;
  description: string;
  date: string;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Sample image data with added metadata
  const imgLinks: GalleryImage[] = [
    {
      id: 1,
      src: images.img1,
      category: ['events', 'conferences'],
      title: 'Annual ACM Conference',
      description: 'Keynote presentations at the annual ACM conference lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      date: 'March 10, 2025',
    },
    {
      id: 2,
      src: images.img2,
      category: ['workshops'],
      title: 'Technical Workshop',
      description: 'Hands-on workshop on emerging technologies',
      date: 'February 15, 2025',
    },
    {
      id: 3,
      src: images.img3,
      category: ['events'],
      title: 'Networking Event',
      description: 'Professional networking session for ACM members',
      date: 'January 28, 2025',
    },
    {
      id: 4,
      src: images.img4,
      category: ['conferences', 'projects'],
      title: 'Research Presentation',
      description: 'Showcase of innovative research projects',
      date: 'January 12, 2025',
    },
    {
      id: 5,
      src: images.img5,
      category: ['projects'],
      title: 'Team Project Demo',
      description: 'Student project demonstration session',
      date: 'December 8, 2024',
    },
    {
      id: 6,
      src: images.img6,
      category: ['workshops', 'events'],
      title: 'Professional Development',
      description: 'Career development session for engineering students',
      date: 'November 22, 2024',
    },
  ];

  // Filter images based on selected category
  const filteredImages = activeCategory === 'all'
    ? imgLinks
    : imgLinks.filter(image => image.category.includes(activeCategory));

  // Organize images into columns for masonry layout
  const getColumns = (images: GalleryImage[]) => {
    return [
      images.filter((_, i) => i % 3 === 0),
      images.filter((_, i) => i % 3 === 1),
      images.filter((_, i) => i % 3 === 2)
    ];
  };

  const columns = getColumns(filteredImages);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Handle category change
  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  // Handle image click
  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === 'Escape') handleCloseModal();
        if (e.key === 'ArrowLeft') {
          const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
          const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
          setSelectedImage(filteredImages[prevIndex]);
        }
        if (e.key === 'ArrowRight') {
          const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
          const nextIndex = (currentIndex + 1) % filteredImages.length;
          setSelectedImage(filteredImages[nextIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, filteredImages]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8 w-[100%]">
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-3xl font-bold sm:text-4xl pb-4">Previous Conference Images</h1>
        <p className="text-gray-600 text-xl mb-6 max-w-3xl">
          Explore our collection of events, conferences, workshops, and projects showcasing ACM Computer Society Information Technology Student Summit activities.
        </p>
        <div className="h-1 w-24 bg-blue-600 mb-8"></div>

        <div className="flex flex-wrap gap-2 mb-10">
          {['all', 'events', 'conferences', 'workshops', 'projects'].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category as Category)}
              className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 
                ${activeCategory === category 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-gray-700 hover:bg-gray-200'}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, index) => (
              <div 
                key={index}
                className="bg-gray-200 animate-pulse rounded-xl h-64"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-0 animate-fade-in">
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="space-y-8">
                {column.map((image, imgIndex) => (
                  <div
                    key={image.id}
                    className={`
                      relative group overflow-hidden rounded-xl shadow-md bg-white 
                      cursor-pointer transition-all duration-500
                      hover:shadow-xl
                      ${imgIndex % 2 === 0 ? 'translate-y-0' : 'translate-y-4'}
                    `}
                    onClick={() => handleImageClick(image)}
                  >
                    <div className="aspect-w-16 aspect-h-12">
                      <div className="w-full h-full overflow-hidden">
                        <img
                          src={image.src}
                          alt={image.title}
                          className="object-cover w-full h-full transition-all duration-700 
                            group-hover:scale-105 filter group-hover:brightness-90"
                        />
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-all duration-300 
                      translate-y-2 group-hover:translate-y-0 flex flex-col justify-end p-6">
                      <h3 className="text-white font-semibold text-lg leading-tight mb-1">{image.title}</h3>
                      <p className="text-gray-200 text-base mb-2">{image.description}</p>
                      <div className="flex items-center mt-2">
                        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-300 text-base ml-1">{image.date}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {image.category.map(cat => (
                          <span 
                            key={`${image.id}-${cat}`}
                            className="text-base bg-blue-600/70 text-white px-2 py-0.5 rounded-full"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full 
                      opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 
                      transition-all duration-300 shadow-lg">
                      <svg className="w-4 h-4 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleCloseModal}
        >
          <div 
            className="relative max-w-6xl w-full bg-white rounded-xl overflow-hidden shadow-2xl 
              transition-transform duration-300 transform scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-3/4 bg-gray-900 relative">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain max-h-[80vh]"
                />
                
                {/* Navigation controls */}
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
              
              <div className="md:w-1/4 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900">{selectedImage.title}</h3>
                      <p className="text-base text-gray-500">{selectedImage.date}</p>
                    </div>
                    <button
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      onClick={handleCloseModal}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{selectedImage.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-6">
                    {selectedImage.category.map(cat => (
                      <span 
                        key={`modal-${selectedImage.id}-${cat}`}
                        className="text-base bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  Image ID: ACM-{selectedImage.id.toString().padStart(3, '0')}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Gallery;