import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Dispatch, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteTask } from "@/services/ProjectApi";
import { ProjectSchema, TaskSchema } from "@/types/index";
import { useDraggable } from "@dnd-kit/core";

type TaskCardProps = {
  task: TaskSchema;
  setIsModalEditOpen: Dispatch<React.SetStateAction<boolean>>
  setIsModalTask: Dispatch<React.SetStateAction<boolean>>
}

export default function TaskCard({ task, setIsModalEditOpen, setIsModalTask }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id
  })
  const navigate = useNavigate()
  const projectId = useParams().projectId!;

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: deleteTask,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (response) => {
      toast.success(response.message)
      queryClient.invalidateQueries({ queryKey: ["viewTask", projectId] })
    }
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    padding: '1.25rem',
    backgroundColor: '#FFF',
    with: '300%',
    display: 'flex',
    borderWidth: '1px',
    borderColor: 'border-slate-300'
  } : undefined

  const handleClick = (projectId: ProjectSchema['_id'], taskId: TaskSchema['_id']) => mutation.mutate({ projectId, taskId })

  return (
    <li className="bg-white border rounded-md p-4 shadow-sm relative group transition hover:shadow-lg">
      <div 
        {...listeners}
        {...attributes}
        ref={setNodeRef}
        style={style}
        className="space-y-2"
      >
        <h4 className="font-bold text-slate-800 text-md cursor-pointer">{task.name}</h4>
        <p className="text-sm text-gray-500">{task.description}</p>
      </div>

      <div className="absolute top-2 right-2">
        <Menu as="div" className="relative flex-none">
            <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
              <span className="sr-only">options</span>
              <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                className="absolute right-0 z-50 w-56 origin-top-right transform bg-white py-2 shadow-lg ring-1 ring-black/5">
                <Menu.Item>
                  <button 
                    type='button' 
                    className='block px-3 py-1 text-sm leading-6 text-gray-900'
                    onClick={() => {navigate(`${location.pathname}?viewTask=${task._id}`); setIsModalTask(true)}}
                  >
                    View Task
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button 
                    type='button' 
                    className='block px-3 py-1 text-sm leading-6 text-gray-900'
                    onClick={() => {navigate(`${location.pathname}?editTask=${task._id}`); setIsModalEditOpen(true)}}
                  >
                    Edit Task
                  </button>
                </Menu.Item>

                <Menu.Item>
                  <button 
                    type='button' className='block px-3 py-1 text-sm leading-6 text-red-500'
                    onClick={() => handleClick(projectId, task._id)} 
                  >
                    Delete Task
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Transition>
        </Menu>
      </div>
    </li>
  )
}
