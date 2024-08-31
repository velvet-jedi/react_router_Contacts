import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import Root, { loader as rootLoader } from './routes/root';
import ErrorPage from './routes/ErrorPage';
import Contact, { loader as contactLoader } from './routes/Contact';
import { create } from './routes/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: create,
    children: [
      {
        path: 'contacts/:contactId',     // dynamic URL param
        element: <Contact />,
        loader: contactLoader,
      },
    ],
  },
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
