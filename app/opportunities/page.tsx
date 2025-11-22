"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { useState, useEffect } from "react"
import { AuthModal } from "@/components/auth-modal"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, DollarSign, Search, ChevronLeft, ChevronRight } from "lucide-react"

interface Opportunity {
    id: number
    title: string
    company: {name: string, id: string},
    location: string
    contract_type: string
    salary: string
    description: string
    experience_required: string
    created_at: string
}


const ITEMS_PER_PAGE = 12

export default function OpportunitiesPage() {
    const { t } = useLanguage()
    const [opportunities, setOpportunities] = useState<Opportunity[]>([])
    const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([])

    const [loading, setLoading] = useState(false)
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(filteredOpportunities.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedOpportunities = filteredOpportunities.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true)
    
            const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL ?? "http://localhost"
    
            try {
                const res = await fetch(baseURL + "/api/v1/jobs", {
                    headers: { "User-Agent": "spres-app" },
                })
    
                const json = await res.json()
    
                // Chargement des vraies données
                setOpportunities(json.data)
                setFilteredOpportunities(json.data)
            } catch (error) {
                console.error("Erreur lors du chargement des jobs :", error)
            } finally {
                setLoading(false)
            }
        }
    
        fetchJobs()
    }, [])

    useEffect(() => {
        const q = searchQuery.toLowerCase()
    
        const filtered = opportunities.filter((opp) => {
            const position = opp.title?.toLowerCase() ?? ""
            const company = opp.company.name?.toLowerCase() ?? ""
            const location = opp.location?.toLowerCase() ?? ""
            const desc = opp.description?.toLowerCase() ?? ""
    
            return (
                position.includes(q) ||
                company.includes(q) ||
                location.includes(q) ||
                desc.includes(q)
            )
        })
    
        setFilteredOpportunities(filtered)
        setCurrentPage(1)
    }, [searchQuery, opportunities])

    const handleApply = (opportunity: Opportunity) => {
        setSelectedOpportunity(opportunity)
        setShowAuthModal(true)
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-7xl">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t("opportunities.title")}</h1>
                        <p className="text-xl text-muted-foreground">{t("opportunities.subtitle")}</p>
                    </div>

                    <div className="mb-8">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder={t("search.placeholder")}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>

                    {/* Results count */}
                    {filteredOpportunities.length > 0 && (
                        <div className="text-sm text-muted-foreground mb-4">
                            {t("pagination.page")} {currentPage} {t("pagination.of")} {totalPages} - {filteredOpportunities.length}{" "}
                            {filteredOpportunities.length === 1 ? "opportunity" : "opportunities"}
                        </div>
                    )}

                    {/* Opportunities Grid */}
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="text-muted-foreground">Loading opportunities...</div>
                        </div>
                    ) : filteredOpportunities.length === 0 ? (
                        <div className="text-center py-12">
                            <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-lg text-muted-foreground">
                                {searchQuery ? t("search.noResults") : t("opportunities.noOffers")}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {paginatedOpportunities.map((opportunity) => (
                                    <div
                                        key={opportunity.id}
                                        className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
                                    >
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-foreground mb-2">{opportunity.title}</h3>
                                            <p className="text-sm font-medium text-primary mb-4">{opportunity.company.name}</p>

                                            <div className="space-y-3 mb-3">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{opportunity.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Briefcase className="w-4 h-4" />
                                                    <span>{opportunity.contract_type}</span>
                                                </div>
                                                {opportunity.salary && (
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <DollarSign className="w-4 h-4" />
                                                        <span>{Number(opportunity.salary).toLocaleString("fr-FR")} FCFA / {opportunity.experience_required} Années d'expériences</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* <p className="text-sm text-muted-foreground my-2 line-clamp-3">{opportunity.description}</p> */}

                                            <Button onClick={() => handleApply(opportunity)} className="w-full text-white">
                                                {t("opportunities.apply")}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-4 mt-8">
                                    <Button
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 1}
                                        variant="outline"
                                        className="flex items-center gap-2 bg-transparent"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        {t("pagination.previous")}
                                    </Button>

                                    <div className="flex items-center gap-2">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => {
                                                    setCurrentPage(page)
                                                    window.scrollTo({ top: 0, behavior: "smooth" })
                                                }}
                                                className={`w-10 h-10 rounded border transition-colors ${currentPage === page
                                                        ? "bg-primary text-white border-primary"
                                                        : "border-border text-foreground hover:bg-muted"
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>

                                    <Button
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                        variant="outline"
                                        className="flex items-center gap-2 bg-transparent">
                                        {t("pagination.next")}
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            {showAuthModal && <AuthModal mode="register" isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />}

            <Footer />
        </div>
    )
}
