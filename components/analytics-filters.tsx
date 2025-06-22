"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Filter } from "lucide-react"
import { useState } from "react"

const volumeStats = {
  totalVolume: "1,247,892",
  avgDailyVolume: "41,596",
  peakVolume: "67,234",
  slaCompliance: "98.7%",
}

const trendData = [
  { date: "2024-01", volume: 285000, compliance: 98.2 },
  { date: "2024-02", volume: 320000, compliance: 97.8 },
  { date: "2024-03", volume: 380000, compliance: 98.5 },
  { date: "2024-04", volume: 420000, compliance: 98.9 },
  { date: "2024-05", volume: 450000, compliance: 98.7 },
  { date: "2024-06", volume: 480000, compliance: 99.1 },
]

export function AnalyticsFilters() {
  const [filters, setFilters] = useState({
    dateRange: null,
    partner: "",
    minVolume: "",
    slaStatus: "",
  })

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#0d416b] flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Volume Filters
          </CardTitle>
          <CardDescription>Filter and analyze transaction volumes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateRange">Date Range</Label>
              <DatePickerWithRange />
            </div>
            <div className="space-y-2">
              <Label htmlFor="partner">Partner</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select partner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="walmart">Walmart Inc.</SelectItem>
                  <SelectItem value="target">Target Corp.</SelectItem>
                  <SelectItem value="amazon">Amazon LLC</SelectItem>
                  <SelectItem value="homedepot">Home Depot</SelectItem>
                  <SelectItem value="costco">Costco</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="minVolume">Minimum Volume</Label>
              <Input
                id="minVolume"
                placeholder="e.g., 1000"
                type="number"
                className="border-[#b7b2b3]/30 focus:border-[#00aae7]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slaStatus">SLA Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compliant">Compliant</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" className="border-[#b7b2b3] text-[#0d416b]">
              Reset Filters
            </Button>
            <Button className="bg-[#00aae7] hover:bg-[#0d416b]">Apply Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Volume Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-[#00aae7]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#0d416b]">Total Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0d416b]">{volumeStats.totalVolume}</div>
            <p className="text-xs text-[#b7b2b3] mt-1">Last 30 days</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#10b981]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#0d416b]">Avg Daily Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0d416b]">{volumeStats.avgDailyVolume}</div>
            <p className="text-xs text-[#b7b2b3] mt-1">Transactions per day</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#f59e0b]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#0d416b]">Peak Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0d416b]">{volumeStats.peakVolume}</div>
            <p className="text-xs text-[#b7b2b3] mt-1">Highest single day</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#8b5cf6]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#0d416b]">SLA Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0d416b]">{volumeStats.slaCompliance}</div>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mt-1">Excellent</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-[#0d416b]">Monthly Volume Trends</CardTitle>
            <CardDescription>Transaction volume over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                volume: {
                  label: "Volume",
                  color: "#0d416b",
                },
              }}
              className="h-[300px]"
            >
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#b7b2b3" opacity={0.3} />
                <XAxis dataKey="date" stroke="#b7b2b3" />
                <YAxis stroke="#b7b2b3" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="volume"
                  stroke="#0d416b"
                  strokeWidth={3}
                  dot={{ fill: "#00aae7", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#0d416b]">SLA Compliance Trends</CardTitle>
            <CardDescription>Compliance percentage over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                compliance: {
                  label: "Compliance %",
                  color: "#10b981",
                },
              }}
              className="h-[300px]"
            >
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#b7b2b3" opacity={0.3} />
                <XAxis dataKey="date" stroke="#b7b2b3" />
                <YAxis stroke="#b7b2b3" domain={[95, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="compliance"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
