"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BanknoteIcon as Bank, CreditCard, Loader2, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import KYCVerificationForm from "@/components/kyc-verification-form"

export default function AddPaymentMethodPage() {
  const [activeTab, setActiveTab] = useState("kyc")
  const [isKYCVerified, setIsKYCVerified] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleAddBankAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Bank account added",
      description: "Your bank account has been successfully added.",
    })

    setIsSubmitting(false)
  }

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Card added",
      description: "Your card has been successfully added.",
    })

    setIsSubmitting(false)
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar activeItem="settings" />

      <div className="flex-1 overflow-auto">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/dashboard/settings/payment-methods">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div className="font-semibold">Add Payment Method</div>
          </div>
        </div>

        <div className="p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold tracking-tight">Add Payment Method</h1>
              <p className="text-muted-foreground">Add a new payment method to receive payouts or make payments</p>
            </div>

            <Tabs defaultValue="kyc" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="kyc">KYC Verification</TabsTrigger>
                <TabsTrigger value="bank" disabled={!isKYCVerified}>
                  Add Bank Account
                </TabsTrigger>
                <TabsTrigger value="card" disabled={!isKYCVerified}>
                  Add Card
                </TabsTrigger>
              </TabsList>

              <TabsContent value="kyc" className="space-y-4 mt-6">
                <KYCVerificationForm />
              </TabsContent>

              <TabsContent value="bank" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-muted p-2">
                        <Bank className="h-4 w-4" />
                      </div>
                      <div>
                        <CardTitle>Add Bank Account</CardTitle>
                        <CardDescription>Enter your bank account details to receive direct deposits</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddBankAccount} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="account-name">Account Holder Name</Label>
                        <Input id="account-name" placeholder="John Doe" required />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="account-number">Account Number</Label>
                          <Input id="account-number" placeholder="123456789" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="routing-number">Routing Number</Label>
                          <Input id="routing-number" placeholder="123456789" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bank-name">Bank Name</Label>
                        <Input id="bank-name" placeholder="Chase Bank" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="account-type">Account Type</Label>
                        <Select defaultValue="checking">
                          <SelectTrigger id="account-type">
                            <SelectValue placeholder="Select account type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="checking">Checking</SelectItem>
                            <SelectItem value="savings">Savings</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="rounded-md bg-muted p-4">
                        <div className="flex items-start gap-4">
                          <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Secure Information</p>
                            <p className="text-xs text-muted-foreground">
                              Your bank information is encrypted and securely stored. We use industry-standard security
                              measures to protect your data.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setActiveTab("kyc")}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Adding...
                            </>
                          ) : (
                            "Add Bank Account"
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="card" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-muted p-2">
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <div>
                        <CardTitle>Add Card</CardTitle>
                        <CardDescription>Add a credit or debit card for payments</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddCard} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-name">Name on Card</Label>
                        <Input id="card-name" placeholder="John Doe" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" required />
                        </div>
                      </div>

                      <div className="rounded-md bg-muted p-4">
                        <div className="flex items-start gap-4">
                          <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Secure Information</p>
                            <p className="text-xs text-muted-foreground">
                              Your card information is encrypted and securely stored. We use industry-standard security
                              measures to protect your data.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setActiveTab("kyc")}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Adding...
                            </>
                          ) : (
                            "Add Card"
                          )}
                        </Button>
                      </div>
                    </form>
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

