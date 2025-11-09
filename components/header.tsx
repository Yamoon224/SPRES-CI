"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useLanguage } from "./language-provider"
import { Menu, X, Sun, Moon, Home, Briefcase, Building2 } from "lucide-react"
import Image from "next/image"
import { AuthModal } from "./auth-modal"
import { usePathname } from "next/navigation"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const pathname = usePathname()

  const navItems = [
    { label: t("nav.home"), href: "/", icon: Home },
    { label: t("nav.opportunities"), href: "/opportunities", icon: Briefcase },
    { label: t("nav.partners"), href: "/partners", icon: Building2 },
  ]

  const handleAuthClick = (mode: "login" | "register") => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      <header className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-B0JacvO5fytm8Y9nt1BNo2AJ36X4Oc.jpg"
                alt="SPRES"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="font-bold text-xl text-primary hidden sm:inline">SPRES</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const IconComponent = item.icon
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 transition-colors font-medium pb-1 border-b-2 ${
                      active
                        ? "text-primary border-b-primary"
                        : "text-foreground border-b-transparent hover:text-primary"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <div className="flex items-center bg-muted rounded-lg p-1">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-2 py-1 rounded transition-colors text-sm font-medium ${
                    language === "en" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-background"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("fr")}
                  className={`px-2 py-1 rounded transition-colors text-sm font-medium ${
                    language === "fr" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-background"
                  }`}
                >
                  FR
                </button>
              </div>

              {/* Theme Switcher */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg bg-muted hover:bg-border transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-700" />
                )}
              </button>

              <button
                onClick={() => handleAuthClick("login")}
                className="hidden sm:inline px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                {t("auth.login")}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg bg-muted hover:bg-border transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <nav className="md:hidden mt-4 flex flex-col gap-4 pb-4">
              {navItems.map((item) => {
                const IconComponent = item.icon
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 transition-colors font-medium pb-1 border-b-2 ${
                      active
                        ? "text-primary border-b-primary"
                        : "text-foreground border-b-transparent hover:text-primary"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <IconComponent className="w-4 h-4" />
                    {item.label}
                  </Link>
                )
              })}
              <button
                onClick={() => {
                  handleAuthClick("login")
                  setIsOpen(false)
                }}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-left"
              >
                {t("auth.login")}
              </button>
            </nav>
          )}
        </div>
      </header>

      {showAuthModal && <AuthModal mode={authMode} isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />}
    </>
  )
}
