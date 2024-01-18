import * as React from 'react';
import Home from './pages/Home';
import ErrorPage from './pages/Error';
import League from './pages/League';
import CreateLeague from './pages/CreateLeague';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import './styles/app/App.css';

const router = createBrowserRouter([
  {
    path: "/ui",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "/",
    element: <Navigate to="/ui" />,
    errorElement: <ErrorPage />
  },
  {
    path: "/ui/leagues/:league",
    element: <League />,
    errorElement: <ErrorPage />
  },
  {
    path: "/ui/create",
    element: <CreateLeague />,
    errorElement: <ErrorPage />
  }
]);

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App;
