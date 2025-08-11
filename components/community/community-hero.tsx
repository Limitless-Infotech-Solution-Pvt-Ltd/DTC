import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function CommunityHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Join Our Thriving Community
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Connect with marketing professionals, share insights, and access exclusive resources to elevate your
                digital marketing skills.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/community/videos">Explore Videos</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/community/discussions">Join Discussions</Link>
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=32&width=32&text=${i}`}
                      alt={`Community Member ${i}`}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="text-muted-foreground">Join 10,000+ members</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            <Image
              src="/placeholder.svg?height=550&width=550&text=Community"
              width={550}
              height={550}
              alt="Community Collaboration"
              className="rounded-lg object-cover shadow-xl"
              priority
            />
            <div className="absolute -bottom-6 -right-6 bg-background p-4 rounded-lg shadow-lg border border-muted">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary"
                  >
                    <path d="M17 6.1H3"></path>
                    <path d="M21 12.1H3"></path>
                    <path d="M15.1 18H3"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">Active Discussions</div>
                  <div className="text-xs text-muted-foreground">250+ new topics this week</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

