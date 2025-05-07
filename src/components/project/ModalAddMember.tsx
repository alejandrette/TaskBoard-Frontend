import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { findMember } from "@/services/TeamApi";
import UserResult from "./UserResult";
import { User } from "@/types/index";

type ModalAddMemberProps = {
  closeModal: () => void;
};

type FormData = {
  email: string;
};

export default function ModalAddMember({ closeModal }: ModalAddMemberProps) {
  const { projectId } = useParams()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const [user, setUser] = useState<User | null>()

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: findMember,
    onError: (error) => {
      setUser(null)
      toast.error(error.message)
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["viewTask", projectId] });
      setUser(response)
    },
  });

  const handleForm = (formData: FormData) => {
    if (!projectId) return toast.error("Missing project ID");

    mutation.mutate({
      email: formData.email,
      projectId,
    });
  };

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
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-3xl font-bold mb-4">
                  Add Collaborator
                </Dialog.Title>

                <p className="text-lg mb-6">
                  Enter the <span className="text-fuchsia-600">email</span> of the user you want to invite.
                </p>

                <form onSubmit={handleSubmit(handleForm)} noValidate>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-fuchsia-500"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={closeModal}
                      type="button"
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-semibold rounded-lg transition"
                    >
                      Find
                    </button>
                  </div>
                </form>
                {user && <UserResult user={user} closeModal={closeModal} />}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
