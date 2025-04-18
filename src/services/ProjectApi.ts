import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ProjectInputSchema, ProjectSchema, TaskInputSchema, TaskSchema } from "types";

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


type updateTaskProps = {
  formData: TaskInputSchema;
  projectId: ProjectSchema['_id'];
  taskId: TaskSchema['_id'];
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