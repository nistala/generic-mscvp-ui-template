"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { BarChart3, TrendingUp, Activity, Users, Download, Sparkles, Filter } from "lucide-react"

interface AnalyticsScreenProps {
  searchQuery: string
}

const analyticsData = [
  { month: "Jan", transactions: 285000, partners: 45, successRate: 98.2 },
  { month: "Feb", transactions: 320000, partners: 48, successRate: 97.8 },
  { month: "Mar", transactions: 380000, partners: 52, successRate: 98.5 },
  { month: "Apr", transactions: 420000, partners: 55, successRate: 98.9 },
  { month: "May", transactions: 450000, partners: 58, successRate: 98.7 },
  { month: "Jun", transactions: 480000, partners: 62, successRate: 99.1 },
]

const quickStats = [
  {
    title: "Total Transactions",
    value: "2.3M",
    change: "+12.5%",
    trend: "up",
    icon: Activity,
    color: "#00aae7",
  },
  {
    title: "Active Partners",
    value: "62",
    change: "+8",
    trend: "up",
    icon: Users,
    color: "#10b981",
  },
  {
    title: "Success Rate",
    value: "99.1%",
    change: "+0.4%",
    trend: "up",
    icon: TrendingUp,
    color: "#8b5cf6",
  },
  {
    title: "Monthly Growth",
    value: "15.2%",
    change: "+2.1%",
    trend: "up",
    icon: BarChart3,
    color: "#f59e0b",
  },
]

export function AnalyticsScreen({ searchQuery }: AnalyticsScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#0d416b] to-[#00aae7] rounded-2xl flex items-center justify-center shadow-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0d416b] via-[#00aae7] to-[#0d416b] bg-clip-text text-transparent">
                  Analytics Overview
                </h1>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <p className="text-[#b7b2b3] font-medium">Live Analytics Dashboard</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button className="bg-gradient-to-r from-[#0d416b] to-[#00aae7] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl font-semibold px-6">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button className="bg-gradient-to-r from-[#0d416b] to-[#00aae7] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl font-semibold px-6">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {quickStats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.title}
                className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4"
                style={{ borderLeftColor: stat.color }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}cc 100%)` }}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 shadow-sm font-semibold">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change}
                  </Badge>
                </div>
                <h3 className="text-sm font-semibold text-[#b7b2b3] mb-2">{stat.title}</h3>
                <p className="text-3xl font-bold text-[#0d416b]">{stat.value}</p>
                <p className="text-xs text-[#b7b2b3] mt-1">vs last month</p>
              </div>
            )
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transaction Volume Trend */}
          <div className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#0d416b] mb-2">Transaction Volume Trend</h3>
              <p className="text-[#b7b2b3]">Monthly transaction volume over time</p>
            </div>
            <ChartContainer
              config={{
                transactions: {
                  label: "Transactions",
                  color: "#00aae7",
                },
              }}
              className="h-[350px]"
            >
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="transactions"
                  stroke="url(#transactionGradient)"
                  strokeWidth={3}
                  dot={{ fill: "#00aae7", strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, stroke: "#00aae7", strokeWidth: 2, fill: "#fff" }}
                />
                <defs>
                  <linearGradient id="transactionGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0d416b" />
                    <stop offset="50%" stopColor="#00aae7" />
                    <stop offset="100%" stopColor="#0d416b" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ChartContainer>
          </div>

          {/* Success Rate Trend */}
          <div className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#0d416b] mb-2">Success Rate Trend</h3>
              <p className="text-[#b7b2b3]">Monthly success rate percentage</p>
            </div>
            <ChartContainer
              config={{
                successRate: {
                  label: "Success Rate %",
                  color: "#10b981",
                },
              }}
              className="h-[350px]"
            >
              <BarChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} domain={[95, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="successRate" fill="url(#successGradient)" radius={8} />
                <defs>
                  <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ChartContainer>
          </div>
        </div>

        {/* Analytics Insights */}
        <div className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-[#0d416b] to-[#00aae7] rounded-xl flex items-center justify-center shadow-lg mr-4">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0d416b]">Key Insights</h3>
              <p className="text-[#b7b2b3]">AI-powered insights from your data</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm rounded-xl p-6 border border-blue-100/50 hover:shadow-lg transition-all duration-300">
              <h4 className="font-semibold text-[#0d416b] mb-2">Peak Performance</h4>
              <p className="text-[#b7b2b3] text-sm">
                Your system achieved 99.1% success rate in June, the highest this year.
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-sm rounded-xl p-6 border border-green-100/50 hover:shadow-lg transition-all duration-300">
              <h4 className="font-semibold text-[#0d416b] mb-2">Growth Trend</h4>
              <p className="text-[#b7b2b3] text-sm">
                Transaction volume increased by 68% compared to January, showing strong growth.
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-50/80 to-violet-50/80 backdrop-blur-sm rounded-xl p-6 border border-purple-100/50 hover:shadow-lg transition-all duration-300">
              <h4 className="font-semibold text-[#0d416b] mb-2">Partner Expansion</h4>
              <p className="text-[#b7b2b3] text-sm">
                Added 17 new trading partners this year, expanding your network by 38%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
