import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { User } from "@/types/index"
import { useMutation } from "@tanstack/react-query"
import { updateProfile } from "@/services/AuthApi"
import { toast } from "react-toastify"

type ProfileFormProps = {
    data: User | undefined
}

export default function ProfileForm({ data }: ProfileFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: data })

    const mutation = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (response) => {
            toast.success(response)
        }
    })

    const handleEditProfile = (formData: User) => { mutation.mutate(formData) }

    return (
        <>
            <div className="mx-auto max-w-3xl">
                <h1 className="text-5xl font-black">My Profile</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Here you can update your personal information
                </p>

                <form
                    onSubmit={handleSubmit(handleEditProfile)}
                    className="mt-14 space-y-5 bg-white shadow-lg p-10 rounded-lg"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label htmlFor="name" className="text-sm uppercase font-bold">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            className="w-full p-3 border border-gray-200"
                            {...register("name", {
                                required: "Name is required",
                            })}
                        />
                        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                    </div>

                    <div className="mb-5 space-y-3">
                        <label htmlFor="email" className="text-sm uppercase font-bold">
                            E-mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Your Email"
                            className="w-full p-3 border border-gray-200"
                            {...register("email", {
                                required: "E-mail is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid e-mail address",
                                },
                            })}
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </div>

                    <input
                        type="submit"
                        value={mutation.isPending ? 'Saving' : 'Save Change'}
                        className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>

    )
}