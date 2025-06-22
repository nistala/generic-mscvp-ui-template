"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbNavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const sectionHierarchy: { [key: string]: { parent: string; parentLabel: string; label: string } } = {
  analytics: { parent: "", parentLabel: "", label: "Analytics" },
  dashboard: { parent: "analytics", parentLabel: "Analytics", label: "Dashboard" },
  "daily-stats": { parent: "analytics", parentLabel: "Analytics", label: "Daily Stats" },
  "tp-volumes": { parent: "analytics", parentLabel: "Analytics", label: "TP Volumes" },
  documentary: { parent: "", parentLabel: "", label: "Documentary" },
  "document-repository": { parent: "documentary", parentLabel: "Documentary", label: "Document Repository" },
  operations: { parent: "", parentLabel: "", label: "Operations" },
  partners: { parent: "operations", parentLabel: "Operations", label: "Partners" },
  "archive-purge": { parent: "operations", parentLabel: "Operations", label: "Archive & Purge" },
  "user-management": { parent: "", parentLabel: "", label: "User Management" },
  "user-creation": { parent: "user-management", parentLabel: "User Management", label: "User Creation" },
  "user-search": { parent: "user-management", parentLabel: "User Management", label: "User Search" },
  profile: { parent: "", parentLabel: "", label: "Profile" },
  scheduler: { parent: "", parentLabel: "", label: "Scheduler" },
  retail: { parent: "", parentLabel: "", label: "Retail" },
}

export function BreadcrumbNavigation({ activeSection, onSectionChange }: BreadcrumbNavigationProps) {
  const currentSection = sectionHierarchy[activeSection]

  if (!currentSection) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-white/80 to-slate-50/80 backdrop-blur-sm border-b border-white/20 px-8 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="#"
              onClick={(e) => {
                e.preventDefault()
              }}
              className="text-slate-600 hover:text-slate-900 font-medium flex items-center transition-colors duration-300"
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          {currentSection.parent && (
            <>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    onSectionChange(currentSection.parent)
                  }}
                  className="text-slate-600 hover:text-slate-900 font-medium transition-colors duration-300"
                >
                  {currentSection.parentLabel}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}

          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-slate-900 font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {currentSection.label}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
