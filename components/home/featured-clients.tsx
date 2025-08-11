import Image from "next/image"

export default function FeaturedClients() {
  return (
    <section className="w-full py-12 md:py-16 border-y border-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-xl font-medium tracking-tight md:text-2xl">Trusted by Leading Brands</h2>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-2 items-center gap-8 py-8 md:grid-cols-4 md:gap-12">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex items-center justify-center">
              <Image
                src={`/placeholder.svg?height=60&width=180&text=Client+${i}`}
                alt={`Client ${i}`}
                width={180}
                height={60}
                className="h-12 w-auto opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

