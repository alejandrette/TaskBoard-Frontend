import api from "@/lib/axios";
import { projectSchema } from "types";

export async function createProject(formData: Omit<projectSchema, '_id'>) {
  try {
    const { data } = await api.post('/projects', formData)
    return data
  } catch (error) {
    console.error(error)
  }
}