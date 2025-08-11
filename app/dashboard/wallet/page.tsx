"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BanknoteIcon,
  CreditCard,
  Download,
  Filter,
  HelpCircle,
  Loader2,
  Plus,
  Search,
  Settings,
  WalletIcon,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import TransactionItem from "@/components/payouts/transaction-item"

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleAddFunds = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Funds added",
      description: "Your funds have been successfully added to your wallet.",
    })

    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar activeItem="wallet" />

      <div className="flex-1 overflow-auto">
        <div className="border-b">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2 font-semibold">Wallet</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/settings/payment-methods">
                  <Settings className="mr-2 h-4 w-4" />
                  Payment Settings
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col gap-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
                  <WalletIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2,500.00</div>
                  <p className="text-xs text-muted-foreground">Available for use</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,750.00</div>
                  <p className="text-xs text-muted-foreground">Lifetime spending</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Payment Methods</CardTitle>
                  <BanknoteIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Active payment methods</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link href="/dashboard/settings/payment-methods">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Method
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="add-funds">Add Funds</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Wallet Overview</CardTitle>
                    <CardDescription>Manage your wallet and view recent transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Recent Transactions</h3>
                        <div className="space-y-2">
                          <TransactionItem
                            type="deposit"
                            amount="500.00"
                            date="June 5, 2023"
                            status="completed"
                            description="Added funds via Credit Card"
                          />
                          <TransactionItem
                            type="withdrawal"
                            amount="250.00"
                            date="June 3, 2023"
                            status="completed"
                            description="Payment for Premium Plan"
                          />
                          <TransactionItem
                            type="deposit"
                            amount="1000.00"
                            date="May 28, 2023"
                            status="completed"
                            description="Added funds via Bank Transfer"
                          />
                          <TransactionItem
                            type="withdrawal"
                            amount="750.00"
                            date="May 20, 2023"
                            status="completed"
                            description="Payment for Marketing Campaign"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Button onClick={() => setActiveTab("add-funds")}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Funds
                          </Button>
                          <Button variant="outline" asChild>
                            <Link href="/dashboard/billing">
                              <CreditCard className="mr-2 h-4 w-4" />
                              Manage Billing
                            </Link>
                          </Button>
                          <Button variant="outline" asChild>
                            <Link href="/dashboard/settings/payment-methods">
                              <Settings className="mr-2 h-4 w-4" />
                              Payment Methods
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="add-funds" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Add Funds to Wallet</CardTitle>
                    <CardDescription>Add money to your wallet using your preferred payment method</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddFunds} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="0.00"
                            className="pl-8"
                            min="10"
                            step="0.01"
                            required
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">Minimum amount: $10.00</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="payment-method">Payment Method</Label>
                        <Select defaultValue="card-1">
                          <SelectTrigger id="payment-method">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="card-1">Credit Card (****4242)</SelectItem>
                            <SelectItem value="card-2">Debit Card (****7890)</SelectItem>
                            <SelectItem value="paypal">PayPal (user@example.com)</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex justify-end">
                          <Button variant="link" size="sm" className="h-auto p-0" asChild>
                            <Link href="/dashboard/settings/payment-methods">Add new payment method</Link>
                          </Button>
                        </div>
                      </div>

                      <div className="rounded-md bg-muted p-4">
                        <div className="flex items-start gap-4">
                          <HelpCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Important Information</p>
                            <p className="text-xs text-muted-foreground">
                              Funds added to your wallet can be used for any purchases on our platform. There are no
                              fees for adding funds. Funds in your wallet are non-refundable but can be used for any
                              future purchases.
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Add Funds"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transactions" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle>Transaction History</CardTitle>
                        <CardDescription>View all your wallet transactions</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="relative w-full md:w-auto">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="search"
                            placeholder="Search transactions..."
                            className="w-full md:w-[200px] pl-8"
                          />
                        </div>
                        <Button variant="outline" size="icon">
                          <Filter className="h-4 w-4" />
                          <span className="sr-only">Filter</span>
                        </Button>
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {walletTransactions.map((transaction, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                          <div className="flex items-center gap-4">
                            <div
                              className={`rounded-full p-2 ${transaction.type === "deposit" ? "bg-green-100" : "bg-muted"}`}
                            >
                              {transaction.type === "deposit" ? (
                                <Plus className="h-4 w-4 text-green-600" />
                              ) : (
                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <p className="text-xs text-muted-foreground">{transaction.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${transaction.type === "deposit" ? "text-green-600" : ""}`}>
                              {transaction.type === "deposit" ? "+" : "-"}${transaction.amount}
                            </p>
                            <Badge variant={transaction.status === "completed" ? "default" : "outline"}>
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      ))}

                      <div className="flex items-center justify-center">
                        <Button variant="outline">Load More</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

const walletTransactions = [
  {
    type: "deposit",
    amount: "500.00",
    date: "June 5, 2023",
    status: "completed",
    description: "Added funds via Credit Card",
  },
  {
    type: "withdrawal",
    amount: "250.00",
    date: "June 3, 2023",
    status: "completed",
    description: "Payment for Premium Plan",
  },
  {
    type: "deposit",
    amount: "1000.00",
    date: "May 28, 2023",
    status: "completed",
    description: "Added funds via Bank Transfer",
  },
  {
    type: "withdrawal",
    amount: "750.00",
    date: "May 20, 2023",
    status: "completed",
    description: "Payment for Marketing Campaign",
  },
  {
    type: "deposit",
    amount: "300.00",
    date: "May 15, 2023",
    status: "completed",
    description: "Added funds via PayPal",
  },
  {
    type: "withdrawal",
    amount: "125.00",
    date: "May 10, 2023",
    status: "completed",
    description: "Payment for Social Media Ads",
  },
  {
    type: "deposit",
    amount: "800.00",
    date: "May 5, 2023",
    status: "completed",
    description: "Added funds via Credit Card",
  },
  {
    type: "withdrawal",
    amount: "450.00",
    date: "May 1, 2023",
    status: "completed",
    description: "Payment for SEO Services",
  },
]

