import api from "@/lib/axios"
import { NewPasswordForm, User, UserLoginForm, UserRegistrationForm } from "../types"
import { isAxiosError } from "axios"
import Cookies from 'js-cookie'

type updateCurrentPasswordProps = {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export const createAccount = async (formData: UserRegistrationForm) => {
  try {
    const { data } = await api.post('/auth/create-user', formData)
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.errors)
    }
  }
}

export const confirmAcount = async (token: string) => {
  try {
    const { data } = await api.post('/auth/confirm-user', { token })
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.errors)
    }
  }
}

export const loginAcount = async (formData: UserLoginForm) => {
  try {
    const { data } = await api.post('/auth/login', formData)
    Cookies.set('token', data, { expires: 7 })
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.errors)
    }
  }
}

export const requestToken = async (email: string) => {
  try {
    const { data } = await api.post('/auth/request-token', { email })
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.errors)
    }
  }
}

export const forgotPassword = async (email: string) => {
  try {
    const { data } = await api.post('/auth/forgot-password', { email })
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.errors)
    }
  }
}

export const validToken = async (token: string) => {
  try {
    const { data } = await api.post('/auth/valid-token', { token })
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.errors)
    }
  }
}

export const updatePassword = async ({ formData, token }: { formData: NewPasswordForm, token: string }) => {
  try {
    const { data } = await api.post(`/auth/update-password/${token}`, formData)
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.errors)
    }
  }
}

export const getUser = async () => {
  try {
    const { data } = await api.get<User>(`/auth/user`)
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.errors)
    }
  }
}

export const updateProfile = async ({ name, email }: Pick<User, 'name' | 'email'>) => {
  try {
    const { data } = await api.patch(`/auth/profile`, { name, email })
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.errors)
    }
  }
}

export const updateCurrentPassword = async ({ current_password, password, password_confirmation }: updateCurrentPasswordProps) => {
  try {
    const { data } = await api.patch(`/auth/update-password`, { current_password, password, password_confirmation })
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.errors)
    }
  }
}