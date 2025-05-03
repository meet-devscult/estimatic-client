
import axiosInstance, { endpoints } from "@/lib/axios"
import { redirect } from "next/navigation"

interface LoginParams {
    email: string
    password: string
}

export async function loginAction({ email, password }: LoginParams) {
    const response = await axiosInstance.post(endpoints.auth.login, {
        email,
        password,
    })

    const token = response.data.data.token
    document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`;
    
    window.location.href = '/';
}

export async function logoutAction() {
    await axiosInstance.post(endpoints.auth.logout)
    document.cookie = 'auth_token=; path=/; max-age=0; secure; samesite=strict';
    
    redirect('/auth')
}
