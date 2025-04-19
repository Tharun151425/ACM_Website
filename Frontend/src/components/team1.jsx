import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const teamData = {
  "2023": {
    core: [
      { id: 1, name: "Tim Cheese", role: "Chairperson", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
      { id: 2, name: "Tung Tung Sahur", role: "Vice Chairperson", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
      { id: 3, name: "Pengu", role: "Secretary", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
      { id: 4, name: "Simon Claw", role: "Treasurer", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
    ],
    junior: [
      { id: 5, name: "Casey Wilson", role: "Event Coordinator", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
      { id: 6, name: "Jordan Davis", role: "Technical Lead", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
      { id: 7, name: "Riley Moore", role: "Marketing Lead", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
      { id: 8, name: "Quinn Miller", role: "Design Lead", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
    ]
  },
  "2024": {
    core: [
      { id: 1, name: "Tim Cheese", role: "Chairperson", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
      { id: 2, name: "Tung Tung Sahur", role: "Vice Chairperson", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
      { id: 3, name: "Pengu", role: "Secretary", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
      { id: 4, name: "Simon Claw", role: "Treasurer", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
    ],
    junior: [
      { id: 5, name: "Casey Wilson", role: "Event Coordinator", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
      { id: 6, name: "Jordan Davis", role: "Technical Lead", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
      { id: 7, name: "Riley Moore", role: "Marketing Lead", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
      { id: 8, name: "Quinn Miller", role: "Design Lead", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
    ]
  },
  "2025": {
    core: [
      { id: 1, name: "Tim Cheese", role: "Chairperson", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
      { id: 2, name: "Tung Tung Sahur", role: "Vice Chairperson", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
      { id: 3, name: "Pengu", role: "Secretary", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
      { id: 4, name: "Simon Claw", role: "Treasurer", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
    ],
    junior: [
      { id: 5, name: "Casey Wilson", role: "Event Coordinator", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
      { id: 6, name: "Jordan Davis", role: "Technical Lead", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
      { id: 7, name: "Riley Moore", role: "Marketing Lead", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
      { id: 8, name: "Quinn Miller", role: "Design Lead", image: "/placeholder-profile.jpg", linkedin: "#", github: "#" },
    ]
  }
};

// Social media icons
const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const TeamPageDesign1 = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [activeTab, setActiveTab] = useState("core");
  const { colors, theme } = useTheme();

  const years = Object.keys(teamData).sort();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: colors.background, color: colors.text }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Team</h1>
          <p className="text-lg max-w-2xl mx-auto opacity-80">
            Meet the dedicated individuals behind ACM RVCE who work to foster innovation and growth in computing.
          </p>
        </div>

        {/* Year Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-lg" style={{ backgroundColor: theme === 'dark' ? colors.deepNavyBlue : '#F0F4F8' }}>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  selectedYear === year 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                    : 'hover:bg-opacity-50'
                }`}
                style={{ color: selectedYear === year ? 'white' : colors.text }}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Team Category Tabs */}
        <div className="flex justify-center mb-10">
          <div className="border-b border-gray-300 dark:border-gray-700 flex space-x-8">
            <button
              onClick={() => setActiveTab("core")}
              className={`pb-4 font-medium text-lg relative ${
                activeTab === "core" ? "text-blue-600 dark:text-blue-400" : "opacity-70 hover:opacity-100"
              }`}
              style={{ color: activeTab === "core" ? colors.electricAzure : undefined }}
            >
              Core Team
              {activeTab === "core" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-t-md"
                  style={{ backgroundColor: colors.electricAzure }}
                  layoutId="activeTab"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("junior")}
              className={`pb-4 font-medium text-lg relative ${
                activeTab === "junior" ? "text-blue-600 dark:text-blue-400" : "opacity-70 hover:opacity-100"
              }`}
              style={{ color: activeTab === "junior" ? colors.electricAzure : undefined }}
            >
              Junior Core
              {activeTab === "junior" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-t-md"
                  style={{ backgroundColor: colors.electricAzure }}
                  layoutId="activeTab"
                />
              )}
            </button>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamData[selectedYear][activeTab].map((member, index) => (
            <motion.div
              key={member.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105"
              style={{ backgroundColor: colors.card }}
            >
              {/* Profile Image */}
              <div className="h-56 relative overflow-hidden">
                <img 
                  src="/api/placeholder/400/320" 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              </div>

              {/* Content */}
              <div className="p-6 relative">
                {/* Info */}
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-sm mb-4 opacity-80">{member.role}</p>

                {/* Social Links */}
                <div className="flex space-x-3">
                  <a 
                    href={member.linkedin} 
                    className="p-2 rounded-full transition-colors duration-200"
                    style={{ 
                      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                      color: colors.text 
                    }}
                  >
                    <LinkedInIcon />
                  </a>
                  <a 
                    href={member.github} 
                    className="p-2 rounded-full transition-colors duration-200"
                    style={{ 
                      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                      color: colors.text 
                    }}
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPageDesign1;