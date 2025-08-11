"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { isLoggedIn, getCurrentUser, setLoggedIn, logout } from "@/lib/auth-utils"
import { useToast } from "@/hooks/use-toast"

// Define the auth context type
type User = {
  id: string
  name: string
  email: string
  avatar: string
} | null

type AuthContextType = {
  user: User
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

// Create the auth context
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isLoading: true,
})

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  // Check if the user is logged in on mount
  useEffect(() => {
    const checkAuth = () => {
      if (isLoggedIn()) {
        setUser(getCurrentUser())
      } else {
        setUser(null)
      }
      setIsLoading(false)
    }

    checkAuth()

    // Listen for storage events (for multi-tab support)
    window.addEventListener("storage", checkAuth)
    return () => window.removeEventListener("storage", checkAuth)
  }, [])

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, you would call your API here
      // For demo purposes, we'll simulate a successful login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Set the user as logged in
      setLoggedIn(true)

      // Update the user state
      setUser(getCurrentUser())

      toast({
        title: "Login successful!",
        description: "Welcome back to Dreamers Talent Club.",
      })

      return true
    } catch (error) {
      console.error("Login failed:", error)
      return false
    }
  }

  // Logout function
  const handleLogout = () => {
    logout()
    setUser(null)

    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    })

    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout: handleLogout, isLoading }}>{children}</AuthContext.Provider>
  )
}

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext)

