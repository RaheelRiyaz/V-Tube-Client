import User from "./User";
import Login from "./pages/Login";

export const UserRoutes = {
  path: "",
  element: <User />,
  children: [{ path: "", element: <Login /> }],
};
