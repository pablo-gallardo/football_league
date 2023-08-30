import Home from './pages/Home';
import ErrorPage from './pages/Error';
import League from './pages/League';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import './styles/app/App.css';

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "/",
    element: <Navigate to="home" />,
    errorElement: <ErrorPage />
  },
  {
    path: "/leagues/:league",
    element: <League />,
    errorElement: <ErrorPage />
  }
]);

function App() {
  return (
    <div className='container'>
      <RouterProvider router={router} />
    </div>
    )
}

export default App;
