"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Download, Loader2, LogOut, Settings, User } from "lucide-react"

export default function ThemePreview() {
  const [loading, setLoading] = useState(false)

  const handleButtonClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Theme Preview</CardTitle>
        <CardDescription>Preview how UI components look with your current theme settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="buttons" className="w-full">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="inputs">Inputs</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
          </TabsList>

          <TabsContent value="buttons" className="space-y-4">
            <div className="grid grid-cols-2 gap-4 items-start">
              <div className="space-y-2">
                <Label>Button Variants</Label>
                <div className="flex flex-wrap gap-2">
                  <Button variant="default" onClick={handleButtonClick}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Default
                  </Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Button Sizes</Label>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="lg">Large</Button>
                  <Button size="default">Default</Button>
                  <Button size="sm">Small</Button>
                  <Button size="icon" className="h-10 w-10">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Button with Icon</Label>
              <div className="flex flex-wrap gap-2">
                <Button>
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
                <Button variant="outline">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
                <Button variant="secondary">
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </Button>
                <Button variant="ghost">
                  <User className="mr-2 h-4 w-4" /> Account
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="inputs" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="name@example.com" type="email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="••••••••" type="password" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Checkbox</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Switch</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="notifications" />
                  <Label htmlFor="notifications">Enable notifications</Label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Radio Group</Label>
                <RadioGroup defaultValue="option-one">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one">Option One</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two">Option Two</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Select</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Slider</Label>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
          </TabsContent>

          <TabsContent value="cards" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage your notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="email-notifications" className="flex-1">
                      Email Notifications
                    </Label>
                    <Switch id="email-notifications" />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="push-notifications" className="flex-1">
                      Push Notifications
                    </Label>
                    <Switch id="push-notifications" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Save Changes</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Account</CardTitle>
                    <Badge>Pro</Badge>
                  </div>
                  <CardDescription>Manage your account settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  <Button variant="ghost" size="sm">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Add a new payment method to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name on Card</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry-month">Expiry Month</Label>
                    <Select>
                      <SelectTrigger id="expiry-month">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">January</SelectItem>
                        <SelectItem value="2">February</SelectItem>
                        <SelectItem value="3">March</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry-year">Expiry Year</Label>
                    <Select>
                      <SelectTrigger id="expiry-year">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="typography" className="space-y-4">
            <div className="space-y-2">
              <Label>Headings</Label>
              <div className="space-y-2">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Heading 1</h1>
                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">Heading 2</h2>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Heading 3</h3>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Heading 4</h4>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Paragraph</Label>
              <p className="leading-7">
                The quick brown fox jumps over the lazy dog. This sentence contains all the letters in the English
                alphabet. It's commonly used for font display and testing.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Inline Elements</Label>
              <div className="space-y-2">
                <p>
                  Text can be <strong>bold</strong>, <em>italic</em>, or <u>underlined</u>. You can also use
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                    inline code
                  </code>
                  for technical terms.
                </p>
                <p>
                  <a href="#" className="font-medium text-primary underline underline-offset-4">
                    This is a link
                  </a>{" "}
                  that you can click on.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Lists</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Unordered List</p>
                  <ul className="list-disc pl-6">
                    <li>Item one</li>
                    <li>Item two</li>
                    <li>Item three</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium">Ordered List</p>
                  <ol className="list-decimal pl-6">
                    <li>First item</li>
                    <li>Second item</li>
                    <li>Third item</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Blockquote</Label>
              <blockquote className="border-l-2 pl-6 italic">
                "The best way to predict the future is to invent it." — Alan Kay
              </blockquote>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

