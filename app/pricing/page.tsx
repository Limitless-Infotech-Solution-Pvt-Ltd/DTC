import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, X } from "lucide-react"

export default function PricingPage() {
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Transparent Pricing</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Choose the plan that's right for your business. No hidden fees or long-term contracts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`flex flex-col ${plan.featured ? "border-primary shadow-lg relative" : ""}`}>
                {plan.featured && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-4">
                    <span className="text-4xl font-bold">₹{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded &&
                      plan.notIncluded.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <X className="h-5 w-5 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${plan.featured ? "" : "bg-muted-foreground/20 hover:bg-muted-foreground/30 text-foreground"}`}
                    asChild
                  >
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Need a custom plan? Contact us for a tailored solution.</p>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Frequently Asked Questions</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Find answers to common questions about our services and pricing.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for small businesses just getting started with digital marketing.",
    price: 9999,
    features: [
      "Social media management (2 platforms)",
      "Basic SEO optimization",
      "Monthly performance report",
      "Email support",
      "1 blog post per month",
    ],
    notIncluded: ["PPC campaign management", "Advanced analytics", "Dedicated account manager"],
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses looking to expand their online presence.",
    price: 19999,
    featured: true,
    features: [
      "Social media management (4 platforms)",
      "Comprehensive SEO strategy",
      "PPC campaign management",
      "Bi-weekly performance reports",
      "Email and phone support",
      "4 blog posts per month",
      "Basic email marketing",
      "Dedicated account manager",
    ],
    notIncluded: ["Advanced content strategy", "Custom analytics dashboard"],
  },
  {
    name: "Enterprise",
    description: "For established businesses seeking comprehensive digital marketing solutions.",
    price: 39999,
    features: [
      "Social media management (all platforms)",
      "Advanced SEO strategy",
      "PPC campaign management",
      "Weekly performance reports",
      "Priority email and phone support",
      "8 blog posts per month",
      "Advanced email marketing",
      "Dedicated account manager",
      "Custom analytics dashboard",
      "Advanced content strategy",
      "Conversion rate optimization",
    ],
  },
]

const faqs = [
  {
    question: "Do you require long-term contracts?",
    answer:
      "No, all our plans are month-to-month. We believe in earning your business each month through results, not contracts.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of the next billing cycle.",
  },
  {
    question: "Do you offer custom plans?",
    answer:
      "We understand that every business is unique. Contact our sales team to discuss a tailored solution for your specific needs.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major Indian payment methods including UPI, Net Banking, Credit/Debit Cards, and Bank Transfers. All payments are processed in Indian Rupees (₹).",
  },
  {
    question: "Is there a setup fee?",
    answer: "No, there are no hidden fees or setup costs. The price you see is the price you pay.",
  },
  {
    question: "How often will I receive reports?",
    answer:
      "Reporting frequency depends on your plan: monthly for Starter, bi-weekly for Professional, and weekly for Enterprise. Custom reporting schedules are available upon request.",
  },
]

