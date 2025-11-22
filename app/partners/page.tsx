"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { useState, useEffect } from "react"
import { AuthModal } from "@/components/auth-modal"
import { Button } from "@/components/ui/button"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"

interface Company {
    id: number
    name: string
    industry: string
    website: string
    address: string
    description: string
    logo: string
    created_at: string
}

interface Opportunity {
    id: number
    position: string
    company_id: number
    location: string
    job_type: string
    salary: string
    description: string
}


const ITEMS_PER_PAGE = 12

export default function PartnersPage() {
    const { t } = useLanguage()
    const [companies, setCompanies] = useState<Company[]>([])
    const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([])

    const [loading, setLoading] = useState(false)
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [expandedCompany, setExpandedCompany] = useState<number | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedCompanies = filteredCompanies.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    useEffect(() => {
        const fetchCompanies = async () => {
            setLoading(true)
            const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL ?? 'localhost'
            try {
                const res = await fetch(baseURL + "/api/v1/companies", { headers: {"User-Agent": "spres-app"} })

                const json = await res.json()

                // La vraie liste
                setCompanies(json.data)
                setFilteredCompanies(json.data)
            } catch (error) {
                console.error("Erreur lors du chargement des entreprises :", error)
            } finally {
                setLoading(false)
            }
        }

        fetchCompanies()
    }, [])


    useEffect(() => {
        const filtered = companies.filter((company) => {
            const query = searchQuery.toLowerCase()
            return (
                company.name.toLowerCase().includes(query) ||
                company.industry.toLowerCase().includes(query) ||
                company.description.toLowerCase().includes(query)
            )
        })
        setFilteredCompanies(filtered)
        setCurrentPage(1) // Reset to first page when searching
    }, [searchQuery, companies])

    const handleViewOffers = (companyId: number) => {
        setExpandedCompany(expandedCompany === companyId ? null : companyId)
    }

    const handleApply = () => {
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
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t("partners.title")}</h1>
                        <p className="text-xl text-muted-foreground">{t("partners.subtitle")}</p>
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
                    {filteredCompanies.length > 0 && (
                        <div className="text-sm text-muted-foreground mb-4">
                            {t("pagination.page")} {currentPage} {t("pagination.of")} {totalPages} - {filteredCompanies.length}{" "}
                            {filteredCompanies.length === 1 ? "partner" : "partners"}
                        </div>
                    )}

                    {/* Companies Grid */}
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="text-muted-foreground">Loading partners...</div>
                        </div>
                    ) : filteredCompanies.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-lg text-muted-foreground">
                                {searchQuery ? t("search.noResults") : "No partners available"}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {paginatedCompanies.map((company) => {
                                    return (
                                        <div
                                            key={company.id}
                                            className="flex flex-col bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
                                        >
                                            {/* Company Card */}
                                            <div className="p-6 flex-1">
                                                <div className="aspect-video bg-muted flex items-center justify-center p-2 mb-2 rounded">
                                                    <img
                                                        src={company.logo || "/placeholder.svg"}
                                                        alt={company.name}
                                                        className="max-h-24 max-w-full object-contain"
                                                    />
                                                </div>

                                                <h3 className="text-xl font-bold text-foreground">{company.name}</h3>
                                                <p className="text-sm font-medium text-primary my-2">{company.industry}</p>
                                                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{company.description}</p>

                                                <div className="flex gap-2 text-xs text-muted-foreground mb-2">
                                                    <span>📍 {company.address}</span>
                                                </div>

                                                {company.website && (
                                                    <a
                                                        href={company.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary text-sm font-semibold hover:underline inline-block mb-4"
                                                    >
                                                        Visit Website →
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
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
                                                    ? "bg-primary text-primary-foreground border-primary"
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
                                        className="flex items-center gap-2 bg-transparent"
                                    >
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
