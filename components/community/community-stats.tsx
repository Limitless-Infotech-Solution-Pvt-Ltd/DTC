import { Card, CardContent } from "@/components/ui/card"
import { Users, Video, FileText, Calendar } from "lucide-react"

export default function CommunityStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Users className="h-8 w-8 text-primary mb-2" />
          <div className="text-2xl font-bold">10,000+</div>
          <p className="text-sm text-muted-foreground">Active Members</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Video className="h-8 w-8 text-primary mb-2" />
          <div className="text-2xl font-bold">500+</div>
          <p className="text-sm text-muted-foreground">Tutorial Videos</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex flex-col items-center text-center">
          <FileText className="h-8 w-8 text-primary mb-2" />
          <div className="text-2xl font-bold">1,200+</div>
          <p className="text-sm text-muted-foreground">Articles & Resources</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Calendar className="h-8 w-8 text-primary mb-2" />
          <div className="text-2xl font-bold">50+</div>
          <p className="text-sm text-muted-foreground">Monthly Events</p>
        </CardContent>
      </Card>
    </div>
  )
}

