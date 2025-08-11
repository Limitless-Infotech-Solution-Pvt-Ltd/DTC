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
import { Separator } from "@/components/ui/separator"
import {
  AlertCircle,
  ArrowRight,
  BanknoteIcon,
  CreditCard,
  Download,
  ExternalLink,
  Filter,
  HelpCircle,
  Loader2,
  Plus,
  Search,
  Settings,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import PaymentMethodCard from "@/components/payouts/payment-method-card"
import TransactionItem from "@/components/payouts/transaction-item"

export default function PayoutsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [selectedMethod, setSelectedMethod] = useState("bank-1")
  const { toast } = useToast()

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!withdrawAmount || Number.parseFloat(withdrawAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to withdraw.",
        variant: "destructive",
      })
      return
    }

    if (Number.parseFloat(withdrawAmount) > 1250.0) {
      toast({
        title: "Insufficient balance",
        description: "The withdrawal amount exceeds your available balance.",
        variant: "destructive",
      })
      return
    }

    setIsWithdrawing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Withdrawal requested",
      description: `Your withdrawal of $${withdrawAmount} has been requested and is being processed.`,
    })

    setIsWithdrawing(false)
    setWithdrawAmount("")
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar activeItem="payouts" />

      <div className="flex-1 overflow-auto">
        <div className="border-b">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2 font-semibold">Payouts & Earnings</div>
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
                  <BanknoteIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,250.00</div>
                  <p className="text-xs text-muted-foreground">Available for withdrawal</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Earnings</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$450.00</div>
                  <p className="text-xs text-muted-foreground">Will be available in 7 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$8,750.00</div>
                  <p className="text-xs text-muted-foreground">Lifetime earnings</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Payout</CardTitle>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$450.00</div>
                  <p className="text-xs text-muted-foreground">Estimated for June 15, 2023</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="withdraw">Withdraw Funds</TabsTrigger>
                  <TabsTrigger value="history">Transaction History</TabsTrigger>
                  <TabsTrigger value="methods">Payment Methods</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Overview</CardTitle>
                    <CardDescription>Your earnings and payout summary</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Recent Transactions</h3>
                        <div className="space-y-2">
                          <TransactionItem
                            type="deposit"
                            amount="350.00"
                            date="June 1, 2023"
                            status="completed"
                            description="Project payment - Website Design"
                          />
                          <TransactionItem
                            type="withdrawal"
                            amount="500.00"
                            date="May 25, 2023"
                            status="completed"
                            description="Withdrawal to Bank Account"
                          />
                          <TransactionItem
                            type="deposit"
                            amount="450.00"
                            date="May 20, 2023"
                            status="pending"
                            description="Project payment - Logo Design"
                          />
                          <TransactionItem
                            type="deposit"
                            amount="900.00"
                            date="May 15, 2023"
                            status="completed"
                            description="Project payment - Marketing Campaign"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Payout Schedule</h3>
                        <div className="rounded-md border p-4">
                          <div className="flex flex-col space-y-2">
                            <p className="text-sm">
                              Your current payout schedule is <strong>Monthly</strong>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Earnings are processed on the 1st of each month and typically arrive within 3-5 business
                              days.
                            </p>
                            <div className="mt-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href="/dashboard/settings/payment-preferences">
                                  <Settings className="mr-2 h-4 w-4" />
                                  Change Schedule
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href="/dashboard/reports/earnings">View Detailed Reports</Link>
                    </Button>
                    <Button onClick={() => setActiveTab("withdraw")}>Withdraw Funds</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="withdraw" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Withdraw Funds</CardTitle>
                    <CardDescription>Transfer your available balance to your preferred payment method</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleWithdraw} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Withdrawal Amount</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="0.00"
                            className="pl-8"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            min="1"
                            step="0.01"
                            required
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">Available balance: $1,250.00</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="payment-method">Payment Method</Label>
                        <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                          <SelectTrigger id="payment-method">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bank-1">Bank Account (****6789)</SelectItem>
                            <SelectItem value="paypal">PayPal (user@example.com)</SelectItem>
                            <SelectItem value="bank-2">Bank Account (****4321)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="rounded-md bg-muted p-4">
                        <div className="flex items-start gap-4">
                          <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Important Information</p>
                            <p className="text-xs text-muted-foreground">
                              Withdrawals are processed within 1-3 business days. A minimum withdrawal amount of $50 is
                              required. A processing fee of 2% applies to all withdrawals.
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button type="submit" className="w-full" disabled={isWithdrawing}>
                        {isWithdrawing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Withdraw Funds"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle>Transaction History</CardTitle>
                        <CardDescription>View all your past transactions and payouts</CardDescription>
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
                      <div className="rounded-md border">
                        <div className="grid grid-cols-5 p-4 text-sm font-medium">
                          <div>Date</div>
                          <div>Description</div>
                          <div>Type</div>
                          <div className="text-right">Amount</div>
                          <div className="text-right">Status</div>
                        </div>
                        <Separator />
                        <div className="divide-y">
                          {transactions.map((transaction, index) => (
                            <div key={index} className="grid grid-cols-5 p-4 text-sm">
                              <div className="text-muted-foreground">{transaction.date}</div>
                              <div>{transaction.description}</div>
                              <div>
                                <Badge variant={transaction.type === "deposit" ? "outline" : "secondary"}>
                                  {transaction.type === "deposit" ? "Deposit" : "Withdrawal"}
                                </Badge>
                              </div>
                              <div className={`text-right ${transaction.type === "deposit" ? "text-green-600" : ""}`}>
                                {transaction.type === "deposit" ? "+" : "-"}${transaction.amount}
                              </div>
                              <div className="text-right">
                                <Badge variant={transaction.status === "completed" ? "default" : "outline"}>
                                  {transaction.status === "completed" ? "Completed" : "Pending"}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <Button variant="outline">Load More</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="methods" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>Manage your payment methods for receiving funds</CardDescription>
                      </div>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Payment Method
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <PaymentMethodCard type="bank" name="Chase Bank" details="****6789" isDefault={true} />

                      <PaymentMethodCard type="paypal" name="PayPal" details="user@example.com" isDefault={false} />

                      <PaymentMethodCard type="bank" name="Bank of America" details="****4321" isDefault={false} />

                      <div className="rounded-md border border-dashed p-6">
                        <div className="flex flex-col items-center justify-center text-center">
                          <div className="rounded-full bg-muted p-3">
                            <Plus className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <h3 className="mt-4 text-lg font-medium">Add a new payment method</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Add a bank account, PayPal, or other payment method to receive your earnings
                          </p>
                          <Button className="mt-4">Add Payment Method</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-xs text-muted-foreground">
                      Payment methods are securely stored and processed. We never store your full bank account or card
                      details.
                      <Link href="/privacy" className="ml-1 text-primary underline-offset-4 hover:underline">
                        Learn more <ExternalLink className="inline h-3 w-3" />
                      </Link>
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

const transactions = [
  {
    date: "June 1, 2023",
    description: "Project payment - Website Design",
    type: "deposit",
    amount: "350.00",
    status: "completed",
  },
  {
    date: "May 25, 2023",
    description: "Withdrawal to Bank Account",
    type: "withdrawal",
    amount: "500.00",
    status: "completed",
  },
  {
    date: "May 20, 2023",
    description: "Project payment - Logo Design",
    type: "deposit",
    amount: "450.00",
    status: "pending",
  },
  {
    date: "May 15, 2023",
    description: "Project payment - Marketing Campaign",
    type: "deposit",
    amount: "900.00",
    status: "completed",
  },
  {
    date: "May 10, 2023",
    description: "Withdrawal to PayPal",
    type: "withdrawal",
    amount: "750.00",
    status: "completed",
  },
  {
    date: "May 5, 2023",
    description: "Project payment - SEO Optimization",
    type: "deposit",
    amount: "600.00",
    status: "completed",
  },
  {
    date: "April 28, 2023",
    description: "Project payment - Content Writing",
    type: "deposit",
    amount: "300.00",
    status: "completed",
  },
  {
    date: "April 20, 2023",
    description: "Withdrawal to Bank Account",
    type: "withdrawal",
    amount: "1000.00",
    status: "completed",
  },
]

