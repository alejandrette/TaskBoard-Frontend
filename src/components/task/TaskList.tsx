import { ProjectSchema, TaskSchema } from "@/types/index";
import { Dispatch } from "react";
import TaskCard from "./TaskCard";
import DropTask from "./DropTask";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { updateStatus } from "@/services/ProjectApi";

type TaskListProps = {
  tasks: TaskSchema[];
  setIsModalEditOpen: Dispatch<React.SetStateAction<boolean>>
  setIsModalTask: Dispatch<React.SetStateAction<boolean>>
}

type GroupTask = {
  [key: string]: TaskSchema[]
}

const initialStatusGroups: GroupTask = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
}

const statusLabels: Record<string, string> = {
  pending: "Pending",
  onHold: "On Hold",
  inProgress: "In Progress",
  underReview: "Under Review",
  completed: "Completed",
};

const statusStyles: Record<string, string> = {
  pending: "border-t-slate-500",
  onHold: "border-t-red-500",
  inProgress: "border-t-blue-500",
  underReview: "border-t-amber-500",
  completed: "border-t-emerald-500",
};

export default function TaskList({ tasks, setIsModalEditOpen, setIsModalTask }: TaskListProps) {
  const { projectId } = useParams()

  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task]
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (response) => {
      toast.success(response.message)
    }
  })

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    mutation.mutate({ projectId: projectId!, taskId: String(active.id), status: String(over.id) })
    queryClient.setQueryData(["viewTask", projectId], (oldData: {data: ProjectSchema}) => {
      console.log("oldData", oldData)
      const updatedTasks = oldData.data.tasks.map((task: TaskSchema) => {
        if (task._id === active.id.toString()) {
          return { ...task, status: String(over.id) };
        }
        return task;
      });
      return { ...oldData, data: { ...oldData.data, tasks: updatedTasks } };
    });
  };

  return (
    <>
      <h2 className="text-3xl font-bold my-8 text-slate-800">Task Board</h2>

        <div className="flex gap-6 pb-10">
          <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div
              key={status}
              className='bg-gray-100 rounded-lg shadow-md w-full'
            >
              <h3 className={`text-lg font-semibold text-slate-700 border-slate-700 p-3 border-t-8 ${statusStyles[status]}`}>
                {statusLabels[status]}
              </h3>
              <DropTask status={status} />
              <ul className="space-y-4">
                {tasks.length === 0 ? (
                  <li className="text-gray-400 text-center">No tasks</li>
                ) : (
                  tasks.map((task) => <TaskCard key={task._id} task={task} setIsModalEditOpen={setIsModalEditOpen} setIsModalTask={setIsModalTask} />)
                )}
              </ul>
            </div>
          ))}
      </DndContext>
        </div>
    </>
  )
}
