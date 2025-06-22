"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Badge } from "@/components/ui/badge"

const transactionData = [
  { time: "00:00", successful: 450, failed: 12, total: 462 },
  { time: "04:00", successful: 380, failed: 8, total: 388 },
  { time: "08:00", successful: 720, failed: 15, total: 735 },
  { time: "12:00", successful: 890, failed: 23, total: 913 },
  { time: "16:00", successful: 1200, failed: 18, total: 1218 },
  { time: "20:00", successful: 950, failed: 14, total: 964 },
]

const monthlyData = [
  { month: "Jan", volume: 285000, sla: 98.2 },
  { month: "Feb", volume: 320000, sla: 97.8 },
  { month: "Mar", volume: 380000, sla: 98.5 },
  { month: "Apr", volume: 420000, sla: 98.9 },
  { month: "May", volume: 450000, sla: 98.7 },
  { month: "Jun", volume: 480000, sla: 99.1 },
]

const partnerData = [
  { partner: "Partner A", volume: 45000, status: "compliant" },
  { partner: "Partner B", volume: 38000, status: "compliant" },
  { partner: "Partner C", volume: 32000, status: "warning" },
  { partner: "Partner D", volume: 28000, status: "compliant" },
  { partner: "Partner E", volume: 22000, status: "critical" },
]

const recentTransactions = [
  { id: "TXN-001", partner: "Walmart Inc.", type: "850 PO", status: "success", time: "2 min ago" },
  { id: "TXN-002", partner: "Target Corp.", type: "855 ACK", status: "success", time: "3 min ago" },
  { id: "TXN-003", partner: "Amazon LLC", type: "810 Invoice", status: "failed", time: "5 min ago" },
  { id: "TXN-004", partner: "Home Depot", type: "856 ASN", status: "success", time: "7 min ago" },
  { id: "TXN-005", partner: "Costco", type: "997 FA", status: "pending", time: "8 min ago" },
]

export function TransactionCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Real-time Transaction Flow */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-[#0d416b]">Real-time Transaction Flow</CardTitle>
          <CardDescription>Transaction volume over the last 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              successful: {
                label: "Successful",
                color: "#00aae7",
              },
              failed: {
                label: "Failed",
                color: "#ef4444",
              },
            }}
            className="h-[300px]"
          >
            <AreaChart data={transactionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#b7b2b3" opacity={0.3} />
              <XAxis dataKey="time" stroke="#b7b2b3" />
              <YAxis stroke="#b7b2b3" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="successful"
                stackId="1"
                stroke="#00aae7"
                fill="#00aae7"
                fillOpacity={0.6}
              />
              <Area type="monotone" dataKey="failed" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Monthly Volume Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#0d416b]">Monthly Volume Trends</CardTitle>
          <CardDescription>Transaction volume and SLA compliance</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              volume: {
                label: "Volume",
                color: "#0d416b",
              },
            }}
            className="h-[250px]"
          >
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#b7b2b3" opacity={0.3} />
              <XAxis dataKey="month" stroke="#b7b2b3" />
              <YAxis stroke="#b7b2b3" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="volume" fill="#0d416b" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Partner Volume Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#0d416b]">Current Month Volume by Partner</CardTitle>
          <CardDescription>Top 5 partners by transaction volume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {partnerData.map((partner, index) => (
              <div key={partner.partner} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#00aae7] text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-[#0d416b]">{partner.partner}</p>
                    <p className="text-sm text-[#b7b2b3]">{partner.volume.toLocaleString()} transactions</p>
                  </div>
                </div>
                <Badge
                  variant={
                    partner.status === "compliant"
                      ? "default"
                      : partner.status === "warning"
                        ? "secondary"
                        : "destructive"
                  }
                  className={
                    partner.status === "compliant"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : partner.status === "warning"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                  }
                >
                  {partner.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transaction Activity */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-[#0d416b]">Recent Transaction Activity</CardTitle>
          <CardDescription>Latest transaction updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="font-mono text-sm text-[#0d416b]">{transaction.id}</div>
                  <div>
                    <p className="font-medium text-[#0d416b]">{transaction.partner}</p>
                    <p className="text-sm text-[#b7b2b3]">{transaction.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge
                    variant={
                      transaction.status === "success"
                        ? "default"
                        : transaction.status === "failed"
                          ? "destructive"
                          : "secondary"
                    }
                    className={
                      transaction.status === "success"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : transaction.status === "failed"
                          ? "bg-red-100 text-red-800 hover:bg-red-100"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    }
                  >
                    {transaction.status}
                  </Badge>
                  <span className="text-xs text-[#b7b2b3]">{transaction.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
