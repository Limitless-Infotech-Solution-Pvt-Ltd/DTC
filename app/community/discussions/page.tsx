"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ChevronLeft, MessageSquare, ThumbsUp, Eye, Plus } from "lucide-react"

export default function DiscussionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

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
          <h1 className="text-3xl font-bold tracking-tight">Community Discussions</h1>
          <p className="text-muted-foreground mt-1">Join conversations, ask questions, and share your expertise</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Start New Discussion
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Search</h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search discussions..."
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
                variant={activeTab === "all" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("all")}
              >
                All Discussions
              </Button>
              <Button
                variant={activeTab === "trending" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("trending")}
              >
                Trending
              </Button>
              <Button
                variant={activeTab === "recent" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("recent")}
              >
                Recent
              </Button>
              <Button
                variant={activeTab === "unanswered" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("unanswered")}
              >
                Unanswered
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
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full max-w-md grid grid-cols-4 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="space-y-4">
                {discussions.map((discussion, index) => (
                  <DiscussionCard key={index} discussion={discussion} />
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <Button variant="outline">Load More Discussions</Button>
              </div>
            </TabsContent>

            <TabsContent value="trending" className="space-y-4">
              <div className="space-y-4">
                {discussions
                  .filter((d) => Number.parseInt(d.views.replace(/[^0-9]/g, "")) > 2000)
                  .sort(
                    (a, b) =>
                      Number.parseInt(b.likes.replace(/[^0-9]/g, "")) - Number.parseInt(a.likes.replace(/[^0-9]/g, "")),
                  )
                  .map((discussion, index) => (
                    <DiscussionCard key={index} discussion={discussion} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              <div className="space-y-4">
                {discussions
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((discussion, index) => (
                    <DiscussionCard key={index} discussion={discussion} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="unanswered" className="space-y-4">
              <div className="space-y-4">
                {discussions
                  .filter((d) => Number.parseInt(d.replies.replace(/[^0-9]/g, "")) === 0)
                  .map((discussion, index) => (
                    <DiscussionCard key={index} discussion={discussion} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

interface DiscussionCardProps {
  discussion: {
    title: string
    slug: string
    author: {
      name: string
      image: string
      role: string
    }
    date: string
    category: string
    tags: string[]
    views: string
    likes: string
    replies: string
    isAnswered: boolean
  }
}

function DiscussionCard({ discussion }: DiscussionCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg hover:text-primary transition-colors">
              <Link href={`/community/discussions/${discussion.slug}`} className="hover:underline">
                {discussion.title}
              </Link>
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{discussion.category}</Badge>
              {discussion.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          {discussion.isAnswered && (
            <Badge variant="default" className="bg-green-600">
              Answered
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={discussion.author.image} alt={discussion.author.name} />
            <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <span className="font-medium">{discussion.author.name}</span>
            <span className="text-muted-foreground"> • {discussion.date}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{discussion.views} views</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{discussion.likes} likes</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{discussion.replies} replies</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

const popularTags = [
  "seo",
  "social-media",
  "analytics",
  "content",
  "ppc",
  "email-marketing",
  "strategy",
  "tools",
  "beginners",
  "advanced",
]

const discussions = [
  {
    title: "How Are You Adapting to iOS Privacy Changes?",
    slug: "ios-privacy-changes-discussion",
    author: {
      name: "Emily Rodriguez",
      image: "/placeholder.svg?height=40&width=40",
      role: "Digital Marketer",
    },
    date: "June 8, 2023",
    category: "Social Media",
    tags: ["privacy", "ios", "facebook-ads", "strategy"],
    views: "2.5K",
    likes: "195",
    replies: "87",
    isAnswered: true,
  },
  {
    title: "Best Tools for Keyword Research in 2023?",
    slug: "best-keyword-research-tools-2023",
    author: {
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=40&width=40",
      role: "SEO Specialist",
    },
    date: "June 5, 2023",
    category: "SEO",
    tags: ["tools", "keywords", "research"],
    views: "1.8K",
    likes: "142",
    replies: "63",
    isAnswered: true,
  },
  {
    title: "How to Measure Content Marketing ROI?",
    slug: "measure-content-marketing-roi",
    author: {
      name: "Michael Chen",
      image: "/placeholder.svg?height=40&width=40",
      role: "Content Strategist",
    },
    date: "June 2, 2023",
    category: "Content Marketing",
    tags: ["roi", "analytics", "strategy"],
    views: "1.2K",
    likes: "98",
    replies: "41",
    isAnswered: false,
  },
  {
    title: "Google Analytics 4 Migration Tips?",
    slug: "google-analytics-4-migration-tips",
    author: {
      name: "Robert Thompson",
      image: "/placeholder.svg?height=40&width=40",
      role: "Analytics Expert",
    },
    date: "May 30, 2023",
    category: "Analytics",
    tags: ["ga4", "migration", "tracking"],
    views: "3.4K",
    likes: "276",
    replies: "92",
    isAnswered: true,
  },
  {
    title: "Email Subject Line Best Practices",
    slug: "email-subject-line-best-practices",
    author: {
      name: "Jessica Lee",
      image: "/placeholder.svg?height=40&width=40",
      role: "Email Marketing Specialist",
    },
    date: "May 25, 2023",
    category: "Email Marketing",
    tags: ["subject-lines", "open-rates", "testing"],
    views: "2.1K",
    likes: "187",
    replies: "74",
    isAnswered: true,
  },
  {
    title: "TikTok vs Reels for B2B Marketing?",
    slug: "tiktok-vs-reels-b2b-marketing",
    author: {
      name: "Sophia Martinez",
      image: "/placeholder.svg?height=40&width=40",
      role: "Social Media Manager",
    },
    date: "May 20, 2023",
    category: "Social Media",
    tags: ["tiktok", "reels", "b2b", "video"],
    views: "2.8K",
    likes: "215",
    replies: "83",
    isAnswered: false,
  },
  {
    title: "How to Optimize for Voice Search?",
    slug: "optimize-for-voice-search",
    author: {
      name: "David Wilson",
      image: "/placeholder.svg?height=40&width=40",
      role: "SEO Specialist",
    },
    date: "May 15, 2023",
    category: "SEO",
    tags: ["voice-search", "optimization", "featured-snippets"],
    views: "1.9K",
    likes: "156",
    replies: "68",
    isAnswered: true,
  },
  {
    title: "Best Practices for Landing Page Conversion",
    slug: "landing-page-conversion-best-practices",
    author: {
      name: "James Wilson",
      image: "/placeholder.svg?height=40&width=40",
      role: "CRO Specialist",
    },
    date: "May 10, 2023",
    category: "Conversion Optimization",
    tags: ["landing-pages", "cro", "testing"],
    views: "2.3K",
    likes: "198",
    replies: "76",
    isAnswered: true,
  },
  {
    title: "How to Create a Content Calendar?",
    slug: "create-content-calendar",
    author: {
      name: "Michael Chen",
      image: "/placeholder.svg?height=40&width=40",
      role: "Content Strategist",
    },
    date: "May 5, 2023",
    category: "Content Marketing",
    tags: ["planning", "organization", "strategy"],
    views: "1.7K",
    likes: "134",
    replies: "59",
    isAnswered: true,
  },
  {
    title: "LinkedIn Ads vs Facebook Ads for B2B",
    slug: "linkedin-vs-facebook-ads-b2b",
    author: {
      name: "Alex Johnson",
      image: "/placeholder.svg?height=40&width=40",
      role: "PPC Specialist",
    },
    date: "May 1, 2023",
    category: "PPC & Advertising",
    tags: ["linkedin", "facebook", "b2b", "comparison"],
    views: "2.6K",
    likes: "210",
    replies: "81",
    isAnswered: false,
  },
]

