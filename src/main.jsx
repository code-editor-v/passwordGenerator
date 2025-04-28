import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Strength from './components/Strength.jsx'
import Home from "./components/Home.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element : <App/>,
      children : [
        {
          path : "strength",
          element : <Strength />
        }, 
        {
          path : "",
          element : < Home />
        }
      ]
    }
  ]
)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
