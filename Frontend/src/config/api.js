// API configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://twitter-uo1p.onrender.com' 
    : 'http://localhost:5000');
