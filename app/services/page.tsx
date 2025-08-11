import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Users, BarChart, Target, TrendingUp, Mail, LineChart } from "lucide-react"

export default function ServicesPage() {
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Services</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Comprehensive digital marketing solutions tailored to your business needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:gap-16">
            {services.map((service, index) => (
              <div key={index} id={service.id} className="scroll-mt-20">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                  <div className={`flex flex-col justify-center space-y-4 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="space-y-2">
                      <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                        {service.category}
                      </div>
                      <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{service.title}</h2>
                      <p className="text-muted-foreground md:text-lg">{service.description}</p>
                    </div>
                    <ul className="grid gap-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                      <Button size="lg" asChild>
                        <Link href="/contact">
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="lg" variant="outline" asChild>
                        <Link href={`/portfolio?service=${service.id}`}>View Case Studies</Link>
                      </Button>
                    </div>
                  </div>
                  <div className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-lg -z-10"></div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-lg -z-10"></div>
                    <Image
                      src={service.image || "/placeholder.svg"}
                      width={550}
                      height={550}
                      alt={service.title}
                      className="rounded-lg object-cover border border-muted-foreground/20 shadow-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Process</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                We follow a proven methodology to deliver exceptional results for our clients.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-4">
            {process.map((step, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 w-full bg-primary"></div>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      {index + 1}
                    </div>
                    <CardTitle>{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Get Started?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Contact us today to discuss how we can help you achieve your digital marketing goals.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const services = [
  {
    id: "seo",
    title: "SEO Optimization",
    category: "Search Engine Optimization",
    description:
      "Improve your search engine rankings and drive organic traffic to your website with our data-driven SEO strategies.",
    image: "/placeholder.svg?height=550&width=550",
    icon: <BarChart className="h-6 w-6" />,
    features: [
      "Comprehensive website audit and analysis",
      "Keyword research and optimization",
      "On-page and off-page SEO",
      "Technical SEO improvements",
      "Local SEO strategies",
      "Regular performance reporting",
    ],
  },
  {
    id: "social",
    title: "Social Media Marketing",
    category: "Social Media",
    description: "Build your brand presence and engage with your audience across all major social media platforms.",
    image: "/placeholder.svg?height=550&width=550",
    icon: <Users className="h-6 w-6" />,
    features: [
      "Social media strategy development",
      "Content creation and curation",
      "Community management",
      "Paid social advertising",
      "Influencer marketing",
      "Performance analytics and reporting",
    ],
  },
  {
    id: "ppc",
    title: "PPC Advertising",
    category: "Paid Advertising",
    description: "Target your ideal customers with strategic paid advertising campaigns that maximize ROI.",
    image: "/placeholder.svg?height=550&width=550",
    icon: <Target className="h-6 w-6" />,
    features: [
      "Google Ads campaign management",
      "Social media advertising",
      "Display and remarketing campaigns",
      "Ad copywriting and design",
      "Landing page optimization",
      "Conversion tracking and optimization",
    ],
  },
  {
    id: "email",
    title: "Email Marketing",
    category: "Email Campaigns",
    description: "Nurture leads and drive conversions with personalized email campaigns that deliver results.",
    image: "/placeholder.svg?height=550&width=550",
    icon: <Mail className="h-6 w-6" />,
    features: [
      "Email strategy development",
      "List building and segmentation",
      "Email template design",
      "Automated email sequences",
      "A/B testing and optimization",
      "Performance analytics and reporting",
    ],
  },
  {
    id: "content",
    title: "Content Marketing",
    category: "Content Strategy",
    description:
      "Create valuable content that attracts and engages your target audience throughout their buyer journey.",
    image: "/placeholder.svg?height=550&width=550",
    icon: <TrendingUp className="h-6 w-6" />,
    features: [
      "Content strategy development",
      "Blog writing and management",
      "Ebook and whitepaper creation",
      "Video content production",
      "Infographic design",
      "Content distribution and promotion",
    ],
  },
  {
    id: "analytics",
    title: "Analytics & Reporting",
    category: "Data Analysis",
    description:
      "Track performance and gain insights to optimize your marketing strategies with comprehensive reporting.",
    image: "/placeholder.svg?height=550&width=550",
    icon: <LineChart className="h-6 w-6" />,
    features: [
      "Google Analytics setup and configuration",
      "Custom dashboard creation",
      "Conversion tracking implementation",
      "Regular performance reporting",
      "Data analysis and insights",
      "Strategy optimization recommendations",
    ],
  },
]

const process = [
  {
    title: "Discovery",
    description: "We start by understanding your business, goals, target audience, and current marketing efforts.",
  },
  {
    title: "Strategy",
    description:
      "Based on our findings, we develop a customized strategy tailored to your specific needs and objectives.",
  },
  {
    title: "Implementation",
    description: "Our team executes the strategy with precision, focusing on quality and attention to detail.",
  },
  {
    title: "Optimization",
    description: "We continuously monitor, analyze, and optimize your campaigns to maximize results and ROI.",
  },
]

