"use server"

import axiosInstance, { endpoints } from "@/lib/axios"
import { cookies } from "next/headers"
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

    console.log(response.data)
    cookieStore.set('auth-token', response.data.token, {
        maxAge: 8 * 60 * 60, // 8 hours in seconds
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        httpOnly: true // Makes the cookie inaccessible to JavaScript
    })

    return response.data
}

export async function logout() {
    const response = await fetch('/api/auth/logout', {
        method: 'POST',
    })
    return response.json()
}
