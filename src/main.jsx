import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import Dashboard from "./routes/dashboard";
/* import Devices from "./routes/devices";
import Network from "./routes/network";
import Map from "./routes/map";
import Help from "./routes/help";
import Settings from "./routes/settings"; */
import ComingSoon from "./routes/coming-soon";
import Login from "./routes/login";
import { Protected } from "./routes/protected";
import AuthContext from "./AuthConext";
import Registration from "./routes/registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Root />
      </Protected>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "devices",
        element: <ComingSoon />,
      },
      {
        path: "network",
        element: <ComingSoon />,
      },
      {
        path: "map",
        element: <ComingSoon />,
      },
      {
        path: "help",
        element: <ComingSoon />,
      },
      {
        path: "settings",
        element: <ComingSoon />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/registration",
    element: <Registration />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContext>
    <RouterProvider router={router} />
  </AuthContext>
);
