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

const mockCompanies: Company[] = [
    {
        id: 1,
        name: "Tech Solutions Inc",
        industry: "Information Technology",
        website: "https://techsolutions.com",
        address: "Abidjan, Plateau",
        description: "Leading software development and IT services company",
        logo: "/tech-company-logo.jpg",
        created_at: "2025-01-01",
    },
    {
        id: 2,
        name: "Build Pro Services",
        industry: "Construction",
        website: "https://buildpro.com",
        address: "Abidjan, Yopougon",
        description: "Professional construction and building services",
        logo: "/construction-logo.jpg",
        created_at: "2025-01-02",
    },
    {
        id: 3,
        name: "Clean Space Ltd",
        industry: "Cleaning & Maintenance",
        website: "https://cleanspace.com",
        address: "Abidjan, Cocody",
        description: "Professional cleaning and facility maintenance",
        logo: "/cleaning-logo.jpg",
        created_at: "2025-01-03",
    },
    {
        id: 4,
        name: "Green Space Maintenance",
        industry: "Landscaping",
        website: "https://greenspace.com",
        address: "Abidjan, Cocody",
        description: "Landscape design and green space management",
        logo: "/landscaping-logo.jpg",
        created_at: "2025-01-04",
    },
    {
        id: 5,
        name: "People First Consulting",
        industry: "Human Resources",
        website: "https://peoplefirst.com",
        address: "Abidjan, Plateau",
        description: "HR consulting and recruitment services",
        logo: "/hr-consulting-logo.jpg",
        created_at: "2025-01-05",
    },
    {
        id: 6,
        name: "SecureGuard Services",
        industry: "Security",
        website: "https://secureguard.com",
        address: "Abidjan, Zone 4",
        description: "Professional security and protection services",
        logo: "/security-logo.jpg",
        created_at: "2025-01-06",
    },
    {
        id: 7,
        name: "Transport Logistics Plus",
        industry: "Logistics & Transport",
        website: "https://transportplus.com",
        address: "Abidjan, Treichville",
        description: "Complete transport and logistics solutions",
        logo: "/logistics-logo.jpg",
        created_at: "2025-01-07",
    },
    {
        id: 8,
        name: "Office Management Pro",
        industry: "Administrative Services",
        website: "https://officemanagement.com",
        address: "Abidjan, Plateau",
        description: "Complete office management and support services",
        logo: "/office-management-logo.jpg",
        created_at: "2025-01-08",
    },
    {
        id: 9,
        name: "Catering Excellence",
        industry: "Food Service",
        website: "https://cateringexcellence.com",
        address: "Abidjan, Cocody",
        description: "Professional catering and food service",
        logo: "/catering-logo.jpg",
        created_at: "2025-01-09",
    },
    {
        id: 10,
        name: "Medical & Health Plus",
        industry: "Healthcare",
        website: "https://medicalhealthplus.com",
        address: "Abidjan, Cocody",
        description: "Healthcare staffing and support services",
        logo: "/healthcare-logo.jpg",
        created_at: "2025-01-10",
    },
    {
        id: 11,
        name: "Education Services Ltd",
        industry: "Education",
        website: "https://educationservices.com",
        address: "Abidjan, Plateau",
        description: "Educational staffing and training services",
        logo: "/education-logo.jpg",
        created_at: "2025-01-11",
    },
    {
        id: 12,
        name: "Events Management Pro",
        industry: "Event Management",
        website: "https://eventsmanagement.com",
        address: "Abidjan, Le Plateau",
        description: "Professional event planning and management",
        logo: "/events-logo.jpg",
        created_at: "2025-01-12",
    },
    {
        id: 13,
        name: "Retail Solutions Group",
        industry: "Retail",
        website: "https://retailsolutions.com",
        address: "Abidjan, Yopougon",
        description: "Retail staffing and management solutions",
        logo: "/retail-logo.jpg",
        created_at: "2025-01-13",
    },
    {
        id: 14,
        name: "Manufacturing Support",
        industry: "Manufacturing",
        website: "https://manufacturingsupport.com",
        address: "Abidjan, Zone Industrielle",
        description: "Industrial staffing and support services",
        logo: "/manufacturing-logo.jpg",
        created_at: "2025-01-14",
    },
    {
        id: 15,
        name: "Financial Services Staffing",
        industry: "Finance",
        website: "https://financialstaffing.com",
        address: "Abidjan, Le Plateau",
        description: "Financial sector staffing solutions",
        logo: "/finance-logo.jpg",
        created_at: "2025-01-15",
    },
    {
        id: 16,
        name: "Digital Marketing Agency",
        industry: "Marketing & Advertising",
        website: "https://digitalmarketing.com",
        address: "Abidjan, Plateau",
        description: "Digital marketing and advertising services",
        logo: "/marketing-logo.jpg",
        created_at: "2025-01-16",
    },
]

