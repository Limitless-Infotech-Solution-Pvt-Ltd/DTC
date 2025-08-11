"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Settings, Palette, Type, Layout, Monitor, Moon, Sun, RotateCcw } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const themes = [
  {
    name: "Default",
    primaryColor: "hsl(222.2 47.4% 11.2%)",
    primaryLight: "hsl(210 40% 98%)",
    secondaryColor: "hsl(210 40% 96.1%)",
    accentColor: "hsl(210 40% 96.1%)",
    borderColor: "hsl(214.3 31.8% 91.4%)",
  },
  {
    name: "Rose",
    primaryColor: "hsl(346 77% 49%)",
    primaryLight: "hsl(346 100% 97%)",
    secondaryColor: "hsl(346 100% 92%)",
    accentColor: "hsl(346 100% 90%)",
    borderColor: "hsl(346 100% 88%)",
  },
  {
    name: "Green",
    primaryColor: "hsl(142 76% 36%)",
    primaryLight: "hsl(142 71% 97%)",
    secondaryColor: "hsl(142 71% 92%)",
    accentColor: "hsl(142 71% 90%)",
    borderColor: "hsl(142 71% 88%)",
  },
  {
    name: "Purple",
    primaryColor: "hsl(262 83% 58%)",
    primaryLight: "hsl(262 100% 98%)",
    secondaryColor: "hsl(262 100% 92%)",
    accentColor: "hsl(262 100% 90%)",
    borderColor: "hsl(262 100% 88%)",
  },
  {
    name: "Blue",
    primaryColor: "hsl(221 83% 53%)",
    primaryLight: "hsl(214 100% 97%)",
    secondaryColor: "hsl(214 100% 92%)",
    accentColor: "hsl(214 100% 90%)",
    borderColor: "hsl(214 100% 88%)",
  },
  {
    name: "Orange",
    primaryColor: "hsl(24 94% 50%)",
    primaryLight: "hsl(24 100% 97%)",
    secondaryColor: "hsl(24 100% 92%)",
    accentColor: "hsl(24 100% 90%)",
    borderColor: "hsl(24 100% 88%)",
  },
  {
    name: "Teal",
    primaryColor: "hsl(168 76% 42%)",
    primaryLight: "hsl(168 76% 97%)",
    secondaryColor: "hsl(168 76% 92%)",
    accentColor: "hsl(168 76% 90%)",
    borderColor: "hsl(168 76% 88%)",
  },
  {
    name: "Red",
    primaryColor: "hsl(0 72% 51%)",
    primaryLight: "hsl(0 72% 97%)",
    secondaryColor: "hsl(0 72% 92%)",
    accentColor: "hsl(0 72% 90%)",
    borderColor: "hsl(0 72% 88%)",
  },
]

