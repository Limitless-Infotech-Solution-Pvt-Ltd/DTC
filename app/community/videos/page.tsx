"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ChevronLeft, Clock, BarChart, ThumbsUp } from "lucide-react"
import VideoCard from "@/components/community/video-card"

export default function VideosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  // Filter videos based on search query and category
  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = category === "all" || video.category === category

    return matchesSearch && matchesCategory
  })

  // Sort videos based on selected sort option
  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "popular":
        return Number.parseInt(b.views.replace(/[^0-9]/g, "")) - Number.parseInt(a.views.replace(/[^0-9]/g, ""))
      case "trending":
        return Number.parseInt(b.likes.replace(/[^0-9]/g, "")) - Number.parseInt(a.likes.replace(/[^0-9]/g, ""))
      default:
        return 0
    }
  })

  return (
    <div className="container py-8 md:py-12">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/community">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Community
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Video Library</h1>
          <p className="text-muted-foreground mt-1">
            Browse our collection of tutorials, webinars, and expert interviews
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/community/videos/featured">Featured Videos</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/community/videos/latest">Latest Uploads</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Search</h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search videos..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Categories</h3>
            <div className="space-y-1">
              <Button
                variant={category === "all" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setCategory("all")}
              >
                All Categories
              </Button>
              {videoCategories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={category === cat.value ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setCategory(cat.value)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Duration</h3>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                Under 5 minutes
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                5-15 minutes
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                15-30 minutes
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                Over 30 minutes
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-muted">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Showing {sortedVideos.length} videos</div>
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="popular">Most Viewed</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="grid" className="w-full">
            <TabsList className="w-[200px] mb-4">
              <TabsTrigger value="grid" className="flex-1">
                Grid View
              </TabsTrigger>
              <TabsTrigger value="list" className="flex-1">
                List View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="grid" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedVideos.map((video, index) => (
                  <VideoCard key={index} video={video} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="space-y-4">
              <div className="space-y-4">
                {sortedVideos.map((video, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-48 md:h-auto md:w-1/3">
                        <Image
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge className="mb-2">{video.category}</Badge>
                            <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                              <Link href={`/community/videos/${video.slug}`} className="hover:underline">
                                {video.title}
                              </Link>
                            </h3>
                          </div>
                          <div className="text-xs text-muted-foreground">{video.date}</div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{video.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <BarChart className="h-3 w-3" />
                              <span>{video.views} views</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <ThumbsUp className="h-3 w-3" />
                              <span>{video.likes} likes</span>
                            </div>
                          </div>
                          <Button size="sm" asChild>
                            <Link href={`/community/videos/${video.slug}`}>Watch Now</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {sortedVideos.length > 0 ? (
            <div className="flex justify-center mt-8">
              <Button variant="outline">Load More Videos</Button>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No videos found</h3>
              <p className="text-muted-foreground mt-1">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const videoCategories = [
  { label: "SEO", value: "seo" },
  { label: "Social Media", value: "social-media" },
  { label: "Content Marketing", value: "content-marketing" },
  { label: "Email Marketing", value: "email-marketing" },
  { label: "PPC & Advertising", value: "ppc-advertising" },
  { label: "Analytics", value: "analytics" },
  { label: "Strategy", value: "strategy" },
]

const popularTags = [
  "beginner",
  "advanced",
  "tutorial",
  "case-study",
  "webinar",
  "interview",
  "trends",
  "tools",
  "tips",
  "strategy",
]

const videos = [
  {
    title: "Advanced SEO Techniques for 2023",
    slug: "advanced-seo-techniques-2023",
    description: "Learn cutting-edge SEO strategies to boost your website's visibility and rankings in search engines.",
    thumbnail: "/placeholder.svg?height=200&width=350&text=SEO+Techniques",
    duration: "32:15",
    date: "June 15, 2023",
    category: "seo",
    views: "4.2K",
    likes: "320",
    comments: "45",
    featured: true,
    author: {
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=40&width=40",
      role: "SEO Specialist",
    },
  },
  {
    title: "Social Media Advertising Masterclass",
    slug: "social-media-advertising-masterclass",
    description: "Complete guide to creating high-converting social media ads across all major platforms.",
    thumbnail: "/placeholder.svg?height=200&width=350&text=Social+Media+Ads",
    duration: "45:30",
    date: "June 5, 2023",
    category: "social-media",
    views: "5.7K",
    likes: "430",
    comments: "62",
    featured: false,
    author: {
      name: "David Wilson",
      image: "/placeholder.svg?height=40&width=40",
      role: "Social Media Expert",
    },
  },
  {
    title: "Email Marketing Automation Workshop",
    slug: "email-marketing-automation-workshop",
    description: "Set up powerful automated email sequences that convert subscribers into customers.",
    thumbnail: "/placeholder.svg?height=200&width=350&text=Email+Automation",
    duration: "28:45",
    date: "May 28, 2023",
    category: "email-marketing",
    views: "3.1K",
    likes: "245",
    comments: "38",
    featured: false,
    author: {
      name: "Jessica Lee",
      image: "/placeholder.svg?height=40&width=40",
      role: "Email Marketing Specialist",
    },
  },
  {
    title: "Google Analytics 4 Deep Dive",
    slug: "google-analytics-4-deep-dive",
    description: "Master the new Google Analytics platform to extract valuable insights for your business.",
    thumbnail: "/placeholder.svg?height=200&width=350&text=GA4+Tutorial",
    duration: "52:10",
    date: "May 20, 2023",
    category: "analytics",
    views: "6.3K",
    likes: "510",
    comments: "72",
    featured: false,
    author: {
      name: "Robert Thompson",
      image: "/placeholder.svg?height=40&width=40",
      role: "Analytics Expert",
    },
  },
  {
    title: "Content Creation for TikTok and Reels",
    slug: "tiktok-reels-content-creation",
    description: "Strategies for creating viral short-form video content that engages your audience.",
    thumbnail: "/placeholder.svg?height=200&width=350&text=Short+Form+Video",
    duration: "18:20",
    date: "May 15, 2023",
    category: "social-media",
    views: "7.8K",
    likes: "620",
    comments: "94",
    featured: true,
    author: {
      name: "Sophia Martinez",
      image: "/placeholder.svg?height=40&width=40",
      role: "Social Media Manager",
    },
  },
  {
    title: "Conversion Rate Optimization Techniques",
    slug: "conversion-rate-optimization-techniques",
    description: "Proven methods to increase your website's conversion rates and generate more leads and sales.",
    thumbnail: "/placeholder.svg?height=200&width=350&text=CRO+Techniques",
    duration: "41:35",
    date: "May 10, 2023",
    category: "strategy",
    views: "4.5K",
    likes: "380",
    comments: "56",
    featured: false,
    author: {
      name: "James Wilson",
      image: "/placeholder.svg?height=40&width=40",
      role: "CRO Specialist",
    },
  },
  {
    title: "B2B Content Marketing Strategy",
    slug: "b2b-content-marketing-strategy",
    description: "Develop a content strategy that generates high-quality leads for your B2B business.",
    thumbnail: "/placeholder.svg?height=200&width=350&text=B2B+Content",
    duration: "36:50",
    date: "May 5, 2023",
    category: "content-marketing",
    views: "3.9K",
    likes: "310",
    comments: "48",
    featured: false,
    author: {
      name: "Michael Chen",
      image: "/placeholder.svg?height=40&width=40",
      role: "Content Strategist",
    },
  },
  {
    title: "PPC Campaign Optimization Workshop",
    slug: "ppc-campaign-optimization-workshop",
    description: "Learn how to optimize your Google Ads and Facebook Ads campaigns for maximum ROI.",
    thumbnail: "/placeholder.svg?height=200&width=350&text=PPC+Workshop",
    duration: "48:15",
    date: "April 28, 2023",
    category: "ppc-advertising",
    views: "5.2K",
    likes: "420",
    comments: "65",
    featured: false,
    author: {
      name: "Alex Johnson",
      image: "/placeholder.svg?height=40&width=40",
      role: "PPC Specialist",
    },
  },
  {
    title: "Local SEO for Small Businesses",
    slug: "local-seo-small-businesses",
    description: "Practical strategies to improve your local search rankings and attract more local customers.",
    thumbnail: "/placeholder.svg?height=200&width=350&text=Local+SEO",
    duration: "25:40",
    date: "April 20, 2023",
    category: "seo",
    views: "4.8K",
    likes: "390",
    comments: "58",
    featured: false,
    author: {
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=40&width=40",
      role: "SEO Specialist",
    },
  },
  {
    title: "Marketing Automation Tools Comparison",
    slug: "marketing-automation-tools-comparison",
    description: "An in-depth comparison of the top marketing automation platforms to help you choose the right one.",
    thumbnail: "/placeholder.svg?height=200&width=350&text=Automation+Tools",
    duration: "38:25",
    date: "April 15, 2023",
    category: "strategy",
    views: "3.6K",
    likes: "280",
    comments: "42",
    featured: false,
    author: {
      name: "Emily Rodriguez",
      image: "/placeholder.svg?height=40&width=40",
      role: "Marketing Automation Expert",
    },
  },
  {
    title: "Data-Driven Content Strategy",
    slug: "data-driven-content-strategy",
    description:
      "How to use data to inform your content strategy and create content that resonates with your audience.",
    thumbnail: "/placeholder.svg?height=200&width=350&text=Data+Content",
    duration: "33:10",
    date: "April 10, 2023",
    category: "content-marketing",
    views: "4.1K",
    likes: "330",
    comments: "51",
    featured: false,
    author: {
      name: "Michael Chen",
      image: "/placeholder.svg?height=40&width=40",
      role: "Content Strategist",
    },
  },
  {
    title: "E-commerce SEO Strategies",
    slug: "ecommerce-seo-strategies",
    description: "Specialized SEO techniques for e-commerce websites to increase organic traffic and sales.",
    thumbnail: "/placeholder.svg?height=200&width=350&text=Ecommerce+SEO",
    duration: "42:30",
    date: "April 5, 2023",
    category: "seo",
    views: "5.5K",
    likes: "450",
    comments: "68",
    featured: true,
    author: {
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=40&width=40",
      role: "SEO Specialist",
    },
  },
]

