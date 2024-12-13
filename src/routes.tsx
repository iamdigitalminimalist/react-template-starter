import { RouteObject } from 'react-router';
import App from './App.tsx';
import PlayGroundPage from './pages/PlayGroundPage.tsx';
import TechStackPage from './pages/TechStackPage/index.tsx';
import HomePage from './pages/Homepage.tsx';
import ErrorPage from './pages/ErrorPage.tsx';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'playground', element: <PlayGroundPage /> },
      { path: 'techstack', element: <TechStackPage /> },
    ],
  },
];

export default routes;
