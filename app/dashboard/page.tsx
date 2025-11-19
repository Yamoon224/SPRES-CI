"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { Header } from "@/components/header"
import { useAuth } from "@/components/auth-context"
import { useLanguage } from "@/components/language-provider"
import { LayoutDashboard, User, FileText, Briefcase, Calendar, CheckCircle } from 'lucide-react'

type Tab = "dashboard" | "profile" | "applications"

export default function DashboardPage() {
    const { user, isAuthenticated } = useAuth()
    const { t } = useLanguage()
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<Tab>("dashboard")

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/")
        }
    }, [isAuthenticated, router])

    if (!isAuthenticated || !user) {
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

    const stats = [
        { label: t("dashboard.stats.applications"), value: "5", icon: FileText, color: "text-blue-500" },
        { label: t("dashboard.stats.interviews"), value: "2", icon: Calendar, color: "text-green-500" },
        { label: t("dashboard.stats.offers"), value: "12", icon: Briefcase, color: "text-purple-500" },
    ]

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

            <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    <div className="flex items-start gap-3 pb-4 border-b border-border">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                            <p className="font-medium text-foreground">Application Submitted</p>
                            <p className="text-sm text-muted-foreground">Software Engineer at TechCorp</p>
                            <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 pb-4 border-b border-border">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                            <p className="font-medium text-foreground">Interview Scheduled</p>
                            <p className="text-sm text-muted-foreground">Project Manager at BuildCo</p>
                            <p className="text-xs text-muted-foreground mt-1">5 days ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProfileTab({ user }: { user: { full_name: string; email: string; phone: string } }) {
    const { t } = useLanguage()
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState(user)

    const handleSave = () => {
        // Save profile changes
        setIsEditing(false)
    }

    return (
        <div className="max-w-2xl">
            <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-foreground">{t("profile.info")}</h3>
                    <button
                        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
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
        </div>
    )
}

function ApplicationsTab() {
    const { t } = useLanguage()

    const applications = [
        {
            id: 1,
            position: "Software Engineer",
            company: "TechCorp",
            date: "2025-01-15",
            status: "pending",
        },
        {
            id: 2,
            position: "Project Manager",
            company: "BuildCo",
            date: "2025-01-12",
            status: "interview",
        },
        {
            id: 3,
            position: "Data Analyst",
            company: "DataHub",
            date: "2025-01-10",
            status: "reviewed",
        },
    ]

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
                                <td className="px-6 py-4 text-sm font-medium text-foreground">{app.position}</td>
                                <td className="px-6 py-4 text-sm text-muted-foreground">{app.company}</td>
                                <td className="px-6 py-4 text-sm text-muted-foreground">{app.date}</td>
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
