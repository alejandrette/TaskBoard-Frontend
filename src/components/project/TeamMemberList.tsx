import { User } from "@/types/index";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { SlOptionsVertical } from "react-icons/sl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMember } from "@/services/TeamApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

type TeamMemberListProps = {
  members: User[];
};

export default function TeamMemberList({ members }: TeamMemberListProps) {
  const { projectId } = useParams()
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteMember,
      onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (response) => {
      toast.success(response.message)
      queryClient.invalidateQueries({ queryKey: ['team', projectId] });
    },
  })

  const handleClick = (id: string) => {
    if (!projectId) return toast.error("Missing project ID");
    console.log({ projectId, id })
    mutation.mutate({ 
      projectId, 
      id 
    })
  }

  if (members.length === 0) {
    return (
      <div className="mt-6 text-center text-gray-500">
        No team members found.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {members.map((member) => (
        <div
          key={member._id}
          className="relative flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm"
        >
          <div>
            <p className="text-lg font-semibold text-slate-800">{member.name}</p>
            <p className="text-sm text-gray-500">{member.email}</p>
          </div>

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="text-gray-500 hover:text-gray-700">
                <SlOptionsVertical className="text-xl" />
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
                      <button
                        onClick={() => handleClick(member._id)}
                        className="hover:bg-red-100 text-red-800 hover:text-red-700 group flex w-full items-center rounded-md px-2 py-2 text-sm transition"
                      >
                        Delete Member
                      </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      ))}
    </div>
  );
}
