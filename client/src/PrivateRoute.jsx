import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const tokenUser = localStorage.getItem("token");

  return <div>{tokenUser !== null ? <Outlet /> : <Navigate to="/landing" />}</div>
}
