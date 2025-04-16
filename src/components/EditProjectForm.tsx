import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import { projectSchema } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/services/ProjectApi";
import { toast } from "react-toastify";

type EditProjectFormProps = {
  project: projectSchema;
  projectId: string | undefined
}

export default function EditProjectForm({ project, projectId }: EditProjectFormProps) {
  const navigate = useNavigate()
  const initialValues: Omit<projectSchema, '_id'> = {
      projectName: project.projectName,
      clientName: project.clientName,
      description: project.description
    }
  
  const {register, handleSubmit, formState: {errors}} = useForm({ defaultValues: initialValues })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['editProject', projectId] })
      toast.success(response.message)
      navigate('/')
    }
  })

  const handleForm = (formData: Omit<projectSchema, '_id'>) => {
    if (!projectId) return toast.error('Missing project ID')
      
    mutation.mutate({
      formData,
      projectId 
    })
  }

  return (
    <>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">Edit Project</h1>
        <p className="text-gray-500">Fill in the following form to edit project.</p>
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
            Save Change
          </button>
        </div>
      </form>
    </>
  )
}
