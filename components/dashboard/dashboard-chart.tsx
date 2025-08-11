"use client"

import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "@/components/ui/chart"

export default function DashboardChart() {
  const data = [
    {
      name: "Jan 1",
      visitors: 4000,
      conversions: 240,
    },
    {
      name: "Jan 8",
      visitors: 3000,
      conversions: 198,
    },
    {
      name: "Jan 15",
      visitors: 2000,
      conversions: 120,
    },
    {
      name: "Jan 22",
      visitors: 2780,
      conversions: 167,
    },
    {
      name: "Jan 29",
      visitors: 1890,
      conversions: 113,
    },
    {
      name: "Feb 5",
      visitors: 2390,
      conversions: 143,
    },
    {
      name: "Feb 12",
      visitors: 3490,
      conversions: 209,
    },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="conversions" stroke="hsl(var(--muted-foreground))" />
      </LineChart>
    </ResponsiveContainer>
  )
}

