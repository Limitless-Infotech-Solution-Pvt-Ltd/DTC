"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"

interface SocialLoginButtonProps {
  provider: "google" | "github" | "facebook" | "twitter"
  icon?: React.ReactNode
}

export default function SocialLoginButton({ provider, icon }: SocialLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { login } = useAuth()

  const handleLogin = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Use the auth context login function
      await login("demo@example.com", "password123")

      toast({
        title: `Logged in with ${provider}`,
        description: `You have successfully logged in with ${provider}.`,
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Login failed",
        description: `Failed to login with ${provider}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getIcon = () => {
    if (icon) return icon

    switch (provider) {
      case "google":
        return <Image src="/google-logo.svg" alt="Google" width={16} height={16} className="h-4 w-4" />
      case "github":
        return null // Provided by props
      case "facebook":
        return null // Provided by props
      case "twitter":
        return null // Provided by props
      default:
        return null
    }
  }

  const getLabel = () => {
    return provider.charAt(0).toUpperCase() + provider.slice(1)
  }

  return (
    <Button variant="outline" className="w-full" onClick={handleLogin} disabled={isLoading}>
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : getIcon()}
      <span className="sr-only">Sign in with {getLabel()}</span>
    </Button>
  )
}

