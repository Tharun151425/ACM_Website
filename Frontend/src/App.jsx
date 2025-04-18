import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/home';
import Gal1 from './components/gal1'
import Gal2 from './components/gal2'
import Gal3 from './components/gal3'
import Gal4 from './components/gal4'

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
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  </>
  )
}

export default App
