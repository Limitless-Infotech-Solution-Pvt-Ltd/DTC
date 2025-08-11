"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, ArrowUpRight, Download, Upload, AlertCircle, Info, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
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
  {
    id: "tr_123459",
    type: "withdrawal",
    amount: 7500,
    status: "pending",
    date: "2023-06-01T16:45:00Z",
    method: "Bank Transfer",
    details: "XXXX XXXX XXXX 4532",
  },
  {
    id: "tr_123460",
    type: "deposit",
    amount: 15000,
    status: "completed",
    date: "2023-05-25T11:30:00Z",
    method: "UPI",
    details: "UPI ID: user@okaxis",
  },
  {
    id: "tr_123461",
    type: "withdrawal",
    amount: 5000,
    status: "failed",
    date: "2023-05-20T13:10:00Z",
    method: "Bank Transfer",
    details: "XXXX XXXX XXXX 4532",
    error: "Insufficient funds",
  },
]

export default function WalletPage() {
  const { toast } = useToast()
  const [amount, setAmount] = useState("")
  const [withdrawalMethod, setWithdrawalMethod] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const handleDeposit = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to deposit.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Deposit initiated",
        description: `Your deposit of ₹${Number(amount).toLocaleString("en-IN")} has been initiated.`,
      })
      setAmount("")
    }, 1500)
  }

  const handleWithdrawal = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to withdraw.",
        variant: "destructive",
      })
      return
    }

    if (!withdrawalMethod) {
      toast({
        title: "Payment method required",
        description: "Please select a payment method for withdrawal.",
        variant: "destructive",
      })
      return
    }

    if (Number(amount) < 1000) {
      toast({
        title: "Minimum withdrawal amount",
        description: "The minimum withdrawal amount is ₹1,000.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Withdrawal requested",
        description: `Your withdrawal of ₹${Number(amount).toLocaleString("en-IN")} has been requested.`,
      })
      setAmount("")
      setWithdrawalMethod("")
    }, 1500)
  }

  // Calculate balance and other metrics
  const balance = 25000
  const pendingWithdrawals = 7500
  const availableBalance = balance - pendingWithdrawals
  const totalEarnings = 50000

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Wallet</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
          <DashboardSidebar className="md:col-span-2" />

          <div className="md:col-span-5 space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="deposit">Deposit</TabsTrigger>
                <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
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

                <Card>
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
                    <Button variant="outline" className="w-full">
                      View All Transactions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="deposit" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Deposit Funds</CardTitle>
                    <CardDescription>Add money to your wallet using various payment methods</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="deposit-amount">Amount (₹)</Label>
                      <Input
                        id="deposit-amount"
                        type="number"
                        placeholder="Enter amount in ₹"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Payment Method</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="cursor-pointer border-primary">
                          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                            <div className="rounded-full bg-primary/10 p-2 mb-2">
                              <img src="/placeholder.svg?height=24&width=24&text=UPI" alt="UPI" className="h-6 w-6" />
                            </div>
                            <div className="font-medium">UPI</div>
                            <div className="text-xs text-muted-foreground">Instant transfer</div>
                          </CardContent>
                        </Card>
                        <Card className="cursor-pointer">
                          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                            <div className="rounded-full bg-primary/10 p-2 mb-2">
                              <img
                                src="/placeholder.svg?height=24&width=24&text=Bank"
                                alt="Bank Transfer"
                                className="h-6 w-6"
                              />
                            </div>
                            <div className="font-medium">Bank Transfer</div>
                            <div className="text-xs text-muted-foreground">NEFT/IMPS/RTGS</div>
                          </CardContent>
                        </Card>
                        <Card className="cursor-pointer">
                          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                            <div className="rounded-full bg-primary/10 p-2 mb-2">
                              <img src="/placeholder.svg?height=24&width=24&text=Card" alt="Card" className="h-6 w-6" />
                            </div>
                            <div className="font-medium">Card</div>
                            <div className="text-xs text-muted-foreground">Credit/Debit Card</div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Information</AlertTitle>
                      <AlertDescription>
                        Deposits are typically processed instantly for UPI and within 24 hours for bank transfers. There
                        are no fees for deposits.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={handleDeposit} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Deposit Funds
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="withdraw" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Withdraw Funds</CardTitle>
                    <CardDescription>Withdraw money from your wallet to your preferred payment method</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="withdraw-amount">Amount (₹)</Label>
                      <Input
                        id="withdraw-amount"
                        type="number"
                        placeholder="Enter amount in ₹"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Available balance: ₹{availableBalance.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="withdrawal-method">Withdrawal Method</Label>
                      <Select value={withdrawalMethod} onValueChange={setWithdrawalMethod}>
                        <SelectTrigger id="withdrawal-method">
                          <SelectValue placeholder="Select withdrawal method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank_transfer">Bank Account (HDFC Bank ****4532)</SelectItem>
                          <SelectItem value="upi">UPI (user@okaxis)</SelectItem>
                          <SelectItem value="add_new">+ Add New Payment Method</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Important</AlertTitle>
                      <AlertDescription>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Minimum withdrawal amount is ₹1,000</li>
                          <li>Withdrawals are processed within 1-3 business days</li>
                          <li>A processing fee of ₹25 applies to all withdrawals</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <Button className="w-full" onClick={handleWithdrawal} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Withdraw Funds
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/dashboard/settings/payment-methods">Manage Payment Methods</Link>
                    </Button>
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

