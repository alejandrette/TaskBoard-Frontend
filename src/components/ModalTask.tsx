import { getTaskById, updateStatus } from "@/services/ProjectApi";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { TaskSchema } from "../types";
import { toast } from "react-toastify";
import { ChangeEvent } from "react";

type ModalTaskProps = {
  closeModal: () => void;
}

const statusLabels: Record<string, string> = {
  pending: "Pending",
  onHold: "On Hold",
  inProgress: "In Progress",
  underReview: "Under Review",
  completed: "Completed",
};

export default function ModalTask({ closeModal }: ModalTaskProps) {
  const navigate = useNavigate()
  const { projectId } = useParams()
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const taskId = queryParams.get('viewTask')

  const { data } = useQuery<TaskSchema>({
    queryKey: ["viewTask", projectId, taskId],
    queryFn: () => getTaskById({ projectId: projectId!, taskId: taskId! }),
    retry: false,
  });

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (response) => {
      closeModal()
      queryClient.invalidateQueries({ queryKey: ["viewTask", projectId] })
      toast.success(response.message)
      navigate(`/project/${projectId}`)
    }
  })

  const createdDate = data?.createdAt ? new Date(data.createdAt).toLocaleDateString('es-ES') : '';
  const updatedDate = data?.updatedAt ? new Date(data.updatedAt).toLocaleDateString('es-ES') : '';

  const handleChange = (status: ChangeEvent<HTMLSelectElement>) => {
    const { value } = status.target; 
    mutation.mutate({ projectId: projectId!, taskId: taskId!, status: value })
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
                <p className="text-gray-500">
                  Add the {createdDate}
                </p>
                <p className="text-gray-500">
                  Update the {updatedDate}
                </p>

                <Dialog.Title as="h3" className="font-black text-4xl my-5">
                  {data?.name}
                </Dialog.Title>

                <p className="text-xl font-bold">
                  <span className="text-fuchsia-600">Description:</span> {data?.description}
                </p>

                <label className="text-xl font-bold text-fuchsia-600">
                  Change Status:&nbsp;
                </label>
                <select 
                  name="status" 
                  value={data?.status} 
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition"
                >
                  {Object.entries(statusLabels).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
