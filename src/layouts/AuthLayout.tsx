import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 border w-2xl m-auto mt-10 p-5">
      <Link to={'/'} className="text-gray-500 w-full underline hover:text-gray-700">
        Back to company list
      </Link>
      <Outlet />
    </div>
  )
}
