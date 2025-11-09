"use client"

import { useLanguage } from "./language-provider"
import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react"

export function HeroSection() {
  const { t } = useLanguage()
  const router = useRouter()

  const handleExploreClick = () => {
    router.push("/opportunities")
  }

  return (
    <section
      id="home"
      className="pt-20 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-primary/5 via-background to-background"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-6 order-2 md:order-1">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {t("hero.title")}
            </h1>

            <p className="text-base md:text-lg text-muted-foreground">{t("hero.subtitle")}</p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
              <button
                onClick={handleExploreClick}
                className="px-6 md:px-8 py-2 md:py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
              >
                {t("hero.cta")}
                <ChevronRight className="w-4 md:w-5 h-4 md:h-5" />
              </button>
              <button
                onClick={handleExploreClick}
                className="px-6 md:px-8 py-2 md:py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors text-sm md:text-base"
              >
                {t("nav.search")}
              </button>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <img
              src="/job-search-recruitment-professionals-working-toget.jpg"
              alt="Job search and recruitment"
              className="w-full max-w-md md:max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
