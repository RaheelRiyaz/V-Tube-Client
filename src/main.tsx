import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserRoutes } from "./user/UserRouting";
import Login from "./user/pages/Login";

const routes = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  UserRoutes,
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
