import { getTaskById, updateTask } from "@/services/ProjectApi";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Fragment } from "react/jsx-runtime";
import { TaskInputSchema } from "../types";
import TaskForm from "./TaskForm";
import { useEffect } from "react";

type EditTaskModalProps = {
  closeModal: () => void;
}

export default function EditTaskModal({ closeModal }: EditTaskModalProps) {
  const projectId = useParams().projectId!;

  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const taskId = queryParams.get('editTask')!

  const { data } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById({ projectId, taskId })
  })
  
  const {register, handleSubmit, formState: {errors}, reset} = useForm<TaskInputSchema>({ defaultValues: {
    name: data?.name || '',
    description: data?.description || ''
  }})

  useEffect(() => {
    if (data) {
      reset({
        name: data?.name,
        description: data?.description
      })
    }
  }, [data, reset])

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: updateTask,
    onError: (error) => {
      toast.error(error.message)
      closeModal()
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ["viewTask", projectId] })
      toast.success(response.message)
      closeModal()
    }
  })

  const handleForm = (formData: TaskInputSchema) => {
    if (!taskId) return toast.error('Missing task ID')

    mutation.mutate({
      formData,
      projectId,
      taskId
    })
  }

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-10">
                <Dialog.Title as="h3" className="font-black text-4xl my-5">
                  Edit Task
                </Dialog.Title>

                <p className="text-xl font-bold">
                  Fill out the form and  {''}
                  <span className="text-fuchsia-600">edit task</span>
                </p>

                <form 
                  onSubmit={handleSubmit(handleForm)} 
                  noValidate 
                >
                  <TaskForm register={register} errors={errors} />
            
                  <div className="mt-10 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
