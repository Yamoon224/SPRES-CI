"use client"

import { useLanguage } from "./language-provider"
import { Star } from "lucide-react"
import { useEffect, useState } from "react"

interface Testimonial {
    id: number
    user: {
        id: number
        full_name: string
        email: string
        phone: string
        role: string
    }
    content: string
    rating: number
    created_at: string
}

export function TestimonialsSection() {
    const { t } = useLanguage()
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)
    const [scrollPosition, setScrollPosition] = useState(0)

    const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL ?? 'localhost'

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch(baseURL + "/api/v1/testimonials")
                const data = await response.json()
                setTestimonials(data.data || [])
            } catch (error) {
                console.log("[v0] Error fetching testimonials:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchTestimonials()
    }, [])

    useEffect(() => {
        if (testimonials.length === 0) return

        const interval = setInterval(() => {
            setScrollPosition((prev) => (prev + 1) % (testimonials.length * 320))
        }, 50)

        return () => clearInterval(interval)
    }, [testimonials.length])

    return (
        <section id="testimonials" className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("testimonials.title")}</h2>
                    <p className="text-lg text-muted-foreground">{t("testimonials.subtitle")}</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="text-muted-foreground">{t("nav.search")}...</div>
                    </div>
                ) : testimonials.length === 0 ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="text-muted-foreground">No testimonials available</div>
                    </div>
                ) : (
                    <div className="overflow-hidden">
                        <div
                            className="flex gap-6 transition-transform"
                            style={{
                                transform: `translateX(-${scrollPosition}px)`,
                            }}
                        >
                            {/* Original testimonials */}
                            {testimonials.map((testimonial) => (
                                <div
                                    key={`${testimonial.id}-1`}
                                    className="flex-shrink-0 w-80 bg-background rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="font-semibold text-foreground">{testimonial.user.full_name}</h3>
                                            <p className="text-sm text-muted-foreground">{testimonial.user.role}</p>
                                        </div>
                                        <div className="flex gap-1">
                                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">{testimonial.content}</p>
                                </div>
                            ))}
                            {/* Duplicate testimonials for infinite loop effect */}
                            {testimonials.map((testimonial) => (
                                <div
                                    key={`${testimonial.id}-2`}
                                    className="flex-shrink-0 w-80 bg-background rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="font-semibold text-foreground">{testimonial.user.full_name}</h3>
                                            <p className="text-sm text-muted-foreground">{testimonial.user.role}</p>
                                        </div>
                                        <div className="flex gap-1">
                                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">{testimonial.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
