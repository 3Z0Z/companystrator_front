import { Navigate, Outlet } from "react-router-dom";
import { useAuthStorage } from "../store"

export default function ProtectedClientRoutes() {
  const { role } = useAuthStorage();
  return role === 'CLIENT' ? <Outlet/> : <Navigate to={'/'} />
}