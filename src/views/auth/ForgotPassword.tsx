import { forgotPassword } from "@/services/AuthApi"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

type ForgotPasswordForm = {
  email: string
}

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordForm>()

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (response) => {
      toast.success(response)
    }
  })

  const onSubmit = (data: ForgotPasswordForm) => { mutation.mutate(data.email) }

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-fuchsia-600">Forgot Password</h1>
      <p className="text-gray-500 text-center mt-2">
        Enter your email and we`ll send you a reset link
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5" noValidate>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-fuchsia-500 focus:border-fuchsia-500"
            placeholder="you@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address"
              }
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
        >
          Send Reset Link
        </button>
      </form>
    </>
  )
}
