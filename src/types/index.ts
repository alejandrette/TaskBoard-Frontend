export type ProjectSchema = {
  _id: string;
  projectName: string;
  clientName: string;
  description: string;
  tasks: TaskSchema[];
  manager: string;
  team: string[];
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
  completedBy: { user: { _id: string, name: string, email: string }; status: string }[];
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

export type NewPasswordForm = Pick<UserRegistrationForm, 'password' | 'password_confirmation'>

export type User = {
  _id: string;
  name: string;
  email: string;
}

export type NoteSchema = {
  _id: string;
  content: string;
  createBy: {
    _id: string;
    name: string;
    email: string;
  };
  task: string;
  createdAt: string;
};
