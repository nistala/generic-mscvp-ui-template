"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Area, AreaChart, ResponsiveContainer } from "recharts"
import {
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  Target,
  Award,
  Filter,
  FileText,
  BarChart3,
  Eye,
  AlertTriangle,
  Clock,
  X,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const partnerVolumes = [
  {
    id: 1,
    partner: "Walmart Inc.",
    logo: "🏪",
    daily: 12500,
    weekly: 87500,
    monthly: 375000,
    successRate: 99.2,
    failureRate: 0.8,
    pendingRate: 0.0,
    trend: "up",
    change: "+5.2%",
    status: "excellent",
    avgResponseTime: 1.2,
    lastTransaction: "2 mins ago",
    connectionStatus: "active",
    alerts: 0,
    peakHour: "14:00",
    documents: ["850", "810", "997"],
  },
  {
    id: 2,
    partner: "Target Corp.",
    logo: "🎯",
    daily: 8900,
    weekly: 62300,
    monthly: 267000,
    successRate: 98.7,
    failureRate: 1.1,
    pendingRate: 0.2,
    trend: "up",
    change: "+3.1%",
    status: "good",
    avgResponseTime: 1.8,
    lastTransaction: "5 mins ago",
    connectionStatus: "active",
    alerts: 1,
    peakHour: "15:30",
    documents: ["850", "810", "997", "856"],
  },
  {
    id: 3,
    partner: "Amazon LLC",
    logo: "📦",
    daily: 15600,
    weekly: 109200,
    monthly: 468000,
    successRate: 97.9,
    failureRate: 1.8,
    pendingRate: 0.3,
    trend: "down",
    change: "-1.2%",
    status: "warning",
    avgResponseTime: 2.1,
    lastTransaction: "1 min ago",
    connectionStatus: "active",
    alerts: 3,
    peakHour: "16:00",
    documents: ["850", "810", "997", "856", "860"],
  },
  {
    id: 4,
    partner: "Home Depot",
    logo: "🏠",
    daily: 6700,
    weekly: 46900,
    monthly: 201000,
    successRate: 99.5,
    failureRate: 0.4,
    pendingRate: 0.1,
    trend: "up",
    change: "+8.7%",
    status: "excellent",
    avgResponseTime: 0.9,
    lastTransaction: "3 mins ago",
    connectionStatus: "active",
    alerts: 0,
    peakHour: "13:45",
    documents: ["850", "810", "997"],
  },
  {
    id: 5,
    partner: "Costco",
    logo: "🛒",
    daily: 4200,
    weekly: 29400,
    monthly: 126000,
    successRate: 98.3,
    failureRate: 1.5,
    pendingRate: 0.2,
    trend: "up",
    change: "+2.4%",
    status: "good",
    avgResponseTime: 1.6,
    lastTransaction: "7 mins ago",
    connectionStatus: "active",
    alerts: 1,
    peakHour: "14:30",
    documents: ["850", "810", "997", "856"],
  },
  {
    id: 6,
    partner: "Best Buy",
    logo: "💻",
    daily: 3800,
    weekly: 26600,
    monthly: 114000,
    successRate: 96.8,
    failureRate: 2.9,
    pendingRate: 0.3,
    trend: "down",
    change: "-3.5%",
    status: "critical",
    avgResponseTime: 3.2,
    lastTransaction: "12 mins ago",
    connectionStatus: "unstable",
    alerts: 5,
    peakHour: "17:15",
    documents: ["850", "810", "997", "856", "860", "865"],
  },
]

const volumeChartData = partnerVolumes.map((partner) => ({
  partner: partner.partner.split(" ")[0],
  daily: partner.daily,
  weekly: partner.weekly / 7,
  monthly: partner.monthly / 30,
  success: partner.successRate,
  failure: partner.failureRate,
}))

const trendChartData = [
  { day: "Mon", volume: 45000, success: 98.2 },
  { day: "Tue", volume: 52000, success: 97.8 },
  { day: "Wed", volume: 48000, success: 98.5 },
  { day: "Thu", volume: 61000, success: 97.9 },
  { day: "Fri", volume: 58000, success: 98.1 },
  { day: "Sat", volume: 35000, success: 98.7 },
  { day: "Sun", volume: 28000, success: 99.1 },
]

export function TPVolumesScreen() {
  const [selectedPartner, setSelectedPartner] = useState<(typeof partnerVolumes)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const totalDaily = partnerVolumes.reduce((sum, partner) => sum + partner.daily, 0)
  const totalWeekly = partnerVolumes.reduce((sum, partner) => sum + partner.weekly, 0)
  const totalMonthly = partnerVolumes.reduce((sum, partner) => sum + partner.monthly, 0)
  const avgSuccessRate = partnerVolumes.reduce((sum, partner) => sum + partner.successRate, 0) / partnerVolumes.length
  const activePartners = partnerVolumes.filter((p) => p.connectionStatus === "active").length
  const totalAlerts = partnerVolumes.reduce((sum, partner) => sum + partner.alerts, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-gradient-to-r from-green-500 to-emerald-500"
      case "good":
        return "bg-gradient-to-r from-blue-500 to-cyan-500"
      case "warning":
        return "bg-gradient-to-r from-yellow-500 to-orange-500"
      case "critical":
        return "bg-gradient-to-r from-red-500 to-pink-500"
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "good":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "warning":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "critical":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const handleViewDetails = (partner: (typeof partnerVolumes)[0]) => {
    setSelectedPartner(partner)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0d416b] via-[#00aae7] to-[#0d416b] bg-clip-text text-transparent">
              Trading Partner Volumes
            </h1>
            <p className="text-[#b7b2b3] mt-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Real-time partner transaction monitoring
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-[#b7b2b3] text-[#0d416b] hover:bg-white/80 backdrop-blur-sm">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
            <Button className="bg-gradient-to-r from-[#00aae7] to-[#0d416b] hover:from-[#0d416b] hover:to-[#00aae7] text-white shadow-lg">
              <Download className="h-4 w-4 mr-2" />
              Export All Data
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-l-[#00aae7] hover:scale-105">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-[#0d416b]">Total Daily Volume</CardTitle>
                <Activity className="h-5 w-5 text-[#00aae7]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-[#0d416b] to-[#00aae7] bg-clip-text text-transparent">
                {totalDaily.toLocaleString()}
              </div>
              <p className="text-xs text-[#b7b2b3] mt-1">Across all partners</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-l-green-500 hover:scale-105">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-[#0d416b]">Active Partners</CardTitle>
                <Users className="h-5 w-5 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {activePartners}
              </div>
              <p className="text-xs text-[#b7b2b3] mt-1">Connected partners</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-l-purple-500 hover:scale-105">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-[#0d416b]">Monthly Volume</CardTitle>
                <Target className="h-5 w-5 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {(totalMonthly / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-[#b7b2b3] mt-1">Last 30 days</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-l-yellow-500 hover:scale-105">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-[#0d416b]">Avg Success Rate</CardTitle>
                <Award className="h-5 w-5 text-yellow-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                {avgSuccessRate.toFixed(1)}%
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mt-1">Excellent</Badge>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-l-red-500 hover:scale-105">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-[#0d416b]">Active Alerts</CardTitle>
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {totalAlerts}
              </div>
              <p className="text-xs text-[#b7b2b3] mt-1">Require attention</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-l-cyan-500 hover:scale-105">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-[#0d416b]">Weekly Trend</CardTitle>
                <TrendingUp className="h-5 w-5 text-cyan-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                +4.2%
              </div>
              <p className="text-xs text-[#b7b2b3] mt-1">vs last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Volume Comparison Chart */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-[#0d416b] to-[#00aae7] bg-clip-text text-transparent">
                    Partner Volume Comparison
                  </CardTitle>
                  <CardDescription className="text-[#b7b2b3]">
                    Daily transaction volumes by trading partner
                  </CardDescription>
                </div>
                <Button variant="outline" className="border-[#b7b2b3] text-[#0d416b] hover:bg-white/80">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Chart
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  daily: {
                    label: "Daily Volume",
                    color: "#0d416b",
                  },
                }}
                className="h-[300px]"
              >
                <BarChart data={volumeChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#b7b2b3" opacity={0.3} />
                  <XAxis dataKey="partner" stroke="#b7b2b3" />
                  <YAxis stroke="#b7b2b3" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="daily" fill="url(#gradient)" radius={6} />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00aae7" />
                      <stop offset="100%" stopColor="#0d416b" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Weekly Trend Chart */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-[#0d416b] to-[#00aae7] bg-clip-text text-transparent">
                    Weekly Volume Trend
                  </CardTitle>
                  <CardDescription className="text-[#b7b2b3]">
                    7-day transaction volume and success rate
                  </CardDescription>
                </div>
                <Button variant="outline" className="border-[#b7b2b3] text-[#0d416b] hover:bg-white/80">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analyze
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  volume: {
                    label: "Volume",
                    color: "#00aae7",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#b7b2b3" opacity={0.3} />
                    <XAxis dataKey="day" stroke="#b7b2b3" />
                    <YAxis stroke="#b7b2b3" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="volume" stroke="#00aae7" fill="url(#areaGradient)" strokeWidth={3} />
                    <defs>
                      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00aae7" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#0d416b" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Partner Details Table */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#0d416b] to-[#00aae7] bg-clip-text text-transparent">
                  Trading Partner Details
                </CardTitle>
                <CardDescription className="text-[#b7b2b3]">
                  Comprehensive volume statistics and performance metrics per partner
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-[#b7b2b3] text-[#0d416b] hover:bg-white/80">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button className="bg-gradient-to-r from-[#00aae7] to-[#0d416b] hover:from-[#0d416b] hover:to-[#00aae7] text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-slate-50 to-blue-50 hover:from-slate-100 hover:to-blue-100">
                    <TableHead className="font-semibold text-[#0d416b]">Trading Partner</TableHead>
                    <TableHead className="font-semibold text-[#0d416b]">Daily Volume</TableHead>
                    <TableHead className="font-semibold text-[#0d416b]">Weekly Volume</TableHead>
                    <TableHead className="font-semibold text-[#0d416b]">Monthly Volume</TableHead>
                    <TableHead className="font-semibold text-[#0d416b]">Success Rate</TableHead>
                    <TableHead className="font-semibold text-[#0d416b]">Status</TableHead>
                    <TableHead className="font-semibold text-[#0d416b]">Trend</TableHead>
                    <TableHead className="font-semibold text-[#0d416b]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partnerVolumes.map((partner) => {
                    const TrendIcon = partner.trend === "up" ? TrendingUp : TrendingDown
                    return (
                      <TableRow
                        key={partner.id}
                        className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200"
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{partner.logo}</div>
                            <div>
                              <div className="font-semibold text-[#0d416b]">{partner.partner}</div>
                              <div className="text-xs text-[#b7b2b3] flex items-center gap-1">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    partner.connectionStatus === "active" ? "bg-green-500" : "bg-yellow-500"
                                  }`}
                                ></div>
                                {partner.connectionStatus}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-bold text-[#0d416b]">{partner.daily.toLocaleString()}</div>
                          <div className="text-xs text-[#b7b2b3]">Peak: {partner.peakHour}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-[#0d416b]">{partner.weekly.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-[#0d416b]">{partner.monthly.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              {partner.successRate}%
                            </Badge>
                            <div className="text-xs text-[#b7b2b3]">Avg: {partner.avgResponseTime}s</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(partner.status)}>{partner.status}</Badge>
                          {partner.alerts > 0 && (
                            <div className="text-xs text-red-600 mt-1 flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              {partner.alerts} alerts
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={partner.trend === "up" ? "default" : "secondary"}
                            className={
                              partner.trend === "up"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100"
                            }
                          >
                            <TrendIcon className="h-3 w-3 mr-1" />
                            {partner.change}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(partner)}
                            className="border-[#00aae7] text-[#00aae7] hover:bg-[#00aae7] hover:text-white transition-all duration-200"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Partner Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#0d416b] to-[#00aae7] bg-clip-text text-transparent flex items-center gap-3">
                {selectedPartner && (
                  <>
                    <span className="text-3xl">{selectedPartner.logo}</span>
                    {selectedPartner.partner} - Detailed Analytics
                  </>
                )}
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsModalOpen(false)}
                className="text-[#b7b2b3] hover:text-[#0d416b]"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {selectedPartner && (
            <div className="space-y-6 mt-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#b7b2b3]">Connection Status</p>
                        <p className="text-lg font-bold text-[#0d416b] capitalize">
                          {selectedPartner.connectionStatus}
                        </p>
                      </div>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          selectedPartner.connectionStatus === "active" ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      ></div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#b7b2b3]">Last Transaction</p>
                        <p className="text-lg font-bold text-[#0d416b]">{selectedPartner.lastTransaction}</p>
                      </div>
                      <Clock className="h-5 w-5 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#b7b2b3]">Peak Hour</p>
                        <p className="text-lg font-bold text-[#0d416b]">{selectedPartner.peakHour}</p>
                      </div>
                      <Activity className="h-5 w-5 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#b7b2b3]">Active Alerts</p>
                        <p className="text-lg font-bold text-[#0d416b]">{selectedPartner.alerts}</p>
                      </div>
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Metrics */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-[#0d416b] to-[#00aae7] bg-clip-text text-transparent">
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[#0d416b]">Success Rate</span>
                        <span className="text-sm font-bold text-green-600">{selectedPartner.successRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${selectedPartner.successRate}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[#0d416b]">Failure Rate</span>
                        <span className="text-sm font-bold text-red-600">{selectedPartner.failureRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${selectedPartner.failureRate}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[#0d416b]">Pending Rate</span>
                        <span className="text-sm font-bold text-yellow-600">{selectedPartner.pendingRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${selectedPartner.pendingRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Document Types */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-[#0d416b] to-[#00aae7] bg-clip-text text-transparent">
                    Supported Document Types
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedPartner.documents.map((doc, index) => (
                      <Badge
                        key={index}
                        className="bg-gradient-to-r from-blue-100 to-indigo-100 text-[#0d416b] hover:from-blue-200 hover:to-indigo-200 px-3 py-1"
                      >
                        EDI {doc}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <Button variant="outline" className="border-[#b7b2b3] text-[#0d416b]">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button className="bg-gradient-to-r from-[#00aae7] to-[#0d416b] hover:from-[#0d416b] hover:to-[#00aae7] text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Export Partner Data
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
