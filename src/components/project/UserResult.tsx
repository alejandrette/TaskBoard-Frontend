import { addMember } from '@/services/TeamApi'
import { User } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

type UserResultProps = {
  user: User;
  closeModal: () => void;
}

export default function UserResult({ user, closeModal }: UserResultProps) {
  const [loading, setLoading] = useState(false)
  const { projectId } = useParams()

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addMember,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['team', projectId] }); 
      setLoading(true)
      closeModal()
      toast.success(response.message)
    },
  });

  const handleAdd = () => {
    if (!projectId) return toast.error("Missing project ID");

    mutation.mutate({
      id: user._id,
      projectId,
    });
  };

  return (
    <div className="flex justify-between items-center bg-gray-50 border rounded-lg p-4 shadow-sm mt-4">
      <div>
        <p className="text-lg font-semibold text-slate-800">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      <button
        onClick={handleAdd}
        disabled={loading}
        className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Adding...' : 'Add to Team'}
      </button>
    </div>
  )
}
