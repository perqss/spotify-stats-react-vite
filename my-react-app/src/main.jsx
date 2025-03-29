import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Spotify from 'spotify-web-api-js';
import { getLocalAccessToken, lighterMainColor } from './common';

const s = new Spotify();

export const spotify = () => {
    s.setAccessToken(getLocalAccessToken());
    return s;
};

createRoot(document.getElementById('root')).render(
  <App />
)
