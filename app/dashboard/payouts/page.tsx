"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Download, AlertCircle, Info, Loader2, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import PaymentMethodCard from "@/components/payouts/payment-method-card"

export default function PayoutsPage() {
  const { toast } = useToast()
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isKycVerified, setIsKycVerified] = useState(true)
  const [activeTab, setActiveTab] = useState("request")
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    confirmAccountNumber: "",
    accountName: "",
    ifscCode: "",
    bankName: "",
    accountType: "",
  })
  const [upiDetails, setUpiDetails] = useState({
    upiId: "",
  })
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleRequestPayout = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to withdraw.",
        variant: "destructive",
      })
      return
    }

    if (!paymentMethod) {
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

    if (!termsAccepted) {
      toast({
        title: "Terms and conditions",
        description: "Please accept the terms and conditions to proceed.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Payout requested",
        description: `Your payout of ₹${Number(amount).toLocaleString("en-IN")} has been requested.`,
      })
      setAmount("")
      setPaymentMethod("")
      setTermsAccepted(false)
    }, 1500)
  }

  const handleAddBankAccount = () => {
    if (
      !bankDetails.accountNumber ||
      !bankDetails.confirmAccountNumber ||
      !bankDetails.accountName ||
      !bankDetails.ifscCode ||
      !bankDetails.bankName ||
      !bankDetails.accountType
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields.",
        variant: "destructive",
      })
      return
    }

    if (bankDetails.accountNumber !== bankDetails.confirmAccountNumber) {
      toast({
        title: "Account numbers don't match",
        description: "Please ensure the account numbers match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Bank account added",
        description: "Your bank account has been added successfully.",
      })
      setBankDetails({
        accountNumber: "",
        confirmAccountNumber: "",
        accountName: "",
        ifscCode: "",
        bankName: "",
        accountType: "",
      })
      setActiveTab("request")
    }, 1500)
  }

  const handleAddUPI = () => {
    if (!upiDetails.upiId || !upiDetails.upiId.includes("@")) {
      toast({
        title: "Invalid UPI ID",
        description: "Please enter a valid UPI ID.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "UPI ID added",
        description: "Your UPI ID has been added successfully.",
      })
      setUpiDetails({
        upiId: "",
      })
      setActiveTab("request")
    }, 1500)
  }

  // Sample payment methods
  const paymentMethods = [
    {
      id: "bank_1",
      type: "bank",
      name: "HDFC Bank",
      details: "Account ending in 4532",
      isDefault: true,
    },
    {
      id: "upi_1",
      type: "upi",
      name: "UPI",
      details: "user@okaxis",
      isDefault: false,
    },
  ]

  // Sample payout history
  const payoutHistory = [
    {
      id: "payout_1",
      amount: 5000,
      status: "completed",
      date: "2023-06-15T10:30:00Z",
      method: "Bank Transfer",
      details: "HDFC Bank ****4532",
    },
    {
      id: "payout_2",
      amount: 2500,
      status: "processing",
      date: "2023-06-10T14:20:00Z",
      method: "UPI",
      details: "user@okaxis",
    },
    {
      id: "payout_3",
      amount: 7500,
      status: "failed",
      date: "2023-06-01T16:45:00Z",
      method: "Bank Transfer",
      details: "HDFC Bank ****4532",
      error: "Invalid account details",
    },
  ]

  // Calculate available balance
  const availableBalance = 25000

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Payouts</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export History
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
          <DashboardSidebar className="md:col-span-2" />

          <div className="md:col-span-5 space-y-4">
            {!isKycVerified ? (
              <Card className="border-destructive">
                <CardHeader>
                  <CardTitle className="text-destructive">KYC Verification Required</CardTitle>
                  <CardDescription>You need to complete KYC verification before requesting payouts.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Verification Required</AlertTitle>
                    <AlertDescription>
                      As per regulatory requirements, KYC verification is mandatory for all users requesting payouts.
                    </AlertDescription>
                  </Alert>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="/auth/kyc-verification">
                      Complete KYC Verification
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="request">Request Payout</TabsTrigger>
                  <TabsTrigger value="methods">Payment Methods</TabsTrigger>
                  <TabsTrigger value="history">Payout History</TabsTrigger>
                </TabsList>

                <TabsContent value="request" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Request Payout</CardTitle>
                      <CardDescription>Withdraw your earnings to your preferred payment method</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="payout-amount">Amount (₹)</Label>
                        <Input
                          id="payout-amount"
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
                        <Label htmlFor="payment-method">Payment Method</Label>
                        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                          <SelectTrigger id="payment-method">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            {paymentMethods.map((method) => (
                              <SelectItem key={method.id} value={method.id}>
                                {method.name} ({method.details}){method.isDefault && " (Default)"}
                              </SelectItem>
                            ))}
                            <SelectItem value="add_bank">+ Add Bank Account</SelectItem>
                            <SelectItem value="add_upi">+ Add UPI ID</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Payout Information</AlertTitle>
                        <AlertDescription>
                          <ul className="list-disc pl-4 space-y-1">
                            <li>Minimum payout amount is ₹1,000</li>
                            <li>Payouts are processed within 1-3 business days</li>
                            <li>A processing fee of ₹25 applies to all payouts</li>
                          </ul>
                        </AlertDescription>
                      </Alert>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={termsAccepted}
                          onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the{" "}
                          <Link href="/terms" className="text-primary">
                            terms and conditions
                          </Link>{" "}
                          for payouts.
                        </label>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-2">
                      <Button className="w-full" onClick={handleRequestPayout} disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Download className="mr-2 h-4 w-4" />
                            Request Payout
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="methods" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Methods</CardTitle>
                      <CardDescription>Manage your payment methods for receiving payouts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        {paymentMethods.map((method) => (
                          <PaymentMethodCard key={method.id} method={method} />
                        ))}
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Add New Payment Method</h3>
                        <RadioGroup defaultValue="bank" className="grid grid-cols-2 gap-4">
                          <div>
                            <RadioGroupItem
                              value="bank"
                              id="bank"
                              className="peer sr-only"
                              onClick={() => setActiveTab("add_bank")}
                            />
                            <Label
                              htmlFor="bank"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <img
                                src="/placeholder.svg?height=32&width=32&text=Bank"
                                alt="Bank Account"
                                className="mb-3 h-8 w-8"
                              />
                              Bank Account
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="upi"
                              id="upi"
                              className="peer sr-only"
                              onClick={() => setActiveTab("add_upi")}
                            />
                            <Label
                              htmlFor="upi"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <img
                                src="/placeholder.svg?height=32&width=32&text=UPI"
                                alt="UPI"
                                className="mb-3 h-8 w-8"
                              />
                              UPI
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="add_bank" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Add Bank Account</CardTitle>
                      <CardDescription>Add your bank account details for receiving payouts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="account-number">Account Number</Label>
                          <Input
                            id="account-number"
                            type="text"
                            placeholder="Enter account number"
                            value={bankDetails.accountNumber}
                            onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-account-number">Confirm Account Number</Label>
                          <Input
                            id="confirm-account-number"
                            type="text"
                            placeholder="Confirm account number"
                            value={bankDetails.confirmAccountNumber}
                            onChange={(e) => setBankDetails({ ...bankDetails, confirmAccountNumber: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="account-name">Account Holder Name</Label>
                        <Input
                          id="account-name"
                          type="text"
                          placeholder="Enter account holder name"
                          value={bankDetails.accountName}
                          onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="ifsc-code">IFSC Code</Label>
                          <Input
                            id="ifsc-code"
                            type="text"
                            placeholder="Enter IFSC code"
                            value={bankDetails.ifscCode}
                            onChange={(e) => setBankDetails({ ...bankDetails, ifscCode: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bank-name">Bank Name</Label>
                          <Input
                            id="bank-name"
                            type="text"
                            placeholder="Enter bank name"
                            value={bankDetails.bankName}
                            onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="account-type">Account Type</Label>
                        <Select
                          value={bankDetails.accountType}
                          onValueChange={(value) => setBankDetails({ ...bankDetails, accountType: value })}
                        >
                          <SelectTrigger id="account-type">
                            <SelectValue placeholder="Select account type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="savings">Savings</SelectItem>
                            <SelectItem value="current">Current</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Important</AlertTitle>
                        <AlertDescription>
                          Please ensure that the account details are correct. Incorrect details may result in failed
                          payouts.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-2">
                      <Button className="w-full" onClick={handleAddBankAccount} disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Add Bank Account
                          </>
                        )}
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => setActiveTab("methods")}>
                        Cancel
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="add_upi" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Add UPI ID</CardTitle>
                      <CardDescription>Add your UPI ID for receiving payouts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="upi-id">UPI ID</Label>
                        <Input
                          id="upi-id"
                          type="text"
                          placeholder="yourname@upi"
                          value={upiDetails.upiId}
                          onChange={(e) => setUpiDetails({ ...upiDetails, upiId: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground">Example: yourname@okaxis, yourname@ybl, etc.</p>
                      </div>

                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Verification</AlertTitle>
                        <AlertDescription>
                          We'll send a small verification amount to confirm your UPI ID. This amount will be added to
                          your wallet balance.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-2">
                      <Button className="w-full" onClick={handleAddUPI} disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Add UPI ID
                          </>
                        )}
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => setActiveTab("methods")}>
                        Cancel
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Payout History</CardTitle>
                      <CardDescription>View your past payout requests and their status</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {payoutHistory.map((payout) => (
                          <div
                            key={payout.id}
                            className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                          >
                            <div className="space-y-1">
                              <p className="font-medium">₹{payout.amount.toLocaleString("en-IN")}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(payout.date).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {payout.method} • {payout.details}
                              </p>
                              {payout.error && <p className="text-xs text-destructive">{payout.error}</p>}
                            </div>
                            <div>
                              {payout.status === "completed" && <Badge className="bg-green-500">Completed</Badge>}
                              {payout.status === "processing" && <Badge className="bg-yellow-500">Processing</Badge>}
                              {payout.status === "failed" && <Badge variant="destructive">Failed</Badge>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View All Payouts
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

