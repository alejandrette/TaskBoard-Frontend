import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/services/AuthApi";
import { toast } from "react-toastify";

export default function Singup() {
  const navigate = useNavigate()

  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const password = watch('password');

  const mutation = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleRegister = (formData: UserRegistrationForm) => { 
    mutation.mutate(formData, {
      onSuccess: (response) => {
        toast.success(response)
        navigate('/auth/confirm-account', { state: { email: formData.email }})
      }
    }) 
  }

  return (
    <>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800">
        Singup
      </h1>
      <p className="text-base sm:text-lg text-center text-gray-500 mt-2">
        Fill out the form to{' '}
        <span className="text-fuchsia-600 font-semibold">create your account</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-6 mt-8"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Registration Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            {...register("email", {
              required: "Registration Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail not valid",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">
            Name
          </label>
          <input
            type="text"
            placeholder="Registration Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            {...register("name", {
              required: "Username is required",
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Registration Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: 'The password must be at least 8 characters long'
              }
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">
            Confirmation Password
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Confirmation Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            {...register("password_confirmation", {
              required: "Repeat Password is mandatory",
              validate: value => value === password || 'Passwords are not the same'
            })}
          />
          {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value="Singup"
          className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 rounded-md transition duration-300"
        />
        <Link
          to='/auth/login'
          className="block text-fuchsia-600 hover:text-fuchsia-700 font-semibold mt-4 transition"
        >
          If you already have an account, login
        </Link>
      </form>
    </>
  )
}