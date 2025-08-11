"use client"

// Comprehensive authentication utilities for Dreamers Talent Club

// Check if the user is logged in
export const isLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false

  // In a real app, you would check for a valid token
  // For this demo, we're using localStorage
  return localStorage.getItem("dreamers-logged-in") === "true"
}

// Set the user as logged in
export const setLoggedIn = (value = true): void => {
  if (typeof window === "undefined") return

  if (value) {
    localStorage.setItem("dreamers-logged-in", "true")
    localStorage.setItem("dreamers-has-visited", "true")

    // In a real app, you would store the token in an HTTP-only cookie
    // This is just for demo purposes
    document.cookie = "dreamers-auth-token=demo-token; path=/; max-age=86400"
  } else {
    localStorage.removeItem("dreamers-logged-in")

    // Clear the cookie
    document.cookie = "dreamers-auth-token=; path=/; max-age=0"
  }
}

// Log the user out
export const logout = (): void => {
  setLoggedIn(false)
}

// Get the current user (mock implementation)
export const getCurrentUser = () => {
  if (!isLoggedIn()) return null

  // In a real app, you would decode the JWT or fetch user data
  return {
    id: "user-1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  }
}

