import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ThemePreview from "@/components/theme-preview"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ThemeShowcasePage() {
  return (
    <div className="container py-12 md:py-24 space-y-8">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to home</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Theme Showcase</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Theme Customization</CardTitle>
          <CardDescription>
            Explore how different UI components look with your current theme settings. Use the theme customizer in the
            bottom right corner to change the appearance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">
            This page showcases various UI components with your current theme settings. You can use the theme customizer
            to change colors, typography, and other visual aspects of the site. Your preferences will be saved for
            future visits.
          </p>

          <ThemePreview />
        </CardContent>
      </Card>
    </div>
  )
}

