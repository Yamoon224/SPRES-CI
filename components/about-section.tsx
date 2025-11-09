"use client"

import { useLanguage } from "./language-provider"
import { Briefcase, CheckCircle, Users } from "lucide-react"

export function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{t("about.title")}</h2>
          <p className="text-xl text-primary font-semibold">{t("about.subtitle")}</p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed text-justify">{t("about.desc")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-background border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{t("about.partnership")}</h3>
            <p className="text-muted-foreground">{t("about.partnership_desc")}</p>
          </div>

          <div className="bg-background border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{t("about.quality")}</h3>
            <p className="text-muted-foreground">{t("about.quality_desc")}</p>
          </div>

          <div className="bg-background border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Founded 2019</h3>
            <p className="text-muted-foreground">
              A committed journey to customer satisfaction and service excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
