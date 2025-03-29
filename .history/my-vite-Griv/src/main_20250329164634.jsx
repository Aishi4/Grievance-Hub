import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route,createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router'
import Layout from './Layout.jsx'
import Home from './Home.jsx'
import Report from './Report.jsx'
import About from './About.jsx'
import TrackIssue from './TrackIssue.jsx'
import ReportSubmit from './ReportSubmit.jsx'
import UploadPhoto from './UploadPhoto.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="report" element={<UploadPhoto />} />
      <Route path="about" element={<About />} />
      <Route path="track" element={<Viw />} />
     
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    
    
    
    <RouterProvider router={router} />
     
  </StrictMode>,
)