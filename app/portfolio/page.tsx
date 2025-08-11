"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, Search, ArrowRight } from "lucide-react"
import { caseStudies } from "@/data/case-studies"

export default function PortfolioPage() {
  const searchParams = useSearchParams()
  const initialService = searchParams.get("service") || "all"

  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState(initialService)

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(caseStudies.map((study) => study.category.toLowerCase())))]

  // Filter case studies based on search and category
  const filteredStudies = caseStudies.filter((study) => {
    const matchesSearch =
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "all" || study.category.toLowerCase() === activeCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Portfolio</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Explore our case studies and see how we've helped businesses achieve their digital marketing goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Case Studies</h2>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search case studies..."
                  className="w-full sm:w-[250px] pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue={initialService} value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="w-full h-auto flex-wrap justify-start">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="capitalize">
                    {category === "all" ? "All" : category}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value={activeCategory} className="mt-6">
                {filteredStudies.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium">No case studies found</h3>
                    <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStudies.map((study, index) => (
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
                            <Badge>{study.category}</Badge>
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
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">Increase in Traffic</span>
                              <span>{study.results.traffic}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">Conversion Rate</span>
                              <span>{study.results.conversion}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">ROI</span>
                              <span>{study.results.roi}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" asChild>
                            <Link href={`/portfolio/${study.slug}`}>
                              View Case Study
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to Achieve Similar Results?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Let's discuss how we can help you reach your digital marketing goals.
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

