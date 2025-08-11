"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Search, Calendar, User, Clock } from "lucide-react"
import { blogPosts } from "@/data/blog-posts"
import NewsletterSignup from "@/components/blog/newsletter-signup"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(blogPosts.map((post) => post.category.toLowerCase())))]

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "all" || post.category.toLowerCase() === activeCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Blog</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Insights, strategies, and news from the world of digital marketing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="md:w-2/3">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <h2 className="text-2xl font-bold tracking-tight">Latest Articles</h2>
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search articles..."
                      className="w-full sm:w-[250px] pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
                  <TabsList className="w-full h-auto flex-wrap justify-start">
                    {categories.map((category) => (
                      <TabsTrigger key={category} value={category} className="capitalize">
                        {category === "all" ? "All" : category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <TabsContent value={activeCategory} className="mt-6">
                    {filteredPosts.length === 0 ? (
                      <div className="text-center py-12">
                        <h3 className="text-lg font-medium">No articles found</h3>
                        <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredPosts.map((post, index) => (
                          <Card key={index} className="overflow-hidden group">
                            <div className="relative h-48 overflow-hidden">
                              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors z-10"></div>
                              <Image
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <Badge className="absolute top-4 left-4 z-20">{post.category}</Badge>
                            </div>
                            <CardHeader className="p-4">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                <div className="flex items-center">
                                  <Calendar className="mr-1 h-3 w-3" />
                                  {post.date}
                                </div>
                                <div className="flex items-center">
                                  <User className="mr-1 h-3 w-3" />
                                  {post.author}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {post.readTime}
                                </div>
                              </div>
                              <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                              </CardTitle>
                              <CardDescription className="line-clamp-2">{post.description}</CardDescription>
                            </CardHeader>
                            <CardFooter className="p-4 pt-0">
                              <Button variant="ghost" className="p-0 h-auto font-medium" asChild>
                                <Link
                                  href={`/blog/${post.slug}`}
                                  className="flex items-center gap-1 group-hover:text-primary transition-colors"
                                >
                                  Read More{" "}
                                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>

                {filteredPosts.length > 0 && (
                  <div className="flex justify-center mt-8">
                    <Button variant="outline">Load More Articles</Button>
                  </div>
                )}
              </div>
            </div>

            <div className="md:w-1/3 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "SEO",
                      "Social Media",
                      "Content Marketing",
                      "PPC",
                      "Email Marketing",
                      "Analytics",
                      "Branding",
                      "Web Design",
                      "Marketing Strategy",
                      "Lead Generation",
                    ].map((topic, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 4).map((post, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium line-clamp-2 text-sm">
                            <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                              {post.title}
                            </Link>
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <NewsletterSignup />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Subscribe to Our Newsletter</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Get the latest digital marketing insights delivered to your inbox.
              </p>
            </div>
            <div className="mx-auto w-full max-w-md">
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

