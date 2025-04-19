import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext'; // ✅ import it

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider> {/* ✅ wrap your app here */}
      <App />
    </ThemeProvider>
  </StrictMode>
);
