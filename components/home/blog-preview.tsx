import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

const blogPosts = [
  {
    title: "10 SEO Strategies That Actually Work in 2023",
    description: "Learn the latest SEO techniques that are driving real results for businesses.",
    image: "/placeholder.svg?height=400&width=600",
    date: "June 15, 2023",
    author: "Alex Johnson",
    category: "SEO",
    slug: "seo-strategies-2023",
  },
  {
    title: "The Complete Guide to Social Media Marketing",
    description: "Everything you need to know about building a successful social media strategy.",
    image: "/placeholder.svg?height=400&width=600",
    date: "May 22, 2023",
    author: "Maria Garcia",
    category: "Social Media",
    slug: "social-media-marketing-guide",
  },
  {
    title: "How to Measure ROI on Your Digital Marketing Campaigns",
    description: "Practical tips for tracking and improving the return on your marketing investments.",
    image: "/placeholder.svg?height=400&width=600",
    date: "April 10, 2023",
    author: "David Smith",
    category: "Analytics",
    slug: "measuring-digital-marketing-roi",
  },
]

export default function BlogPreview() {
  return (
    <section id="blog" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Our Blog</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Latest Insights & Trends</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Stay updated with the latest digital marketing strategies and industry news.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors z-10"></div>
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs px-2 py-1 rounded z-20">
                  {post.category}
                </div>
              </div>
              <CardHeader className="p-4">
                <div className="text-sm text-muted-foreground mb-2">
                  {post.date} • By {post.author}
                </div>
                <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">{post.description}</CardDescription>
              </CardHeader>
              <CardFooter className="p-4 pt-0">
                <Button variant="ghost" className="p-0 h-auto font-medium" asChild>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-1 group-hover:text-primary transition-colors"
                  >
                    Read More <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild size="lg">
            <Link href="/blog">
              View All Articles <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

