import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { NoteSchema, ProjectInputSchema, ProjectSchema, TaskInputSchema, TaskSchema } from "types";

type updateProjectProps = {
  formData: ProjectInputSchema;
  projectId: ProjectSchema['_id'];
}

type createTaskProps = {
  formData: TaskInputSchema;
  projectId: ProjectSchema['_id'];
}

type getTaskByIdProps = {
  projectId: ProjectSchema['_id'];
  taskId: TaskSchema['_id'];
}

type updateStatusProps = {
  projectId: ProjectSchema['_id'];
  taskId: TaskSchema['_id'];
  status: string;
}

type updateTaskProps = {
  formData: TaskInputSchema;
  projectId: ProjectSchema['_id'];
  taskId: TaskSchema['_id'];
}

type createNoteProps = {
  projectId: ProjectSchema['_id'];
  taskId: TaskSchema['_id'];
  noteId: NoteSchema['_id'];
  content: string;
}

export async function createProject(formData: ProjectInputSchema) {
  try {
    const { data } = await api.post('/projects', formData)
    return data
  } catch (error) {
    if(isAxiosError(error)){
      throw new Error(error.response?.data.error)
    }
  }
}

export async function getProjects() {
  try {
    const { data } = await api.get('/projects')
    return data
  } catch (error) {
    if(isAxiosError(error)){
      throw new Error(error.response?.data.errors)
    }
  }
}

export async function getProjectById(projectId: ProjectSchema['_id']) {
  try {
    const { data } = await api.get(`/projects/${projectId}`)
    return data
  } catch (error) {
    if(isAxiosError(error)){
      throw new Error(error.response?.data.errors)
    }
  }
}

export async function updateProject({ formData, projectId }: updateProjectProps) {
  try {
    const { data } = await api.put(`/projects/${projectId}`, formData)
    return data
  } catch (error) {
    if(isAxiosError(error)){
      throw new Error(error.response?.data.errors)
    }
  }
}

export async function deleteProject(projectId: ProjectSchema['_id']) {
  try {
    const { data } = await api.delete(`/projects/${projectId}`)
    return data
  } catch (error) {
    if(isAxiosError(error)){
      throw new Error(error.response?.data.errors)
    }
  }
}

export async function createTask({ formData, projectId }: createTaskProps) {
  try {
    const { data } = await api.post(`/projects/${projectId}/tasks`, formData)
    return data
  } catch (error) {
    if(isAxiosError(error)){
      throw new Error(error.response?.data.errors)
    }
  }
}

export async function getTaskById({ projectId, taskId }: getTaskByIdProps) {
  try {
    const { data } = await api.get(`/projects/${projectId}/tasks/${taskId}`)
    return data
  } catch (error) {
    if(isAxiosError(error)){
      throw new Error(error.response?.data.errors)
    }
  }
}

export async function updateTask({ formData, projectId, taskId }: updateTaskProps) {
  try {
    const { data } = await api.put(`/projects/${projectId}/tasks/${taskId}`, formData)
    return data
  } catch (error) {
    if(isAxiosError(error)){
      throw new Error(error.response?.data.errors)
    }
  }
}

export async function deleteTask({ projectId, taskId }: getTaskByIdProps) {
  try {
    const { data } = await api.delete(`/projects/${projectId}/tasks/${taskId}`)
    return data
  } catch (error) {
    if(isAxiosError(error)){
      throw new Error(error.response?.data.errors)
    }
  }
}

export async function updateStatus({ projectId, taskId, status }: updateStatusProps) {
  try {
    const { data } = await api.post(`/projects/${projectId}/tasks/${taskId}/status`, { status })
    return data
  } catch (error) {
    if(isAxiosError(error)){
      throw new Error(error.response?.data.errors[0].msg)
    }
  }
}

export async function createNote({ projectId, taskId, content }: createNoteProps) {
  try {
    const { data } = await api.post(`/projects/${projectId}/tasks/${taskId}/note`, { content } )
    return data
  } catch (error) {
    if(isAxiosError(error)){
      throw new Error(error.response?.data.errors[0].msg)
    }
  }
}

export async function getNotes({ projectId, taskId }: Pick<createNoteProps, 'projectId' | 'taskId'>) {
  try {
    const { data } = await api.get(`/projects/${projectId}/tasks/${taskId}/note`)
    return data
  } catch (error) {
    if(isAxiosError(error)){
      throw new Error(error.response?.data.errors)
    }
  }
}

export async function deleteNote({ projectId, taskId, noteId }: Pick<createNoteProps, 'projectId' | 'taskId' | 'noteId'>) {
  try {
    const { data } = await api.delete(`/projects/${projectId}/tasks/${taskId}/note/${noteId}`)
    return data
  } catch (error) {
    if(isAxiosError(error)){
      console.log(error)
      throw new Error(error.response?.data.errors)
    }
  }
}