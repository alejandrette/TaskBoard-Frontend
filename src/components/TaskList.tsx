import { TaskSchema } from "../types";


type TaskListProps = {
  tasks: TaskSchema[];
}

export default function TaskList({ tasks }: TaskListProps) {

  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task]
    return { ...acc, [task.status]: currentGroup };
  }, []);

  return (
    <div>
      
    </div>
  )
}
