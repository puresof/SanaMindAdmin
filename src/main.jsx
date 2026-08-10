import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Login from './pages/login'
import Home from './pages/home'
import Therapists from './pages/therapists'
import Patients from './pages/patients'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/therapists" element={<Therapists />} />
        <Route path="/patients" element={<Patients />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
