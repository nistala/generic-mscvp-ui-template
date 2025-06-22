"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, Clock, CheckCircle, XCircle } from "lucide-react"

const metrics = [
  {
    title: "Total Transactions (24hr)",
    value: "12,847",
    change: "+8.2%",
    trend: "up",
    icon: Activity,
    color: "#00aae7",
  },
  {
    title: "Success Rate",
    value: "98.7%",
    change: "+0.3%",
    trend: "up",
    icon: CheckCircle,
    color: "#10b981",
  },
  {
    title: "Failed Transactions",
    value: "167",
    change: "-12.5%",
    trend: "down",
    icon: XCircle,
    color: "#ef4444",
  },
  {
    title: "Average Response Time",
    value: "1.2s",
    change: "-0.1s",
    trend: "down",
    icon: Clock,
    color: "#f59e0b",
  },
]

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon
        const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown

        return (
          <Card
            key={metric.title}
            className="border-l-4 hover:shadow-lg transition-shadow duration-200"
            style={{ borderLeftColor: metric.color }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#0d416b]">{metric.title}</CardTitle>
              <Icon className="h-5 w-5" style={{ color: metric.color }} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0d416b] mb-2">{metric.value}</div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={metric.trend === "up" ? "default" : "secondary"}
                  className={`${
                    metric.trend === "up"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-red-100 text-red-800 hover:bg-red-100"
                  }`}
                >
                  <TrendIcon className="h-3 w-3 mr-1" />
                  {metric.change}
                </Badge>
                <span className="text-xs text-[#b7b2b3]">vs last 24h</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
