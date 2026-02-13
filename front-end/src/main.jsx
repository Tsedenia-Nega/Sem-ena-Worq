import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "tailwindcss";
import Services from "./pages/Services"
import App from "./App.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
