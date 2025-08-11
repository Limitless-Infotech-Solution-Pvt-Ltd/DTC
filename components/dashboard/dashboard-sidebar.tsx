"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Wallet, CreditCard, Settings, HelpCircle, Download } from "lucide-react"

interface DashboardSidebarProps {
  className?: string
}

export default function DashboardSidebar({ className }: DashboardSidebarProps) {
  const pathname = usePathname()

  const sidebarItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Wallet",
      href: "/dashboard/wallet",
      icon: <Wallet className="h-5 w-5" />,
    },
    {
      title: "Payouts",
      href: "/dashboard/payouts",
      icon: <Download className="h-5 w-5" />,
    },
    {
      title: "Payment Methods",
      href: "/dashboard/settings/payment-methods",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      title: "Support",
      href: "/dashboard/support",
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ]

  return (
    <div className={cn("space-y-4", className)}>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Dashboard</h2>
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                pathname === item.href ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

