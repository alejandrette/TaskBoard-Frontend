import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { UserLoginForm } from "@/types/index";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { loginAcount } from "@/services/AuthApi";

export default function Login() {
  const navigate = useNavigate()
  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  };
  
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

  const mutation = useMutation({
    mutationFn: loginAcount,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (response) => {
      toast.success(response)
      navigate('/')
    }
  })

  const handleLogin = (formData: UserLoginForm) => { mutation.mutate(formData) };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="space-y-6"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-semibold text-gray-700 text-lg">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
          {...register("email", {
            required: "The email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Email no valid",
            },
          })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-semibold text-gray-700 text-lg">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
          {...register("password", {
            required: "The password is required",
          })}
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
      </div>

      <input
        type="submit"
        value="Login"
        className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 rounded-md transition"
      />
      <Link 
        to='/auth/singup'
        className="block text-fuchsia-600 hover:text-fuchsia-700 font-semibold mt-4 transition"
      >
        If you don't have an account yet, register
      </Link>
    </form>
  );
}
