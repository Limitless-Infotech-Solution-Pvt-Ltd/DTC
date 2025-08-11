"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, CheckCircle, CreditCard, Info, Loader2, Plus } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import PaymentMethodCard from "@/components/payouts/payment-method-card"

export default function PaymentMethodsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("bank")
  const [isLoading, setIsLoading] = useState(false)
  const [isKycVerified, setIsKycVerified] = useState(true)
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
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  })
  const [makeDefault, setMakeDefault] = useState(true)

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
    }, 1500)
  }

  const handleAddCard = () => {
    if (
      !cardDetails.cardNumber ||
      !cardDetails.nameOnCard ||
      !cardDetails.expiryMonth ||
      !cardDetails.expiryYear ||
      !cardDetails.cvv
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Card added",
        description: "Your card has been added successfully.",
      })
      setCardDetails({
        cardNumber: "",
        nameOnCard: "",
        expiryMonth: "",
        expiryYear: "",
        cvv: "",
      })
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

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Payment Methods</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
          <DashboardSidebar className="md:col-span-2" />

          <div className="md:col-span-5 space-y-4">
            {!isKycVerified ? (
              <Card className="border-destructive">
                <CardHeader>
                  <CardTitle className="text-destructive">KYC Verification Required</CardTitle>
                  <CardDescription>
                    You need to complete KYC verification before adding payment methods.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Verification Required</AlertTitle>
                    <AlertDescription>
                      As per regulatory requirements, KYC verification is mandatory for all users adding payment
                      methods.
                    </AlertDescription>
                  </Alert>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="/auth/kyc-verification">Complete KYC Verification</Link>
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Your Payment Methods</CardTitle>
                    <CardDescription>Manage your payment methods for deposits and withdrawals</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {paymentMethods.length > 0 ? (
                      <div className="space-y-4">
                        {paymentMethods.map((method) => (
                          <PaymentMethodCard key={method.id} method={method} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                          <CreditCard className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="font-medium mb-1">No payment methods added yet</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Add a payment method to make deposits and withdrawals easier.
                        </p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() =>
                        document.getElementById("add-payment-method")?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Payment Method
                    </Button>
                  </CardFooter>
                </Card>

                <div id="add-payment-method">
                  <Card>
                    <CardHeader>
                      <CardTitle>Add Payment Method</CardTitle>
                      <CardDescription>Add a new payment method for deposits and withdrawals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid grid-cols-3 w-full">
                          <TabsTrigger value="bank">Bank Account</TabsTrigger>
                          <TabsTrigger value="upi">UPI</TabsTrigger>
                          <TabsTrigger value="card">Card</TabsTrigger>
                        </TabsList>

                        <TabsContent value="bank" className="space-y-4 pt-4">
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
                                onChange={(e) =>
                                  setBankDetails({ ...bankDetails, confirmAccountNumber: e.target.value })
                                }
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

                          <div className="flex items-center space-x-2">
                            <Switch id="make-default-bank" checked={makeDefault} onCheckedChange={setMakeDefault} />
                            <Label htmlFor="make-default-bank">Make this my default payment method</Label>
                          </div>
                        </TabsContent>

                        <TabsContent value="upi" className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="upi-id">UPI ID</Label>
                            <Input
                              id="upi-id"
                              type="text"
                              placeholder="yourname@upi"
                              value={upiDetails.upiId}
                              onChange={(e) => setUpiDetails({ ...upiDetails, upiId: e.target.value })}
                            />
                            <p className="text-xs text-muted-foreground">
                              Example: yourname@okaxis, yourname@ybl, etc.
                            </p>
                          </div>

                          <Alert>
                            <Info className="h-4 w-4" />
                            <AlertTitle>Verification</AlertTitle>
                            <AlertDescription>
                              We'll send a small verification amount to confirm your UPI ID. This amount will be added
                              to your wallet balance.
                            </AlertDescription>
                          </Alert>

                          <div className="flex items-center space-x-2">
                            <Switch id="make-default-upi" checked={makeDefault} onCheckedChange={setMakeDefault} />
                            <Label htmlFor="make-default-upi">Make this my default payment method</Label>
                          </div>
                        </TabsContent>

                        <TabsContent value="card" className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input
                              id="card-number"
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              value={cardDetails.cardNumber}
                              onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="name-on-card">Name on Card</Label>
                            <Input
                              id="name-on-card"
                              type="text"
                              placeholder="Enter name as on card"
                              value={cardDetails.nameOnCard}
                              onChange={(e) => setCardDetails({ ...cardDetails, nameOnCard: e.target.value })}
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry-month">Expiry Month</Label>
                              <Select
                                value={cardDetails.expiryMonth}
                                onValueChange={(value) => setCardDetails({ ...cardDetails, expiryMonth: value })}
                              >
                                <SelectTrigger id="expiry-month">
                                  <SelectValue placeholder="MM" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 12 }, (_, i) => {
                                    const month = i + 1
                                    return (
                                      <SelectItem key={month} value={month.toString().padStart(2, "0")}>
                                        {month.toString().padStart(2, "0")}
                                      </SelectItem>
                                    )
                                  })}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="expiry-year">Expiry Year</Label>
                              <Select
                                value={cardDetails.expiryYear}
                                onValueChange={(value) => setCardDetails({ ...cardDetails, expiryYear: value })}
                              >
                                <SelectTrigger id="expiry-year">
                                  <SelectValue placeholder="YY" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 10 }, (_, i) => {
                                    const year = new Date().getFullYear() + i
                                    return (
                                      <SelectItem key={year} value={year.toString().slice(-2)}>
                                        {year}
                                      </SelectItem>
                                    )
                                  })}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input
                                id="cvv"
                                type="password"
                                placeholder="123"
                                maxLength={4}
                                value={cardDetails.cvv}
                                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                              />
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Switch id="make-default-card" checked={makeDefault} onCheckedChange={setMakeDefault} />
                            <Label htmlFor="make-default-card">Make this my default payment method</Label>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        onClick={
                          activeTab === "bank"
                            ? handleAddBankAccount
                            : activeTab === "upi"
                              ? handleAddUPI
                              : handleAddCard
                        }
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Add Payment Method
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

