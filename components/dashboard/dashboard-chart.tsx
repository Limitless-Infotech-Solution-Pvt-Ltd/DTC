"use client"

import { useState } from "react"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartLegendItem,
  ChartAreaSeries,
  ChartArea,
  ChartAxisOptions,
  ChartAxisTickOptions,
  ChartAxis,
  ChartHeader,
  ChartTitle,
  ChartValueLabel,
} from "@/components/ui/chart"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for the chart
const generateData = (months: number) => {
  const data = []
  let balance = 15000

  for (let i = 0; i < months; i++) {
    const date = new Date()
    date.setMonth(date.getMonth() - (months - 1 - i))

    // Random fluctuation between -2000 and +5000
    const change = Math.floor(Math.random() * 7000) - 2000
    balance += change

    data.push({
      date: date.toISOString().slice(0, 7), // YYYY-MM format
      balance: Math.max(balance, 5000), // Ensure balance doesn't go below 5000
    })
  }

  return data
}

const monthlyData = generateData(12)
const weeklyData = generateData(8)
const dailyData = generateData(14)

export default function DashboardChart() {
  const [period, setPeriod] = useState("monthly")

  const chartData = period === "monthly" ? monthlyData : period === "weekly" ? weeklyData : dailyData

  return (
    <Chart className="h-[300px] w-full" data={chartData} x={(d) => d.date} y={(d) => d.balance}>
      <ChartHeader>
        <div className="flex items-center justify-between">
          <ChartTitle>Balance History</ChartTitle>
          <Tabs value={period} onValueChange={setPeriod} className="w-auto">
            <TabsList className="grid grid-cols-3 h-8">
              <TabsTrigger value="daily" className="text-xs">
                Daily
              </TabsTrigger>
              <TabsTrigger value="weekly" className="text-xs">
                Weekly
              </TabsTrigger>
              <TabsTrigger value="monthly" className="text-xs">
                Monthly
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </ChartHeader>
      <ChartContainer className="mt-4">
        <ChartAxisOptions
          position="bottom"
          tickValues={5}
          tickComponent={({ formattedValue, ...props }) => (
            <ChartAxisTickOptions {...props}>
              <text {...props} className="text-xs">
                {formattedValue}
              </text>
            </ChartAxisTickOptions>
          )}
        />
        <ChartAxisOptions
          position="left"
          tickValues={5}
          tickComponent={({ formattedValue, ...props }) => (
            <ChartAxisTickOptions {...props}>
              <text {...props} className="text-xs">
                ₹{Number.parseInt(formattedValue).toLocaleString("en-IN")}
              </text>
            </ChartAxisTickOptions>
          )}
        />
        <ChartAreaSeries>
          <ChartArea className="fill-primary/20 stroke-primary" strokeWidth={2} />
          <ChartValueLabel
            className="fill-foreground font-medium"
            content={({ value }) => `₹${value.toLocaleString("en-IN")}`}
          />
        </ChartAreaSeries>
        <ChartAxis position="bottom" />
        <ChartAxis position="left" />
        <ChartTooltip>
          {({ datum }) => (
            <ChartTooltipContent className="p-2">
              <div className="flex flex-col gap-1">
                <div className="text-xs text-muted-foreground">{datum.x}</div>
                <div className="font-bold">₹{datum.y.toLocaleString("en-IN")}</div>
              </div>
            </ChartTooltipContent>
          )}
        </ChartTooltip>
      </ChartContainer>
      <ChartLegend>
        <ChartLegendContent className="mt-2">
          <ChartLegendItem className="text-xs" color="primary" name="Balance" />
        </ChartLegendContent>
      </ChartLegend>
    </Chart>
  )
}

