import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, ArrowRight, CheckCircle, BarChart } from "lucide-react"
import { caseStudies } from "@/data/case-studies"
import ResultsChart from "@/components/portfolio/results-chart"

interface CaseStudyPageProps {
  params: {
    slug: string
  }
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const study = caseStudies.find((study) => study.slug === params.slug)

  if (!study) {
    notFound()
  }

  // Get related case studies (same category, excluding current one)
  const relatedStudies = caseStudies.filter((s) => s.category === study.category && s.slug !== study.slug).slice(0, 3)

  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back to Portfolio
                </Link>
                <Badge className="mb-2">{study.category}</Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{study.title}</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">{study.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="relative aspect-video overflow-hidden rounded-lg mb-12">
              <Image src={study.image || "/placeholder.svg"} alt={study.title} fill className="object-cover" priority />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-primary">{study.results.traffic}</CardTitle>
                  <CardDescription>Increase in Traffic</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-primary">{study.results.conversion}</CardTitle>
                  <CardDescription>Conversion Rate</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-primary">{study.results.roi}</CardTitle>
                  <CardDescription>Return on Investment</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2>The Challenge</h2>
              <p>
                {study.client} was facing significant challenges in their digital marketing efforts. Their website
                traffic was stagnant, conversion rates were below industry standards, and they were struggling to
                generate qualified leads through their online channels.
              </p>

              <p>Specifically, they were dealing with:</p>

              <ul>
                <li>Low organic search visibility</li>
                <li>Ineffective paid advertising campaigns</li>
                <li>Poor website user experience</li>
                <li>Lack of a cohesive content strategy</li>
                <li>Inadequate performance tracking and analytics</li>
              </ul>

              <h2>Our Approach</h2>
              <p>
                After conducting a comprehensive audit of their existing digital marketing efforts, we developed a
                tailored strategy to address their specific challenges and goals.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-8">
                {study.strategies.map((strategy, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary/10">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{strategy.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{strategy.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h2>Implementation</h2>
              <p>
                Our team worked closely with {study.client} to implement the strategy over a period of {study.duration}.
                We established clear milestones and KPIs to track progress and make data-driven adjustments throughout
                the campaign.
              </p>

              <h2>Results</h2>
              <p>
                The results of our campaign exceeded expectations, delivering significant improvements across all key
                metrics:
              </p>

              <div className="not-prose my-8 p-4 bg-muted rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <BarChart className="mr-2 h-5 w-5 text-primary" />
                  Performance Metrics
                </h3>
                <div className="h-[300px]">
                  <ResultsChart data={study.chartData} />
                </div>
              </div>

              <blockquote>
                "{study.testimonial.quote}" — {study.testimonial.author}, {study.testimonial.position}
              </blockquote>

              <h2>Key Takeaways</h2>
              <p>This case study demonstrates the importance of:</p>

              <ul>
                <li>Developing a comprehensive, data-driven digital marketing strategy</li>
                <li>Focusing on user experience and conversion optimization</li>
                <li>Creating high-quality, targeted content</li>
                <li>Implementing robust analytics and continuous optimization</li>
                <li>Taking an integrated approach to digital marketing channels</li>
              </ul>

              <h2>Conclusion</h2>
              <p>
                Through our partnership with {study.client}, we were able to transform their digital marketing
                performance and help them achieve their business objectives. The strategies implemented continue to
                deliver results, providing a strong foundation for their ongoing digital marketing efforts.
              </p>
            </div>

            <Separator className="my-12" />

            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Ready to Achieve Similar Results?</h2>
              <p className="text-muted-foreground">
                Let's discuss how we can help you reach your digital marketing goals.
              </p>
              <Button size="lg" asChild>
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {relatedStudies.length > 0 && (
        <section className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold tracking-tight mb-6">Related Case Studies</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedStudies.map((relatedStudy, index) => (
                  <Card key={index} className="overflow-hidden group">
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={relatedStudy.image || "/placeholder.svg"}
                        alt={relatedStudy.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <Badge className="mb-2">{relatedStudy.category}</Badge>
                      <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                        <Link href={`/portfolio/${relatedStudy.slug}`}>{relatedStudy.title}</Link>
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        {relatedStudy.results.traffic} increase in traffic
                      </p>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button asChild>
                  <Link href="/portfolio">View All Case Studies</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

