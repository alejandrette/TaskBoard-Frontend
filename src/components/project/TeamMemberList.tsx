import { User } from "@/types/index";

type TeamMemberListProps = {
  members: User[];
};

export default function TeamMemberList({ members }: TeamMemberListProps) {
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
          className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm"
        >
          <div>
            <p className="text-lg font-semibold text-slate-800">{member.name}</p>
            <p className="text-sm text-gray-500">{member.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
