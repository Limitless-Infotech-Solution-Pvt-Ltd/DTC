"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

interface ResultsChartProps {
  data: {
    name: string
    before: number
    after: number
  }[]
}

export default function ResultsChart({ data }: ResultsChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="before" name="Before" fill="#94a3b8" />
        <Bar dataKey="after" name="After" fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  )
}

