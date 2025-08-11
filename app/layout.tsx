import type React from "react"
import type { Metadata } from "next"
import { Inter, Nunito } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ThemeCustomizer from "@/components/theme-customizer"
import FirstVisitPopup from "@/components/first-visit-popup"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" })

export const metadata: Metadata = {
  title: "Dremers Talent Club | Digital Marketing Agency",
  description: "Elevate your digital presence with our strategic marketing solutions tailored to your unique needs.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${nunito.variable}`}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ThemeCustomizer />
            <FirstVisitPopup />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

