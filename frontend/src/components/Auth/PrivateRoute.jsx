import { Navigate, Outlet } from "react-router-dom";
import { getAuthToken } from "../../utils/auth";

export default function PrivateRoute() {
  const token = getAuthToken();
  return token ? <Outlet /> : <Navigate to="/auth" />;
}
