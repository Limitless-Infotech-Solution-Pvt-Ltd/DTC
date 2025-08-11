import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, User, Clock, ChevronLeft, Facebook, Twitter, Linkedin, Share2 } from "lucide-react"
import { blogPosts } from "@/data/blog-posts"
import NewsletterSignup from "@/components/blog/newsletter-signup"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3)

  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Link
                  href="/blog"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back to Blog
                </Link>
                <Badge className="mb-2">{post.category}</Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{post.title}</h1>
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <User className="mr-1 h-4 w-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="relative aspect-video overflow-hidden rounded-lg mb-8">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="lead">{post.description}</p>

              <h2>Introduction</h2>
              <p>
                Digital marketing continues to evolve at a rapid pace, with new technologies and strategies emerging
                regularly. Staying ahead of these trends is crucial for businesses looking to maintain a competitive
                edge in their respective industries.
              </p>

              <p>
                In this article, we'll explore the key aspects of {post.title.toLowerCase()} and how you can implement
                these strategies to improve your marketing results.
              </p>

              <h2>Why This Matters</h2>
              <p>
                The digital landscape is constantly changing, and what worked yesterday might not work tomorrow.
                Understanding the latest trends and best practices in {post.category.toLowerCase()} marketing is
                essential for businesses of all sizes.
              </p>

              <blockquote>"The best marketing doesn't feel like marketing." — Tom Fishburne</blockquote>

              <h2>Key Strategies</h2>
              <p>Here are some effective strategies that you can implement today:</p>

              <ul>
                <li>Focus on creating high-quality, valuable content that addresses your audience's needs</li>
                <li>Leverage data analytics to inform your decision-making process</li>
                <li>Optimize your campaigns for mobile users</li>
                <li>Implement personalization to improve user experience</li>
                <li>Utilize automation to streamline your marketing efforts</li>
              </ul>

              <h2>Implementation Guide</h2>
              <p>
                Now that we understand the importance of these strategies, let's look at how you can implement them
                effectively:
              </p>

              <h3>1. Assess Your Current Approach</h3>
              <p>
                Before making any changes, it's important to evaluate your current marketing efforts. Identify what's
                working well and what areas need improvement.
              </p>

              <h3>2. Set Clear Objectives</h3>
              <p>
                Define specific, measurable goals for your marketing campaigns. This will help you track progress and
                determine the effectiveness of your strategies.
              </p>

              <h3>3. Develop a Comprehensive Strategy</h3>
              <p>
                Create a detailed plan that outlines how you'll implement these new approaches. Include timelines,
                resource allocation, and key performance indicators.
              </p>

              <h2>Case Study</h2>
              <p>Let's look at a real-world example of a company that successfully implemented these strategies:</p>

              <p>
                A mid-sized e-commerce business was struggling to generate qualified leads through their digital
                marketing efforts. After implementing the strategies outlined in this article, they saw a 150% increase
                in conversion rates and a 200% increase in ROI within just three months.
              </p>

              <h2>Conclusion</h2>
              <p>
                The digital marketing landscape will continue to evolve, but by staying informed about the latest trends
                and best practices, you can ensure that your marketing efforts remain effective and competitive.
              </p>

              <p>
                Remember, successful digital marketing is not about implementing every new trend that emerges. It's
                about identifying the strategies that align with your business goals and implementing them effectively.
              </p>
            </div>

            <Separator className="my-8" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image src="/placeholder.svg?height=48&width=48" alt={post.author} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium">{post.author}</p>
                  <p className="text-sm text-muted-foreground">Digital Marketing Specialist</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Share:</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Share on Facebook</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Share on Twitter</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">Share on LinkedIn</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Copy link</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Related Articles</h2>

            {relatedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <Card key={index} className="overflow-hidden group">
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <Badge className="mb-2">{relatedPost.category}</Badge>
                      <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                        <Link href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">{relatedPost.date}</p>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No related articles found.</p>
            )}

            <div className="mt-8">
              <Button asChild>
                <Link href="/blog">View All Articles</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-md">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold tracking-tight">Subscribe to Our Newsletter</h2>
              <p className="text-muted-foreground mt-2">
                Get the latest digital marketing insights delivered to your inbox.
              </p>
            </div>
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </div>
  )
}

