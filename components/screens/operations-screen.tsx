"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Settings, Building2, Trash2, AlertTriangle, CheckCircle, Clock, Zap, TrendingUp } from "lucide-react"

const operationsStats = [
  {
    title: "Active Partners",
    value: "62",
    change: "+5",
    icon: Building2,
    color: "#00aae7",
  },
  {
    title: "System Health",
    value: "99.8%",
    change: "+0.2%",
    icon: CheckCircle,
    color: "#10b981",
  },
  {
    title: "Archive Jobs",
    value: "8",
    change: "+2",
    icon: Trash2,
    color: "#8b5cf6",
  },
  {
    title: "Uptime",
    value: "99.9%",
    change: "0%",
    icon: Clock,
    color: "#f59e0b",
  },
]

const systemAlerts = [
  {
    type: "warning",
    title: "High Volume Alert",
    message: "Transaction volume is 150% above normal for this time of day",
    time: "2 hours ago",
  },
  {
    type: "info",
    title: "Scheduled Maintenance",
    message: "System maintenance scheduled for Sunday 2:00 AM - 4:00 AM EST",
    time: "1 day ago",
  },
  {
    type: "success",
    title: "Archive Job Completed",
    message: "Monthly document archive job completed successfully",
    time: "3 hours ago",
  },
]

const quickActions = [
  {
    title: "Partner Management",
    description: "Add, edit, or remove trading partners",
    icon: Building2,
    color: "#00aae7",
    action: "Manage Partners",
  },
  {
    title: "Archive & Purge",
    description: "Configure data retention and cleanup policies",
    icon: Trash2,
    color: "#8b5cf6",
    action: "Configure Archives",
  },
  {
    title: "System Monitoring",
    description: "Monitor system health and performance",
    icon: CheckCircle,
    color: "#10b981",
    action: "View Monitoring",
  },
]

export function OperationsScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#0d416b] to-[#00aae7] rounded-2xl flex items-center justify-center shadow-lg">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0d416b] via-[#00aae7] to-[#0d416b] bg-clip-text text-transparent">
                  Operations Center
                </h1>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <p className="text-[#b7b2b3] font-medium">All Systems Operational</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button className="bg-gradient-to-r from-[#0d416b] to-[#00aae7] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl font-semibold px-6">
                <Zap className="h-4 w-4 mr-2" />
                System Status
              </Button>
            </div>
          </div>
        </div>

        {/* Operations Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {operationsStats.map((stat) => {
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
                <p className="text-xs text-[#b7b2b3] mt-1">this month</p>
              </div>
            )
          })}
        </div>

        {/* System Alerts */}
        <div className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg mr-4">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0d416b]">System Alerts</h3>
              <p className="text-[#b7b2b3]">Recent system notifications and alerts</p>
            </div>
          </div>
          <div className="space-y-4">
            {systemAlerts.map((alert, index) => (
              <div
                key={index}
                className={`bg-white/50 backdrop-blur-sm rounded-xl p-4 border-l-4 hover:shadow-lg transition-all duration-300 ${
                  alert.type === "warning"
                    ? "border-l-orange-500 bg-gradient-to-r from-orange-50/80 to-orange-50/40"
                    : alert.type === "success"
                      ? "border-l-green-500 bg-gradient-to-r from-green-50/80 to-green-50/40"
                      : "border-l-blue-500 bg-gradient-to-r from-blue-50/80 to-blue-50/40"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-[#0d416b] mb-1">{alert.title}</h4>
                    <p className="text-[#b7b2b3] text-sm mb-2">{alert.message}</p>
                    <span className="text-xs text-[#b7b2b3] font-medium">{alert.time}</span>
                  </div>
                  <AlertTriangle className="h-5 w-5 text-orange-500 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <div
                key={action.title}
                className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4"
                style={{ borderLeftColor: action.color }}
              >
                <div className="flex items-center mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg mr-4"
                    style={{ background: `linear-gradient(135deg, ${action.color} 0%, ${action.color}cc 100%)` }}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0d416b]">{action.title}</h3>
                    <p className="text-[#b7b2b3] text-sm">{action.description}</p>
                  </div>
                </div>
                <Button
                  className="w-full text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl font-semibold"
                  style={{ background: `linear-gradient(135deg, ${action.color} 0%, ${action.color}cc 100%)` }}
                >
                  {action.action}
                </Button>
              </div>
            )
          })}
        </div>

        {/* System Performance */}
        <div className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-[#0d416b] to-[#00aae7] rounded-xl flex items-center justify-center shadow-lg mr-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0d416b]">System Performance</h3>
              <p className="text-[#b7b2b3]">Real-time system metrics and health indicators</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-sm rounded-xl p-6 border border-green-100/50 hover:shadow-lg transition-all duration-300 text-center">
              <div className="text-3xl font-bold text-[#0d416b] mb-2">1.2s</div>
              <p className="text-sm text-[#b7b2b3] font-medium">Avg Response Time</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm rounded-xl p-6 border border-blue-100/50 hover:shadow-lg transition-all duration-300 text-center">
              <div className="text-3xl font-bold text-[#0d416b] mb-2">45,678</div>
              <p className="text-sm text-[#b7b2b3] font-medium">Transactions Today</p>
            </div>
            <div className="bg-gradient-to-r from-purple-50/80 to-violet-50/80 backdrop-blur-sm rounded-xl p-6 border border-purple-100/50 hover:shadow-lg transition-all duration-300 text-center">
              <div className="text-3xl font-bold text-[#0d416b] mb-2">2.4 TB</div>
              <p className="text-sm text-[#b7b2b3] font-medium">Storage Used</p>
            </div>
            <div className="bg-gradient-to-r from-orange-50/80 to-amber-50/80 backdrop-blur-sm rounded-xl p-6 border border-orange-100/50 hover:shadow-lg transition-all duration-300 text-center">
              <div className="text-3xl font-bold text-[#0d416b] mb-2">99.9%</div>
              <p className="text-sm text-[#b7b2b3] font-medium">System Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
