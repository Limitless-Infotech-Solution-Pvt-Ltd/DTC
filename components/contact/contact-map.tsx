"use client"

import { useEffect, useRef } from "react"

export default function ContactMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // For demo purposes, we'll create a map without an actual API key
    // In a real application, you would use your Google Maps API key

    const initMap = () => {
      if (!mapRef.current) return

      // Create a div that looks like a map for demo purposes
      const mapContainer = mapRef.current
      mapContainer.style.position = "relative"
      mapContainer.style.overflow = "hidden"
      mapContainer.style.backgroundColor = "#e5e7eb"

      // Create map elements
      const mapContent = document.createElement("div")
      mapContent.style.position = "absolute"
      mapContent.style.top = "0"
      mapContent.style.left = "0"
      mapContent.style.right = "0"
      mapContent.style.bottom = "0"
      mapContent.style.backgroundImage = 'url("/placeholder.svg?height=600&width=800&text=Map")'
      mapContent.style.backgroundSize = "cover"
      mapContent.style.backgroundPosition = "center"

      // Create marker
      const marker = document.createElement("div")
      marker.style.position = "absolute"
      marker.style.top = "50%"
      marker.style.left = "50%"
      marker.style.transform = "translate(-50%, -100%)"
      marker.style.width = "30px"
      marker.style.height = "30px"
      marker.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-primary">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      `

      // Add elements to map
      mapContainer.appendChild(mapContent)
      mapContainer.appendChild(marker)

      // Add interaction hint
      const hint = document.createElement("div")
      hint.style.position = "absolute"
      hint.style.bottom = "10px"
      hint.style.right = "10px"
      hint.style.backgroundColor = "rgba(255, 255, 255, 0.8)"
      hint.style.padding = "5px 10px"
      hint.style.borderRadius = "4px"
      hint.style.fontSize = "12px"
      hint.textContent = "Dremers Talent Club"

      mapContainer.appendChild(hint)
    }

    initMap()
  }, [])

  return <div ref={mapRef} className="h-full w-full" />
}

