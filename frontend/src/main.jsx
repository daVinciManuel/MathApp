import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage.jsx'
import Login from './pages/Login.jsx'
import Welcome from './pages/Welcome.jsx'

const router = createBrowserRouter([
  { path: '/', element: <Welcome/> },
  { path: '/login', element: <Login/> },
  // { path: '/register', element: <Register/> },
  // { path: '/home', element: <Home/>},
  // { path: '/profile', element: <Profile/>},
  { path: '*', element: <NotFoundPage/>}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
