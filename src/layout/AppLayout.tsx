import { Navigate, Outlet } from "react-router-dom";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useAuth } from "@/hooks/useAuth";
import { ClipLoader } from "react-spinners";

export default function AppLayout() {

  const { data, isError, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <ClipLoader color="#6b21a8" size={40} />
      </div>
    )
  }
  if (isError) {
    return <Navigate to='/auth/login' />
  }

  if(data) return (
    <>
      <Header name={data.name} />
      <div className="max-w-screen-2xl mx-auto my-10 space-y-4">
        <Outlet/>
      </div>
      <ToastContainer />
    </>
  )
}
