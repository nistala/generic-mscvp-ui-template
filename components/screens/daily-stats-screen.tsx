"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Eye,
  Calendar,
  Filter,
  Users,
  Server,
  BarChart3,
  AlertCircle,
  CheckCircle,
  XCircle,
  Download,
  FileText,
  X,
} from "lucide-react"

const hourlyStats = [
  { hour: "00:00", volume: 1200, success: 1180, failure: 20, avgResponse: 1.2, status: "normal", trend: "stable" },
  { hour: "01:00", volume: 980, success: 965, failure: 15, avgResponse: 1.1, status: "normal", trend: "down" },
  { hour: "02:00", volume: 850, success: 840, failure: 10, avgResponse: 1.0, status: "normal", trend: "down" },
  { hour: "03:00", volume: 720, success: 715, failure: 5, avgResponse: 0.9, status: "normal", trend: "down" },
  { hour: "04:00", volume: 650, success: 645, failure: 5, avgResponse: 0.8, status: "normal", trend: "down" },
  { hour: "05:00", volume: 800, success: 790, failure: 10, avgResponse: 1.0, status: "normal", trend: "up" },
  { hour: "06:00", volume: 1500, success: 1470, failure: 30, avgResponse: 1.3, status: "normal", trend: "up" },
  { hour: "07:00", volume: 2200, success: 2150, failure: 50, avgResponse: 1.5, status: "normal", trend: "up" },
  { hour: "08:00", volume: 3500, success: 3420, failure: 80, avgResponse: 1.8, status: "spike", trend: "up" },
  { hour: "09:00", volume: 4200, success: 4100, failure: 100, avgResponse: 2.1, status: "spike", trend: "up" },
  { hour: "10:00", volume: 4800, success: 4680, failure: 120, avgResponse: 2.3, status: "spike", trend: "up" },
  { hour: "11:00", volume: 5200, success: 5070, failure: 130, avgResponse: 2.5, status: "spike", trend: "up" },
  { hour: "12:00", volume: 5500, success: 5350, failure: 150, avgResponse: 2.7, status: "spike", trend: "up" },
  { hour: "13:00", volume: 5800, success: 5640, failure: 160, avgResponse: 2.8, status: "spike", trend: "up" },
  { hour: "14:00", volume: 6000, success: 5820, failure: 180, avgResponse: 3.0, status: "critical", trend: "up" },
  { hour: "15:00", volume: 5700, success: 5530, failure: 170, avgResponse: 2.9, status: "spike", trend: "down" },
  { hour: "16:00", volume: 5200, success: 5070, failure: 130, avgResponse: 2.6, status: "spike", trend: "down" },
  { hour: "17:00", volume: 4500, success: 4400, failure: 100, avgResponse: 2.2, status: "normal", trend: "down" },
  { hour: "18:00", volume: 3800, success: 3720, failure: 80, avgResponse: 1.9, status: "normal", trend: "down" },
  { hour: "19:00", volume: 3200, success: 3140, failure: 60, avgResponse: 1.7, status: "normal", trend: "down" },
  { hour: "20:00", volume: 2800, success: 2750, failure: 50, avgResponse: 1.5, status: "normal", trend: "down" },
  { hour: "21:00", volume: 2200, success: 2170, failure: 30, avgResponse: 1.3, status: "normal", trend: "down" },
  { hour: "22:00", volume: 1800, success: 1780, failure: 20, avgResponse: 1.2, status: "normal", trend: "down" },
  { hour: "23:00", volume: 1400, success: 1385, failure: 15, avgResponse: 1.1, status: "normal", trend: "stable" },
]

