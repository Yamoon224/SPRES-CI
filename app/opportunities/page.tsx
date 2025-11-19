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
    position: string
    company_id: number
    company_name: string
    location: string
    job_type: string
    salary: string
    description: string
    requirements: string
    created_at: string
}

const mockOpportunities: Opportunity[] = [
    {
        id: 1,
        position: "Senior Software Developer",
        company_id: 1,
        company_name: "Tech Solutions Inc",
        location: "Abidjan",
        job_type: "Full-time",
        salary: "$2500 - $3500",
        description: "We are looking for an experienced software developer to join our team.",
        requirements: "5+ years experience",
        created_at: "2025-01-01",
    },
    {
        id: 2,
        position: "Project Manager",
        company_id: 2,
        company_name: "Build Pro Services",
        location: "Yamoussoukro",
        job_type: "Full-time",
        salary: "$2000 - $2800",
        description: "Lead construction and building projects with our experienced team.",
        requirements: "3+ years project management experience",
        created_at: "2025-01-02",
    },
    {
        id: 3,
        position: "Cleaning Supervisor",
        company_id: 3,
        company_name: "Clean Space Ltd",
        location: "Cocody",
        job_type: "Full-time",
        salary: "$1200 - $1600",
        description: "Oversee cleaning and maintenance operations across multiple facilities.",
        requirements: "2+ years supervisory experience",
        created_at: "2025-01-03",
    },
    {
        id: 4,
        position: "Civil Engineer",
        company_id: 2,
        company_name: "Build Pro Services",
        location: "Abidjan",
        job_type: "Full-time",
        salary: "$2200 - $3200",
        description: "Design and oversee construction projects for commercial clients.",
        requirements: "Engineering degree + 3+ years experience",
        created_at: "2025-01-04",
    },
    {
        id: 5,
        position: "Administrative Assistant",
        company_id: 1,
        company_name: "Tech Solutions Inc",
        location: "Plateau",
        job_type: "Part-time",
        salary: "$800 - $1200",
        description: "Provide administrative support to our growing organization.",
        requirements: "High school diploma, excellent communication skills",
        created_at: "2025-01-05",
    },
    {
        id: 6,
        position: "Gardener / Landscaper",
        company_id: 4,
        company_name: "Green Space Maintenance",
        location: "Cocody",
        job_type: "Full-time",
        salary: "$900 - $1400",
        description: "Maintain and beautify outdoor spaces and gardens.",
        requirements: "Experience in landscaping and plant maintenance",
        created_at: "2025-01-06",
    },
    {
        id: 7,
        position: "Data Analyst",
        company_id: 1,
        company_name: "Tech Solutions Inc",
        location: "Abidjan",
        job_type: "Full-time",
        salary: "$1800 - $2500",
        description: "Analyze and interpret data to support business decisions.",
        requirements: "Statistics background, SQL and Python skills",
        created_at: "2025-01-07",
    },
    {
        id: 8,
        position: "Electrician",
        company_id: 2,
        company_name: "Build Pro Services",
        location: "Yopougon",
        job_type: "Full-time",
        salary: "$1400 - $2000",
        description: "Install and maintain electrical systems on construction sites.",
        requirements: "Electrical certification, 2+ years experience",
        created_at: "2025-01-08",
    },
    {
        id: 9,
        position: "HR Specialist",
        company_id: 5,
        company_name: "People First Consulting",
        location: "Abidjan",
        job_type: "Full-time",
        salary: "$1600 - $2200",
        description: "Manage recruitment and employee relations.",
        requirements: "HR certification, recruitment experience",
        created_at: "2025-01-09",
    },
    {
        id: 10,
        position: "Facilities Manager",
        company_id: 3,
        company_name: "Clean Space Ltd",
        location: "Abidjan",
        job_type: "Full-time",
        salary: "$1500 - $2000",
        description: "Manage facility operations and maintenance.",
        requirements: "Facility management experience",
        created_at: "2025-01-10",
    },
    {
        id: 11,
        position: "QA Tester",
        company_id: 1,
        company_name: "Tech Solutions Inc",
        location: "Plateau",
        job_type: "Full-time",
        salary: "$1300 - $1800",
        description: "Test software applications for quality assurance.",
        requirements: "QA testing experience, attention to detail",
        created_at: "2025-01-11",
    },
    {
        id: 12,
        position: "Plumber",
        company_id: 2,
        company_name: "Build Pro Services",
        location: "Cocody",
        job_type: "Full-time",
        salary: "$1200 - $1700",
        description: "Install and repair plumbing systems.",
        requirements: "Plumbing license, 2+ years experience",
        created_at: "2025-01-12",
    },
    {
        id: 13,
        position: "Marketing Manager",
        company_id: 5,
        company_name: "People First Consulting",
        location: "Abidjan",
        job_type: "Full-time",
        salary: "$2000 - $2700",
        description: "Develop and execute marketing strategies.",
        requirements: "Marketing degree, 3+ years experience",
        created_at: "2025-01-13",
    },
    {
        id: 14,
        position: "Maintenance Worker",
        company_id: 3,
        company_name: "Clean Space Ltd",
        location: "Treichville",
        job_type: "Full-time",
        salary: "$1000 - $1400",
        description: "Perform general maintenance and repairs.",
        requirements: "General maintenance skills",
        created_at: "2025-01-14",
    },
    {
        id: 15,
        position: "UI/UX Designer",
        company_id: 1,
        company_name: "Tech Solutions Inc",
        location: "Abidjan",
        job_type: "Full-time",
        salary: "$2000 - $3000",
        description: "Design user interfaces and experiences for applications.",
        requirements: "Design portfolio, UI/UX tools proficiency",
        created_at: "2025-01-15",
    },
    {
        id: 16,
        position: "Carpenter",
        company_id: 2,
        company_name: "Build Pro Services",
        location: "Abidjan",
        job_type: "Full-time",
        salary: "$1300 - $1900",
        description: "Construct and repair wooden structures.",
        requirements: "Carpentry skills and experience",
        created_at: "2025-01-16",
    },
]

const ITEMS_PER_PAGE = 12

export default function OpportunitiesPage() {
    const { t } = useLanguage()
    const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities)
    const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>(mockOpportunities)
    const [loading, setLoading] = useState(false)
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(filteredOpportunities.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedOpportunities = filteredOpportunities.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    useEffect(() => {
        const filtered = opportunities.filter((opp) => {
            const query = searchQuery.toLowerCase()
            return (
                opp.position.toLowerCase().includes(query) ||
                opp.company_name.toLowerCase().includes(query) ||
                opp.location.toLowerCase().includes(query) ||
                opp.description.toLowerCase().includes(query)
            )
        })
        setFilteredOpportunities(filtered)
        setCurrentPage(1) // Reset to first page when searching
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
                                            <h3 className="text-xl font-bold text-foreground mb-2">{opportunity.position}</h3>
                                            <p className="text-sm font-medium text-primary mb-4">{opportunity.company_name}</p>

                                            <div className="space-y-3 mb-6">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{opportunity.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Briefcase className="w-4 h-4" />
                                                    <span>{opportunity.job_type}</span>
                                                </div>
                                                {opportunity.salary && (
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <DollarSign className="w-4 h-4" />
                                                        <span>{opportunity.salary}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <p className="text-sm text-muted-foreground mb-6 line-clamp-3">{opportunity.description}</p>

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
