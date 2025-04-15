import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { projectSchema } from "types";

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
      throw new Error(error.response?.data.error)
    }
  }
}