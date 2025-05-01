import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/services/AuthApi";
import { toast } from "react-toastify";
import { NewPasswordForm } from "@/types/index";

type NewPasswordFormProps ={
  token: string;
}

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
  const navigate = useNavigate()
  const initialValues: NewPasswordForm = {
    password: '',
    password_confirmation: '',
  }
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  const mutation = useMutation({
    mutationFn: updatePassword,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (response) => {
      toast.success(response)
      reset()
      navigate('/auth/login')
    }
  })

  const handleNewPassword = (formData: NewPasswordForm) => {
    console.log({ formData, token })
    mutation.mutate({ formData, token })
  }

  const password = watch('password');

  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="space-y-6"
        noValidate
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            placeholder="Your new password"
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-fuchsia-500"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters"
              }
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            placeholder="Repeat your password"
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-fuchsia-500"
            {...register("password_confirmation", {
              required: "Please confirm your password",
              validate: value => value === password || "Passwords do not match"
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Set New Password"
          className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 rounded-md cursor-pointer"
        />
      </form>
    </>
  )
}