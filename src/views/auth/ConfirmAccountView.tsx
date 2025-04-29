import { confirmAcount, requestToken } from "@/services/AuthApi";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const email = searchParams.get('email') || (location.state as { email?: string })?.email
  const [token, setToken] = useState<string>('')

  const handleChange = (token: string) => {
    setToken(token)
  }

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

  const mutationEmail = useMutation({
    mutationFn: requestToken,
    onError: (error) => {
      console.log(error)
      toast.error(error.message)
    },
    onSuccess: (response) => {
      toast.success(response)
    }
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate(token)
  }

  const handleComplete = (completeToken: string) => { mutation.mutate(completeToken) }

  const handleClick = () => { 
    if (!email) {
      toast.error("Missing email in URL")
      return
    }
  
    mutationEmail.mutate(email)
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
          <div className="flex justify-center gap-3">
            <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
              <PinInputField className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg focus:border-fuchsia-500 focus:outline-none" />
              <PinInputField className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg focus:border-fuchsia-500 focus:outline-none" />
              <PinInputField className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg focus:border-fuchsia-500 focus:outline-none" />
              <PinInputField className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg focus:border-fuchsia-500 focus:outline-none" />
              <PinInputField className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg focus:border-fuchsia-500 focus:outline-none" />
              <PinInputField className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg focus:border-fuchsia-500 focus:outline-none" />
            </PinInput>
          </div>
        </div>

        <input
          type="submit"
          value="Confirm Account"
          className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 rounded-md transition cursor-pointer"
        />
      </form>

      <nav className="mt-8 flex flex-col items-center">
        <button
          onClick={handleClick}
          disabled={!email}
          className="text-sm text-fuchsia-600 hover:underline"
        >
          Request a new Code
        </button>
      </nav>
    </>
  )
}  