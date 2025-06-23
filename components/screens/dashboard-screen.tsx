"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, Bar, BarChart, Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Filter,
  BarChart3,
  Activity,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Download,
  FileText,
  Eye,
  X,
  Calendar,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface DashboardScreenProps {
  searchQuery: string
}

const transactionSummary = {
  success: 45678,
  failure: 234,
  pending: 89,
  total: 46001,
  successRate: 99.3,
  avgResponseTime: "1.2s",
  peakHour: "2:00 PM",
  activePartners: 127,
}

const dailyTrendData = [
  { date: "Dec 1", transactions: 42000, success: 41500, failure: 500, pending: 45 },
  { date: "Dec 2", transactions: 45000, success: 44200, failure: 800, pending: 67 },
  { date: "Dec 3", transactions: 43500, success: 42800, failure: 700, pending: 89 },
  { date: "Dec 4", transactions: 47000, success: 46300, failure: 700, pending: 123 },
  { date: "Dec 5", transactions: 46000, success: 45400, failure: 600, pending: 98 },
  { date: "Dec 6", transactions: 48500, success: 47800, failure: 700, pending: 156 },
  { date: "Dec 7", transactions: 46001, success: 45678, failure: 234, pending: 89 },
]

const hourlyData = [
  { hour: "00", volume: 1200, success: 1180, failure: 20 },
  { hour: "02", volume: 900, success: 885, failure: 15 },
  { hour: "04", volume: 800, success: 790, failure: 10 },
  { hour: "06", volume: 1800, success: 1770, failure: 30 },
  { hour: "08", volume: 3500, success: 3450, failure: 50 },
  { hour: "10", volume: 4200, success: 4150, failure: 50 },
  { hour: "12", volume: 4800, success: 4740, failure: 60 },
  { hour: "14", volume: 5200, success: 5140, failure: 60 },
  { hour: "16", volume: 3800, success: 3750, failure: 50 },
  { hour: "18", volume: 2800, success: 2770, failure: 30 },
  { hour: "20", volume: 2100, success: 2080, failure: 20 },
  { hour: "22", volume: 1500, success: 1485, failure: 15 },
]

const recentTransactions = [
  { id: "TXN-7891", partner: "Walmart Inc.", type: "850", status: "success", time: "1 min ago", amount: "$12,450" },
  { id: "TXN-7892", partner: "Target Corp.", type: "810", status: "success", time: "2 min ago", amount: "$8,920" },
  { id: "TXN-7893", partner: "Amazon LLC", type: "856", status: "failure", time: "3 min ago", amount: "$15,670" },
  { id: "TXN-7894", partner: "Home Depot", type: "855", status: "pending", time: "4 min ago", amount: "$6,340" },
  { id: "TXN-7895", partner: "Costco Wholesale", type: "997", status: "success", time: "5 min ago", amount: "$22,180" },
]

const topPartners = [
  { name: "Walmart Inc.", volume: 12450, change: 8.2, trend: "up" },
  { name: "Amazon LLC", volume: 9870, change: -2.1, trend: "down" },
  { name: "Target Corp.", volume: 8920, change: 15.3, trend: "up" },
  { name: "Home Depot", volume: 7650, change: 4.7, trend: "up" },
]

