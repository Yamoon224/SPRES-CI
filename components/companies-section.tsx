"use client"

import { useLanguage } from "./language-provider"
import { useEffect, useState } from "react"

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

export function CompaniesSection() {
  const { t } = useLanguage()
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("http://localhost/spress-ci.com/public/api/v1/companies")
        const data = await response.json()
        setCompanies(data.data || [])
      } catch (error) {
        console.log("[v0] Error fetching companies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  useEffect(() => {
    if (companies.length === 0) return

    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % (companies.length * 360))
    }, 50)

    return () => clearInterval(interval)
  }, [companies.length])

  return (
    <section id="companies" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("companies.title")}</h2>
          <p className="text-lg text-muted-foreground">{t("companies.subtitle")}</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-muted-foreground">Loading companies...</div>
          </div>
        ) : companies.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-muted-foreground">No companies available</div>
          </div>
        ) : (
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform"
              style={{
                transform: `translateX(-${scrollPosition}px)`,
              }}
            >
              {/* Original companies */}
              {companies.map((company) => (
                <div
                  key={`${company.id}-1`}
                  className="flex-shrink-0 w-96 bg-muted/50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow border border-border"
                >
                  <div className="aspect-video bg-muted flex items-center justify-center p-4">
                    <img
                      src={company.logo || "/placeholder.svg"}
                      alt={company.name}
                      className="max-h-24 max-w-full object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{company.name}</h3>
                    <p className="text-sm text-primary font-medium mb-3">{company.industry}</p>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{company.description}</p>
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <span>📍 {company.address}</span>
                    </div>
                    {company.website && (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-sm font-semibold hover:underline mt-3 inline-block"
                      >
                        Visit Website →
                      </a>
                    )}
                  </div>
                </div>
              ))}
              {/* Duplicate companies for infinite loop effect */}
              {companies.map((company) => (
                <div
                  key={`${company.id}-2`}
                  className="flex-shrink-0 w-96 bg-muted/50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow border border-border"
                >
                  <div className="aspect-video bg-muted flex items-center justify-center p-4">
                    <img
                      src={company.logo || "/placeholder.svg"}
                      alt={company.name}
                      className="max-h-24 max-w-full object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{company.name}</h3>
                    <p className="text-sm text-primary font-medium mb-3">{company.industry}</p>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{company.description}</p>
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <span>📍 {company.address}</span>
                    </div>
                    {company.website && (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-sm font-semibold hover:underline mt-3 inline-block"
                      >
                        Visit Website →
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
