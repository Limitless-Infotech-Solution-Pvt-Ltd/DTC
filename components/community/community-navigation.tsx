import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Video, FileText, MessageSquare, Calendar, BookOpen, Download, Users, Award } from "lucide-react"

export default function CommunityNavigation() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <Button variant="outline" className="h-auto flex-col py-6 px-4" asChild>
        <Link href="/community/videos">
          <Video className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium">Videos</span>
          <span className="text-xs text-muted-foreground mt-1">Tutorials & Webinars</span>
        </Link>
      </Button>

      <Button variant="outline" className="h-auto flex-col py-6 px-4" asChild>
        <Link href="/community/articles">
          <FileText className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium">Articles</span>
          <span className="text-xs text-muted-foreground mt-1">Guides & Case Studies</span>
        </Link>
      </Button>

      <Button variant="outline" className="h-auto flex-col py-6 px-4" asChild>
        <Link href="/community/discussions">
          <MessageSquare className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium">Discussions</span>
          <span className="text-xs text-muted-foreground mt-1">Forums & Q&A</span>
        </Link>
      </Button>

      <Button variant="outline" className="h-auto flex-col py-6 px-4" asChild>
        <Link href="/community/events">
          <Calendar className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium">Events</span>
          <span className="text-xs text-muted-foreground mt-1">Webinars & Meetups</span>
        </Link>
      </Button>

      <Button variant="outline" className="h-auto flex-col py-6 px-4" asChild>
        <Link href="/community/resources">
          <Download className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium">Resources</span>
          <span className="text-xs text-muted-foreground mt-1">Templates & Tools</span>
        </Link>
      </Button>

      <Button variant="outline" className="h-auto flex-col py-6 px-4" asChild>
        <Link href="/community/courses">
          <BookOpen className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium">Courses</span>
          <span className="text-xs text-muted-foreground mt-1">Learning Paths</span>
        </Link>
      </Button>

      <Button variant="outline" className="h-auto flex-col py-6 px-4" asChild>
        <Link href="/community/members">
          <Users className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium">Members</span>
          <span className="text-xs text-muted-foreground mt-1">Find & Connect</span>
        </Link>
      </Button>

      <Button variant="outline" className="h-auto flex-col py-6 px-4" asChild>
        <Link href="/community/experts">
          <Award className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium">Experts</span>
          <span className="text-xs text-muted-foreground mt-1">Industry Leaders</span>
        </Link>
      </Button>
    </div>
  )
}

