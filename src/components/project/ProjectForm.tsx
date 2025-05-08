import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { ProjectInputSchema } from "@/types/index";

type ProjectFormProps = {
  register: UseFormRegister<ProjectInputSchema>;
  errors: FieldErrors<ProjectInputSchema>;
};

export default function ProjectForm({ register, errors }: ProjectFormProps) {
  return (
    <>
      <div className="space-y-2">
        <label htmlFor="projectName" className="block text-sm font-bold text-slate-700 uppercase">
          Project Name
        </label>
        <input
          id="projectName"
          type="text"
          placeholder="Enter project name"
          className="w-full border border-gray-300 p-3 rounded-md"
          {...register("projectName", {
            required: "Project name is required",
          })}
        />
        {errors.projectName && <ErrorMessage>{errors.projectName.message}</ErrorMessage>}
      </div>

      <div className="space-y-2">
        <label htmlFor="clientName" className="block text-sm font-bold text-slate-700 uppercase">
          Client Name
        </label>
        <input
          id="clientName"
          type="text"
          placeholder="Enter client name"
          className="w-full border border-gray-300 p-3 rounded-md"
          {...register("clientName", {
            required: "Client name is required",
          })}
        />
        {errors.clientName && <ErrorMessage>{errors.clientName.message}</ErrorMessage>}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-bold text-slate-700 uppercase">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Enter project description"
          className="w-full border border-gray-300 p-3 rounded-md h-28 resize-none"
          {...register("description", {
            required: "Project description is required",
          })}
        />
        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
      </div>
    </>
  );
}