const alerts = [
  {
    id: 1,
    type: "volume_spike",
    title: "Critical Volume Spike Detected",
    message: "Transaction volume exceeded 6,000 at 14:00 - 150% above normal baseline",
    time: "2 hours ago",
    severity: "critical",
    impact: "High",
    affected: "All Partners",
    icon: TrendingUp,
    details: {
      baseline: 4000,
      actual: 6000,
      threshold: 5000,
      duration: "45 minutes",
      affectedPartners: ["Partner ABC", "Partner XYZ", "Retail Corp", "Global Systems"],
      rootCause: "Black Friday promotional campaign launch",
      systemResponse: "Auto-scaling triggered, additional servers deployed",
      recommendations: [
        "Increase baseline thresholds for promotional periods",
        "Pre-scale infrastructure for known events",
      ],
      timeline: [
        { time: "13:45", event: "Volume started increasing", status: "info" },
        { time: "14:00", event: "Threshold exceeded - Alert triggered", status: "warning" },
        { time: "14:15", event: "Critical level reached", status: "error" },
        { time: "14:30", event: "Auto-scaling initiated", status: "info" },
        { time: "14:45", event: "System stabilized", status: "success" },
      ],
    },
  },
  {
    id: 2,
    type: "response_time",
    title: "Response Time Threshold Exceeded",
    message: "Average response time reached 3.0s during peak hours (14:00-15:00)",
    time: "1 hour ago",
    severity: "high",
    impact: "Medium",
    affected: "Partner ABC, XYZ Corp",
    icon: Clock,
    details: {
      baseline: 1.5,
      actual: 3.0,
      threshold: 2.5,
      duration: "60 minutes",
      affectedPartners: ["Partner ABC", "XYZ Corp"],
      rootCause: "Database connection pool exhaustion during peak load",
      systemResponse: "Connection pool size increased, query optimization applied",
      recommendations: ["Implement connection pooling optimization", "Add database read replicas"],
      timeline: [
        { time: "14:00", event: "Response time degradation detected", status: "warning" },
        { time: "14:20", event: "Threshold exceeded", status: "error" },
        { time: "14:45", event: "Database optimization applied", status: "info" },
        { time: "15:00", event: "Response time normalized", status: "success" },
      ],
    },
  },
  {
    id: 3,
    type: "failure_rate",
    title: "Elevated Failure Rate",
    message: "Failure rate increased to 3% during peak window - 50% above normal",
    time: "1 hour ago",
    severity: "medium",
    impact: "Medium",
    affected: "Retail Partners",
    icon: AlertTriangle,
    details: {
      baseline: 2.0,
      actual: 3.0,
      threshold: 2.5,
      duration: "30 minutes",
      affectedPartners: ["Retail Corp", "Shopping Mall Systems"],
      rootCause: "Temporary network connectivity issues with retail partner endpoints",
      systemResponse: "Automatic retry mechanism activated, backup routes enabled",
      recommendations: ["Implement circuit breaker pattern", "Add redundant network paths"],
      timeline: [
        { time: "14:30", event: "Failure rate spike detected", status: "warning" },
        { time: "14:35", event: "Network issues identified", status: "error" },
        { time: "14:50", event: "Backup routes activated", status: "info" },
        { time: "15:00", event: "Failure rate normalized", status: "success" },
      ],
    },
  },
  {
    id: 4,
    type: "volume_drop",
    title: "Unusual Volume Drop",
    message: "Transaction volume dropped 40% below expected levels at 03:00-04:00",
    time: "8 hours ago",
    severity: "low",
    impact: "Low",
    affected: "Partner DEF",
    icon: TrendingDown,
    details: {
      baseline: 1000,
      actual: 600,
      threshold: 800,
      duration: "60 minutes",
      affectedPartners: ["Partner DEF"],
      rootCause: "Scheduled maintenance window at partner's data center",
      systemResponse: "Maintenance mode activated, traffic rerouted",
      recommendations: ["Improve maintenance communication", "Implement graceful degradation"],
      timeline: [
        { time: "03:00", event: "Volume drop detected", status: "warning" },
        { time: "03:05", event: "Partner maintenance confirmed", status: "info" },
        { time: "03:10", event: "Traffic rerouting initiated", status: "info" },
        { time: "04:00", event: "Normal operations resumed", status: "success" },
      ],
    },
  },
]

