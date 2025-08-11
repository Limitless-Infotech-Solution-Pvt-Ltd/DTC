"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ThemeToggle } from "@/components/theme-toggle"
import LanguageSwitcher from "@/components/language-switcher"
import { useAuth } from "@/components/auth-provider"

export default function FirstVisitPopup() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem("dreamers-has-visited")

    // If it's the first visit, show the popup after a delay
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setOpen(true)
        // Set the flag in localStorage to indicate the user has visited
        localStorage.setItem("dreamers-has-visited", "true")
      }, 3000) // Show popup after 3 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Use the auth context login function
      const success = await login(email, password)

      if (success) {
        setOpen(false)
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  const handleSignup = () => {
    router.push("/auth/login?tab=register")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to Dreamers Talent Club</DialogTitle>
          <DialogDescription>Join our community to access exclusive content and features.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 py-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-primary underline-offset-4 hover:underline"
                    onClick={() => setOpen(false)}
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(!!checked)} />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Remember me
                </Label>
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4 py-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Create an account to access all features, track your progress, and connect with other professionals.
              </p>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Customize your experience</div>
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>

              <Button onClick={handleSignup} className="w-full">
                Create Account
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} className="sm:w-auto w-full">
            Maybe Later
          </Button>
          <div className="text-xs text-muted-foreground text-center sm:text-left">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

