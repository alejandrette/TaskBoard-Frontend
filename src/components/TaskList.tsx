import { Dispatch } from "react";
import { TaskSchema } from "../types";
import TaskCard from "./TaskCard";

type TaskListProps = {
  tasks: TaskSchema[];
  setIsModalEditOpen: Dispatch<React.SetStateAction<boolean>>
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

export default function TaskList({ tasks, setIsModalEditOpen }: TaskListProps) {

  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task]
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);

  return (
    <>
      <h2 className="text-3xl font-bold my-8 text-slate-800">Task Board</h2>

      <div className="flex gap-6 pb-10">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div
            key={status}
            className='bg-gray-100 rounded-lg shadow-md w-full'
          >
            <h3 className={`text-lg font-semibold text-slate-700 border-slate-700 p-3 border-t-8 ${statusStyles[status]}`}>
              {statusLabels[status]}
            </h3>

            <ul className="space-y-4">
              {tasks.length === 0 ? (
                <li className="text-gray-400 text-center">No tasks</li>
              ) : (
                tasks.map((task) => <TaskCard key={task._id} task={task} setIsModalEditOpen={setIsModalEditOpen} />)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}
