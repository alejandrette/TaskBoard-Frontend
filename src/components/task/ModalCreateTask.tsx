import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import TaskForm from "./TaskForm";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/services/ProjectApi";
import { TaskInputSchema } from "@/types/index";

type AddTaskModalProps = {
  closeModal: () => void;
};

export default function AddTaskModal({ closeModal }: AddTaskModalProps) {
  const { projectId } = useParams()
  const initialValues = {
    projectName: '',
    clientName: '',
    description: ''
  }

  const {register, handleSubmit, formState: {errors}} = useForm<TaskInputSchema>({ defaultValues: initialValues })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createTask,
    onError: (error) => {
      toast.error(error.message)
      closeModal()
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["viewTask", projectId] })
      toast.success(response.message)
      closeModal()
    }
  })

  const handleForm = (formData: TaskInputSchema) => {
    if (!projectId) return toast.error('Missing project ID')
    
    mutation.mutate({
      formData,
      projectId 
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
                  New Task
                </Dialog.Title>

                <p className="text-xl font-bold">
                  Fill out the form and  {''}
                  <span className="text-fuchsia-600">create a task</span>
                </p>

                <form 
                  onSubmit={handleSubmit(handleForm)} 
                  noValidate 
                >
                  <TaskForm register={register} errors={errors} />
            
                  <div className="mt-10 flex justify-between items-center">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>

                    <button
                      className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition"
                    >
                      Create Task
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
