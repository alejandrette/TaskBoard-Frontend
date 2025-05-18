import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { updateCurrentPassword } from "@/services/AuthApi";
import { toast } from "react-toastify";

type FormData = {
  current_password: string;
  password: string;
  password_confirmation: string;
};

export default function ChangePasswordForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const password = watch("password");

  const mutation = useMutation({
    mutationFn: updateCurrentPassword,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (response) => {
      toast.success(response)
    }
  })

  const handleChangePassword = (formData: FormData) => {
    console.log(formData);
    mutation.mutate(formData)
  };

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl font-black">Change Password</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Use this form to update your current password
        </p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="mt-14 space-y-5 bg-white shadow-lg p-10 rounded-lg"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label htmlFor="current_password" className="text-sm uppercase font-bold">
              Current Password
            </label>
            <input
              id="current_password"
              type="password"
              placeholder="Your Current Password"
              className="w-full p-3 border border-gray-200"
              {...register("current_password", {
                required: "Current password is required",
              })}
            />
            {errors.current_password && (
              <ErrorMessage>{errors.current_password.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label htmlFor="password" className="text-sm uppercase font-bold">
              New Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Your New Password"
              className="w-full p-3 border border-gray-200"
              {...register("password", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label htmlFor="password_confirmation" className="text-sm uppercase font-bold">
              Confirm Password
            </label>
            <input
              id="password_confirmation"
              type="password"
              placeholder="Repeat New Password"
              className="w-full p-3 border border-gray-200"
              {...register("password_confirmation", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
            />
            {errors.password_confirmation && (
              <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value="Update Password"
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
