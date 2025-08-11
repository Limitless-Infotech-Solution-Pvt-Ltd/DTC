import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Award, Clock, Users, Briefcase } from "lucide-react"
import { teamMembers } from "@/data/team-members"

export default function AboutPage() {
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Us</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                We're a team of digital marketing experts passionate about helping businesses grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge className="mb-2">Our Story</Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Driving Digital Success Since 2015
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  Dremers Talent Club was founded with a simple mission: to help businesses navigate the complex digital
                  landscape and achieve measurable results through strategic marketing solutions.
                </p>
              </div>
              <p className="text-muted-foreground">
                What started as a small team of passionate marketers has grown into a full-service digital marketing
                agency with a proven track record of success. Over the years, we've helped hundreds of businesses across
                various industries increase their online visibility, generate qualified leads, and drive revenue growth.
              </p>
              <p className="text-muted-foreground">
                Our approach combines data-driven strategies with creative execution to deliver marketing solutions that
                not only look great but also perform exceptionally well. We believe in transparency, continuous
                learning, and building long-term partnerships with our clients.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-lg -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-lg -z-10"></div>
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Our Team"
                className="rounded-lg object-cover border border-muted-foreground/20 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <Badge>Our Values</Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Drives Us</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Our core values guide everything we do and shape how we work with our clients.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto p-3 rounded-full bg-primary/10 w-fit">{value.icon}</div>
                  <CardTitle className="mt-2">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <Badge>Our Team</Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Meet the Experts</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Our talented team of digital marketing professionals is dedicated to your success.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden group">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.position}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex space-x-2">
                    {member.socialLinks.map((link, i) => (
                      <Button key={i} variant="ghost" size="icon" asChild>
                        <Link href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.icon}
                          <span className="sr-only">{link.name}</span>
                        </Link>
                      </Button>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge className="mb-2">Why Choose Us</Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Sets Us Apart</h2>
                <p className="text-muted-foreground md:text-lg">
                  We're not just another digital marketing agency. Here's why businesses choose to work with us.
                </p>
              </div>
              <ul className="space-y-2">
                {differentiators.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Button asChild>
                  <Link href="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-primary">{stat.value}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Work With Us?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Let's discuss how we can help you achieve your digital marketing goals.
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
                <Link href="/services">Explore Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const values = [
  {
    title: "Excellence",
    description: "We strive for excellence in everything we do, from strategy development to execution and reporting.",
    icon: <Award className="h-6 w-6 text-primary" />,
  },
  {
    title: "Transparency",
    description: "We believe in open communication and complete transparency in our processes and reporting.",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
  {
    title: "Innovation",
    description:
      "We stay at the forefront of digital marketing trends and technologies to deliver cutting-edge solutions.",
    icon: <Briefcase className="h-6 w-6 text-primary" />,
  },
  {
    title: "Results-Driven",
    description: "We focus on delivering measurable results that contribute to our clients' business objectives.",
    icon: <Clock className="h-6 w-6 text-primary" />,
  },
]

const differentiators = [
  {
    title: "Data-Driven Approach",
    description:
      "We make decisions based on data, not assumptions, to ensure the best possible results for our clients.",
  },
  {
    title: "Tailored Strategies",
    description:
      "We develop customized strategies for each client based on their unique business goals and target audience.",
  },
  {
    title: "Continuous Optimization",
    description: "We continuously monitor and optimize campaigns to improve performance and maximize ROI.",
  },
  {
    title: "Integrated Solutions",
    description: "We offer integrated marketing solutions that work together to achieve your business objectives.",
  },
  {
    title: "Dedicated Account Managers",
    description: "Each client is assigned a dedicated account manager who serves as their main point of contact.",
  },
]

const stats = [
  { value: "500+", label: "Clients Served" },
  { value: "15+", label: "Industry Awards" },
  { value: "25+", label: "Team Members" },
  { value: "8+", label: "Years of Experience" },
]

