import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import Dashboard from "./routes/dashboard";
import Devices from "./routes/devices";
import Network from "./routes/network";
import Map from "./routes/map";
import Help from "./routes/help";
import Settings from "./routes/settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "devices",
        element: <Devices />,
      },
      {
        path: "network",
        element: <Network />,
      },
      {
        path: "map",
        element: <Map />,
      },
      {
        path: "help",
        element: <Help />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "contacts/:contactId",
    element: <div></div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
