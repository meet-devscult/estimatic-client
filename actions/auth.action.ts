"use server"

import axiosInstance, { endpoints } from "@/lib/axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface LoginParams {
    email: string
    password: string
}

export async function loginAction({ email, password }: LoginParams) {
    const cookieStore = await cookies()

    const response = await axiosInstance.post(endpoints.auth.login, {
        email,
        password,
    })

    const token = response.data.data.token
    
    cookieStore.set('auth-token', token, {
        maxAge: 24 * 60 * 60, // 24 hours in seconds
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        httpOnly: true // Makes the cookie inaccessible to JavaScript
    })

    redirect('/')
}

export async function logout() {
    const response = await fetch('/api/auth/logout', {
        method: 'POST',
    })
    return response.json()
}
