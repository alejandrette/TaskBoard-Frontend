import NewPasswordForm from "@/components/auth/NewPasswordForm"
import NewPasswordToken from "@/components/auth/NewPasswordToken"
import { useState } from "react"

export default function ResetPassword() {
  const [isValidToken, setIsValidToken] = useState(false)
  const [token, setToken] = useState('')

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-fuchsia-600 mb-4">
        Reset Your Password
      </h1>
      <p className="text-center text-gray-500 mb-6">
        Enter the code sent to your email and then set a new password.
      </p>

      {isValidToken ? (
        <NewPasswordForm token={token} />
      ) : (
        <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} />
      )}
    </>
  )
}
