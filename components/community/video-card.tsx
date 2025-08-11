import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Play, Clock, Eye, ThumbsUp, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoCardProps {
  video: {
    title: string
    slug: string
    description: string
    thumbnail: string
    duration: string
    date: string
    category: string
    views: string
    likes: string
    comments: string
    featured?: boolean
    author: {
      name: string
      image: string
      role: string
    }
  }
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <Card className="overflow-hidden group h-full flex flex-col">
      <div className="relative">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={video.thumbnail || "/placeholder.svg"}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors"></div>
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {video.duration}
          </div>
          {video.featured && (
            <div className="absolute top-2 left-2">
              <Badge variant="default">Featured</Badge>
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="rounded-full bg-primary/90 p-3 transform transition-transform group-hover:scale-110">
              <Play className="h-6 w-6 text-primary-foreground" fill="currentColor" />
            </div>
          </div>
        </div>
      </div>
      <CardContent className="flex-1 p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline">{video.category}</Badge>
          <span className="text-xs text-muted-foreground">{video.date}</span>
        </div>
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
          <Link href={`/community/videos/${video.slug}`} className="hover:underline">
            {video.title}
          </Link>
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{video.description}</p>
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={video.author.image} alt={video.author.name} />
            <AvatarFallback>{video.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-xs">
            <div className="font-medium">{video.author.name}</div>
            <div className="text-muted-foreground">{video.author.role}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between border-t mt-auto">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{video.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-3 w-3" />
            <span>{video.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            <span>{video.comments}</span>
          </div>
        </div>
        <Button size="sm" variant="ghost" asChild>
          <Link href={`/community/videos/${video.slug}`}>Watch</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

