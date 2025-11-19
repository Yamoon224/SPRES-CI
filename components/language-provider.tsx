"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "fr"

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
    en: {
        "nav.home": "Home",
        "nav.about": "About Us",
        "nav.services": "Services",
        "nav.contact": "Contact",
        "nav.search": "Search Jobs",
        "nav.opportunities": "Opportunities",
        "nav.partners": "Partners",
        "hero.title": "Find Your Ideal Job with SPRES",
        "hero.subtitle": "Your trusted partner for temporary work, building services, and professional staffing solutions",
        "hero.cta": "Explore Opportunities",
        "about.title": "About SPRES",
        "about.subtitle": "Who are we?",
        "about.desc":
            "SPRES (Société de Prestation de Service) is a citizen, multidimensional and socially responsible company, capable of providing solutions to all your concerns in both consulting and various service provisions. Since 2019, SPRES has been committed to customer satisfaction through quality assurance systems based on ISO 9001 standards.",
        "about.partnership": "Partnership Approach",
        "about.partnership_desc":
            "We accompany our clients as true partners in monitoring the personnel we send them to better meet their requirements.",
        "about.quality": "Quality Assurance",
        "about.quality_desc":
            "We require good presentation, respect for instructions, politeness and rigor from our personnel on site. ISO 9001 certified.",
        "services.title": "Our Services",
        "services.subtitle": "Comprehensive Solutions for Your Business Needs",
        "contact.title": "Get in Touch",
        "contact.address": "Cocody Angré, Carrefour des banques",
        "contact.email": "infos@spres-ci.com",
        "contact.phone": "0225-22-50-20-28",
        "contact.website": "http://spres-ci.com/",
        "footer.rights": "All rights reserved",
        "footer.company": "SPRES GROUP - Solutions de Prestation de Service",
        "testimonials.title": "What Our Clients Say",
        "testimonials.subtitle": "Real experiences from our valued partners",
        "companies.title": "Our Partner Companies",
        "companies.subtitle": "Trusted by leading organizations",
        "candidates.title": "Job Candidates",
        "candidates.subtitle": "Discover talented professionals",
        "auth.login": "Login",
        "auth.register": "Register",
        "auth.email": "Email",
        "auth.password": "Password",
        "auth.name": "Full Name",
        "auth.phone": "Phone",
        "auth.signin": "Sign In",
        "auth.signup": "Sign Up",
        "auth.noAccount": "Don't have an account?",
        "auth.haveAccount": "Already have an account?",
        "auth.logout": "Logout",
        "dashboard.title": "Dashboard",
        "dashboard.profile": "Profile",
        "dashboard.applications": "Applications",
        "dashboard.overview": "Overview",
        "dashboard.welcome": "Welcome back",
        "dashboard.stats.applications": "Applications",
        "dashboard.stats.interviews": "Interviews",
        "dashboard.stats.offers": "Job Offers",
        "profile.title": "My Profile",
        "profile.info": "Personal Information",
        "profile.edit": "Edit Profile",
        "profile.save": "Save Changes",
        "applications.title": "My Applications",
        "applications.status": "Status",
        "applications.date": "Application Date",
        "applications.pending": "Pending",
        "applications.reviewed": "Reviewed",
        "applications.interview": "Interview",
        "applications.accepted": "Accepted",
        "applications.rejected": "Rejected",
        "opportunities.title": "Job Opportunities",
        "opportunities.subtitle": "Find your next career move with SPRES",
        "opportunities.position": "Position",
        "opportunities.company": "Company",
        "opportunities.location": "Location",
        "opportunities.type": "Job Type",
        "opportunities.salary": "Salary",
        "opportunities.apply": "Apply Now",
        "opportunities.requiresLogin": "Login Required",
        "opportunities.loginToApply": "Please login to apply for this position",
        "opportunities.noOffers": "No opportunities available at the moment",
        "partners.title": "Partner Companies",
        "partners.subtitle": "Explore opportunities from our trusted partners",
        "partners.viewOffers": "View Opportunities",
        "partners.noOffers": "No opportunities for this company",
        "search.placeholder": "Search opportunities...",
        "search.noResults": "No results found",
        "pagination.previous": "Previous",
        "pagination.next": "Next",
        "pagination.page": "Page",
        "pagination.of": "of",
    },
    fr: {
        "nav.home": "Accueil",
        "nav.about": "À Propos",
        "nav.services": "Services",
        "nav.contact": "Contact",
        "nav.search": "Rechercher",
        "nav.opportunities": "Opportunités",
        "nav.partners": "Partenaires",
        "hero.title": "Trouvez Votre Emploi Idéal avec SPRES",
        "hero.subtitle":
            "Votre partenaire de confiance pour le travail temporaire, les services de bâtiment et les solutions d'emploi professionnel",
        "hero.cta": "Explorer les Opportunités",
        "about.title": "À Propos de SPRES",
        "about.subtitle": "Qui sommes-nous ?",
        "about.desc":
            "SPRES (Société de Prestation de Service) est une société citoyenne, pluridimensionnelle et socialement responsable, capable d'apporter des solutions à toutes vos préoccupations tant en conseil qu'en diverses prestations de service. Depuis 2019, SPRES s'inscrit dans une logique de satisfaction de ses clients grâce à des systèmes d'assurance qualité basés sur les normes ISO 9001.",
        "about.partnership": "Approche Partenariat",
        "about.partnership_desc":
            "Nous accompagnons nos clients comme de véritables partenaires dans le suivi du personnel que nous leur envoyons pour mieux répondre à leurs exigences.",
        "about.quality": "Assurance Qualité",
        "about.quality_desc":
            "Nous exigeons une bonne présentation, le respect des consignes, la politesse et la rigueur de la part de notre personnel sur site. Certifiés ISO 9001.",
        "services.title": "Nos Services",
        "services.subtitle": "Solutions Complètes pour les Besoins de Votre Entreprise",
        "contact.title": "Nous Contacter",
        "contact.address": "Cocody Angré, Carrefour des banques",
        "contact.email": "infos@spres-ci.com",
        "contact.phone": "0225-22-50-20-28",
        "contact.website": "http://spres-ci.com/",
        "footer.rights": "Tous droits réservés",
        "footer.company": "SPRES - Solutions de Prestation de Service",
        "testimonials.title": "Ce que disent nos clients",
        "testimonials.subtitle": "Des expériences réelles de nos précieux partenaires",
        "companies.title": "Nos Entreprises Partenaires",
        "companies.subtitle": "De confiance auprès des grandes organisations",
        "candidates.title": "Candidats à l'emploi",
        "candidates.subtitle": "Découvrez des professionnels talentueux",
        "auth.login": "Connexion",
        "auth.register": "Inscription",
        "auth.email": "Email",
        "auth.password": "Mot de passe",
        "auth.name": "Nom Complet",
        "auth.phone": "Téléphone",
        "auth.signin": "Se Connecter",
        "auth.signup": "S'inscrire",
        "auth.noAccount": "Vous n'avez pas de compte?",
        "auth.haveAccount": "Vous avez déjà un compte?",
        "auth.logout": "Déconnexion",
        "dashboard.title": "Tableau de Bord",
        "dashboard.profile": "Profil",
        "dashboard.applications": "Candidatures",
        "dashboard.overview": "Vue d'ensemble",
        "dashboard.welcome": "Bon retour",
        "dashboard.stats.applications": "Candidatures",
        "dashboard.stats.interviews": "Entretiens",
        "dashboard.stats.offers": "Offres d'emploi",
        "profile.title": "Mon Profil",
        "profile.info": "Informations Personnelles",
        "profile.edit": "Modifier le Profil",
        "profile.save": "Enregistrer les Modifications",
        "applications.title": "Mes Candidatures",
        "applications.status": "Statut",
        "applications.date": "Date de Candidature",
        "applications.pending": "En attente",
        "applications.reviewed": "Examiné",
        "applications.interview": "Entretien",
        "applications.accepted": "Accepté",
        "applications.rejected": "Rejeté",
        "opportunities.title": "Offres d'Emploi",
        "opportunities.subtitle": "Trouvez votre prochain emploi avec SPRES",
        "opportunities.position": "Poste",
        "opportunities.company": "Entreprise",
        "opportunities.location": "Localisation",
        "opportunities.type": "Type d'emploi",
        "opportunities.salary": "Salaire",
        "opportunities.apply": "Postuler",
        "opportunities.requiresLogin": "Connexion Requise",
        "opportunities.loginToApply": "Veuillez vous connecter pour postuler à ce poste",
        "opportunities.noOffers": "Aucune opportunité disponible pour le moment",
        "partners.title": "Entreprises Partenaires",
        "partners.subtitle": "Explorez les opportunités de nos partenaires de confiance",
        "partners.viewOffers": "Voir les Opportunités",
        "partners.noOffers": "Aucune opportunité pour cette entreprise",
        "search.placeholder": "Rechercher des opportunités...",
        "search.noResults": "Aucun résultat trouvé",
        "pagination.previous": "Précédent",
        "pagination.next": "Suivant",
        "pagination.page": "Page",
        "pagination.of": "de",
    },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem("language") as Language | null
        if (saved) {
            setLanguageState(saved)
        }
        setMounted(true)
    }, [])

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        localStorage.setItem("language", lang)
    }

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations.en] || key
    }

    return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider")
    }
    return context
}
