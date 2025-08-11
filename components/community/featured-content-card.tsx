import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Video,
  FileText,
  MessageSquare,
  Calendar,
  Download,
  Eye,
  ThumbsUp,
  MessageCircle,
  Users,
  Star,
} from "lucide-react"

interface Author {
  name: string
  image: string
  role?: string
}

interface Stats {
  views?: string
  likes?: string
  comments?: string
  downloads?: string
  rating?: string
  attendees?: string
  interested?: string
}

interface FeaturedContentCardProps {
  type: "video" | "article" | "discussion" | "event" | "resource"
  title: string
  description?: string
  author?: Author
  image?: string
  stats?: Stats
  date: string
  featured?: boolean
  slug: string
}

export default function FeaturedContentCard({
  type,
  title,
  description,
  author,
  image,
  stats,
  date,
  featured = false,
  slug,
}: FeaturedContentCardProps) {
  const getTypeIcon = () => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "article":
        return <FileText className="h-4 w-4" />
      case "discussion":
        return <MessageSquare className="h-4 w-4" />
      case "event":
        return <Calendar className="h-4 w-4" />
      case "resource":
        return <Download className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getTypeColor = () => {
    switch (type) {
      case "video":
        return "bg-blue-100 text-blue-800"
      case "article":
        return "bg-green-100 text-green-800"
      case "discussion":
        return "bg-purple-100 text-purple-800"
      case "event":
        return "bg-orange-100 text-orange-800"
      case "resource":
        return "bg-teal-100 text-teal-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderStats = () => {
    if (!stats) return null

    return (
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        {stats.views && (
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{stats.views}</span>
          </div>
        )}
        {stats.likes && (
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-3 w-3" />
            <span>{stats.likes}</span>
          </div>
        )}
        {stats.comments && (
          <div className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            <span>{stats.comments}</span>
          </div>
        )}
        {stats.downloads && (
          <div className="flex items-center gap-1">
            <Download className="h-3 w-3" />
            <span>{stats.downloads}</span>
          </div>
        )}
        {stats.rating && (
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            <span>{stats.rating}</span>
          </div>
        )}
        {stats.attendees && (
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{stats.attendees} attending</span>
          </div>
        )}
        {stats.interested && (
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{stats.interested} interested</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className={`overflow-hidden group h-full flex flex-col ${featured ? "border-primary" : ""}`}>
      {image && (
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors z-10"></div>
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 z-20">
            <Badge className={`${getTypeColor()}`}>
              <div className="flex items-center gap-1">
                {getTypeIcon()}
                <span className="capitalize">{type}</span>
              </div>
            </Badge>
          </div>
          {featured && (
            <div className="absolute top-3 right-3 z-20">
              <Badge variant="default">Featured</Badge>
            </div>
          )}
        </div>
      )}
      <CardContent className={`flex-1 p-4 ${!image ? "pt-4" : "pt-5"}`}>
        {!image && (
          <Badge className={`mb-3 ${getTypeColor()}`}>
            <div className="flex items-center gap-1">
              {getTypeIcon()}
              <span className="capitalize">{type}</span>
            </div>
          </Badge>
        )}
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
          <Link href={`/community/${type}s/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        {description && <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{description}</p>}
        {author && (
          <div className="flex items-center gap-2 mb-3">
            <Avatar className="h-6 w-6">
              <AvatarImage src={author.image} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-xs">
              <div className="font-medium">{author.name}</div>
              {author.role && <div className="text-muted-foreground">{author.role}</div>}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto flex items-center justify-between">
        <div className="text-xs text-muted-foreground">{date}</div>
        {renderStats()}
      </CardFooter>
    </Card>
  )
}

