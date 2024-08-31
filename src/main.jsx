import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import Root from './routes/root';
import ErrorPage from './routes/ErrorPage';
import Contact from './routes/Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <ErrorPage />
  },
  {
    path: 'contacts/:contacId',
    element: <Contact/>,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
