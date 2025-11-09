"use client"

import { useLanguage } from "./language-provider"
import { Mail, MapPin, Phone, Globe } from "lucide-react"

export function ContactSection() {
  const { t } = useLanguage()

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      value: t("contact.address"),
    },
    {
      icon: Mail,
      title: "Email",
      value: t("contact.email"),
      href: `mailto:${t("contact.email")}`,
    },
    {
      icon: Phone,
      title: "Phone",
      value: t("contact.phone"),
      href: `tel:${t("contact.phone")}`,
    },
    {
      icon: Globe,
      title: "Website",
      value: t("contact.website"),
      href: t("contact.website"),
    },
  ]

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{t("contact.title")}</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            const content = (
              <div className="flex flex-col gap-3">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{info.title}</h3>
                <p className="text-muted-foreground text-sm break-all">{info.value}</p>
              </div>
            )

            return (
              <div
                key={index}
                className="bg-muted/50 border border-border rounded-lg p-6 hover:bg-muted transition-colors"
              >
                {info.href ? (
                  <a href={info.href} className="hover:opacity-80 transition-opacity">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
