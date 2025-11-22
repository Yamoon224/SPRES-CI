"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
    id: string
    full_name: string
    email: string
    phone: string
}

interface AuthContextType {
    user: User | null
    login: (userData: User, token: string) => void
    logout: () => void
    isAuthenticated: boolean
    mounted: boolean
}


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [mounted, setMounted] = useState(false)

    // ✅ REMPLACE ICI ton ancien useEffect PAR CETTE VERSION
    useEffect(() => {
        const storedUser = localStorage.getItem("auth_user")
        const storedToken = localStorage.getItem("auth_token")

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser))
        }
        setMounted(true)
    }, [])

    useEffect(() => {
        console.log("📌 MOUNTING AUTH")
        console.log("auth_user =", localStorage.getItem("auth_user"))
        console.log("auth_token =", localStorage.getItem("auth_token"))
    }, [])
    

    // ✅ REMPLACE ICI ta fonction login PAR CETTE VERSION
    const login = (userData: User, token: string) => {
        setUser(userData)
        localStorage.setItem("auth_user", JSON.stringify(userData))
        localStorage.setItem("auth_token", token)
    }

    const logout = async () => {
        const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL ?? 'localhost'
        const response = await fetch(baseURL + "/api/v1/logout", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        })

        setUser(null)  
        localStorage.removeItem("auth_user")
        localStorage.removeItem("auth_token")
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated: !!user,
            mounted
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider")
    }
    return context
}
