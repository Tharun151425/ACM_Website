import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Team data - same structure as Design 1
const teamData = {
  "2023": {
    core: [
      { id: 1, name: "Alex Johnson", role: "Chairperson", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "alex@example.com" },
      { id: 2, name: "Jamie Smith", role: "Vice Chairperson", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "jamie@example.com" },
      { id: 3, name: "Morgan Lee", role: "Secretary", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "morgan@example.com" },
      { id: 4, name: "Taylor Brown", role: "Treasurer", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "taylor@example.com" },
    ],
    junior: [
      { id: 5, name: "Casey Wilson", role: "Event Coordinator", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "casey@example.com" },
      { id: 6, name: "Jordan Davis", role: "Technical Lead", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "jordan@example.com" },
      { id: 7, name: "Riley Moore", role: "Marketing Lead", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "riley@example.com" },
      { id: 8, name: "Quinn Miller", role: "Design Lead", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "quinn@example.com" },
    ]
  },
  "2024": {
    core: [
      { id: 1, name: "Alex Johnson", role: "Chairperson", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "alex@example.com" },
      { id: 2, name: "Jamie Smith", role: "Vice Chairperson", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "jamie@example.com" },
      { id: 3, name: "Morgan Lee", role: "Secretary", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "morgan@example.com" },
      { id: 4, name: "Taylor Brown", role: "Treasurer", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "taylor@example.com" },
    ],
    junior: [
      { id: 5, name: "Casey Wilson", role: "Event Coordinator", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "casey@example.com" },
      { id: 6, name: "Jordan Davis", role: "Technical Lead", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "jordan@example.com" },
      { id: 7, name: "Riley Moore", role: "Marketing Lead", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "riley@example.com" },
      { id: 8, name: "Quinn Miller", role: "Design Lead", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "quinn@example.com" },
    ]
  },
  "2025": {
    core: [
      { id: 1, name: "Alex Johnson", role: "Chairperson", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "alex@example.com" },
      { id: 2, name: "Jamie Smith", role: "Vice Chairperson", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "jamie@example.com" },
      { id: 3, name: "Morgan Lee", role: "Secretary", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "morgan@example.com" },
      { id: 4, name: "Taylor Brown", role: "Treasurer", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "taylor@example.com" },
    ],
    junior: [
      { id: 5, name: "Casey Wilson", role: "Event Coordinator", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "casey@example.com" },
      { id: 6, name: "Jordan Davis", role: "Technical Lead", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "jordan@example.com" },
      { id: 7, name: "Riley Moore", role: "Marketing Lead", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "riley@example.com" },
      { id: 8, name: "Quinn Miller", role: "Design Lead", image: "/placeholder-profile.jpg", linkedin: "#", github: "#", email: "quinn@example.com" },
    ]
  }
};

