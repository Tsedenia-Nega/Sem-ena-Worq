import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '/index.css'
import "tailwindcss";
import Services from "./pages/Services"
import App from "./App.jsx"
import { AuthProvider } from './contexts/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App/>
  </AuthProvider>,
)
