import './App.css';
// import { Button } from 'react-bootstrap';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import NavBar from './components/NavBar';
import Add from './components/Add';
import Home from './components/Home';
import Iadd from './components/Iadd';
import Map from './components/Map';

const router = createBrowserRouter([
  {
      path : "/",
      element : <Home />
  },
  {
    path : "/add",
    element : <Add />
  },
  {
    path : "/iadd",
    element : <Iadd />
  },
  {
    path : "/map",
    element : <Map />
  }
])

export default function App() {
return (
  <>
      <RouterProvider router={router} />
  </>
)
}
