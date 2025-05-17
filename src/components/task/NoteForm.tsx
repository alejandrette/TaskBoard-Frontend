import { createNote } from "@/services/ProjectApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function NoteForm() {
  const { projectId } = useParams()
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const taskId = queryParams.get("viewTask");

  const [ content, setContent ] = useState('')
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({queryKey: ["viewNotes", projectId, taskId]})
      setContent('')
    },
    onError: (error) => {
      toast.error(error.message);
    },
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!projectId || !taskId) {
      toast.error("Missing project or task ID")
      return
    }

    mutation.mutate({projectId, taskId, content})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="note" className="block text-lg font-semibold text-fuchsia-600">
        Add a Note
      </label>
      <textarea
        id="note"
        name="note"
        rows={1}
        className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-fuchsia-600 text-white px-4 py-2 rounded-md hover:bg-fuchsia-700 disabled:opacity-50"
      >
        {mutation.isPending ? "Saving..." : "Save Note"}
      </button>
    </form>
  );
}
