import { Navigate } from "react-router-dom";
import User from "./User";
import Home from "./pages/Home";

export const UserRoutes = {
  path: "",
  element: <User />,
  children: [
    {
      path: "home",
      element: <Home />,
    },

    {
      path: "",
      element: <Navigate to={"home"} />,
    },
  ],
};
