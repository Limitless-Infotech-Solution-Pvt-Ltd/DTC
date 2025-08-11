import type React from "react"
import type { Metadata } from "next"
import ProtectedRoute from "@/components/protected-route"

export const metadata: Metadata = {
  title: "Dashboard | Dreamers Talent Club",
  description: "Manage your account, view analytics, and track your earnings",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}