export function DailyStatsScreen() {
  const [selectedAlert, setSelectedAlert] = useState<(typeof alerts)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)

  const totalVolume = hourlyStats.reduce((sum, stat) => sum + stat.volume, 0)
  const totalSuccess = hourlyStats.reduce((sum, stat) => sum + stat.success, 0)
  const totalFailure = hourlyStats.reduce((sum, stat) => sum + stat.failure, 0)
  const avgResponseTime = (hourlyStats.reduce((sum, stat) => sum + stat.avgResponse, 0) / hourlyStats.length).toFixed(1)
  const peakHour = hourlyStats.reduce((max, stat) => (stat.volume > max.volume ? stat : max), hourlyStats[0])
  const criticalHours = hourlyStats.filter((stat) => stat.status === "critical").length

  const getVolumeIntensity = (volume: number) => {
    const maxVolume = Math.max(...hourlyStats.map((s) => s.volume))
    const intensity = (volume / maxVolume) * 100
    if (intensity >= 80) return "bg-red-500"
    if (intensity >= 60) return "bg-orange-500"
    if (intensity >= 40) return "bg-yellow-500"
    if (intensity >= 20) return "bg-blue-500"
    return "bg-green-500"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-500"
      case "spike":
        return "bg-orange-500"
      default:
        return "bg-green-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">Critical</Badge>
      case "spike":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200">Spike</Badge>
      default:
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Normal</Badge>
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-600" />
      case "down":
        return <TrendingDown className="h-3 w-3 text-red-600" />
      default:
        return <Activity className="h-3 w-3 text-gray-600" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-red-500 bg-red-50"
      case "high":
        return "border-orange-500 bg-orange-50"
      case "medium":
        return "border-yellow-500 bg-yellow-50"
      default:
        return "border-blue-500 bg-blue-50"
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>
      default:
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Low</Badge>
    }
  }

  const getTimelineIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      default:
        return <Activity className="h-4 w-4 text-blue-600" />
    }
  }

  const getTimelineColor = (status: string) => {
    switch (status) {
      case "success":
        return "border-green-200 bg-green-50"
      case "error":
        return "border-red-200 bg-red-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      default:
        return "border-blue-200 bg-blue-50"
    }
  }

  const handleViewDetails = (alert: (typeof alerts)[0]) => {
    setSelectedAlert(alert)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#0d416b] via-[#00aae7] to-[#0d416b] bg-clip-text text-transparent">
              Daily Transaction Statistics
            </h1>
            <div className="text-[#b7b2b3] mt-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Comprehensive hourly breakdown and anomaly detection</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Select defaultValue="today">
              <SelectTrigger className="w-40 bg-white/70 backdrop-blur-sm border-white/20 hover:bg-white/80">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
              </SelectContent>
            </Select>
            {/* Advanced Filters Button and Dialog */}
            <Button
              variant="outline"
              className="border-[#b7b2b3] text-[#0d416b] hover:bg-white/80 backdrop-blur-sm"
              onClick={() => setIsFilterDialogOpen(true)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
            <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
              <DialogContent className="max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold bg-gradient-to-r from-[#0d416b] to-[#00aae7] bg-clip-text text-transparent flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Advanced Filters
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                <label className="block text-[#0d416b] font-medium mb-1">Status</label>
                <Select>
                  <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="spike">Spike</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
                </div>
                <div>
                <label className="block text-[#0d416b] font-medium mb-1">Trend</label>
                <Select>
                  <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Trends" />
                  </SelectTrigger>
                  <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="up">Up</SelectItem>
                  <SelectItem value="down">Down</SelectItem>
                  <SelectItem value="stable">Stable</SelectItem>
                  </SelectContent>
                </Select>
                </div>
                <div>
                <label className="block text-[#0d416b] font-medium mb-1">Severity</label>
                <Select>
                  <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Severities" />
                  </SelectTrigger>
                  <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsFilterDialogOpen(false)}>
                Cancel
                </Button>
                <Button
                className="bg-gradient-to-r from-[#00aae7] to-[#0d416b] text-white"
                onClick={() => setIsFilterDialogOpen(false)}
                >
                Apply Filters
                </Button>
              </div>
              </DialogContent>
            </Dialog>
            <Button className="bg-gradient-to-r from-[#00aae7] to-[#0d416b] hover:from-[#0d416b] hover:to-[#00aae7] text-white shadow-lg">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-l-[#00aae7] hover:scale-105 h-24 min-h-0">
            <CardHeader className="pb-1 pt-2 px-4">
              <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-medium text-[#2368a0]">Total Volume</CardTitle>
          <Activity className="h-4 w-4 text-[#00aae7]" />
              </div>
            </CardHeader>
            <CardContent className="px-4 pt-0 pb-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-[#00aae7] to-[#2368a0] bg-clip-text text-transparent leading-tight">
          {totalVolume.toLocaleString()}
              </div>
              <p className="text-[10px] text-[#8c8c8c] mt-0.5">Today's transactions</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-l-[#8c8c8c] hover:scale-105 h-24 min-h-0">
            <CardHeader className="pb-1 pt-2 px-4">
              <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-medium text-[#8c8c8c]">Success Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-[#8c8c8c]" />
              </div>
            </CardHeader>
            <CardContent className="px-4 pt-0 pb-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-[#00aae7] to-[#2368a0] bg-clip-text text-transparent leading-tight">
          {((totalSuccess / totalVolume) * 100).toFixed(1)}%
              </div>
              <p className="text-[10px] text-[#8c8c8c] mt-0.5">{totalSuccess.toLocaleString()} successful</p>
            </CardContent>
          </Card>

          {/* Failures card keeps original color */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-l-red-500 hover:scale-105 h-24 min-h-0">
            <CardHeader className="pb-1 pt-2 px-4">
              <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-medium text-[#0d416b]">Failures</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-500" />
              </div>
            </CardHeader>
            <CardContent className="px-4 pt-0 pb-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent leading-tight">
          {totalFailure.toLocaleString()}
              </div>
              <p className="text-[10px] text-[#b7b2b3] mt-0.5">
          {((totalFailure / totalVolume) * 100).toFixed(1)}% failure rate
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-l-[#00aae7] hover:scale-105 h-24 min-h-0">
            <CardHeader className="pb-1 pt-2 px-4">
              <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-medium text-[#2368a0]">Avg Response</CardTitle>
          <Clock className="h-4 w-4 text-[#00aae7]" />
              </div>
            </CardHeader>
            <CardContent className="px-4 pt-0 pb-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-[#00aae7] to-[#2368a0] bg-clip-text text-transparent leading-tight">
          {avgResponseTime}s
              </div>
              <p className="text-[10px] text-[#8c8c8c] mt-0.5">Average response time</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-l-[#8c8c8c] hover:scale-105 h-24 min-h-0">
            <CardHeader className="pb-1 pt-2 px-4">
              <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-medium text-[#8c8c8c]">Peak Hour</CardTitle>
          <Zap className="h-4 w-4 text-[#8c8c8c]" />
              </div>
            </CardHeader>
            <CardContent className="px-4 pt-0 pb-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-[#00aae7] to-[#2368a0] bg-clip-text text-transparent leading-tight">
          {peakHour.hour}
              </div>
              <p className="text-[10px] text-[#8c8c8c] mt-0.5">{peakHour.volume.toLocaleString()} transactions</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-l-[#00aae7] hover:scale-105 h-24 min-h-0">
            <CardHeader className="pb-1 pt-2 px-4">
              <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-medium text-[#2368a0]">Critical Hours</CardTitle>
          <AlertCircle className="h-4 w-4 text-[#00aae7]" />
              </div>
            </CardHeader>
            <CardContent className="px-4 pt-0 pb-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-[#00aae7] to-[#2368a0] bg-clip-text text-transparent leading-tight">
          {criticalHours}
              </div>
              <p className="text-[10px] text-[#8c8c8c] mt-0.5">Hours above threshold</p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Alerts Section */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 ">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-[#0d416b] to-[#00aae7] bg-clip-text text-transparent flex items-center">
                  <AlertTriangle className="h-6 w-6 mr-3 text-red-500" />
                  Volume & Performance Alerts
                  <Badge className="ml-3 bg-red-100 text-red-800">{alerts.length} Active</Badge>
                </CardTitle>
                <CardDescription className="text-[#b7b2b3]">
                  Real-time anomaly detection and performance monitoring
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-[#b7b2b3] text-[#0d416b] hover:bg-white/80">
                  <FileText className="h-4 w-4 mr-2" />
                  Alert Report
                </Button>
                <Button className="bg-gradient-to-r from-[#00aae7] to-[#0d416b] hover:from-[#0d416b] hover:to-[#00aae7] text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Export Alerts
                </Button>
              </div>
            </div>
          </CardHeader>
            <CardContent className="px-4 pt-0 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {alerts.map((alert) => {
                  const IconComponent = alert.icon
                  return (
                    <Alert
                      key={alert.id}
                      className={`${getSeverityColor(alert.severity)} border-l-4 hover:shadow-lg transition-all duration-300`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <IconComponent className="h-5 w-5 mt-0.5" />
                          <div className="flex-1">
                            <AlertTitle className="text-[#0d416b] font-semibold flex items-center gap-2">
                              {alert.title}
                              {getSeverityBadge(alert.severity)}
                            </AlertTitle>
                            <AlertDescription className="text-[#b7b2b3] mt-1">
                              {alert.message}
                              <div className="flex items-center space-x-4 mt-2 text-xs">
                                <span className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {alert.time}
                                </span>
                                <span className="flex items-center">
                                  <Activity className="h-3 w-3 mr-1" />
                                  Impact: {alert.impact}
                                </span>
                                <span className="flex items-center">
                                  <Eye className="h-3 w-3 mr-1" />
                                  {alert.affected}
                                </span>
                              </div>
                            </AlertDescription>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-4 border-[#00aae7] text-[#00aae7] hover:bg-[#00aae7] hover:text-white transition-all duration-200"
                          onClick={() => handleViewDetails(alert)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </Alert>
                  )
                })}
              </div>
            </CardContent>
        </Card>

        {/* Enhanced Hourly Heatmap */}
      

        {/* Enhanced Detailed Table */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#0d416b] to-[#00aae7] bg-clip-text text-transparent">
                  Detailed Hourly Breakdown
                </CardTitle>
                <CardDescription className="text-[#b7b2b3]">
                  Comprehensive transaction metrics with performance indicators
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-[#b7b2b3] text-[#0d416b] hover:bg-white/80">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button className="bg-gradient-to-r from-[#00aae7] to-[#0d416b] hover:from-[#0d416b] hover:to-[#00aae7] text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Export Table
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div
              className={`overflow-x-auto ${
              hourlyStats.length > 10 ? "max-h-[520px] overflow-y-auto" : ""
              }`}
            >
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-slate-50 to-blue-50 hover:from-slate-100 hover:to-blue-100">
                    <TableHead className="font-semibold text-[#0d416b]">Time</TableHead>
                    <TableHead className="font-semibold text-[#0d416b]">Volume</TableHead>
                    <TableHead className="font-semibold text-[#0d416b]">Success</TableHead>
                    <TableHead className="font-semibold text-[#0d416b]">Failure</TableHead>
                    <TableHead className="font-semibold text-[#0d416b]">Success Rate</TableHead>
                    <TableHead className="font-semibold text-[#0d416b]">Avg Response</TableHead>
                    <TableHead className="font-semibold text-[#0d416b]">Status</TableHead>
                    <TableHead className="font-semibold text-[#0d416b]">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hourlyStats.map((stat) => {
                    const successRate = ((stat.success / stat.volume) * 100).toFixed(1)
                    return (
                      <TableRow
                        key={stat.hour}
                        className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200"
                      >
                        <TableCell className="font-medium text-[#0d416b]">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-[#00aae7]" />
                            <span className="font-semibold">{stat.hour}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(stat.status)}`} />
                            <span className="font-bold text-[#0d416b]">{stat.volume.toLocaleString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-green-600 font-semibold">{stat.success.toLocaleString()}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-red-600 font-semibold">{stat.failure.toLocaleString()}</span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${
                              Number.parseFloat(successRate) >= 98
                                ? "bg-green-100 text-green-800"
                                : Number.parseFloat(successRate) >= 95
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            } hover:bg-current`}
                          >
                            {successRate}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`font-semibold ${
                              stat.avgResponse <= 2.0
                                ? "text-green-600"
                                : stat.avgResponse <= 2.5
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            {stat.avgResponse}s
                          </span>
                        </TableCell>
                        <TableCell>{getStatusBadge(stat.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            {getTrendIcon(stat.trend)}
                            <span className="text-xs capitalize text-[#b7b2b3]">{stat.trend}</span>
                          </div>
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

      {/* Alert Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#0d416b] to-[#00aae7] bg-clip-text text-transparent flex items-center gap-3">
                {selectedAlert && (
                  <>
                    <selectedAlert.icon className="h-6 w-6 text-[#00aae7]" />
                    {selectedAlert.title}
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
            <DialogDescription className="text-[#b7b2b3]">
              Detailed analysis and resolution information for this alert
            </DialogDescription>
          </DialogHeader>

          {selectedAlert && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-[#0d416b]/10 to-[#00aae7]/10">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0d416b] data-[state=active]:to-[#00aae7] data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="metrics"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0d416b] data-[state=active]:to-[#00aae7] data-[state=active]:text-white"
                >
                  Metrics
                </TabsTrigger>
                <TabsTrigger
                  value="timeline"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0d416b] data-[state=active]:to-[#00aae7] data-[state=active]:text-white"
                >
                  Timeline
                </TabsTrigger>
                <TabsTrigger
                  value="resolution"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0d416b] data-[state=active]:to-[#00aae7] data-[state=active]:text-white"
                >
                  Resolution
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-[#0d416b] flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2" />
                        Alert Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-[#b7b2b3]">Severity:</span>
                        <span>{getSeverityBadge(selectedAlert.severity)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#b7b2b3]">Impact Level:</span>
                        <Badge className="bg-orange-100 text-orange-800">{selectedAlert.impact}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#b7b2b3]">Duration:</span>
                        <span className="font-semibold text-[#0d416b]">{selectedAlert.details.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#b7b2b3]">Detected:</span>
                        <span className="font-semibold text-[#0d416b]">{selectedAlert.time}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-[#0d416b] flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        Affected Partners
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedAlert.details.affectedPartners.map((partner, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-[#0d416b] font-medium">{partner}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-[#0d416b] flex items-center">
                      <Server className="h-5 w-5 mr-2" />
                      Root Cause Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#0d416b] font-medium mb-3">{selectedAlert.details.rootCause}</p>
                    <div className="bg-white/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-[#0d416b] mb-2">System Response:</h4>
                      <p className="text-[#b7b2b3]">{selectedAlert.details.systemResponse}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="metrics" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-[#0d416b] text-sm">Baseline Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedAlert.details.baseline.toLocaleString()}
                      </div>
                      <Progress value={60} className="mt-2" />
                      <p className="text-xs text-[#b7b2b3] mt-1">Normal operating range</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
                    <CardHeader>
                      <CardTitle className="text-[#0d416b] text-sm">Actual Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">
                        {selectedAlert.details.actual.toLocaleString()}
                      </div>
                      <Progress value={100} className="mt-2" />
                      <p className="text-xs text-[#b7b2b3] mt-1">Peak recorded value</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                    <CardHeader>
                      <CardTitle className="text-[#0d416b] text-sm">Alert Threshold</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-yellow-600">
                        {selectedAlert.details.threshold.toLocaleString()}
                      </div>
                      <Progress value={80} className="mt-2" />
                      <p className="text-xs text-[#b7b2b3] mt-1">Configured alert level</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-[#0d416b] flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Performance Impact Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[#b7b2b3]">Deviation from Baseline:</span>
                        <Badge className="bg-red-100 text-red-800">
                          +
                          {(
                            ((selectedAlert.details.actual - selectedAlert.details.baseline) /
                              selectedAlert.details.baseline) *
                            100
                          ).toFixed(1)}
                          %
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#b7b2b3]">Threshold Exceeded By:</span>
                        <Badge className="bg-orange-100 text-orange-800">
                          +
                          {(
                            ((selectedAlert.details.actual - selectedAlert.details.threshold) /
                              selectedAlert.details.threshold) *
                            100
                          ).toFixed(1)}
                          %
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#b7b2b3]">Duration:</span>
                        <span className="font-semibold text-[#0d416b]">{selectedAlert.details.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline" className="space-y-6 mt-6">
                <Card className="bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-[#0d416b] flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Event Timeline
                    </CardTitle>
                    <CardDescription>Chronological sequence of events and system responses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedAlert.details.timeline.map((event, index) => (
                        <div
                          key={index}
                          className={`flex items-start space-x-4 p-4 rounded-lg border ${getTimelineColor(event.status)}`}
                        >
                          <div className="flex-shrink-0 mt-0.5">{getTimelineIcon(event.status)}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-[#0d416b]">{event.time}</span>
                              <Badge
                                className={`${
                                  event.status === "success"
                                    ? "bg-green-100 text-green-800"
                                    : event.status === "error"
                                      ? "bg-red-100 text-red-800"
                                      : event.status === "warning"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {event.status}
                              </Badge>
                            </div>
                            <p className="text-[#b7b2b3] mt-1">{event.event}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resolution" className="space-y-6 mt-6">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-[#0d416b] flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Recommendations
                    </CardTitle>
                    <CardDescription>Suggested actions to prevent similar incidents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedAlert.details.recommendations.map((recommendation, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-white/50 rounded-lg">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-green-600 font-semibold text-sm">{index + 1}</span>
                          </div>
                          <p className="text-[#0d416b] font-medium">{recommendation}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-[#0d416b] text-sm">Next Steps</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button className="w-full bg-gradient-to-r from-[#0d416b] to-[#00aae7] hover:from-[#00aae7] hover:to-[#0d416b] text-white">
                        Acknowledge Alert
                      </Button>
                      <Button variant="outline" className="w-full">
                        Create Incident Report
                      </Button>
                      <Button variant="outline" className="w-full">
                        Schedule Review Meeting
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-[#0d416b] text-sm">Related Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-[#b7b2b3]">Similar incidents:</span>
                          <span className="font-semibold text-[#0d416b]">3 this month</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#b7b2b3]">Last occurrence:</span>
                          <span className="font-semibold text-[#0d416b]">5 days ago</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#b7b2b3]">Pattern detected:</span>
                          <Badge className="bg-yellow-100 text-yellow-800">Peak hours</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
