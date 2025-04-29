import api from "@/lib/axios"
import { UserLoginForm, UserRegistrationForm } from "../types"
import { isAxiosError } from "axios"

export const createAccount = async (formData: UserRegistrationForm) => {
  try {
    const { data } = await api.post('/auth/create-user', formData)
    return data
  } catch (error) {
    if(isAxiosError(error)){
      throw new Error(error.response?.data.errors)
    }
  }
}

export const confirmAcount = async (token: string) => {
  try {
    const { data } = await api.post('/auth/confirm-user', { token })
    return data
  } catch (error) {
    if(isAxiosError(error)){
      throw new Error(error.response?.data.errors)
    }
  }
}

export const loginAcount = async (formData: UserLoginForm) => {
  try {
    const { data } = await api.post('/auth/login', formData)
    return data
  } catch (error) {
    if(isAxiosError(error)){
      throw new Error(error.response?.data.errors)
    }
  }
}