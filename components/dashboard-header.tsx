"use client"
import React, { useEffect } from "react"
import { cn } from "@/lib/utils"

import { Search, Download, Bell, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"
import { useState } from "react"

interface DashboardHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  activeSection: string
  onSectionChange: (section: string) => void
}

export function DashboardHeader({ searchQuery, onSearchChange, activeSection, onSectionChange }: DashboardHeaderProps) {
  const [isLiveData, setIsLiveData] = useState(true)
  const [currentTime, setCurrentTime] = useState("")

useEffect(() => {
  setCurrentTime(new Date().toLocaleString())
}, [])

  return (
    <div >
      {/* Breadcrumb Navigation */}
      {/* <BreadcrumbNavigation activeSection={activeSection} onSectionChange={onSectionChange} /> */}
      {/* Main Header */}
      <div className="p-2 bg-[#e9ecef]">
        <div className="flex items-center justify-between">
      <div className="flex-1 max-w-lg flex items-center space-x-3">
        {/* Sidebar Toggle Button */}
        <Button
          variant="outline"
          size="sm"
          className="bg-white/80 backdrop-blur-sm border-white/20 text-slate-700 hover:bg-white hover:shadow-md transition-all duration-300 rounded-md font-semibold h-8 text-xs"
          aria-label="Toggle sidebar"
          onClick={() => {
            // Implement sidebar toggle logic here
            // e.g., call a prop or context function
            // Example: onSidebarToggle && onSidebarToggle()
          }}
        >
          <span className="sr-only">Toggle sidebar</span>
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <rect x="3" y="4" width="18" height="2" rx="1" />
            <rect x="3" y="11" width="12" height="2" rx="1" />
            <rect x="3" y="18" width="18" height="2" rx="1" />
          </svg>
        </Button>
        <div className="relative group flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 transition-colors group-focus-within:text-blue-500" />
          <Input
            placeholder="Search transactions, partners, documents..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 text-sm bg-white/60 backdrop-blur-sm border-white/20 rounded-lg shadow-md focus:shadow-lg focus:bg-white/80 transition-all duration-300 placeholder:text-slate-400 h-9 w-full"
          />
        </div>
      </div>

          <div className="flex items-center space-x-3">
            {/* Live Data Toggle */}
            <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-lg p-2 shadow-md">
                <Button
                variant={isLiveData ? "default" : "outline"}
                size="sm"
                onClick={() => setIsLiveData(!isLiveData)}
                className={cn(
                  "transition-all duration-300 rounded-md font-semibold h-8 text-xs",
                  isLiveData
                  ? "bg-[#0d416b] text-white hover:bg-[#0d416b]/90 shadow-lg"
                  : "bg-white/80 border-slate-200 text-slate-700 hover:bg-white hover:shadow-sm",
                )}
                >
                <Zap className={`h-3 w-3 mr-1 ${isLiveData ? "animate-pulse" : ""}`} />
                Live Data
                </Button>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-600">Last updated</p>
                <p className="text-xs text-slate-500">{currentTime}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/80 backdrop-blur-sm border-white/20 text-slate-700 hover:bg-white hover:shadow-md transition-all duration-300 rounded-md font-semibold h-8 text-xs"
              >
                <Download className="h-3 w-3 mr-1" />
                Export
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="relative bg-white/80 backdrop-blur-sm border-white/20 text-slate-700 hover:bg-white hover:shadow-md transition-all duration-300 rounded-md h-8"
              >
                <Bell className="h-3 w-3" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 premium-gradient-red text-white text-xs shadow-md animate-pulse">
                  3
                </Badge>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
