"use client"

import Image from "next/image"
import { useLanguage } from "./language-provider"
import Link from "next/link"

export function Footer() {
    const { t } = useLanguage()
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-foreground text-background">
            <div className="container mx-auto px-4 max-w-7xl py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <Image
                            src="/logo.png"
                            alt="SPRES GROUP"
                            width={60}
                            height={60}
                            className="object-contain"
                        />
                        <h3 className="font-bold text-lg mb-4">SPRES GROUP</h3>
                        <p className="text-sm opacity-80">{t("footer.company")}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#home" className="hover:opacity-80 transition-opacity">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="#about" className="hover:opacity-80 transition-opacity">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="#services" className="hover:opacity-80 transition-opacity">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="#contact" className="hover:opacity-80 transition-opacity">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Services</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:opacity-80 transition-opacity">
                                    Temporary Work
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:opacity-80 transition-opacity">
                                    Building Works
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:opacity-80 transition-opacity">
                                    Cleaning Services
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:opacity-80 transition-opacity">
                                    Property Management
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:opacity-80 transition-opacity">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:opacity-80 transition-opacity">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:opacity-80 transition-opacity">
                                    Cookies
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-background/20 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-75">
                        <p>
                            &copy; {currentYear} SPRES. {t("footer.rights")}.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:opacity-100 transition-opacity">
                                LinkedIn
                            </a>
                            <a href="#" className="hover:opacity-100 transition-opacity">
                                Facebook
                            </a>
                            <a href="#" className="hover:opacity-100 transition-opacity">
                                Twitter
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
