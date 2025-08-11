import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Users, BookOpen, TrendingUp, ChevronRight } from "lucide-react"
import CommunityHero from "@/components/community/community-hero"
import CommunityStats from "@/components/community/community-stats"
import FeaturedContentCard from "@/components/community/featured-content-card"
import CommunityNavigation from "@/components/community/community-navigation"

export default function CommunityPage() {
  return (
    <div>
      <CommunityHero />

      <section className="w-full py-12 md:py-16 lg:py-20 border-b">
        <div className="container px-4 md:px-6">
          <CommunityStats />

          <div className="mt-16">
            <CommunityNavigation />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Content</h2>
              <p className="text-muted-foreground mt-1">Discover the best resources from our community</p>
            </div>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search community content..." className="w-full md:w-[300px] pl-8" />
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-5 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeaturedContentCard
                  type="video"
                  title="Advanced SEO Techniques for 2023"
                  description="Learn cutting-edge SEO strategies to boost your website's visibility"
                  author={{
                    name: "Sarah Johnson",
                    image: "/placeholder.svg?height=40&width=40",
                    role: "SEO Specialist",
                  }}
                  image="/placeholder.svg?height=200&width=350&text=SEO+Techniques"
                  stats={{
                    views: "4.2K",
                    likes: "320",
                    comments: "45",
                  }}
                  date="June 15, 2023"
                  featured={true}
                  slug="advanced-seo-techniques"
                />

                <FeaturedContentCard
                  type="article"
                  title="Content Marketing Strategies That Drive Results"
                  description="Discover proven content marketing approaches for better engagement"
                  author={{
                    name: "Michael Chen",
                    image: "/placeholder.svg?height=40&width=40",
                    role: "Content Strategist",
                  }}
                  image="/placeholder.svg?height=200&width=350&text=Content+Marketing"
                  stats={{
                    views: "3.8K",
                    likes: "285",
                    comments: "32",
                  }}
                  date="June 10, 2023"
                  featured={false}
                  slug="content-marketing-strategies"
                />

                <FeaturedContentCard
                  type="discussion"
                  title="How Are You Adapting to iOS Privacy Changes?"
                  description="Community discussion on strategies for the new privacy landscape"
                  author={{
                    name: "Emily Rodriguez",
                    image: "/placeholder.svg?height=40&width=40",
                    role: "Digital Marketer",
                  }}
                  stats={{
                    views: "2.5K",
                    likes: "195",
                    comments: "87",
                  }}
                  date="June 8, 2023"
                  featured={false}
                  slug="ios-privacy-changes-discussion"
                />

                <FeaturedContentCard
                  type="event"
                  title="Digital Marketing Summit 2023"
                  description="Join industry leaders for our annual marketing conference"
                  image="/placeholder.svg?height=200&width=350&text=Marketing+Summit"
                  stats={{
                    attendees: "1.2K",
                    interested: "3.4K",
                  }}
                  date="July 15-17, 2023"
                  featured={true}
                  slug="digital-marketing-summit-2023"
                />

                <FeaturedContentCard
                  type="video"
                  title="Social Media Advertising Masterclass"
                  description="Complete guide to creating high-converting social media ads"
                  author={{
                    name: "David Wilson",
                    image: "/placeholder.svg?height=40&width=40",
                    role: "Social Media Expert",
                  }}
                  image="/placeholder.svg?height=200&width=350&text=Social+Media+Ads"
                  stats={{
                    views: "5.7K",
                    likes: "430",
                    comments: "62",
                  }}
                  date="June 5, 2023"
                  featured={false}
                  slug="social-media-advertising-masterclass"
                />

                <FeaturedContentCard
                  type="resource"
                  title="Ultimate Email Marketing Templates Pack"
                  description="50+ ready-to-use email templates for various campaigns"
                  author={{
                    name: "Jessica Lee",
                    image: "/placeholder.svg?height=40&width=40",
                    role: "Email Marketing Specialist",
                  }}
                  image="/placeholder.svg?height=200&width=350&text=Email+Templates"
                  stats={{
                    downloads: "8.3K",
                    rating: "4.8",
                  }}
                  date="June 1, 2023"
                  featured={false}
                  slug="email-marketing-templates-pack"
                />
              </div>

              <div className="flex justify-center">
                <Button variant="outline">Load More Content</Button>
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeaturedContentCard
                  type="video"
                  title="Advanced SEO Techniques for 2023"
                  description="Learn cutting-edge SEO strategies to boost your website's visibility"
                  author={{
                    name: "Sarah Johnson",
                    image: "/placeholder.svg?height=40&width=40",
                    role: "SEO Specialist",
                  }}
                  image="/placeholder.svg?height=200&width=350&text=SEO+Techniques"
                  stats={{
                    views: "4.2K",
                    likes: "320",
                    comments: "45",
                  }}
                  date="June 15, 2023"
                  featured={true}
                  slug="advanced-seo-techniques"
                />

                <FeaturedContentCard
                  type="video"
                  title="Social Media Advertising Masterclass"
                  description="Complete guide to creating high-converting social media ads"
                  author={{
                    name: "David Wilson",
                    image: "/placeholder.svg?height=40&width=40",
                    role: "Social Media Expert",
                  }}
                  image="/placeholder.svg?height=200&width=350&text=Social+Media+Ads"
                  stats={{
                    views: "5.7K",
                    likes: "430",
                    comments: "62",
                  }}
                  date="June 5, 2023"
                  featured={false}
                  slug="social-media-advertising-masterclass"
                />

                <FeaturedContentCard
                  type="video"
                  title="Email Marketing Automation Workshop"
                  description="Set up powerful automated email sequences that convert"
                  author={{
                    name: "Jessica Lee",
                    image: "/placeholder.svg?height=40&width=40",
                    role: "Email Marketing Specialist",
                  }}
                  image="/placeholder.svg?height=200&width=350&text=Email+Automation"
                  stats={{
                    views: "3.1K",
                    likes: "245",
                    comments: "38",
                  }}
                  date="May 28, 2023"
                  featured={false}
                  slug="email-marketing-automation-workshop"
                />

                <FeaturedContentCard
                  type="video"
                  title="Google Analytics 4 Deep Dive"
                  description="Master the new Google Analytics platform for better insights"
                  author={{
                    name: "Robert Thompson",
                    image: "/placeholder.svg?height=40&width=40",
                    role: "Analytics Expert",
                  }}
                  image="/placeholder.svg?height=200&width=350&text=GA4+Tutorial"
                  stats={{
                    views: "6.3K",
                    likes: "510",
                    comments: "72",
                  }}
                  date="May 20, 2023"
                  featured={false}
                  slug="google-analytics-4-deep-dive"
                />

                <FeaturedContentCard
                  type="video"
                  title="Content Creation for TikTok and Reels"
                  description="Strategies for creating viral short-form video content"
                  author={{
                    name: "Sophia Martinez",
                    image: "/placeholder.svg?height=40&width=40",
                    role: "Social Media Manager",
                  }}
                  image="/placeholder.svg?height=200&width=350&text=Short+Form+Video"
                  stats={{
                    views: "7.8K",
                    likes: "620",
                    comments: "94",
                  }}
                  date="May 15, 2023"
                  featured={false}
                  slug="tiktok-reels-content-creation"
                />

                <FeaturedContentCard
                  type="video"
                  title="Conversion Rate Optimization Techniques"
                  description="Proven methods to increase your website's conversion rates"
                  author={{
                    name: "James Wilson",
                    image: "/placeholder.svg?height=40&width=40",
                    role: "CRO Specialist",
                  }}
                  image="/placeholder.svg?height=200&width=350&text=CRO+Techniques"
                  stats={{
                    views: "4.5K",
                    likes: "380",
                    comments: "56",
                  }}
                  date="May 10, 2023"
                  featured={false}
                  slug="conversion-rate-optimization-techniques"
                />
              </div>

              <div className="flex justify-center">
                <Button asChild>
                  <Link href="/community/videos">
                    View All Videos <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="articles" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeaturedContentCard
                  type="article"
                  title="Content Marketing Strategies That Drive Results"
                  description="Discover proven content marketing approaches for better engagement"
                  author={{
                    name: "Michael Chen",
                    image: "/placeholder.svg?height=40&width=40",
                    role: "Content Strategist",
                  }}
                  image="/placeholder.svg?height=200&width=350&text=Content+Marketing"
                  stats={{
                    views: "3.8K",
                    likes: "285",
                    comments: "32",
                  }}
                  date="June 10, 2023"
                  featured={false}
                  slug="content-marketing-strategies"
                />

                {/* More article cards would go here */}
              </div>

              <div className="flex justify-center">
                <Button asChild>
                  <Link href="/community/articles">
                    View All Articles <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="discussions" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FeaturedContentCard
                  type="discussion"
                  title="How Are You Adapting to iOS Privacy Changes?"
                  description="Community discussion on strategies for the new privacy landscape"
                  author={{
                    name: "Emily Rodriguez",
                    image: "/placeholder.svg?height=40&width=40",
                    role: "Digital Marketer",
                  }}
                  stats={{
                    views: "2.5K",
                    likes: "195",
                    comments: "87",
                  }}
                  date="June 8, 2023"
                  featured={false}
                  slug="ios-privacy-changes-discussion"
                />

                {/* More discussion cards would go here */}
              </div>

              <div className="flex justify-center">
                <Button asChild>
                  <Link href="/community/discussions">
                    View All Discussions <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeaturedContentCard
                  type="event"
                  title="Digital Marketing Summit 2023"
                  description="Join industry leaders for our annual marketing conference"
                  image="/placeholder.svg?height=200&width=350&text=Marketing+Summit"
                  stats={{
                    attendees: "1.2K",
                    interested: "3.4K",
                  }}
                  date="July 15-17, 2023"
                  featured={true}
                  slug="digital-marketing-summit-2023"
                />

                {/* More event cards would go here */}
              </div>

              <div className="flex justify-center">
                <Button asChild>
                  <Link href="/community/events">
                    View All Events <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="w-full py-12 md:py-16 lg:py-20 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Join Our Community</h2>
            <p className="text-muted-foreground max-w-[700px]">
              Connect with like-minded professionals, share your knowledge, and grow your skills with our supportive
              community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button size="lg" asChild>
                <Link href="/auth/login">Sign Up Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/community/guidelines">Community Guidelines</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle>Connect</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Network with industry professionals, find mentors, and build valuable relationships that can help
                  advance your career.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <CardTitle>Learn</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access exclusive educational content, participate in workshops, and stay updated with the latest
                  industry trends.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <CardTitle>Grow</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Share your expertise, get feedback on your work, and build your professional reputation within the
                  community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

