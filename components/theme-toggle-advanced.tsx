"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun, Monitor, Palette } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ThemeToggleAdvanced() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  // After mounting, we can show the theme toggle
  useEffect(() => {
    setMounted(true)

    // Show tooltip after 2 seconds if user hasn't interacted with theme toggle
    const timer = setTimeout(() => {
      const hasInteracted = localStorage.getItem("theme-toggle-interacted")
      if (!hasInteracted) {
        setShowTooltip(true)

        // Hide tooltip after 5 seconds
        setTimeout(() => {
          setShowTooltip(false)
        }, 5000)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem("theme-toggle-interacted", "true")
    setShowTooltip(false)
  }

  if (!mounted) {
    return null
  }

  return (
    <TooltipProvider>
      <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
        <TooltipTrigger asChild>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
                {showTooltip && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleThemeChange("light")} className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange("dark")} className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                <span>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleThemeChange("system")} className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                <span>System</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  document
                    .querySelector(".theme-customizer-button")
                    ?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
                }}
                className="flex items-center gap-2"
              >
                <Palette className="h-4 w-4" />
                <span>Customize</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Change theme or customize appearance</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

