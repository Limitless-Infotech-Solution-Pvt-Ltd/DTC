"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggleAdvanced } from "@/components/theme-toggle-advanced"
import LanguageSwitcher from "@/components/language-switcher"
import { useToast } from "@/hooks/use-toast"
import { ArrowRight, CheckCircle, Users, BarChart, Target, Mail } from "lucide-react"

export default function GetStartedModal({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)

  const handleLogin = () => {
    setOpen(false)
    router.push("/auth/login")
  }

  const handleRegister = () => {
    setOpen(false)
    router.push("/auth/login?tab=register")
  }

  const handleExplore = () => {
    setOpen(false)
    toast({
      title: "Welcome to Dremers Talent Club!",
      description: "Feel free to explore our services and community.",
    })
  }

  const onboardingSteps = [
    {
      title: "Welcome to Dremers Talent Club",
      description: "Your gateway to digital marketing excellence and professional growth",
      icon: <Users className="h-12 w-12 text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Join our community of marketing professionals, access exclusive resources, and take your career to the next
            level.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm">Expert-led training and workshops</div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm">Networking opportunities</div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm">Latest industry insights</div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm">Career advancement resources</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Comprehensive Services",
      description: "Discover our range of digital marketing solutions",
      icon: <Target className="h-12 w-12 text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            From SEO to social media marketing, we offer end-to-end solutions to help your business thrive online.
          </p>
          <div className="grid grid-cols-1 gap-4 pt-4">
            <div className="flex items-start gap-3">
              <BarChart className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-medium">SEO Optimization</div>
                <div className="text-sm text-muted-foreground">Improve your search engine rankings</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-medium">Social Media Marketing</div>
                <div className="text-sm text-muted-foreground">Build your brand presence</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-medium">Email Marketing</div>
                <div className="text-sm text-muted-foreground">Nurture leads and drive conversions</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Join Our Community",
      description: "Connect with like-minded professionals",
      icon: <Users className="h-12 w-12 text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Become part of our thriving community to share knowledge, collaborate on projects, and grow together.
          </p>
          <div className="grid grid-cols-1 gap-4 pt-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-medium">Discussion Forums</div>
                <div className="text-sm text-muted-foreground">Engage in meaningful conversations</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-medium">Video Tutorials</div>
                <div className="text-sm text-muted-foreground">Learn from industry experts</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-medium">Networking Events</div>
                <div className="text-sm text-muted-foreground">Connect with peers and mentors</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Ready to Get Started?",
      description: "Choose how you'd like to proceed",
      icon: <ArrowRight className="h-12 w-12 text-primary" />,
      content: (
        <div className="space-y-6 pt-4">
          <div className="grid grid-cols-1 gap-4">
            <Button onClick={handleRegister} className="w-full">
              Create an Account
            </Button>
            <Button onClick={handleLogin} variant="outline" className="w-full">
              Sign In
            </Button>
            <Button onClick={handleExplore} variant="ghost" className="w-full">
              Explore as Guest
            </Button>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </div>
        </div>
      ),
    },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 font-bold text-xl">
              <span className="text-primary">Dremers</span> Talent Club
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggleAdvanced />
              <LanguageSwitcher />
            </div>
          </div>
        </DialogHeader>

        <Carousel
          className="w-full"
          setApi={(api) => {
            api?.on("select", () => {
              setCurrentStep(api.selectedScrollSnap())
            })
          }}
        >
          <CarouselContent>
            {onboardingSteps.map((step, index) => (
              <CarouselItem key={index}>
                <Card className="border-none shadow-none">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className="mb-4">{step.icon}</div>
                      <DialogTitle className="text-2xl mb-2">{step.title}</DialogTitle>
                      <DialogDescription>{step.description}</DialogDescription>
                    </div>
                    {step.content}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center mt-6 gap-2">
            <CarouselPrevious className="static transform-none" />
            <div className="flex gap-1">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${currentStep === index ? "bg-primary" : "bg-muted-foreground/30"}`}
                />
              ))}
            </div>
            <CarouselNext className="static transform-none" />
          </div>
        </Carousel>

        <DialogFooter className="sm:justify-between">
          {currentStep < onboardingSteps.length - 1 ? (
            <Button variant="outline" onClick={() => setOpen(false)}>
              Maybe Later
            </Button>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

