import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Eye } from "lucide-react"

interface RelatedVideoCardProps {
  video: {
    title: string
    slug: string
    thumbnail: string
    duration: string
    views: string
    date: string
  }
}

export default function RelatedVideoCard({ video }: RelatedVideoCardProps) {
  return (
    <Card className="overflow-hidden group">
      <Link href={`/community/videos/${video.slug}`} className="flex gap-3 p-3">
        <div className="relative h-20 w-32 flex-shrink-0">
          <Image
            src={video.thumbnail || "/placeholder.svg"}
            alt={video.title}
            fill
            className="object-cover rounded-md"
          />
          <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
            {video.duration}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">{video.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center text-xs text-muted-foreground">
              <Eye className="h-3 w-3 mr-1" />
              {video.views} views
            </div>
            <span className="text-xs text-muted-foreground">•</span>
            <div className="text-xs text-muted-foreground">{video.date}</div>
          </div>
        </div>
      </Link>
    </Card>
  )
}

