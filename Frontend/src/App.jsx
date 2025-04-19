import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { FaCalendarAlt, FaUsers, FaEnvelope, FaCode, FaLaptopCode } from 'react-icons/fa';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Gal1 from './components/gal1'
import Gal2 from './components/gal2'
import Gal3 from './components/gal3'
import Gal4 from './components/gal4'
import Team1 from './components/team1'
import Team2 from './components/team2'


const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">ACM RVCE</h1>
          <p className="text-xl md:text-2xl mb-8">Association for Computing Machinery - RV College of Engineering</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300">
            Join Us
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">About ACM RVCE</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 mb-4">
                ACM RVCE is the official student chapter of the Association for Computing Machinery at RV College of Engineering. We are dedicated to fostering technical excellence and innovation in the field of computer science.
              </p>
              <p className="text-gray-600">
                Our mission is to provide a platform for students to enhance their technical skills, network with industry professionals, and contribute to the computing community.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <FaCode className="text-4xl text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold">Technical Workshops</h3>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <FaLaptopCode className="text-4xl text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold">Coding Competitions</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaCalendarAlt className="text-3xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Hackathon 2024</h3>
              <p className="text-gray-600">Join us for our annual hackathon event!</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaCalendarAlt className="text-3xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tech Talks</h3>
              <p className="text-gray-600">Industry experts sharing their knowledge</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaCalendarAlt className="text-3xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Workshops</h3>
              <p className="text-gray-600">Hands-on learning sessions</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Team Section */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold">President</h3>
              <p className="text-gray-600">John Doe</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold">Vice President</h3>
              <p className="text-gray-600">Jane Smith</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold">Technical Head</h3>
              <p className="text-gray-600">Mike Johnson</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold">Events Head</h3>
              <p className="text-gray-600">Sarah Williams</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <FaEnvelope className="text-2xl text-blue-600 mr-4" />
                <p className="text-gray-600">acm@rvce.edu.in</p>
              </div>
              <div className="flex items-center mb-6">
                <FaUsers className="text-2xl text-blue-600 mr-4" />
                <p className="text-gray-600">Follow us on social media</p>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}

function App() {
  
  return (<>
    <ThemeProvider>
  <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gal1" element={<Gal1/>} />
        <Route path="/gal2" element={<Gal2 />} />
        <Route path="/gal3" element={<Gal3 />} />
        <Route path="/gal4" element={<Gal4 />} />
        <Route path="/team1" element={<Team1 />} />
        <Route path="/team2" element={<Team2 />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  </>
  )
}

export default App
