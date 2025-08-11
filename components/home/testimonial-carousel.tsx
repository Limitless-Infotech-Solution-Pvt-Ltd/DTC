"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "Dremers Talent Club transformed our online presence. Our website traffic has increased by 200% and our leads have doubled since working with them. Their team is professional, responsive, and truly cares about our success.",
  },
  {
    name: "Michael Chen",
    role: "Marketing Director, GrowthCo",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "The team at Dremers is exceptional. Their strategic approach to our social media campaigns has resulted in a significant increase in engagement and conversions. They're not just service providers, they're partners in our growth.",
  },
  {
    name: "Emily Rodriguez",
    role: "Owner, Boutique Retail",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "As a small business owner, I was hesitant to invest in digital marketing. Dremers made the process easy and the ROI has been incredible. They took the time to understand my business and created a strategy that works for my budget.",
  },
  {
    name: "David Wilson",
    role: "VP of Sales, Enterprise Solutions",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "We've worked with several marketing agencies in the past, but none have delivered results like Dremers Talent Club. Their data-driven approach and transparent reporting have made a significant impact on our bottom line.",
  },
]

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [current, autoplay])

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Clients Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-5xl py-12 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative"
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
            >
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 md:p-10">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="relative flex-shrink-0">
                      <div className="absolute -top-2 -left-2 w-full h-full bg-primary/10 rounded-full"></div>
                      <Image
                        src={testimonials[current].image || "/placeholder.svg"}
                        alt={testimonials[current].name}
                        width={100}
                        height={100}
                        className="rounded-full h-24 w-24 object-cover border-4 border-background"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-1">
                        <Quote className="h-4 w-4 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-4 text-center md:text-left">
                      <p className="text-lg md:text-xl italic">"{testimonials[current].content}"</p>
                      <div>
                        <CardTitle className="text-lg">{testimonials[current].name}</CardTitle>
                        <CardDescription>{testimonials[current].role}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 p-0 rounded-full ${current === index ? "bg-primary" : "bg-muted-foreground/30"}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
            <Button variant="outline" size="icon" onClick={next} className="rounded-full" aria-label="Next testimonial">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

