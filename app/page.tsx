"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardScreen } from "@/components/screens/dashboard-screen"
import { TPVolumesScreen } from "@/components/screens/tp-volumes-screen"
import { DailyStatsScreen } from "@/components/screens/daily-stats-screen"
import { DocumentRepositoryScreen } from "@/components/screens/document-repository-screen"
import { PartnersScreen } from "@/components/screens/partners-screen"
import { ArchivePurgeScreen } from "@/components/screens/archive-purge-screen"
import { UserManagementScreen } from "@/components/screens/user-management-screen"
import { ProfileScreen } from "@/components/screens/profile-screen"
import { SchedulerScreen } from "@/components/screens/scheduler-screen"
import { RetailScreen } from "@/components/screens/retail-screen"
import { AnalyticsScreen } from "@/components/screens/analytics-screen"
import { DocumentaryScreen } from "@/components/screens/documentary-screen"
import { OperationsScreen } from "@/components/screens/operations-screen"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("analytics")
  const [searchQuery, setSearchQuery] = useState("")

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileScreen />
      case "user-management":
        return <UserManagementScreen />
      case "user-creation":
      case "user-search":
        return <UserManagementScreen />
      case "scheduler":
        return <SchedulerScreen />
      case "analytics":
        return <AnalyticsScreen searchQuery={searchQuery} />
      case "dashboard":
        return <DashboardScreen searchQuery={searchQuery} />
      case "daily-stats":
        return <DailyStatsScreen />
      case "tp-volumes":
        return <TPVolumesScreen />
      case "retail":
        return <RetailScreen />
      case "documentary":
        return <DocumentaryScreen searchQuery={searchQuery} />
      case "document-repository":
        return <DocumentRepositoryScreen searchQuery={searchQuery} />
      case "operations":
        return <OperationsScreen />
      case "partners":
        return <PartnersScreen />
      case "archive-purge":
        return <ArchivePurgeScreen />
      default:
        return <AnalyticsScreen searchQuery={searchQuery} />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <div className="flex-1 flex flex-col content-area">
          <DashboardHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          <main className="flex-1 p-6 overflow-y-auto content-scroll">{renderContent()}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
