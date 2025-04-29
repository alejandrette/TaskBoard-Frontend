import Logo from "@/components/Logo";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-8">
        <div className="flex items-center justify-center gap-3 text-2xl font-bold text-fuchsia-600">
          <Logo />
          <span>TaskBoard</span>
        </div>
        <Outlet />
        <ToastContainer />
      </div>
    </div>
  );
}
