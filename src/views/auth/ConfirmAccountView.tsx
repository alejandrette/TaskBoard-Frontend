import { confirmAcount } from "@/services/AuthApi";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
  const navigate = useNavigate()
  const [token, setToken] = useState<string>('')

  const mutation = useMutation({
    mutationFn: confirmAcount,
      onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: (response) => {
        toast.success(response)
        navigate('/auth/login')
      }
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault()
    mutation.mutate(token)
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center text-fuchsia-600">Confirm your Account</h1>
      <p className="text-lg text-center text-gray-500 mt-4">
        Enter the code you received
        <span className="text-fuchsia-500 font-semibold"> by email</span>
      </p>

      <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <label
            className="text-lg font-medium text-gray-700 text-center"
            htmlFor="token"
          >
            6-digit Code
          </label>
          <input
            id="token"
            type="text"
            onChange={e => setToken(e.target.value)}
            placeholder="Enter your code"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-400 text-center text-lg tracking-widest"
          />
        </div>

        <input
          type="submit"
          value="Confirm Account"
          className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 rounded-md transition cursor-pointer"
        />
      </form>

      <nav className="mt-8 flex flex-col items-center">
        <Link
          to="/auth/new-code"
          className="text-sm text-fuchsia-600 hover:underline"
        >
          Request a new Code
        </Link>
      </nav>
    </>
  )
}  