import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { projectSchema } from "types";

type updateProjectProps = {
  formData: Omit<projectSchema, '_id'>;
  projectId: string;
}

export async function createProject(formData: Omit<projectSchema, '_id'>) {
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

export async function getProjectById(projectId: projectSchema['_id']) {
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

export async function deleteProject(projectId: projectSchema['_id']) {
  try {
    const { data } = await api.delete(`/projects/${projectId}`)
    return data
  } catch (error) {
    if(isAxiosError(error)){
      throw new Error(error.response?.data.errors)
    }
  }
}