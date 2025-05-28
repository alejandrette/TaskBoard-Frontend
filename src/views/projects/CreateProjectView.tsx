import ProjectForm from "@/components/project/ProjectForm";
import { createProject } from "@/services/ProjectApi";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProjectInputSchema } from "types";

export default function CreateProjectView() {
  const navigate = useNavigate()
  const initialValues: ProjectInputSchema = {
    projectName: '',
    clientName: '',
    description: '',
    manager: '',
    team: []
  }

  const {register, handleSubmit, formState: {errors}} = useForm<ProjectInputSchema>({ defaultValues: initialValues })

  const mutation = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (response) => {
      toast.success(response.message)
      navigate('/')
    }
  })

  const handleForm = (data: ProjectInputSchema) => mutation.mutate(data)

  return (
    <>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">Create Project</h1>
        <p className="text-gray-500">Fill in the following form to create a new project.</p>
      </div>

      <div className="flex justify-between items-center">
        <Link to="/">
          <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-slate-800 font-medium transition">
            ← Back
          </button>
        </Link>
      </div>

      <form 
        onSubmit={handleSubmit(handleForm)} 
        noValidate 
        className="bg-white p-6 shadow-md rounded-lg space-y-6"
      >
        <ProjectForm register={register} errors={errors} />

        <div className="text-right">
          <button className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition">
            Create Project
          </button>
        </div>
      </form>
    </>
  )
}
