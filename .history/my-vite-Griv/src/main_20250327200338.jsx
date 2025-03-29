import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="Projects" element={<Projects />} />
      <Route path="Contact" element={<Contact />} />
      <Route path="Skill" element={<Skill />} />
      <Route path="Blogs" element={<Blogs/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    
    
    
    <RouterProvider router={router} />
     
  </StrictMode>,
)