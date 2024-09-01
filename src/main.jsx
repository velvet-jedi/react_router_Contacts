import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import Root, { loader as rootLoader } from './routes/root';
import ErrorPage from './routes/ErrorPage';
import Contact, { loader as contactLoader, action as contactAction } from './routes/Contact';
import { create } from './routes/root';
import Edit, {action as editAction} from './routes/Edit';
import { action as destroyAction } from './routes/destroy';
import Index from './routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: create,
    children: [
      { index: true, element: <Index /> },
      {
        path: 'contacts/:contactId',     // dynamic URL param
        element: <Contact />,
        loader: contactLoader,
        action: contactAction,
      },
      {
        path: 'contacts/:contactId/edit',     // dynamic URL param
        element: <Edit />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: 'contacts/:contactId/destroy',
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>,
      }
    ],
  },
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
