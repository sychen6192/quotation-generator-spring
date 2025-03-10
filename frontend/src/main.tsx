import { HelmetProvider } from "react-helmet-async";
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
