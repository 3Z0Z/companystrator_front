import { Navigate, Outlet } from "react-router-dom";
import { useAuthStorage } from "../store"

export default function ProtectedRoutes() {
  const { role } = useAuthStorage();
  return role === 'ADMIN' ? <Outlet/> : <Navigate to={'/'} />
}
