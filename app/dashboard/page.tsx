"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { Header } from "@/components/header"
import { useAuth } from "@/components/auth-context"
import { useLanguage } from "@/components/language-provider"
import { LayoutDashboard, User, FileText, Briefcase, Calendar, CheckCircle } from 'lucide-react'
import { toast } from "sonner"
import CVUploadCard from "@/components/cv-upload-card"

type Tab = "dashboard" | "profile" | "applications"

export default function DashboardPage() {
    const { user, isAuthenticated, mounted } = useAuth()
    const { t } = useLanguage()
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<Tab>("dashboard")

    useEffect(() => {
        console.log("mounted =", mounted)
        console.log("isAuthenticated =", isAuthenticated)
        console.log("user =", user)

        if (!mounted) return     // 👈 ne rien faire tant que le provider charge
    
        if (!isAuthenticated) {
            router.push("/")
        }
    }, [mounted, isAuthenticated])

    if (!mounted || !isAuthenticated || !user) {
        return null
    }

    const tabs = [
        { id: "dashboard" as Tab, label: t("dashboard.overview"), icon: LayoutDashboard },
        { id: "profile" as Tab, label: t("dashboard.profile"), icon: User },
        { id: "applications" as Tab, label: t("dashboard.applications"), icon: FileText },
    ]

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                            {t("dashboard.title")}
                        </h1>
                        <p className="text-muted-foreground">
                            {t("dashboard.welcome")}, {user.full_name}
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-border mb-8">
                        <div className="flex gap-4 overflow-x-auto">
                            {tabs.map((tab) => {
                                const IconComponent = tab.icon
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                                ? "text-primary border-primary"
                                                : "text-muted-foreground border-transparent hover:text-foreground"
                                            }`}
                                    >
                                        <IconComponent className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="animate-in fade-in duration-300">
                        {activeTab === "dashboard" && <DashboardTab />}
                        {activeTab === "profile" && <ProfileTab user={user} />}
                        {activeTab === "applications" && <ApplicationsTab />}
                    </div>
                </div>
            </main>
        </div>
    )
}

function DashboardTab() {
    const { t } = useLanguage()
    const [cvs, setCvs] = useState<any[]>([])

    const stats = [
        { label: t("dashboard.stats.applications"), value: "5", icon: FileText, color: "text-blue-500" },
        { label: t("dashboard.stats.offers"), value: "12", icon: Briefcase, color: "text-purple-500" },
    ]

    // 🔹 Fetch CVs uploadés
    useEffect(() => {
        const fetchCvs = async () => {
            const storedUser = JSON.parse(localStorage.getItem("auth_user") || "{}")
            const token = localStorage.getItem("auth_token")
            const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL ?? "http://localhost"

            try {
                const res = await fetch(`${baseURL}/api/v1/candidates?user_id=${storedUser.id}`, {
                    headers: {Authorization: `Bearer ${token}`},
                })

                if (!res.ok) throw new Error("Impossible de récupérer les CVs")
                const data = await res.json()
                setCvs(data.data || []) 
            } catch (error) {
                console.error(error)
                toast.error("Erreur lors de la récupération des CVs")
            }
        }

        fetchCvs()
    }, [])

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                    const IconComponent = stat.icon
                    return (
                        <div
                            key={index}
                            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                                    <IconComponent className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* CV Uploads */}
            <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">CV Uploads</h3>
                {cvs.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Aucun CV uploadé pour le moment.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cvs.map((cv, index) => (
                            <div
                                key={index}
                                className="bg-background border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                            >
                                <div className="mb-2">
                                    <p className="text-foreground font-semibold truncate">{cv.title}</p>
                                    {cv.description && (
                                        <p className="text-sm text-muted-foreground mt-1 truncate">{cv.description}</p>
                                    )}
                                </div>
                                <a
                                    href={cv.file_path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-block px-3 py-1 bg-primary text-white rounded-lg text-sm font-medium text-center hover:bg-primary/90 transition-colors"
                                >
                                    Voir le CV
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

function ProfileTab({ user }: { user: { full_name: string; email: string; phone: string } }) {
    const { t } = useLanguage()
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState(user)

    const handleSave = async () => {
        const storedUser = JSON.parse(localStorage.getItem("auth_user") || "{}")
        const token = localStorage.getItem("auth_token")
        const userId = storedUser.id

        const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL ?? 'localhost'

        try {
            const res = await fetch(baseURL + `/api/v1/users/${userId}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
                body: JSON.stringify(formData),
            })
            
            if (!res.ok) {
                throw new Error("Erreur lors de la mise à jour")
            }

            const user = await res.json()
            localStorage.setItem("auth_user", JSON.stringify(user.data))
            
            toast.success("Profil mis à jour avec succès 🎉")
    
            setIsEditing(false)
        } catch (error) {
            toast.error("Une erreur est survenue ❌")
            console.error(error)
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
            <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-foreground">{t("profile.info")}</h3>
                    <button
                        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                        className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                        {isEditing ? t("profile.save") : t("profile.edit")}
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            {t("auth.name")}
                        </label>
                        <input
                            type="text"
                            value={formData.full_name}
                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            {t("auth.email")}
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            {t("auth.phone")}
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                        />
                    </div>
                </div>
            </div>

            {/* Card Upload CV */}
            <div className="bg-card border border-border rounded-lg p-6">
                <CVUploadCard />
            </div>
        </div>
    )
}

function ApplicationsTab() {
    const { t } = useLanguage()

    const [applications, setApplications] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            case "reviewed":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case "interview":
                return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
            case "accepted":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "rejected":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
        }
    }

    useEffect(() => {
        const fetchApplications = async () => {
            const storedUser = JSON.parse(localStorage.getItem("auth_user") || "{}")
            const token = localStorage.getItem("auth_token")
            const userId = storedUser.id

            const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL ?? "http://localhost"

            try {
                const res = await fetch(baseURL + `/api/v1/applies?user_id=${userId}`, {
                    headers: {Authorization: `Bearer ${token}`},
                })

                if (!res.ok) throw new Error("Failed to load applications")

                const data = await res.json()

                // Cas Laravel: data.data contient la pagination
                setApplications(data.data || data)
            } catch (e: any) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }

        fetchApplications()
    }, [])

    // État de chargement
    if (loading) return <div className="text-center py-6">{t("loading")}</div>

    // Erreur
    if (error)
        return (
            <div className="text-red-500 text-center py-6">
                {t("error")} : {error}
            </div>
        )

    return (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-muted">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                                {t("opportunities.position")}
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                                {t("opportunities.company")}
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                                {t("applications.date")}
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                                {t("applications.status")}
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-border">
                        {applications.map((app) => (
                            <tr key={app.id} className="hover:bg-muted/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-foreground">
                                    {app?.job_offer.title ?? "—"}
                                </td>

                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                    {app?.company?.name ?? "—"}
                                </td>

                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                    {app?.submitted_at?.substring(0, 10)}
                                </td>

                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                                        {t(`applications.${app.status}`)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
