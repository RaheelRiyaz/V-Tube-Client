import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getAccessToken } from "../services/TokenService";

function User() {
  const navigateTo = useNavigate();

  useEffect(() => {
    const isUserLoggedIn = getAccessToken();
    if (isUserLoggedIn) navigateTo("/home");
    else navigateTo("/login");
  }, [navigateTo]);

  return <div>{<Outlet />}</div>;
}

export default User;
