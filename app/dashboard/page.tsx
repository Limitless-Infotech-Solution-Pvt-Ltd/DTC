"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart,
  LineChart,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Bell,
  Settings,
  Plus,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react"
import DashboardChart from "@/components/dashboard/dashboard-chart"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar activeItem="dashboard" />

      <div className="flex-1 overflow-auto">
        <div className="border-b">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2 font-semibold">Dashboard</div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Welcome back, John!</h1>
                <p className="text-muted-foreground">Here's what's happening with your marketing campaigns today.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Campaign
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {metrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                    <div className={`p-2 rounded-full bg-${metric.color}/10`}>{metric.icon}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {metric.trend.direction === "up" ? "+" : "-"}
                      {metric.trend.value} from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                </div>
              </div>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="lg:col-span-4">
                    <CardHeader>
                      <CardTitle>Performance Overview</CardTitle>
                      <CardDescription>Website traffic and conversion metrics for the past 30 days</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <div className="h-[300px]">
                        <DashboardChart />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Top Campaigns</CardTitle>
                      <CardDescription>Your best performing marketing campaigns</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {campaigns.map((campaign, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`p-2 rounded-full bg-${campaign.color}/10`}>{campaign.icon}</div>
                              <div>
                                <p className="text-sm font-medium">{campaign.name}</p>
                                <p className="text-xs text-muted-foreground">{campaign.status}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={campaign.status === "Active" ? "default" : "outline"}>
                                {campaign.performance}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View All Campaigns
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activities</CardTitle>
                      <CardDescription>Your recent marketing activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {activities.map((activity, index) => (
                          <div key={index} className="flex items-start gap-4">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={activity.userAvatar} alt={activity.user} />
                              <AvatarFallback>{activity.userInitials}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <p className="text-sm">
                                <span className="font-medium">{activity.user}</span> {activity.action}
                              </p>
                              <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View All Activities
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Tasks</CardTitle>
                      <CardDescription>Tasks that need your attention</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {tasks.map((task, index) => (
                          <div key={index} className="flex items-start gap-4">
                            <div
                              className={`p-2 rounded-full bg-${task.priority === "High" ? "destructive" : task.priority === "Medium" ? "warning" : "primary"}/10`}
                            >
                              <Calendar
                                className={`h-4 w-4 text-${task.priority === "High" ? "destructive" : task.priority === "Medium" ? "warning" : "primary"}`}
                              />
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">{task.title}</p>
                              <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View All Tasks
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Links</CardTitle>
                      <CardDescription>Frequently used tools and resources</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {quickLinks.map((link, index) => (
                          <Button key={index} variant="outline" className="justify-start" asChild>
                            <Link href={link.href}>
                              {link.icon}
                              <span className="ml-2">{link.label}</span>
                            </Link>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                    <CardDescription>Detailed analytics for your marketing campaigns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Analytics content will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="campaigns" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Campaigns</CardTitle>
                    <CardDescription>Manage your marketing campaigns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Campaigns content will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Reports</CardTitle>
                    <CardDescription>Generate and view marketing reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Reports content will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

const metrics = [
  {
    title: "Total Visitors",
    value: "45,231",
    icon: <Users className="h-4 w-4 text-primary" />,
    color: "primary",
    trend: { direction: "up", value: "12%" },
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    icon: <TrendingUp className="h-4 w-4 text-primary" />,
    color: "primary",
    trend: { direction: "up", value: "0.5%" },
  },
  {
    title: "Average Order",
    value: "$45.65",
    icon: <DollarSign className="h-4 w-4 text-primary" />,
    color: "primary",
    trend: { direction: "up", value: "7%" },
  },
  {
    title: "Total Revenue",
    value: "$12,426",
    icon: <BarChart className="h-4 w-4 text-primary" />,
    color: "primary",
    trend: { direction: "up", value: "10%" },
  },
]

const campaigns = [
  {
    name: "Summer Sale",
    status: "Active",
    performance: "+24%",
    icon: <TrendingUp className="h-4 w-4 text-primary" />,
    color: "primary",
  },
  {
    name: "Product Launch",
    status: "Active",
    performance: "+18%",
    icon: <TrendingUp className="h-4 w-4 text-primary" />,
    color: "primary",
  },
  {
    name: "Holiday Special",
    status: "Scheduled",
    performance: "Pending",
    icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
    color: "muted-foreground",
  },
  {
    name: "Email Newsletter",
    status: "Active",
    performance: "+12%",
    icon: <TrendingUp className="h-4 w-4 text-primary" />,
    color: "primary",
  },
]

const activities = [
  {
    user: "John Doe",
    userInitials: "JD",
    userAvatar: "/placeholder.svg?height=36&width=36",
    action: "created a new campaign",
    time: "2 hours ago",
  },
  {
    user: "Sarah Johnson",
    userInitials: "SJ",
    userAvatar: "/placeholder.svg?height=36&width=36",
    action: "updated the SEO strategy",
    time: "5 hours ago",
  },
  {
    user: "Michael Chen",
    userInitials: "MC",
    userAvatar: "/placeholder.svg?height=36&width=36",
    action: "added new analytics dashboard",
    time: "Yesterday at 2:30 PM",
  },
]

const tasks = [
  {
    title: "Review campaign performance",
    dueDate: "Today",
    priority: "High",
  },
  {
    title: "Prepare monthly report",
    dueDate: "Tomorrow",
    priority: "Medium",
  },
  {
    title: "Update social media calendar",
    dueDate: "In 3 days",
    priority: "Low",
  },
]

const quickLinks = [
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart className="h-4 w-4" />,
  },
  {
    label: "Campaigns",
    href: "/dashboard/campaigns",
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    label: "Reports",
    href: "/dashboard/reports",
    icon: <LineChart className="h-4 w-4" />,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-4 w-4" />,
  },
]

