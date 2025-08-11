"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  BarChart,
  Users,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Wallet,
  CreditCard,
  BanknoteIcon,
  MessageSquare,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardSidebarProps {
  activeItem?: string
}

export default function DashboardSidebar({ activeItem }: DashboardSidebarProps) {
  return (
    <div className="hidden border-r bg-muted/40 md:block md:w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-primary">Dremers</span> Talent Club
          </Link>
        </div>
        <ScrollArea className="flex-1 px-2">
          <div className="flex flex-col gap-1 py-2">
            {sidebarItems.map((item, index) => (
              <Button
                key={index}
                variant={activeItem === item.id ? "secondary" : "ghost"}
                className={cn("justify-start", activeItem === item.id && "bg-secondary")}
                asChild
              >
                <Link href={item.href}>
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Link>
              </Button>
            ))}
          </div>
          <div className="py-2">
            <h3 className="mb-2 px-4 text-xs font-semibold">Finance</h3>
            <div className="flex flex-col gap-1">
              {financeItems.map((item, index) => (
                <Button
                  key={index}
                  variant={activeItem === item.id ? "secondary" : "ghost"}
                  className={cn("justify-start", activeItem === item.id && "bg-secondary")}
                  asChild
                >
                  <Link href={item.href}>
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <div className="py-2">
            <h3 className="mb-2 px-4 text-xs font-semibold">Settings</h3>
            <div className="flex flex-col gap-1">
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/dashboard/settings">
                  <Settings className="h-4 w-4" />
                  <span className="ml-2">Account Settings</span>
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/dashboard/help">
                  <HelpCircle className="h-4 w-4" />
                  <span className="ml-2">Help & Support</span>
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/dashboard/messages">
                  <MessageSquare className="h-4 w-4" />
                  <span className="ml-2">Messages</span>
                </Link>
              </Button>
            </div>
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link href="/auth/login">
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

const sidebarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart className="h-4 w-4" />,
  },
  {
    id: "campaigns",
    label: "Campaigns",
    href: "/dashboard/campaigns",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: "customers",
    label: "Customers",
    href: "/dashboard/customers",
    icon: <Users className="h-4 w-4" />,
  },
]

const financeItems = [
  {
    id: "payouts",
    label: "Payouts & Earnings",
    href: "/dashboard/payouts",
    icon: <BanknoteIcon className="h-4 w-4" />,
  },
  {
    id: "wallet",
    label: "Wallet",
    href: "/dashboard/wallet",
    icon: <Wallet className="h-4 w-4" />,
  },
  {
    id: "billing",
    label: "Billing",
    href: "/dashboard/billing",
    icon: <CreditCard className="h-4 w-4" />,
  },
]

