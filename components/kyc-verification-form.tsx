"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Upload, Shield, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function KYCVerificationForm() {
  const [activeTab, setActiveTab] = useState("personal")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const { toast } = useToast()

  // Form states
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    dateOfBirth: "",
    nationality: "",
    idType: "passport",
    idNumber: "",
  })

  const [addressInfo, setAddressInfo] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    isMailingDifferent: false,
  })

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddressInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setAddressInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsVerified(true)
      toast({
        title: "KYC verification submitted",
        description: "Your information has been submitted for verification. This process may take 1-3 business days.",
      })
    } catch (err) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isVerified) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <CardTitle>Verification Submitted</CardTitle>
          </div>
          <CardDescription>Your KYC verification has been submitted successfully.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm">
              Thank you for submitting your verification information. Our team will review your documents and update
              your account status within 1-3 business days. You'll receive an email notification once the verification
              is complete.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => (window.location.href = "/dashboard")}>
            Return to Dashboard
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>KYC Verification</CardTitle>
        <CardDescription>
          Please provide your information for identity verification. This is required for payment processing and
          security purposes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="address">Address Verification</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <form className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Legal Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="As it appears on your ID"
                  value={personalInfo.fullName}
                  onChange={handlePersonalInfoChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={personalInfo.dateOfBirth}
                  onChange={handlePersonalInfoChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Select
                  value={personalInfo.nationality}
                  onValueChange={(value) => setPersonalInfo((prev) => ({ ...prev, nationality: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your nationality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="in">India</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="idType">ID Type</Label>
                  <Select
                    value={personalInfo.idType}
                    onValueChange={(value) => setPersonalInfo((prev) => ({ ...prev, idType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="driving_license">Driving License</SelectItem>
                      <SelectItem value="national_id">National ID</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number</Label>
                  <Input
                    id="idNumber"
                    name="idNumber"
                    placeholder="Enter your ID number"
                    value={personalInfo.idNumber}
                    onChange={handlePersonalInfoChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Upload ID Document</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop your document here, or click to browse
                  </p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Supported formats: JPG, PNG, PDF. Max size: 5MB</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setActiveTab("address")}>Continue to Address</Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="address">
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input
                  id="addressLine1"
                  name="addressLine1"
                  placeholder="Street address"
                  value={addressInfo.addressLine1}
                  onChange={handleAddressInfoChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                <Input
                  id="addressLine2"
                  name="addressLine2"
                  placeholder="Apartment, suite, unit, etc."
                  value={addressInfo.addressLine2}
                  onChange={handleAddressInfoChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={addressInfo.city} onChange={handleAddressInfoChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    name="state"
                    value={addressInfo.state}
                    onChange={handleAddressInfoChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal/ZIP Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={addressInfo.postalCode}
                    onChange={handleAddressInfoChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={addressInfo.country}
                    onValueChange={(value) => setAddressInfo((prev) => ({ ...prev, country: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="in">India</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Proof of Address</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload a document showing your address (utility bill, bank statement, etc.)
                  </p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Document must be less than 3 months old. Supported formats: JPG, PNG, PDF. Max size: 5MB
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isMailingDifferent"
                  name="isMailingDifferent"
                  checked={addressInfo.isMailingDifferent}
                  onCheckedChange={(checked) =>
                    setAddressInfo((prev) => ({ ...prev, isMailingDifferent: checked as boolean }))
                  }
                />
                <Label htmlFor="isMailingDifferent" className="text-sm font-normal">
                  My mailing address is different from my residential address
                </Label>
              </div>

              {addressInfo.isMailingDifferent && (
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm mb-2">
                    You'll be asked to provide your mailing address after submitting this form.
                  </p>
                </div>
              )}

              <div className="bg-muted p-4 rounded-lg flex items-start gap-2">
                <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Privacy & Security</p>
                  <p className="text-xs text-muted-foreground">
                    Your information is encrypted and securely stored. We use industry-standard security measures to
                    protect your data and comply with KYC regulations.
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("personal")}>
                  Back to Personal Info
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Verification"
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

