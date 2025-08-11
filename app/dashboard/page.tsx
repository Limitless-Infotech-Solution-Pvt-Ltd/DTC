"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowUpRight, Download, Upload, Wallet, CreditCard } from "lucide-react"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import DashboardChart from "@/components/dashboard/dashboard-chart"
import TransactionItem from "@/components/payouts/transaction-item"

// Sample transaction data
const transactions = [
  {
    id: "tr_123456",
    type: "deposit",
    amount: 5000,
    status: "completed",
    date: "2023-06-15T10:30:00Z",
    method: "UPI",
    details: "UPI ID: user@okaxis",
  },
  {
    id: "tr_123457",
    type: "withdrawal",
    amount: 2500,
    status: "completed",
    date: "2023-06-10T14:20:00Z",
    method: "Bank Transfer",
    details: "XXXX XXXX XXXX 4532",
  },
  {
    id: "tr_123458",
    type: "deposit",
    amount: 10000,
    status: "completed",
    date: "2023-06-05T09:15:00Z",
    method: "PayTM",
    details: "PayTM Wallet",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Calculate balance and other metrics
  const balance = 25000
  const pendingWithdrawals = 7500
  const availableBalance = balance - pendingWithdrawals
  const totalEarnings = 50000

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-7">
              <DashboardSidebar className="md:col-span-2" />

              <div className="md:col-span-5 space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                      <div className="h-4 w-4 text-muted-foreground">₹</div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹{balance.toLocaleString("en-IN")}</div>
                      <p className="text-xs text-muted-foreground">+₹10,000 from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
                      <div className="h-4 w-4 text-muted-foreground">₹</div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹{availableBalance.toLocaleString("en-IN")}</div>
                      <p className="text-xs text-muted-foreground">
                        ₹{pendingWithdrawals.toLocaleString("en-IN")} pending withdrawals
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                      <div className="h-4 w-4 text-muted-foreground">₹</div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹{totalEarnings.toLocaleString("en-IN")}</div>
                      <p className="text-xs text-muted-foreground">Lifetime earnings</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Payment Methods</CardTitle>
                      <div className="h-4 w-4 text-muted-foreground">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2</div>
                      <p className="text-xs text-muted-foreground">
                        <Link href="/dashboard/settings/payment-methods" className="text-primary">
                          Manage payment methods
                        </Link>
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Balance Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <DashboardChart />
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Recent Transactions</CardTitle>
                      <CardDescription>Your recent deposits and withdrawals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {transactions.map((transaction) => (
                          <TransactionItem key={transaction.id} transaction={transaction} />
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/dashboard/wallet">
                          View All Transactions
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <Button className="flex flex-col items-center justify-center h-24" asChild>
                          <Link href="/dashboard/wallet">
                            <Wallet className="h-8 w-8 mb-2" />
                            <span>Add Funds</span>
                          </Link>
                        </Button>
                        <Button className="flex flex-col items-center justify-center h-24" asChild>
                          <Link href="/dashboard/payouts">
                            <Download className="h-8 w-8 mb-2" />
                            <span>Withdraw</span>
                          </Link>
                        </Button>
                        <Button className="flex flex-col items-center justify-center h-24" variant="outline" asChild>
                          <Link href="/dashboard/settings/payment-methods">
                            <CreditCard className="h-8 w-8 mb-2" />
                            <span>Payment Methods</span>
                          </Link>
                        </Button>
                        <Button className="flex flex-col items-center justify-center h-24" variant="outline" asChild>
                          <Link href="/dashboard/support">
                            <Upload className="h-8 w-8 mb-2" />
                            <span>Get Support</span>
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">KYC Verification</span>
                        <Badge className="bg-green-500">Verified</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Account Level</span>
                        <Badge>Premium</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Payment Methods</span>
                        <Badge variant="outline">2 Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Currency</span>
                        <Badge variant="outline">INR (₹)</Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/dashboard/settings">
                          Manage Account
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-7">
              <DashboardSidebar className="md:col-span-2" />
              <div className="md:col-span-5">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics Dashboard</CardTitle>
                    <CardDescription>Detailed analytics will be displayed here</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">Analytics features coming soon</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-7">
              <DashboardSidebar className="md:col-span-2" />
              <div className="md:col-span-5">
                <Card>
                  <CardHeader>
                    <CardTitle>Reports</CardTitle>
                    <CardDescription>Generate and view reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">Reporting features coming soon</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-7">
              <DashboardSidebar className="md:col-span-2" />
              <div className="md:col-span-5">
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>View your notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">No new notifications</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

