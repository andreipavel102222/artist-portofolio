import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ProjectsPage from './pages/ProjectPage/ProjectsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import AddEditProjectPage from './pages/AddProjectPage/AddEditProjectPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ProjectsPage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/edit/:id',
        element: <AddEditProjectPage />
      },
      {
        path: '/add',
        element: <AddEditProjectPage />
      }                   
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