const fonts = [
  { name: "Default (Inter)", value: "Inter, sans-serif" },
  { name: "System", value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" },
  { name: "Serif", value: "Georgia, Cambria, 'Times New Roman', Times, serif" },
  { name: "Mono", value: "Menlo, Monaco, 'Courier New', monospace" },
  { name: "Rounded", value: "'Nunito', 'Segoe UI', sans-serif" },
]

const radiusScales = [
  { name: "None", value: "0" },
  { name: "Small", value: "0.3rem" },
  { name: "Default", value: "0.5rem" },
  { name: "Large", value: "0.75rem" },
  { name: "Full", value: "9999px" },
]

const animations = [
  { name: "Default", value: "default" },
  { name: "Smooth", value: "smooth" },
  { name: "Reduced", value: "reduced" },
  { name: "None", value: "none" },
]

export default function ThemeCustomizer() {
  const [open, setOpen] = useState(false)
  const { setTheme, theme } = useTheme()
  const { toast } = useToast()
  const [selectedTheme, setSelectedTheme] = useState("Default")
  const [customColors, setCustomColors] = useState({
    primary: "#000000",
    secondary: "#f1f5f9",
    accent: "#f1f5f9",
    border: "#e2e8f0",
  })
  const [fontSize, setFontSize] = useState(16)
  const [fontFamily, setFontFamily] = useState(fonts[0].value)
  const [borderRadius, setBorderRadius] = useState(radiusScales[2].value)
  const [animation, setAnimation] = useState(animations[0].value)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [customTheme, setCustomTheme] = useState(false)

  // Load saved theme preferences from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("dremers-theme")
    if (savedTheme) {
      try {
        const themeData = JSON.parse(savedTheme)
        setSelectedTheme(themeData.name || "Default")
        setCustomColors(themeData.colors || customColors)
        setFontSize(themeData.fontSize || 16)
        setFontFamily(themeData.fontFamily || fonts[0].value)
        setBorderRadius(themeData.borderRadius || radiusScales[2].value)
        setAnimation(themeData.animation || animations[0].value)
        setReducedMotion(themeData.reducedMotion || false)
        setHighContrast(themeData.highContrast || false)
        setCustomTheme(themeData.customTheme || false)

        // Apply the saved theme
        if (themeData.customTheme) {
          applyCustomTheme(themeData.colors)
        } else {
          applyTheme(themeData.name || "Default")
        }
      } catch (error) {
        console.error("Error loading saved theme:", error)
      }
    }
  }, [])

  const saveThemePreferences = () => {
    const themeData = {
      name: selectedTheme,
      colors: customColors,
      fontSize,
      fontFamily,
      borderRadius,
      animation,
      reducedMotion,
      highContrast,
      customTheme,
    }

    localStorage.setItem("dremers-theme", JSON.stringify(themeData))

    toast({
      title: "Theme preferences saved",
      description: "Your theme settings have been saved and will be applied on future visits.",
    })
  }

  const resetTheme = () => {
    // Reset to default theme
    setSelectedTheme("Default")
    setCustomColors({
      primary: "#000000",
      secondary: "#f1f5f9",
      accent: "#f1f5f9",
      border: "#e2e8f0",
    })
    setFontSize(16)
    setFontFamily(fonts[0].value)
    setBorderRadius(radiusScales[2].value)
    setAnimation(animations[0].value)
    setReducedMotion(false)
    setHighContrast(false)
    setCustomTheme(false)

    // Apply default theme
    applyTheme("Default")

    // Remove saved theme from localStorage
    localStorage.removeItem("dremers-theme")

    toast({
      title: "Theme reset",
      description: "All theme settings have been reset to default values.",
    })
  }

  const applyTheme = (themeName: string) => {
    setSelectedTheme(themeName)
    setCustomTheme(false)

    const selectedThemeObj = themes.find((t) => t.name === themeName)
    if (!selectedThemeObj) return

    document.documentElement.style.setProperty("--primary", selectedThemeObj.primaryColor)
    document.documentElement.style.setProperty("--primary-foreground", selectedThemeObj.primaryLight)
    document.documentElement.style.setProperty("--secondary", selectedThemeObj.secondaryColor)
    document.documentElement.style.setProperty("--accent", selectedThemeObj.accentColor)
    document.documentElement.style.setProperty("--border", selectedThemeObj.borderColor)
  }

  const applyCustomTheme = (colors = customColors) => {
    setCustomTheme(true)

    document.documentElement.style.setProperty("--primary", colors.primary)
    document.documentElement.style.setProperty("--secondary", colors.secondary)
    document.documentElement.style.setProperty("--accent", colors.accent)
    document.documentElement.style.setProperty("--border", colors.border)
  }

  const handleFontSizeChange = (value: number[]) => {
    const newSize = value[0]
    setFontSize(newSize)
    document.documentElement.style.fontSize = `${newSize}px`
  }

  const handleFontFamilyChange = (value: string) => {
    setFontFamily(value)
    document.documentElement.style.fontFamily = value
  }

  const handleBorderRadiusChange = (value: string) => {
    setBorderRadius(value)
    document.documentElement.style.setProperty("--radius", value)
  }

  const handleAnimationChange = (value: string) => {
    setAnimation(value)

    if (value === "none") {
      document.documentElement.classList.add("no-animations")
    } else {
      document.documentElement.classList.remove("no-animations")
    }

    if (value === "reduced") {
      document.documentElement.classList.add("reduced-animations")
    } else {
      document.documentElement.classList.remove("reduced-animations")
    }

    if (value === "smooth") {
      document.documentElement.classList.add("smooth-animations")
    } else {
      document.documentElement.classList.remove("smooth-animations")
    }
  }

  const handleReducedMotionChange = (checked: boolean) => {
    setReducedMotion(checked)

    if (checked) {
      document.documentElement.classList.add("reduce-motion")
    } else {
      document.documentElement.classList.remove("reduce-motion")
    }
  }

  const handleHighContrastChange = (checked: boolean) => {
    setHighContrast(checked)

    if (checked) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }

  const handleColorChange = (colorType: string, value: string) => {
    setCustomColors((prev) => ({
      ...prev,
      [colorType]: value,
    }))

    // Apply the custom color immediately
    document.documentElement.style.setProperty(`--${colorType}`, value)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="h-10 w-10 rounded-full shadow-md">
            <Settings className="h-5 w-5 rotate-0 scale-100 transition-all" />
            <span className="sr-only">Toggle theme customizer</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end" alignOffset={-20} forceMount>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Customize Theme</h4>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={resetTheme} title="Reset to defaults">
                  <RotateCcw className="h-4 w-4" />
                  <span className="sr-only">Reset theme</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                  <Check className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </div>

            <Tabs defaultValue="colors">
              <TabsList className="w-full">
                <TabsTrigger value="colors" className="flex-1">
                  <Palette className="h-4 w-4 mr-2" />
                  Colors
                </TabsTrigger>
                <TabsTrigger value="typography" className="flex-1">
                  <Type className="h-4 w-4 mr-2" />
                  Typography
                </TabsTrigger>
                <TabsTrigger value="layout" className="flex-1">
                  <Layout className="h-4 w-4 mr-2" />
                  Layout
                </TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="space-y-4 py-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">Theme Color</div>
                    <div className="flex items-center gap-2">
                      <Switch
                        id="custom-colors"
                        checked={customTheme}
                        onCheckedChange={(checked) => {
                          setCustomTheme(checked)
                          if (!checked) {
                            applyTheme(selectedTheme)
                          } else {
                            applyCustomTheme()
                          }
                        }}
                      />
                      <Label htmlFor="custom-colors" className="text-xs">
                        Custom
                      </Label>
                    </div>
                  </div>

                  {!customTheme ? (
                    <div className="grid grid-cols-4 gap-2">
                      {themes.map((t) => (
                        <Button
                          key={t.name}
                          variant="outline"
                          size="sm"
                          onClick={() => applyTheme(t.name)}
                          className={cn(
                            "justify-start gap-2 p-2 h-auto",
                            selectedTheme === t.name ? "border-primary" : "",
                          )}
                        >
                          <div className="h-5 w-5 rounded-full" style={{ backgroundColor: t.primaryColor }} />
                          <span className="text-xs">{t.name}</span>
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="primary-color" className="text-xs">
                            Primary
                          </Label>
                          <div
                            className="h-4 w-4 rounded-full border"
                            style={{ backgroundColor: customColors.primary }}
                          />
                        </div>
                        <input
                          id="primary-color"
                          type="color"
                          value={customColors.primary}
                          onChange={(e) => handleColorChange("primary", e.target.value)}
                          className="w-full h-8 rounded-md cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="secondary-color" className="text-xs">
                            Secondary
                          </Label>
                          <div
                            className="h-4 w-4 rounded-full border"
                            style={{ backgroundColor: customColors.secondary }}
                          />
                        </div>
                        <input
                          id="secondary-color"
                          type="color"
                          value={customColors.secondary}
                          onChange={(e) => handleColorChange("secondary", e.target.value)}
                          className="w-full h-8 rounded-md cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="accent-color" className="text-xs">
                            Accent
                          </Label>
                          <div
                            className="h-4 w-4 rounded-full border"
                            style={{ backgroundColor: customColors.accent }}
                          />
                        </div>
                        <input
                          id="accent-color"
                          type="color"
                          value={customColors.accent}
                          onChange={(e) => handleColorChange("accent", e.target.value)}
                          className="w-full h-8 rounded-md cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="border-color" className="text-xs">
                            Border
                          </Label>
                          <div
                            className="h-4 w-4 rounded-full border"
                            style={{ backgroundColor: customColors.border }}
                          />
                        </div>
                        <input
                          id="border-color"
                          type="color"
                          value={customColors.border}
                          onChange={(e) => handleColorChange("border", e.target.value)}
                          className="w-full h-8 rounded-md cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="font-medium text-sm">Mode</div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTheme("light")}
                      className={cn("justify-start gap-2", theme === "light" ? "border-primary" : "")}
                    >
                      <Sun className="h-4 w-4" />
                      <span className="text-xs">Light</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTheme("dark")}
                      className={cn("justify-start gap-2", theme === "dark" ? "border-primary" : "")}
                    >
                      <Moon className="h-4 w-4" />
                      <span className="text-xs">Dark</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTheme("system")}
                      className={cn("justify-start gap-2", theme === "system" ? "border-primary" : "")}
                    >
                      <Monitor className="h-4 w-4" />
                      <span className="text-xs">System</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="font-medium text-sm">Accessibility</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="high-contrast" className="text-sm">
                        High Contrast
                      </Label>
                      <Switch id="high-contrast" checked={highContrast} onCheckedChange={handleHighContrastChange} />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="typography" className="space-y-4 py-2">
                <div className="space-y-2">
                  <div className="font-medium text-sm">Font Family</div>
                  <Select value={fontFamily} onValueChange={handleFontFamilyChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select font family" />
                    </SelectTrigger>
                    <SelectContent>
                      {fonts.map((font) => (
                        <SelectItem key={font.name} value={font.value}>
                          {font.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="font-size" className="text-sm">
                      Font Size: {fontSize}px
                    </Label>
                  </div>
                  <Slider
                    id="font-size"
                    min={12}
                    max={20}
                    step={1}
                    defaultValue={[fontSize]}
                    onValueChange={handleFontSizeChange}
                  />
                </div>

                <div className="pt-2">
                  <div className="rounded-md border p-4">
                    <p className="text-sm font-medium" style={{ fontFamily }}>
                      The quick brown fox jumps over the lazy dog.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2" style={{ fontFamily }}>
                      Preview of your selected typography settings.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="layout" className="space-y-4 py-2">
                <div className="space-y-2">
                  <div className="font-medium text-sm">Border Radius</div>
                  <RadioGroup value={borderRadius} onValueChange={handleBorderRadiusChange}>
                    <div className="grid grid-cols-5 gap-2">
                      {radiusScales.map((scale) => (
                        <div key={scale.name} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={scale.value}
                            id={`radius-${scale.name.toLowerCase()}`}
                            className="sr-only"
                          />
                          <Label
                            htmlFor={`radius-${scale.name.toLowerCase()}`}
                            className={cn(
                              "flex flex-col items-center justify-between rounded-md border-2 border-muted p-2 hover:border-accent cursor-pointer",
                              borderRadius === scale.value && "border-primary",
                            )}
                          >
                            <div
                              className="h-6 w-6 border-2 border-foreground mb-1"
                              style={{ borderRadius: scale.value }}
                            />
                            <span className="text-xs">{scale.name}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <div className="font-medium text-sm">Animation</div>
                  <Select value={animation} onValueChange={handleAnimationChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select animation style" />
                    </SelectTrigger>
                    <SelectContent>
                      {animations.map((anim) => (
                        <SelectItem key={anim.name} value={anim.value}>
                          {anim.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reduced-motion" className="text-sm">
                      Reduced Motion
                    </Label>
                    <Switch id="reduced-motion" checked={reducedMotion} onCheckedChange={handleReducedMotionChange} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Button className="w-full" onClick={saveThemePreferences}>
              Save Preferences
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

