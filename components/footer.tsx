import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import LanguageSwitcher from "@/components/language-switcher"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col gap-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl">
              <span className="text-primary">Dremers</span> Talent Club
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Elevating brands through strategic digital marketing solutions since 2015. We help businesses grow through
              data-driven strategies and creative solutions.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services#seo" className="text-muted-foreground hover:text-foreground transition-colors">
                  SEO Optimization
                </Link>
              </li>
              <li>
                <Link href="/services#social" className="text-muted-foreground hover:text-foreground transition-colors">
                  Social Media Marketing
                </Link>
              </li>
              <li>
                <Link href="/services#ppc" className="text-muted-foreground hover:text-foreground transition-colors">
                  PPC Advertising
                </Link>
              </li>
              <li>
                <Link href="/services#email" className="text-muted-foreground hover:text-foreground transition-colors">
                  Email Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/services#content"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Content Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/services#analytics"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Analytics & Reporting
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about#team" className="text-muted-foreground hover:text-foreground transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="text-muted-foreground hover:text-foreground transition-colors">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-8">
          <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Dremers Talent Club. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex gap-4 text-xs">
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </Link>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </Link>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookies
                </Link>
              </div>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

