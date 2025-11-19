"use client"

import type React from "react"

import { useState } from "react"
import { X, Loader2 } from "lucide-react"
import { useLanguage } from "./language-provider"
import { useRouter } from "next/navigation"
import { useAuth } from "./auth-context"

interface AuthModalProps {
    mode: "login" | "register"
    isOpen: boolean
    onClose: () => void
}

export function AuthModal({ mode, isOpen, onClose }: AuthModalProps) {
    const { login } = useAuth()
    const router = useRouter()
    const { t } = useLanguage()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [formMode, setFormMode] = useState(mode)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        phone: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL ?? 'localhost'
            const body =
                formMode === "register"
                    ? {
                        full_name: formData.name,
                        email: formData.email,
                        password: formData.password,
                        phone: formData.phone,
                        role: 'candidate',
                    }
                    : { email: formData.email, password: formData.password }

            const response = await fetch(baseURL + (formMode === "register" ? "/api/v1/users" : "/api/v1/login"), {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body),
            })


            if (!response.ok) {
                throw new Error("Authentication failed")
            }

            const data = await response.json()
            login(data.user, data.token)
            // 🔥 Stockage du token et de l’utilisateur
            localStorage.setItem("auth_token", data.token)
            localStorage.setItem("auth_user", JSON.stringify(data.user))


            // Reset form and close modal on success
            setFormData({ email: "", password: "", name: "", phone: "" })
            onClose()

            // 🚀 REDIRECTION APRÈS LOGIN / REGISTER
            router.push("/dashboard")
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
            console.log("[v0] Auth error:", err)
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center py-2 px-4 border-b border-border">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground">
                        {formMode === "login" ? t("auth.login") : t("auth.register")}
                    </h2>
                    <button onClick={onClose} className="hover:bg-accent p-1 rounded-md transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">{error}</div>}

                    {formMode === "register" && (
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">{t("auth.name")}</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">{t("auth.email")}</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>

                    {formMode === "register" && (
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">{t("auth.phone")}</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">{t("auth.password")}</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                {formMode === "login" ? t("auth.signin") : t("auth.signup")}
                            </>
                        ) : formMode === "login" ? (
                            t("auth.signin")
                        ) : (
                            t("auth.signup")
                        )}
                    </button>

                    <div className="text-center text-sm text-muted-foreground">
                        {formMode === "login" ? (
                            <>
                                {t("auth.noAccount")}{" "}
                                <button
                                    type="button"
                                    onClick={() => setFormMode("register")}
                                    className="text-primary font-semibold hover:underline"
                                >
                                    {t("auth.register")}
                                </button>
                            </>
                        ) : (
                            <>
                                {t("auth.haveAccount")}{" "}
                                <button
                                    type="button"
                                    onClick={() => setFormMode("login")}
                                    className="text-primary font-semibold hover:underline"
                                >
                                    {t("auth.login")}
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}
