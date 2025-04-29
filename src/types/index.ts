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
  createdAt: string;
  updatedAt: string;
}

export type TaskInputSchema = Omit<TaskSchema, '_id' | 'status' | 'project'>

export type UserLoginForm = {
  email: string;
  password: string;
}

export type UserRegistrationForm = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}