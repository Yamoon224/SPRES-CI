"use client"

import { useLanguage } from "./language-provider"
import { useEffect, useState } from "react"
import { FileText, Briefcase, GraduationCap } from "lucide-react"

interface Candidate {
    id: number
    user: {
        id: number
        full_name: string
        email: string
        phone: string
        role: string
    }
    file_url: string
    title: string
    skills: string
    education: string
    experience: string
    created_at: string
}

export function CandidatesSection() {
    const { t } = useLanguage()
    const [candidates, setCandidates] = useState<Candidate[]>([])
    const [loading, setLoading] = useState(true)
    const [scrollPosition, setScrollPosition] = useState(0)

    const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL ?? 'localhost'
    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await fetch(baseURL + "/api/v1/candidates")
                const data = await response.json()
                setCandidates(data.data || [])
            } catch (error) {
                console.log("[v0] Error fetching candidates:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchCandidates()
    }, [])

    useEffect(() => {
        if (candidates.length === 0) return

        const interval = setInterval(() => {
            setScrollPosition((prev) => (prev + 1) % (candidates.length * 360))
        }, 50)

        return () => clearInterval(interval)
    }, [candidates.length])

    return (
        <section id="candidates" className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("candidates.title")}</h2>
                    <p className="text-lg text-muted-foreground">{t("candidates.subtitle")}</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="text-muted-foreground">Loading candidates...</div>
                    </div>
                ) : candidates.length === 0 ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="text-muted-foreground">No candidates available</div>
                    </div>
                ) : (
                    <div className="overflow-hidden">
                        <div
                            className="flex gap-6 transition-transform"
                            style={{
                                transform: `translateX(-${scrollPosition}px)`,
                            }}
                        >
                            {/* Original candidates */}
                            {candidates.map((candidate) => (
                                <div
                                    key={`${candidate.id}-1`}
                                    className="flex-shrink-0 w-80 bg-background rounded-lg p-6 border border-border hover:shadow-lg transition-shadow"
                                >
                                    <div className="mb-4">
                                        <h3 className="text-xl font-semibold text-foreground">{candidate.user.full_name}</h3>
                                        <p className="text-primary font-medium text-sm mb-2">{candidate.title}</p>
                                    </div>

                                    <div className="space-y-3 mb-4 text-sm">
                                        <div className="flex gap-2">
                                            <Briefcase className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="font-semibold text-foreground">Experience</p>
                                                <p className="text-muted-foreground">{candidate.experience}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <GraduationCap className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="font-semibold text-foreground">Education</p>
                                                <p className="text-muted-foreground">{candidate.education}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <FileText className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="font-semibold text-foreground">Skills</p>
                                                <p className="text-muted-foreground text-xs">{candidate.skills}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 pt-4 border-t border-border">
                                        <span className="text-xs text-muted-foreground">📧 {candidate.user.email}</span>
                                        {candidate.file_url && (
                                            <a
                                                href={candidate.file_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-primary font-semibold hover:underline ml-auto"
                                            >
                                                View CV →
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {/* Duplicate candidates for infinite loop effect */}
                            {candidates.map((candidate) => (
                                <div
                                    key={`${candidate.id}-2`}
                                    className="flex-shrink-0 w-80 bg-background rounded-lg p-6 border border-border hover:shadow-lg transition-shadow"
                                >
                                    <div className="mb-4">
                                        <h3 className="text-xl font-semibold text-foreground">{candidate.user.full_name}</h3>
                                        <p className="text-primary font-medium text-sm mb-2">{candidate.title}</p>
                                    </div>

                                    <div className="space-y-3 mb-4 text-sm">
                                        <div className="flex gap-2">
                                            <Briefcase className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="font-semibold text-foreground">Experience</p>
                                                <p className="text-muted-foreground">{candidate.experience}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <GraduationCap className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="font-semibold text-foreground">Education</p>
                                                <p className="text-muted-foreground">{candidate.education}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <FileText className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="font-semibold text-foreground">Skills</p>
                                                <p className="text-muted-foreground text-xs">{candidate.skills}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 pt-4 border-t border-border">
                                        <span className="text-xs text-muted-foreground">📧 {candidate.user.email}</span>
                                        {candidate.file_url && (
                                            <a
                                                href={candidate.file_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-primary font-semibold hover:underline ml-auto"
                                            >
                                                View CV →
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
