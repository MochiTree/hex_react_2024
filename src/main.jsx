import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
import './assets/all.scss'
import { RouterProvider } from 'react-router-dom'
import index from './router'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    // <App />
    <RouterProvider router={index}/>
  // </StrictMode>,
)
