import { isAxiosError } from "axios";
import { ProjectSchema, User } from "../types";
import api from "@/lib/axios";

type findMemberProps = {
  email: User['email'];
  projectId: ProjectSchema['_id'];
}

type addMemberProps = {
  id: User['_id'];
  projectId: ProjectSchema['_id'];
}

export async function findMember({ projectId, email }: findMemberProps) {
  try {
    const { data } = await api.post(`/projects/${projectId}/team/find`, {email})
    return data
  } catch (error) {
    if(isAxiosError(error)){
      throw new Error(error.response?.data.errors)
    }
  }
}

export async function addMember({ projectId, id }: addMemberProps) {
  try {
    const { data } = await api.post(`/projects/${projectId}/team`, {id})
    console.log(data)
    return data
  } catch (error) {
    if(isAxiosError(error)){
      console.log(error)
      throw new Error(error.response?.data.errors)
    }
  }
}