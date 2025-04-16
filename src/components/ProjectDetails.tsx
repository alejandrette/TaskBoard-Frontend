import { Menu, Transition } from '@headlessui/react'
import { SlOptionsVertical } from 'react-icons/sl'
import { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject } from '@/services/ProjectApi';
import { toast } from 'react-toastify';
import { ProjectSchema } from '../types';

type ProjectDetailsProps = {
  project: ProjectSchema;
};

export default function ProjectDetails({ project }: ProjectDetailsProps) {

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (response) => {
      toast.success(response.message)
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    }
  })

  const handleClick = (projectId: ProjectSchema['_id']) => mutation.mutate(projectId)

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-2">
      <Menu as="div" className="absolute right-4 inset-y-0 flex items-center text-right">
        <div>
          <Menu.Button className="text-gray-500 hover:text-gray-700">
            <SlOptionsVertical className='text-2xl' />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none z-10">
          <div className="px-1 py-1">
          <Menu.Item>
              <Link to={`/project/${project._id}`}>
                <button
                  className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-blue-700 hover:bg-blue-100 hover:text-blue-800 transition"
                >
                  View Project
                </button>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to={`/project/${project._id}/edit`}>
                <button
                  className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-purple-700 hover:bg-purple-100 hover:text-purple-800 transition"
                >
                  Edit Project
                </button>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <button
                className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-700 hover:bg-red-100 hover:text-red-800 transition"
                onClick={() => handleClick(project._id)}
              >
                Delete Project
              </button>
            </Menu.Item>
          </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <h2 className="text-xl font-bold text-slate-800">{project.projectName}</h2>
      <p className="text-sm text-gray-500">Client: {project.clientName}</p>
      <p className="text-gray-700">{project.description}</p>
    </div>
  );
}
