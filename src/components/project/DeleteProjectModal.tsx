import { Dispatch, Fragment, SetStateAction } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject } from '@/services/ProjectApi';
import { toast } from 'react-toastify';
import { ProjectSchema } from '@/types/index';
import { checkPassword } from '@/services/AuthApi';

type DeleteProjectModalProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>
  deleteProjectId: ProjectSchema['_id']
}

export default function DeleteProjectModal({ setShowModal, deleteProjectId }: DeleteProjectModalProps) {
  const initialValues = {
    password: ''
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: checkPassword,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (response) => {
      toast.success(response)
      deleteProjectFn.mutate(deleteProjectId)
    }
  })

  const deleteProjectFn  = useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (response) => {
      toast.success(response.message)
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      setShowModal(false)
    }
  })

  const handleForm = async (formData: { password: string }) => { mutation.mutate(formData) }

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setShowModal(false)}>
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
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">

                <Dialog.Title
                  as="h3"
                  className="font-black text-4xl  my-5"
                >Eliminar Proyecto </Dialog.Title>

                <p className="text-xl font-bold">Confirma la eliminación del proyecto {''}
                  <span className="text-fuchsia-600">colocando tu password</span>
                </p>

                <form
                  className="mt-10 space-y-5"
                  onSubmit={handleSubmit(handleForm)}
                  noValidate
                >

                  <div className="flex flex-col gap-3">
                    <label
                      className="font-normal text-2xl"
                      htmlFor="password"
                    >Password</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Password Inicio de Sesión"
                      className="w-full p-3  border-gray-300 border"
                      {...register("password", {
                        required: "El password es obligatorio",
                      })}
                    />
                    {errors.password && (
                      <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                  </div>

                  <input
                    type="submit"
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                    value='Eliminar Proyecto'
                  />
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}