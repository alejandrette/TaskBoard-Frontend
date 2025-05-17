import { useAuth } from "@/hooks/useAuth";
import { deleteNote } from "@/services/ProjectApi";
import { NoteSchema, ProjectSchema, TaskSchema } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

type NoteListProps = {
  notes: NoteSchema[];
  projectId: ProjectSchema['_id'];
  taskId: TaskSchema['_id'];
};

export default function NoteList({ notes, projectId, taskId }: NoteListProps) {
  const queryClient = useQueryClient()

  const { data: user } = useAuth()
  const mutation = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (response) => {
      toast.success(response.message)
      queryClient.invalidateQueries({ queryKey: ["viewNotes", projectId, taskId], })
    }
  })

  if (!notes || notes.length === 0) {
    return (
      <div>
        <h4 className="text-lg font-semibold text-fuchsia-600 mb-1">Notes</h4>
        <p className="text-gray-500 italic">No notes added yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-lg font-semibold text-fuchsia-600 mb-1">Notes</h4>
      <ul className="space-y-4">
        {notes.map(note => (
          <li
            key={note._id}
            className="border border-gray-200 rounded-md p-4 bg-gray-50 flex items-center justify-between"
          >
            <div>
              <p className="text-gray-700">{note.content}</p>
              <div className="mt-2 text-sm text-gray-500">
                By <span className="font-medium">{note.createBy.name}</span> on{" "}
                {new Date(note.createdAt).toLocaleDateString("es-ES")}
              </div>
            </div>

            {user?._id === note.createBy._id && (
              <>
                <button
                  onClick={() => mutation.mutate({ projectId, taskId, noteId: note._id })}
                  className="text-gray-400 hover:text-red-600 transition-colors ml-4"
                  aria-label="Delete note"
                >
                  <FaTrash size={18} />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
