"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, ArrowLeft, Upload, FileText, CheckCircle, Loader2, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export default function KYCVerificationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeStep, setActiveStep] = useState("identity")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  // Form state
  const [identityForm, setIdentityForm] = useState({
    idType: "passport",
    idNumber: "",
    dateOfBirth: "",
    idFrontFile: null as File | null,
    idBackFile: null as File | null,
    selfieFile: null as File | null,
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      setIdentityForm((prev) => ({
        ...prev,
        [field]: e.target.files![0],
      }))
    }
  }

  const handleIdentitySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (
      !identityForm.idNumber ||
      !identityForm.dateOfBirth ||
      !identityForm.idFrontFile ||
      (identityForm.idType !== "passport" && !identityForm.idBackFile) ||
      !identityForm.selfieFile
    ) {
      setError("Please fill in all required fields and upload all required documents")
      return
    }

    setIsLoading(true)

    // Simulate file upload progress
    let uploadProgress = 0
    const progressInterval = setInterval(() => {
      uploadProgress += 5
      setProgress(uploadProgress)

      if (uploadProgress >= 100) {
        clearInterval(progressInterval)

        // Simulate API call
        setTimeout(() => {
          setActiveStep("verification")
          setIsLoading(false)

          toast({
            title: "Documents uploaded successfully",
            description: "Your identity documents have been uploaded for verification.",
          })
        }, 1000)
      }
    }, 200)
  }

  const handleVerificationComplete = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsComplete(true)
    setIsLoading(false)

    toast({
      title: "KYC verification complete!",
      description: "Your identity has been verified successfully.",
    })

    // Redirect to dashboard after a delay
    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted py-12">
      <div className="container px-4 md:px-6">
        <div className="mx-auto grid w-full max-w-md gap-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
              <span className="text-primary">Dremers</span> Talent Club
            </Link>
            <h1 className="text-3xl font-bold">KYC Verification</h1>
            <p className="text-muted-foreground">Complete your identity verification to access all features</p>
          </div>

          <div className="flex items-center justify-center">
            <Tabs value={activeStep} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="identity" disabled={isLoading}>
                  Identity Verification
                </TabsTrigger>
                <TabsTrigger value="verification" disabled={!isComplete && activeStep !== "verification"}>
                  Verification Status
                </TabsTrigger>
              </TabsList>

              <TabsContent value="identity">
                <Card>
                  <CardHeader>
                    <CardTitle>Identity Verification</CardTitle>
                    <CardDescription>Upload your identification documents to verify your identity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {error && (
                      <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <form onSubmit={handleIdentitySubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="id-type">ID Type</Label>
                        <select
                          id="id-type"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={identityForm.idType}
                          onChange={(e) => setIdentityForm((prev) => ({ ...prev, idType: e.target.value }))}
                        >
                          <option value="passport">Passport</option>
                          <option value="drivers_license">Driver's License</option>
                          <option value="national_id">National ID Card</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="id-number">ID Number</Label>
                        <Input
                          id="id-number"
                          value={identityForm.idNumber}
                          onChange={(e) => setIdentityForm((prev) => ({ ...prev, idNumber: e.target.value }))}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date-of-birth">Date of Birth</Label>
                        <Input
                          id="date-of-birth"
                          type="date"
                          value={identityForm.dateOfBirth}
                          onChange={(e) => setIdentityForm((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                          required
                        />
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label htmlFor="id-front">Front of ID Document</Label>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="id-front"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-muted/50"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground">PNG, JPG or PDF (MAX. 5MB)</p>
                            </div>
                            <Input
                              id="id-front"
                              type="file"
                              accept=".jpg,.jpeg,.png,.pdf"
                              className="hidden"
                              onChange={(e) => handleFileChange(e, "idFrontFile")}
                            />
                          </label>
                        </div>
                        {identityForm.idFrontFile && (
                          <p className="text-xs text-muted-foreground flex items-center">
                            <FileText className="h-3 w-3 mr-1" />
                            {identityForm.idFrontFile.name}
                          </p>
                        )}
                      </div>

                      {identityForm.idType !== "passport" && (
                        <div className="space-y-2">
                          <Label htmlFor="id-back">Back of ID Document</Label>
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="id-back"
                              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-muted/50"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground">
                                  <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground">PNG, JPG or PDF (MAX. 5MB)</p>
                              </div>
                              <Input
                                id="id-back"
                                type="file"
                                accept=".jpg,.jpeg,.png,.pdf"
                                className="hidden"
                                onChange={(e) => handleFileChange(e, "idBackFile")}
                              />
                            </label>
                          </div>
                          {identityForm.idBackFile && (
                            <p className="text-xs text-muted-foreground flex items-center">
                              <FileText className="h-3 w-3 mr-1" />
                              {identityForm.idBackFile.name}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="selfie">Selfie with ID</Label>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="selfie"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-muted/50"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground">PNG or JPG (MAX. 5MB)</p>
                            </div>
                            <Input
                              id="selfie"
                              type="file"
                              accept=".jpg,.jpeg,.png"
                              className="hidden"
                              onChange={(e) => handleFileChange(e, "selfieFile")}
                            />
                          </label>
                        </div>
                        {identityForm.selfieFile && (
                          <p className="text-xs text-muted-foreground flex items-center">
                            <FileText className="h-3 w-3 mr-1" />
                            {identityForm.selfieFile.name}
                          </p>
                        )}
                      </div>

                      {isLoading && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Uploading documents...</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}

                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          "Submit Documents"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/auth/login">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Login
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="verification">
                <Card>
                  <CardHeader>
                    <CardTitle>Verification Status</CardTitle>
                    <CardDescription>Check the status of your identity verification</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isComplete ? (
                      <div className="flex flex-col items-center justify-center py-6 space-y-4">
                        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-medium text-center">Verification Complete!</h3>
                        <p className="text-center text-muted-foreground">
                          Your identity has been successfully verified. You now have full access to all features.
                        </p>
                        <Button className="mt-4" asChild>
                          <Link href="/dashboard">Go to Dashboard</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex items-start gap-4 p-4 rounded-lg border">
                          <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                            <Shield className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Verification in Progress</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              We're currently reviewing your submitted documents. This process typically takes 1-2
                              business days.
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-medium">Document Status</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 rounded-lg bg-muted">
                              <span className="text-sm">ID Document (Front)</span>
                              <Badge>Under Review</Badge>
                            </div>
                            {identityForm.idType !== "passport" && (
                              <div className="flex justify-between items-center p-2 rounded-lg bg-muted">
                                <span className="text-sm">ID Document (Back)</span>
                                <Badge>Under Review</Badge>
                              </div>
                            )}
                            <div className="flex justify-between items-center p-2 rounded-lg bg-muted">
                              <span className="text-sm">Selfie with ID</span>
                              <Badge>Under Review</Badge>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4 bg-muted/50">
                          <p className="text-sm text-muted-foreground">
                            <strong>Note:</strong> For demo purposes, you can complete the verification immediately by
                            clicking the button below.
                          </p>
                        </div>

                        <Button className="w-full" onClick={handleVerificationComplete} disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            "Complete Verification (Demo)"
                          )}
                        </Button>
                      </div>
                    )}
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

