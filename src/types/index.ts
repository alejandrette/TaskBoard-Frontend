export type projectSchema = {
  _id: string;
  projectName: string;
  clientName: string;
  description: string;
}

export type taskSchema = {
  _id: string,
  name: string,
  description: string,
  status: string,
  project: string,
}

export type TaskInputSchema = Omit<taskSchema, '_id' | 'status' | 'project'>