const mockOpportunities: Opportunity[] = [
    {
        id: 1,
        position: "Senior Software Developer",
        company_id: 1,
        location: "Abidjan",
        job_type: "Full-time",
        salary: "$2500 - $3500",
        description: "We are looking for an experienced software developer to join our team.",
    },
    {
        id: 2,
        position: "Project Manager",
        company_id: 2,
        location: "Yamoussoukro",
        job_type: "Full-time",
        salary: "$2000 - $2800",
        description: "Lead construction and building projects with our experienced team.",
    },
    {
        id: 3,
        position: "Cleaning Supervisor",
        company_id: 3,
        location: "Cocody",
        job_type: "Full-time",
        salary: "$1200 - $1600",
        description: "Oversee cleaning and maintenance operations across multiple facilities.",
    },
    {
        id: 4,
        position: "Gardener / Landscaper",
        company_id: 4,
        location: "Cocody",
        job_type: "Full-time",
        salary: "$900 - $1400",
        description: "Maintain and beautify outdoor spaces and gardens.",
    },
    {
        id: 5,
        position: "HR Specialist",
        company_id: 5,
        location: "Abidjan",
        job_type: "Full-time",
        salary: "$1600 - $2200",
        description: "Manage recruitment and employee relations.",
    },
    {
        id: 6,
        position: "Security Officer",
        company_id: 6,
        location: "Abidjan",
        job_type: "Full-time",
        salary: "$1000 - $1500",
        description: "Provide security and protection services.",
    },
    {
        id: 7,
        position: "Logistics Coordinator",
        company_id: 7,
        location: "Treichville",
        job_type: "Full-time",
        salary: "$1300 - $1800",
        description: "Coordinate transport and logistics operations.",
    },
    {
        id: 8,
        position: "Administrative Assistant",
        company_id: 8,
        location: "Plateau",
        job_type: "Full-time",
        salary: "$1100 - $1500",
        description: "Provide administrative support.",
    },
    {
        id: 9,
        position: "Chef de Cuisine",
        company_id: 9,
        location: "Cocody",
        job_type: "Full-time",
        salary: "$1400 - $2000",
        description: "Lead culinary operations.",
    },
    {
        id: 10,
        position: "Nurse Assistant",
        company_id: 10,
        location: "Cocody",
        job_type: "Full-time",
        salary: "$1200 - $1700",
        description: "Provide healthcare support.",
    },
    {
        id: 11,
        position: "Teacher",
        company_id: 11,
        location: "Plateau",
        job_type: "Full-time",
        salary: "$1300 - $1900",
        description: "Teach and educate students.",
    },
    {
        id: 12,
        position: "Event Coordinator",
        company_id: 12,
        location: "Le Plateau",
        job_type: "Full-time",
        salary: "$1100 - $1600",
        description: "Plan and coordinate events.",
    },
]

const ITEMS_PER_PAGE = 12

export default function PartnersPage() {
    const { t } = useLanguage()
    const [companies, setCompanies] = useState<Company[]>([])
    const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([])

    const [allOpportunities, setAllOpportunities] = useState<Opportunity[]>(mockOpportunities)
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
            try {
                const res = await fetch("https://spres.jss-gn.com/api/v1/companies", {
                    headers: {
                        "User-Agent": "spres-app"
                    }
                })

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

    const getCompanyOpportunities = (companyId: number) => {
        return allOpportunities.filter((opp) => opp.company_id === companyId)
    }

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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {paginatedCompanies.map((company) => {
                                    const companyOffers = getCompanyOpportunities(company.id)
                                    const isExpanded = expandedCompany === company.id

                                    return (
                                        <div
                                            key={company.id}
                                            className="flex flex-col bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
                                        >
                                            {/* Company Card */}
                                            <div className="p-6 flex-1">
                                                <div className="aspect-video bg-muted flex items-center justify-center p-4 mb-4 rounded">
                                                    <img
                                                        src={company.logo || "/placeholder.svg"}
                                                        alt={company.name}
                                                        className="max-h-24 max-w-full object-contain"
                                                    />
                                                </div>

                                                <h3 className="text-xl font-bold text-foreground mb-2">{company.name}</h3>
                                                <p className="text-sm font-medium text-primary mb-3">{company.industry}</p>
                                                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{company.description}</p>

                                                <div className="flex gap-2 text-xs text-muted-foreground mb-4">
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

                                            {/* View Offers Button */}
                                            <div className="p-6 border-t border-border">
                                                <Button
                                                    onClick={() => handleViewOffers(company.id)}
                                                    variant={isExpanded ? "default" : "outline"}
                                                    className="w-full mb-4"
                                                >
                                                    {t("partners.viewOffers")} ({companyOffers.length})
                                                </Button>

                                                {isExpanded && (
                                                    <div className="space-y-3">
                                                        {companyOffers.length === 0 ? (
                                                            <p className="text-sm text-muted-foreground text-center py-2">{t("partners.noOffers")}</p>
                                                        ) : (
                                                            companyOffers.map((opportunity) => (
                                                                <div key={opportunity.id} className="p-3 bg-muted rounded border border-border">
                                                                    <h4 className="font-semibold text-sm text-foreground mb-1">{opportunity.position}</h4>
                                                                    <p className="text-xs text-muted-foreground mb-2">{opportunity.location}</p>
                                                                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                                                                        {opportunity.description}
                                                                    </p>
                                                                    <Button onClick={handleApply} size="sm" className="w-full text-xs">
                                                                        {t("opportunities.apply")}
                                                                    </Button>
                                                                </div>
                                                            ))
                                                        )}
                                                    </div>
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
