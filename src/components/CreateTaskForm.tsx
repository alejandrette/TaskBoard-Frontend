import { FieldErrors, UseFormRegister } from "react-hook-form"
import ErrorMessage from "./ErrorMessage";
import { TaskInputSchema } from "../types";

type CreateTaskFormProps = {
  errors: FieldErrors<TaskInputSchema>;
  register: UseFormRegister<TaskInputSchema>;
}

export default function CreateTaskForm({errors, register}: CreateTaskFormProps) {
    return (
        <>
            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="name"
                >Task name</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Task name"
                    className="w-full p-3  border-gray-300 border"
                    {...register("name", {
                        required: "The task name is required",
                    })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="description"
                >Task description</label>
                <textarea
                    id="description"
                    placeholder="Task description"
                    className="w-full p-3  border-gray-300 border"
                    {...register("description", {
                        required: "The task description is mandatory"
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}