import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export default function AppLayout() {
  return (
    <>
      <Header />
      <div className="max-w-screen-2xl mx-auto my-10 space-y-4">
        <Outlet/>
      </div>
      <ToastContainer />
    </>
  )
}
