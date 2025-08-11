"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BanknoteIcon as Bank, Loader2, Plus, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import PaymentMethodCard from "@/components/payouts/payment-method-card"

export default function PaymentMethodsPage() {
  const [activeTab, setActiveTab] = useState("methods")
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
    setActiveTab("methods")
  }

  const handleAddPayPal = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "PayPal account added",
      description: "Your PayPal account has been successfully added.",
    })

    setIsSubmitting(false)
    setActiveTab("methods")
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar activeItem="settings" />

      <div className="flex-1 overflow-auto">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/dashboard/settings">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div className="font-semibold">Payment Methods</div>
          </div>
        </div>

        <div className="p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold tracking-tight">Payment Methods</h1>
              <p className="text-muted-foreground">Manage your payment methods for receiving payouts and earnings</p>
            </div>

            <Tabs defaultValue="methods" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="methods">My Payment Methods</TabsTrigger>
                <TabsTrigger value="bank">Add Bank Account</TabsTrigger>
                <TabsTrigger value="paypal">Add PayPal</TabsTrigger>
              </TabsList>

              <TabsContent value="methods" className="space-y-4 mt-6">
                <div className="grid gap-4">
                  <PaymentMethodCard type="bank" name="Chase Bank" details="****6789" isDefault={true} />

                  <PaymentMethodCard type="paypal" name="PayPal" details="user@example.com" isDefault={false} />

                  <PaymentMethodCard type="bank" name="Bank of America" details="****4321" isDefault={false} />
                </div>

                <div className="flex flex-col gap-4 mt-6">
                  <div className="text-lg font-medium">Add a new payment method</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card
                      className="cursor-pointer hover:border-primary transition-colors"
                      onClick={() => setActiveTab("bank")}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-muted p-2">
                            <Bank className="h-4 w-4" />
                          </div>
                          <CardTitle className="text-lg">Bank Account</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>
                          Connect your bank account to receive direct deposits. This is the most common method for
                          receiving payouts.
                        </CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" className="w-full">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Bank Account
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card
                      className="cursor-pointer hover:border-primary transition-colors"
                      onClick={() => setActiveTab("paypal")}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-muted p-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M7 11l3-8h5c1.7 0 3 1.3 3 3 0 2.7-2.3 5-5 5H9l-2 5" />
                              <path d="M12.5 6l-2.7 7.3c-.2.6.1 1.2.7 1.4.1 0 .2.1.3.1h2.2c1.7 0 3-1.3 3-3 0-2.7-2.3-5-5-5H6l-2 5" />
                            </svg>
                          </div>
                          <CardTitle className="text-lg">PayPal</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>
                          Connect your PayPal account to receive payments. PayPal is a convenient way to manage your
                          earnings.
                        </CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" className="w-full">
                          <Plus className="mr-2 h-4 w-4" />
                          Add PayPal
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
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
                        <Button type="button" variant="outline" onClick={() => setActiveTab("methods")}>
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

              <TabsContent value="paypal" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-muted p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M7 11l3-8h5c1.7 0 3 1.3 3 3 0 2.7-2.3 5-5 5H9l-2 5" />
                          <path d="M12.5 6l-2.7 7.3c-.2.6.1 1.2.7 1.4.1 0 .2.1.3.1h2.2c1.7 0 3-1.3 3-3 0-2.7-2.3-5-5-5H6l-2 5" />
                        </svg>
                      </div>
                      <div>
                        <CardTitle>Add PayPal Account</CardTitle>
                        <CardDescription>Enter your PayPal email to receive payments</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddPayPal} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="paypal-email">PayPal Email</Label>
                        <Input id="paypal-email" type="email" placeholder="your@email.com" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-email">Confirm PayPal Email</Label>
                        <Input id="confirm-email" type="email" placeholder="your@email.com" required />
                      </div>

                      <div className="rounded-md bg-muted p-4">
                        <div className="flex items-start gap-4">
                          <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Important Information</p>
                            <p className="text-xs text-muted-foreground">
                              Make sure the email address you provide is associated with your PayPal account. Payments
                              sent to an incorrect email address cannot be recovered.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setActiveTab("methods")}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Adding...
                            </>
                          ) : (
                            "Add PayPal Account"
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

