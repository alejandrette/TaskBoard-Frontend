import api from "@/lib/axios"
import { NewPasswordForm, UserLoginForm, UserRegistrationForm } from "../types"
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

export const requestToken = async (email: string) => {
  try {
    const { data } = await api.post('/auth/request-token', {email})
    return data
  } catch (error) {
    if(isAxiosError(error)){
      throw new Error(error.response?.data.errors)
    }
  }
}

export const forgotPassword = async (email: string) => {
  try {
    const { data } = await api.post('/auth/forgot-password', {email})
    return data
  } catch (error) {
    if(isAxiosError(error)){
      throw new Error(error.response?.data.errors)
    }
  }
}

export const validToken = async (token: string) => {
  try {
    const { data } = await api.post('/auth/valid-token', {token})
    return data
  } catch (error) {
    if(isAxiosError(error)){
      console.log(error)
      throw new Error(error.response?.data.errors)
    }
  }
}

export const updatePassword = async ({formData, token}: {formData: NewPasswordForm, token: string}) => {
  try {
    const { data } = await api.post(`/auth/update-password/${token}`, formData)
    console.log(data)
    return data
  } catch (error) {
    if(isAxiosError(error)){
      console.log(error)
      throw new Error(error.response?.data.errors)
    }
  }
}