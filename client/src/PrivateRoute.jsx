import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({isOK, redirectPath="/", children}) {
  if (!isOK) {
    return <Navigate to={redirectPath} replace></Navigate>
  }
  return children ? children : <Outlet />
}