export function DashboardScreen({ searchQuery }: DashboardScreenProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<(typeof recentTransactions)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)

  const successRate = ((transactionSummary.success / transactionSummary.total) * 100).toFixed(1)
  const failureRate = ((transactionSummary.failure / transactionSummary.total) * 100).toFixed(1)
  const pendingRate = ((transactionSummary.pending / transactionSummary.total) * 100).toFixed(1)

  const handleViewTransaction = (transaction: (typeof recentTransactions)[0]) => {
    setSelectedTransaction(transaction)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-150 via-blue-150 to-indigo-200 p-3">
      <div className="space-y-3 ">
        {/* <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#0d416b] via-[#00aae7] to-[#0d416b] bg-clip-text text-transparent">
            Transaction Dashboard
          </h1>
          <p className="text-[#b7b2b3] flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block"></span>
            Real-time EDI transaction monitoring and analytics
          </p>
        </div> */}
        {/* Header */}

           <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-[#0d416b] via-[#00aae7] to-[#0d416b] bg-clip-text text-transparent">
                      Transaction Dashboard
                    </h1>
                    <div className="text-[#b7b2b3] mt-2 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Real-time EDI transaction monitoring and analytics
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
                    <Button
                      variant="outline"
                      className="border-[#b7b2b3] text-[#0d416b] hover:bg-white/80 backdrop-blur-sm"
                      onClick={() => setIsAccordionOpen(true)}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Advanced Filters
                    </Button>
                    <Dialog open={isAccordionOpen} onOpenChange={setIsAccordionOpen}>
                      <DialogContent className="max-w-xl bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#0d416b] to-[#00aae7] bg-clip-text text-transparent flex items-center gap-3">
                        Advanced Filters
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                        <div className="space-y-2">
                        <label className="text-md font-bold text-[#232527]">Partner</label>
                        <Select>
                          <SelectTrigger className="bg-white/80 backdrop-blur-sm border-white/30 hover:bg-white/90 transition-all duration-300">
                          <SelectValue placeholder="All Partners" />
                          </SelectTrigger>
                          <SelectContent className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                          <SelectItem value="all">All Partners</SelectItem>
                          <SelectItem value="walmart">Walmart Inc.</SelectItem>
                          <SelectItem value="target">Target Corp.</SelectItem>
                          <SelectItem value="amazon">Amazon LLC</SelectItem>
                          <SelectItem value="homedepot">Home Depot</SelectItem>
                          </SelectContent>
                        </Select>
                        </div>
                        <div className="space-y-2">
                        <label className="text-md font-bold text-[#232527]">Date Range</label>
                        <Select>
                          <SelectTrigger className="bg-white/80 backdrop-blur-sm border-white/30 hover:bg-white/90 transition-all duration-300">
                          <SelectValue placeholder="Last 7 days" />
                          </SelectTrigger>
                          <SelectContent className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">Last 7 days</SelectItem>
                          <SelectItem value="month">Last 30 days</SelectItem>
                          <SelectItem value="quarter">Last 90 days</SelectItem>
                          </SelectContent>
                        </Select>
                        </div>
                        <div className="space-y-2">
                        <label className="text-md font-bold text-[#232527]">Transaction Type</label>
                        <Select>
                          <SelectTrigger className="bg-white/80 backdrop-blur-sm border-white/30 hover:bg-white/90 transition-all duration-300">
                          <SelectValue placeholder="All Types" />
                          </SelectTrigger>
                          <SelectContent className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="850">850 - Purchase Order</SelectItem>
                          <SelectItem value="810">810 - Invoice</SelectItem>
                          <SelectItem value="856">856 - ASN</SelectItem>
                          <SelectItem value="855">855 - PO Acknowledgment</SelectItem>
                          </SelectContent>
                        </Select>
                        </div>
                        <div className="space-y-2">
                        <label className="text-md font-bold text-[#232527]">Status</label>
                        <Select>
                          <SelectTrigger className="bg-white/80 backdrop-blur-sm border-white/30 hover:bg-white/90 transition-all duration-300">
                          <SelectValue placeholder="All Status" />
                          </SelectTrigger>
                          <SelectContent className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="success">Success</SelectItem>
                          <SelectItem value="failure">Failure</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                        </div>
                        <div className="space-y-2">
                        <label className="text-md font-bold text-[#232527]">Amount Range</label>
                        <div className="flex gap-2">
                          <input
                          type="number"
                          placeholder="Min"
                          className="w-1/2 px-2 py-1 border rounded bg-white/80"
                          />
                          <input
                          type="number"
                          placeholder="Max"
                          className="w-1/2 px-2 py-1 border rounded bg-white/80"
                          />
                        </div>
                        </div>
                        <div className="space-y-2">
                        <label className="text-md font-bold text-[#232527]">Sort By</label>
                        <Select>
                          <SelectTrigger className="bg-white/80 backdrop-blur-sm border-white/30 hover:bg-white/90 transition-all duration-300">
                          <SelectValue placeholder="Newest First" />
                          </SelectTrigger>
                          <SelectContent className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                          <SelectItem value="amountHigh">Amount: High to Low</SelectItem>
                          <SelectItem value="amountLow">Amount: Low to High</SelectItem>
                          </SelectContent>
                        </Select>
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <Button
                        variant="outline"
                        className="border-[#b7b2b3] text-[#0d416b]"
                        onClick={() => setIsAccordionOpen(false)}
                        >
                        Cancel
                        </Button>
                        <Button className="bg-gradient-to-r from-[#00aae7] to-[#0d416b] hover:from-[#0d416b] hover:to-[#00aae7] text-white">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Apply
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
        
       
  {/* Transaction Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/70 h-24 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-l-green-500 hover:scale-105">
            <CardHeader className="pb-1 pt-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-medium text-[#0d416b]">Success Transactions</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col justify-between h-[52px] p-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent leading-tight">
                {transactionSummary.success.toLocaleString()}
              </div>
              <div className="flex items-center justify-between mt-1">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 shadow-sm font-semibold px-1 py-0.5 text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {successRate}%
                </Badge>
                <span className="text-[10px] text-[#b7b2b3] font-medium">success rate</span>
              </div>
            </CardContent>
          </Card>

            <Card className="bg-white/70 h-24 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-l-red-500 hover:scale-105">
            <CardContent className="flex flex-col justify-between h-full p-2">
              <div className="flex items-center justify-between pb-1">
              <CardTitle className="text-xs font-medium text-[#0d416b]">Failed Transactions</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent leading-tight">
              {transactionSummary.failure.toLocaleString()}
              </div>
              <div className="flex items-center justify-between mt-1">
              <Badge className="bg-red-100 text-red-700 hover:bg-red-100 shadow-sm font-semibold px-1 py-0.5 text-xs">
                {failureRate}%
              </Badge>
              <span className="text-[10px] text-[#b7b2b3] font-medium">failure rate</span>
              </div>
            </CardContent>
            </Card>

            <Card className="bg-white/70 h-24 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-l-yellow-500 hover:scale-105">
            <CardContent className="flex flex-col justify-between h-full p-2">
              <div className="flex items-center justify-between pb-1">
              <CardTitle className="text-xs font-medium text-[#0d416b]">Pending Transactions</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent leading-tight">
              {transactionSummary.pending.toLocaleString()}
              </div>
              <div className="flex items-center justify-between mt-1">
              <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 shadow-sm font-semibold px-1 py-0.5 text-xs">
                {pendingRate}%
              </Badge>
              <span className="text-[10px] text-[#b7b2b3] font-medium">pending</span>
              </div>
            </CardContent>
            </Card>

            <Card className="bg-white/70 h-24 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-l-blue-500 hover:scale-105">
            <CardContent className="flex flex-col justify-between h-full p-2">
              <div className="flex items-center justify-between pb-1">
              <CardTitle className="text-xs font-medium text-[#0d416b]">Total Volume</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              {transactionSummary.total.toLocaleString()}
              </div>
              <div className="flex items-center justify-between mt-1">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 shadow-sm font-semibold px-1 py-0.5 text-xs">
                <Zap className="h-3 w-3 mr-1" />
                Today
              </Badge>
              <span className="text-[10px] text-[#b7b2b3] font-medium">transactions</span>
              </div>
            </CardContent>
            </Card>
        </div>
        

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Transaction Trends */}
          <Card className="lg:col-span-2 bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#0d416b] to-[#00aae7] bg-clip-text text-transparent">
                    Daily Transaction Trends
                  </CardTitle>
                  <CardDescription className="text-[#b7b2b3]">
                    7-day transaction volume with success/failure breakdown
                  </CardDescription>
                </div>
                <Button variant="outline" className="border-[#b7b2b3] text-[#0d416b] hover:bg-white/80">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  transactions: {
                    label: "Total Transactions",
                    color: "#4f46e5",
                  },
                  success: {
                    label: "Success",
                    color: "#10b981",
                  },
                  failure: {
                    label: "Failure",
                    color: "#ef4444",
                  },
                }}
                className="h-[350px]"
              >
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dailyTrendData}>
                      <defs>
                        <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="failureGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
                      <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="success"
                        stackId="1"
                        stroke="#10b981"
                        fill="url(#successGradient)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="failure"
                        stackId="1"
                        stroke="#ef4444"
                        fill="url(#failureGradient)"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="transactions"
                        stroke="#4f46e5"
                        strokeWidth={3}
                        dot={{ fill: "#4f46e5", strokeWidth: 2, r: 5 }}
                        activeDot={{ r: 7, stroke: "#4f46e5", strokeWidth: 2, fill: "#fff" }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Top Partners */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#0d416b] to-[#00aae7] bg-clip-text text-transparent">
                    Top Partners
                  </CardTitle>
                  <CardDescription className="text-[#b7b2b3]">Highest volume trading partners today</CardDescription>
                </div>
                <Button variant="outline" className="border-[#b7b2b3] text-[#0d416b] hover:bg-white/80">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPartners.map((partner, index) => (
                  <div
                    key={partner.name}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-white/60 to-slate-50/60 backdrop-blur-sm rounded-xl border border-white/30 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#0d416b] to-[#00aae7] rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-white font-bold text-sm">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-[#0d416b] text-sm">{partner.name}</p>
                        <p className="text-xs text-[#b7b2b3]">{partner.volume.toLocaleString()} transactions</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={cn(
                          "font-semibold shadow-sm text-xs",
                          partner.trend === "up"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-red-100 text-red-700 hover:bg-red-100",
                        )}
                      >
                        {partner.trend === "up" ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(partner.change)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hourly Distribution & Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hourly Distribution */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#0d416b] to-[#00aae7] bg-clip-text text-transparent">
                    Hourly Distribution
                  </CardTitle>
                  <CardDescription className="text-[#b7b2b3]">Today's transaction volume by hour</CardDescription>
                </div>
                <Button variant="outline" className="border-[#b7b2b3] text-[#0d416b] hover:bg-white/80">
                  <Activity className="h-4 w-4 mr-2" />
                  Analyze
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  volume: {
                    label: "Volume",
                    color: "#06b6d4",
                  },
                  success: {
                    label: "Success",
                    color: "#10b981",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyData}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00aae7" />
                        <stop offset="100%" stopColor="#0d416b" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
                    <XAxis dataKey="hour" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="volume" fill="url(#barGradient)" radius={8} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#0d416b] to-[#00aae7] bg-clip-text text-transparent">
                    Live Transaction Feed
                  </CardTitle>
                  <CardDescription className="text-[#b7b2b3]">Real-time transaction updates</CardDescription>
                </div>
                <Button variant="outline" className="border-[#b7b2b3] text-[#0d416b] hover:bg-white/80">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-white/60 to-slate-50/60 backdrop-blur-sm rounded-xl border border-white/30 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => handleViewTransaction(transaction)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#0d416b] to-[#00aae7] rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-white font-bold text-xs">{transaction.type}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-[#0d416b] text-sm">{transaction.partner}</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-[#b7b2b3] font-medium">{transaction.id}</p>
                          <span className="text-xs text-[#b7b2b3]">•</span>
                          <p className="text-xs text-[#b7b2b3] font-medium">{transaction.amount}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge
                        className={cn(
                          "font-semibold shadow-sm text-xs",
                          transaction.status === "success"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : transaction.status === "failure"
                              ? "bg-red-100 text-red-700 hover:bg-red-100"
                              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
                        )}
                      >
                        {transaction.status}
                      </Badge>
                      <span className="text-xs text-[#b7b2b3] font-medium">{transaction.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Transaction Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#0d416b] to-[#00aae7] bg-clip-text text-transparent flex items-center gap-3">
                {selectedTransaction && <>Transaction Details - {selectedTransaction.id}</>}
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

          {selectedTransaction && (
            <div className="space-y-6 mt-6">
              {/* Transaction Info */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#b7b2b3]">Partner</p>
                        <p className="text-lg font-bold text-[#0d416b]">{selectedTransaction.partner}</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-[#0d416b] to-[#00aae7] rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-white font-bold text-xs">{selectedTransaction.type}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#b7b2b3]">Amount</p>
                        <p className="text-lg font-bold text-[#0d416b]">{selectedTransaction.amount}</p>
                      </div>
                      <Badge
                        className={cn(
                          "font-semibold shadow-sm",
                          selectedTransaction.status === "success"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : selectedTransaction.status === "failure"
                              ? "bg-red-100 text-red-700 hover:bg-red-100"
                              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
                        )}
                      >
                        {selectedTransaction.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Transaction Details */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-[#0d416b] to-[#00aae7] bg-clip-text text-transparent">
                    Transaction Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#b7b2b3]">Transaction ID:</span>
                      <span className="font-semibold text-[#0d416b]">{selectedTransaction.id}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#b7b2b3]">Document Type:</span>
                      <Badge className="bg-blue-100 text-blue-800">EDI {selectedTransaction.type}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#b7b2b3]">Processing Time:</span>
                      <span className="font-semibold text-[#0d416b]">{selectedTransaction.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#b7b2b3]">Status:</span>
                      <Badge
                        className={cn(
                          "font-semibold shadow-sm",
                          selectedTransaction.status === "success"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : selectedTransaction.status === "failure"
                              ? "bg-red-100 text-red-700 hover:bg-red-100"
                              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
                        )}
                      >
                        {selectedTransaction.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <Button variant="outline" className="border-[#b7b2b3] text-[#0d416b]">
                  <FileText className="h-4 w-4 mr-2" />
                  View Document
                </Button>
                <Button className="bg-gradient-to-r from-[#00aae7] to-[#0d416b] hover:from-[#0d416b] hover:to-[#00aae7] text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Export Details
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
