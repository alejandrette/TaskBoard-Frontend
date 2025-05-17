import { getTaskById, updateStatus } from "@/services/ProjectApi";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { toast } from "react-toastify";
import { ChangeEvent } from "react";
import { TaskSchema } from "@/types/index";
import NoteForm from "./NoteForm";

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
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">Created: {createdDate}</p>
                    <p className="text-sm text-gray-400">Updated: {updatedDate}</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                  >
                    ×
                  </button>
                </div>

                <Dialog.Title as="h3" className="text-3xl font-bold text-gray-800">
                  {data?.name}
                </Dialog.Title>

                <div>
                  <h4 className="text-lg font-semibold text-fuchsia-600 mb-1">Description</h4>
                  <p className="text-gray-700">{data?.description}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-fuchsia-600 mb-1">Status Updated By</h4>
                  <ul className="text-gray-700 list-disc list-inside space-y-1">
                    {data?.completedBy.map((entry, index) => (
                      <li key={index}>
                        <span className="font-medium">{entry.user.name}</span>: {statusLabels[entry.status] ?? entry.status}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <label htmlFor="status" className="block text-lg font-semibold text-fuchsia-600 mb-2">
                    Change Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={data?.status}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                  >
                    {Object.entries(statusLabels).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <NoteForm />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
