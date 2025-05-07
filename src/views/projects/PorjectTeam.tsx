import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RiUserAddLine } from "react-icons/ri";
import ModalAddMember from "@/components/project/ModalAddMember";
import { useQuery } from "@tanstack/react-query";
import { getMembers } from "@/services/TeamApi";
import { User } from "@/types/index";
import { ClipLoader } from "react-spinners";
import TeamMemberList from "@/components/project/TeamMemberList";

export default function ProjectTeam() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { projectId } = useParams()

  const { isPending, data: members } = useQuery<User[]>({
    queryKey: ['team', projectId],
    queryFn: () => getMembers(projectId!)
  })

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6 bg-white p-6 rounded shadow-md border border-gray-200">
      <div className="flex justify-start">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-slate-800 font-medium transition"
        >
          ← Back to Project
        </button>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-slate-800">Project Team</h1>
        <p className="text-gray-600 mt-2">
          Manage your project collaborators. Here you can view and add members who will work on this project.
        </p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-lg font-semibold transition"
        >
          <RiUserAddLine className="text-lg" />
          Add Collaborator
        </button>
      </div>

      {isPending ? <ClipLoader color="#6b21a8" size={40} /> : <TeamMemberList members={members ?? []} />}

      {isModalOpen && <ModalAddMember closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
}
