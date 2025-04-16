export type ProjectSchema = {
  _id: string;
  projectName: string;
  clientName: string;
  description: string;
  tasks: TaskSchema[];
}

export type ProjectInputSchema = Omit<ProjectSchema, '_id' | 'tasks'>

export type TaskSchema = {
  _id: string,
  name: string,
  description: string,
  status: string,
  project: string,
}

export type TaskInputSchema = Omit<TaskSchema, '_id' | 'status' | 'project'>
