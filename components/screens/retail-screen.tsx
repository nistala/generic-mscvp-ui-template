"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ShoppingCart, TrendingUp, Package, DollarSign } from "lucide-react"

const retailMetrics = {
  totalOrders: 15678,
  totalRevenue: 2456789,
  avgOrderValue: 156.78,
  fulfillmentRate: 98.5,
}

const retailData = [
  { category: "Electronics", orders: 3500, revenue: 875000 },
  { category: "Clothing", orders: 4200, revenue: 420000 },
  { category: "Home & Garden", orders: 2800, revenue: 560000 },
  { category: "Sports", orders: 2100, revenue: 315000 },
  { category: "Books", orders: 1900, revenue: 95000 },
  { category: "Toys", orders: 1178, revenue: 188480 },
]

export function RetailScreen() {
  return (
    <div className="space-y-6">
      {/* Retail Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-[#00aae7]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#0d416b]">Total Orders</CardTitle>
            <ShoppingCart className="h-5 w-5 text-[#00aae7]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0d416b]">{retailMetrics.totalOrders.toLocaleString()}</div>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mt-2">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5%
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#0d416b]">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0d416b]">${retailMetrics.totalRevenue.toLocaleString()}</div>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mt-2">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.3%
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#0d416b]">Avg Order Value</CardTitle>
            <Package className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0d416b]">${retailMetrics.avgOrderValue}</div>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mt-2">Stable</Badge>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#0d416b]">Fulfillment Rate</CardTitle>
            <TrendingUp className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0d416b]">{retailMetrics.fulfillmentRate}%</div>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mt-2">Excellent</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#0d416b]">Category Performance</CardTitle>
          <CardDescription>Orders and revenue by product category</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              orders: {
                label: "Orders",
                color: "#0d416b",
              },
              revenue: {
                label: "Revenue",
                color: "#00aae7",
              },
            }}
            className="h-[400px]"
          >
            <BarChart data={retailData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#b7b2b3" opacity={0.3} />
              <XAxis dataKey="category" stroke="#b7b2b3" />
              <YAxis stroke="#b7b2b3" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="orders" fill="#0d416b" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