// SVG Icons
const LinkedInIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const TeamPageDesign2 = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [activeCategory, setActiveCategory] = useState("core");
  const [selectedMember, setSelectedMember] = useState(null);
  const { colors, theme } = useTheme();


  const memberRef = useRef(null);

  // Close member details when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (memberRef.current && !memberRef.current.contains(event.target)) {
        setSelectedMember(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const years = Object.keys(teamData).sort();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7 }
    }
  };

  return (
    <div 
      className="min-h-screen pt-16 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" 
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" 
        style={{ backgroundColor: colors.electricAzure, filter: 'blur(80px)', transform: 'translate(20%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10" 
        style={{ backgroundColor: colors.tealSky, filter: 'blur(100px)', transform: 'translate(-30%, 30%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <h1 className="text-5xl font-bold mb-6">Our Team</h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>
            Meet the talented individuals driving ACM RVCE forward
          </p>
        </motion.div>

        {/* Year Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-1 p-1 rounded-xl" 
            style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
            {years.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`relative px-8 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedYear === year ? 'text-white' : ''
                }`}
              >
                {selectedYear === year && (
                  <motion.div
                    layoutId="activeYearBg"
                    className="absolute inset-0 rounded-lg"
                    style={{ 
                      background: `linear-gradient(135deg, ${colors.oceanicBlue}, ${colors.electricAzure})`,
                      boxShadow: '0 4px 15px rgba(4, 102, 200, 0.3)'
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{year}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Selector */}
        <div className="flex justify-center mb-16">
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            <button
              onClick={() => setActiveCategory('core')}
              className={`py-4 px-8 rounded-lg font-medium text-center transition-all duration-300 ${
                activeCategory === 'core' ? 'shadow-lg' : 'opacity-70'
              }`}
              style={{
                backgroundColor: activeCategory === 'core' 
                  ? colors.deepNavyBlue 
                  : theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                color: activeCategory === 'core' ? colors.porcelainWhite : colors.text
              }}
            >
              Core Team
            </button>
            <button
              onClick={() => setActiveCategory('junior')}
              className={`py-4 px-8 rounded-lg font-medium text-center transition-all duration-300 ${
                activeCategory === 'junior' ? 'shadow-lg' : 'opacity-70'
              }`}
              style={{
                backgroundColor: activeCategory === 'junior' 
                  ? colors.deepNavyBlue 
                  : theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                color: activeCategory === 'junior' ? colors.porcelainWhite : colors.text
              }}
            >
              Junior Core
            </button>
          </div>
        </div>

        {/* Team Members Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={`${selectedYear}-${activeCategory}`} // Force re-render animation when selection changes
        >
          {teamData[selectedYear][activeCategory].map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg" 
                style={{ backgroundColor: theme === 'dark' ? colors.deepNavyBlue : colors.porcelainWhite }}>
                {/* Hexagon-shaped photo container */}
                <div className="relative h-64 overflow-hidden">
                  {/* Background shape */}
                  <div 
                    className="absolute inset-0 -top-12 rounded-b-full" 
                    style={{ 
                      background: `linear-gradient(135deg, ${colors.electricAzure}, ${colors.oceanicBlue})`,
                      height: '120%'
                    }}
                  />
                  
                  {/* Profile image with mask */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md transform group-hover:scale-110 transition-transform duration-300">
                      <img src="/api/placeholder/400/320" alt={member.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-sm mb-4" style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>
                    {member.role}
                  </p>
                  
                  {/* Social Media Icons */}
                  <div className="flex justify-center space-x-3">
                    <a 
                      href={member.linkedin} 
                      className="p-2 rounded-full transition-all duration-200 hover:scale-110"
                      style={{ 
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                        color: colors.text 
                      }}
                    >
                      <LinkedInIcon />
                    </a>
                    <a 
                      href={member.github} 
                      className="p-2 rounded-full transition-all duration-200 hover:scale-110"
                      style={{ 
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                        color: colors.text 
                      }}
                    >
                      <GitHubIcon />
                    </a>
                    <a 
                      href={`mailto:${member.email}`} 
                      className="p-2 rounded-full transition-all duration-200 hover:scale-110"
                      style={{ 
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                        color: colors.text 
                      }}
                    >
                      <EmailIcon />
                    </a>
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 opacity-0 bg-gradient-to-t from-black to-transparent group-hover:opacity-10 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Member Details Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div 
            ref={memberRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl"
            style={{ backgroundColor: theme === 'dark' ? colors.midnightIndigo : colors.porcelainWhite }}
          >
            {/* Close button */}
            <button 
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800 bg-opacity-20 text-white hover:bg-opacity-30 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8">
              <div className="flex flex-col sm:flex-row items-center mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 mb-4 sm:mb-0 sm:mr-6" style={{ borderColor: colors.electricAzure }}>
                  <img src="/api/placeholder/400/320" alt={selectedMember.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">{selectedMember.name}</h2>
                  <p className="text-lg mb-2" style={{ color: colors.electricAzure }}>{selectedMember.role}</p>
                  <div className="flex space-x-3 mt-3">
                    <a 
                      href={selectedMember.linkedin} 
                      className="p-2 rounded-full hover:scale-110 transition-all"
                      style={{ backgroundColor: colors.oceanicBlue, color: 'white' }}
                    >
                      <LinkedInIcon />
                    </a>
                    <a 
                      href={selectedMember.github} 
                      className="p-2 rounded-full hover:scale-110 transition-all"
                      style={{ backgroundColor: colors.oceanicBlue, color: 'white' }}
                    >
                      <GitHubIcon />
                    </a>
                    <a 
                      href={`mailto:${selectedMember.email}`} 
                      className="p-2 rounded-full hover:scale-110 transition-all"
                      style={{ backgroundColor: colors.oceanicBlue, color: 'white' }}
                    >
                      <EmailIcon />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Additional member details */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="opacity-80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. 
                  Donec placerat nisl magna, et faucibus arcu condimentum sed.
                </p>
                
                <h3 className="text-lg font-semibold mt-4 mb-2">Achievements</h3>
                <ul className="list-disc list-inside opacity-80">
                  <li>Led the team to win the national coding championship</li>
                  <li>Organized successful tech symposiums with 500+ attendees</li>
                  <li>Published a paper on advanced computing algorithms</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TeamPageDesign2;