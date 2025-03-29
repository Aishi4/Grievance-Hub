import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route,createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import UploadPhoto from './pages/UploadPhoto.jsx'
import ViewPhoto from './pages/ViewPhoto.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import Login from './pages/Login.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="report" element={<UploadPhoto />} />
      <Route path="about" element={<About />} />
      <Route path="track" element={<ViewPhoto />} />
      <Route path='admin' element={<AdminPanel />} />
      
      
     
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    
    
    
    <RouterProvider router={router} />
     
  </StrictMode>,
)