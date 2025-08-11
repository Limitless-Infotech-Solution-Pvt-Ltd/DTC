import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle,
  ArrowRight,
  Users,
  BarChart,
  Target,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Star,
  ChevronRight,
} from "lucide-react"
import HeroSection from "@/components/home/hero-section"
import FeaturedClients from "@/components/home/featured-clients"
import TestimonialCarousel from "@/components/home/testimonial-carousel"
import BlogPreview from "@/components/home/blog-preview"
import ThemeCustomizer from "@/components/theme-customizer"

export default function Home() {
  return (
    <div>
      <HeroSection />

      <FeaturedClients />

      <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                Our Services
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Comprehensive Digital Marketing Solutions
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                We offer a wide range of services to help your business thrive in the digital landscape.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-md transition-all duration-300 overflow-hidden border-muted-foreground/20"
              >
                <div className="absolute h-1 w-0 bg-primary top-0 left-0 transition-all duration-300 group-hover:w-full"></div>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-1 group-hover:text-primary transition-colors"
                  >
                    Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild size="lg">
              <Link href="/services">
                View All Services <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  About Us
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  We're a Team of Digital Marketing Experts
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  At Dremers Talent Club, we combine creativity with data-driven strategies to deliver exceptional
                  results for our clients.
                </p>
              </div>
              <ul className="grid gap-2">
                {aboutPoints.map((point, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/about">Meet Our Team</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-lg -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-lg -z-10"></div>
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Team Image"
                className="rounded-lg object-cover border border-muted-foreground/20 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl font-bold">{stat.value}</div>
                <div className="text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialCarousel />

      <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                Our Work
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Featured Case Studies</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Explore some of our most successful digital marketing campaigns.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="overflow-hidden group">
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={study.image || "/placeholder.svg"}
                    alt={study.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">{study.category}</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < study.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{study.title}</CardTitle>
                  <CardDescription>{study.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/portfolio/${study.slug}`}>View Case Study</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button asChild size="lg">
              <Link href="/portfolio">
                View All Case Studies <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <BlogPreview />

      <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                Contact Us
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Grow Your Business?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Get in touch with our team to discuss how we can help you achieve your digital marketing goals.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="first-name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        First Name
                      </label>
                      <input
                        id="first-name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="last-name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Last Name
                      </label>
                      <input
                        id="last-name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
            <div className="flex flex-col justify-center space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-sm text-muted-foreground">info@dremerstalentclub.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-sm text-muted-foreground">
                        123 Marketing Street
                        <br />
                        Suite 456
                        <br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Monday - Friday</div>
                    <div>9:00 AM - 6:00 PM</div>
                    <div>Saturday</div>
                    <div>10:00 AM - 4:00 PM</div>
                    <div>Sunday</div>
                    <div>Closed</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to Take Your Digital Marketing to the Next Level?
              </h2>
              <p className="max-w-[900px] md:text-xl">
                Join hundreds of satisfied clients who have transformed their online presence with Dremers Talent Club.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" variant="secondary">
                Get Started Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ThemeCustomizer />
    </div>
  )
}

const services = [
  {
    title: "SEO Optimization",
    description:
      "Improve your search engine rankings and drive organic traffic to your website with our data-driven SEO strategies.",
    icon: <BarChart className="h-6 w-6" />,
  },
  {
    title: "Social Media Marketing",
    description: "Build your brand presence and engage with your audience across all major social media platforms.",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "PPC Advertising",
    description: "Target your ideal customers with strategic paid advertising campaigns that maximize ROI.",
    icon: <Target className="h-6 w-6" />,
  },
  {
    title: "Email Marketing",
    description: "Nurture leads and drive conversions with personalized email campaigns that deliver results.",
    icon: <Mail className="h-6 w-6" />,
  },
  {
    title: "Content Marketing",
    description:
      "Create valuable content that attracts and engages your target audience throughout their buyer journey.",
    icon: <TrendingUp className="h-6 w-6" />,
  },
  {
    title: "Analytics & Reporting",
    description:
      "Track performance and gain insights to optimize your marketing strategies with comprehensive reporting.",
    icon: <BarChart className="h-6 w-6" />,
  },
]

const aboutPoints = [
  "Over 10 years of industry experience",
  "Certified marketing professionals",
  "Proven track record of success",
  "Tailored strategies for each client",
  "Transparent reporting and communication",
  "Continuous learning and innovation",
]

const stats = [
  { value: "500+", label: "Clients" },
  { value: "1,200+", label: "Projects" },
  { value: "250%", label: "Avg. ROI" },
  { value: "15+", label: "Awards" },
]

const caseStudies = [
  {
    title: "E-commerce Revenue Growth",
    description: "How we increased online sales by 200% for a retail brand",
    category: "E-commerce",
    image: "/placeholder.svg?height=400&width=600",
    rating: 5,
    slug: "ecommerce-growth",
  },
  {
    title: "B2B Lead Generation",
    description: "Generating qualified leads for a SaaS company",
    category: "B2B Marketing",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4,
    slug: "b2b-lead-generation",
  },
  {
    title: "Local Business Visibility",
    description: "Helping a local business dominate local search results",
    category: "Local SEO",
    image: "/placeholder.svg?height=400&width=600",
    rating: 5,
    slug: "local-business-visibility",
  },
]

