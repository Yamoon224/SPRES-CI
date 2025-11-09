"use client"

import { useLanguage } from "./language-provider"
import Image from "next/image"

const defaultServices = [
  {
    id: 1,
    title: "Travail Temporaire et Intérim",
    description: "Travail Temporaire et Intérim",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
  },
  {
    id: 2,
    title: "Nettoyage entretien des locaux",
    description: "Nettoyage entretien des locaux",
    image: "https://images.unsplash.com/photo-1589939705066-5a101c49d1e7?w=500&h=500&fit=crop",
  },
  {
    id: 3,
    title: "Travaux bâtiments",
    description: "Travaux bâtiments",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=500&fit=crop",
  },
  {
    id: 4,
    title: "Gestion immobilière",
    description: "Gestion immobilière",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=500&fit=crop",
  },
]

export function ServicesSection() {
  const { t } = useLanguage()

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{t("services.title")}</h2>
          <p className="text-xl text-muted-foreground">{t("services.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {defaultServices.map((service) => (
            <div
              key={service.id}
              className="group bg-background rounded-lg overflow-hidden border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden bg-muted">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
