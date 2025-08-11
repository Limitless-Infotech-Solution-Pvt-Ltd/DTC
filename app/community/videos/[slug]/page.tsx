"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  ChevronLeft,
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  SkipBack,
  SkipForward,
  Calendar,
  Eye,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import RelatedVideoCard from "@/components/community/related-video-card"

export default function VideoPage() {
  const params = useParams()
  const { slug } = params
  const { toast } = useToast()

  // Find the video based on the slug
  const video = videos.find((v) => v.slug === slug)

  // State for video player
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)

  // State for comments
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState(videoComments)

  // Handle like button click
  const handleLike = () => {
    toast({
      title: "Video liked",
      description: "Thank you for your feedback!",
    })
  }

  // Handle bookmark button click
  const handleBookmark = () => {
    toast({
      title: "Video bookmarked",
      description: "This video has been added to your bookmarks.",
    })
  }

  // Handle share button click
  const handleShare = () => {
    toast({
      title: "Share options",
      description: "Sharing functionality is not implemented in this demo.",
    })
  }

  // Handle comment submission
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()

    if (!commentText.trim()) return

    const newComment = {
      id: String(comments.length + 1),
      author: {
        name: "You",
        image: "/placeholder.svg?height=40&width=40",
        role: "Member",
      },
      content: commentText,
      date: "Just now",
      likes: "0",
    }

    setComments([newComment, ...comments])
    setCommentText("")

    toast({
      title: "Comment posted",
      description: "Your comment has been posted successfully.",
    })
  }

  // If video not found
  if (!video) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Video Not Found</h1>
        <p className="text-muted-foreground mb-6">The video you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/community/videos">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Videos
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/community/videos">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Videos
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player */}
          <div className="relative bg-black rounded-lg overflow-hidden aspect-video group">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40"></div>
              <Button
                size="icon"
                className="h-16 w-16 rounded-full bg-primary/90 hover:bg-primary/100"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8 text-primary-foreground" />
                ) : (
                  <Play className="h-8 w-8 text-primary-foreground ml-1" fill="currentColor" />
                )}
              </Button>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="text-white text-xs">0:00</div>
                  <div className="relative flex-1 h-1 bg-white/30 rounded-full">
                    <div className="absolute left-0 top-0 h-full w-1/4 bg-primary rounded-full"></div>
                    <div className="absolute left-1/4 top-1/2 -translate-y-1/2 h-3 w-3 bg-primary rounded-full"></div>
                  </div>
                  <div className="text-white text-xs">{video.duration}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-white/20"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" fill="currentColor" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                      <SkipForward className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-white/20"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-white/20"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                    >
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <Badge>{video.category}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {video.date}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Eye className="h-4 w-4 mr-1" />
                  {video.views} views
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleLike}>
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Like
                </Button>
                <Button variant="outline" size="sm" onClick={handleBookmark}>
                  <Bookmark className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={video.author.image} alt={video.author.name} />
                <AvatarFallback>{video.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{video.author.name}</div>
                <div className="text-sm text-muted-foreground">{video.author.role}</div>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">
                Follow
              </Button>
            </div>

            <div className="mt-6">
              <p className="text-muted-foreground">{video.description}</p>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Comments ({comments.length})</h2>

            <form onSubmit={handleSubmitComment} className="mb-6">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your Avatar" />
                  <AvatarFallback>YA</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" disabled={!commentText.trim()}>
                      Comment
                    </Button>
                  </div>
                </div>
              </div>
            </form>

            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.author.image} alt={comment.author.name} />
                    <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{comment.author.name}</div>
                      <div className="text-xs text-muted-foreground">{comment.date}</div>
                    </div>
                    <p className="mt-1">{comment.content}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        <span className="text-xs">{comment.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        <span className="text-xs">Reply</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Related Videos</h2>
            <div className="space-y-4">
              {relatedVideos.map((relatedVideo, index) => (
                <RelatedVideoCard key={index} video={relatedVideo} />
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Up Next</CardTitle>
              <CardDescription>Videos you might be interested in</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upNextVideos.map((upNextVideo, index) => (
                <div key={index} className="flex gap-3">
                  <div className="relative h-20 w-32 flex-shrink-0">
                    <Image
                      src={upNextVideo.thumbnail || "/placeholder.svg"}
                      alt={upNextVideo.title}
                      fill
                      className="object-cover rounded-md"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                      {upNextVideo.duration}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium line-clamp-2">
                      <Link href={`/community/videos/${upNextVideo.slug}`} className="hover:text-primary">
                        {upNextVideo.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">{upNextVideo.author.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{upNextVideo.views} views</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{upNextVideo.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/community/videos">Browse All Videos</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Sample video data
const videos = [
  {
    title: "Advanced SEO Techniques for 2023",
    slug: "advanced-seo-techniques-2023",
    description:
      "In this comprehensive tutorial, we dive deep into the most effective SEO strategies for 2023. Learn how to optimize your website for better search engine rankings, understand the latest algorithm updates, and discover advanced techniques that will help you stay ahead of your competition. This video covers everything from technical SEO to content optimization and link building strategies that actually work.",
    thumbnail: "/placeholder.svg?height=200&width=350&text=SEO+Techniques",
    duration: "32:15",
    date: "June 15, 2023",
    category: "SEO",
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
  // More videos would be defined here
]

// Sample comments data
const videoComments = [
  {
    id: "1",
    author: {
      name: "Michael Chen",
      image: "/placeholder.svg?height=40&width=40",
      role: "Content Strategist",
    },
    content:
      "This is exactly what I needed! I've been struggling with my site's rankings lately, and these techniques are already making a difference. Thanks for sharing!",
    date: "2 days ago",
    likes: "15",
  },
  {
    id: "2",
    author: {
      name: "Emily Rodriguez",
      image: "/placeholder.svg?height=40&width=40",
      role: "Digital Marketer",
    },
    content:
      "Great video! I especially found the section on technical SEO helpful. Could you do a follow-up video specifically on schema markup?",
    date: "3 days ago",
    likes: "8",
  },
  {
    id: "3",
    author: {
      name: "David Wilson",
      image: "/placeholder.svg?height=40&width=40",
      role: "Web Developer",
    },
    content:
      "I implemented some of these strategies on my client's website and we've already seen a 15% increase in organic traffic. Solid advice!",
    date: "5 days ago",
    likes: "23",
  },
]

// Related videos data
const relatedVideos = [
  {
    title: "E-commerce SEO Strategies",
    slug: "ecommerce-seo-strategies",
    thumbnail: "/placeholder.svg?height=200&width=350&text=Ecommerce+SEO",
    duration: "42:30",
    views: "5.5K",
    date: "April 5, 2023",
  },
  {
    title: "Local SEO for Small Businesses",
    slug: "local-seo-small-businesses",
    thumbnail: "/placeholder.svg?height=200&width=350&text=Local+SEO",
    duration: "25:40",
    views: "4.8K",
    date: "April 20, 2023",
  },
  {
    title: "SEO Audit Masterclass",
    slug: "seo-audit-masterclass",
    thumbnail: "/placeholder.svg?height=200&width=350&text=SEO+Audit",
    duration: "38:15",
    views: "3.9K",
    date: "March 15, 2023",
  },
]

// Up next videos data
const upNextVideos = [
  {
    title: "Content Marketing Strategies That Drive Results",
    slug: "content-marketing-strategies",
    thumbnail: "/placeholder.svg?height=200&width=350&text=Content+Marketing",
    duration: "28:45",
    views: "3.8K",
    date: "June 10, 2023",
    author: {
      name: "Michael Chen",
      role: "Content Strategist",
    },
  },
  {
    title: "Social Media Advertising Masterclass",
    slug: "social-media-advertising-masterclass",
    thumbnail: "/placeholder.svg?height=200&width=350&text=Social+Media+Ads",
    duration: "45:30",
    views: "5.7K",
    date: "June 5, 2023",
    author: {
      name: "David Wilson",
      role: "Social Media Expert",
    },
  },
  {
    title: "Google Analytics 4 Deep Dive",
    slug: "google-analytics-4-deep-dive",
    thumbnail: "/placeholder.svg?height=200&width=350&text=GA4+Tutorial",
    duration: "52:10",
    views: "6.3K",
    date: "May 20, 2023",
    author: {
      name: "Robert Thompson",
      role: "Analytics Expert",
    },
  },
]

