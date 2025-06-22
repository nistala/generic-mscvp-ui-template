"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  BarChart3,
  FileText,
  Settings,
  Users,
  Sparkles,
  Clock,
  TrendingUp,
  Archive,
  Building2,
  Trash2,
  UserPlus,
  Search,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const menuItems = [
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    items: [
      { id: "dashboard", label: "Dashboard", icon: BarChart3 },
      { id: "daily-stats", label: "Daily Stats", icon: Clock },
      { id: "tp-volumes", label: "TP Volumes", icon: TrendingUp },
    ],
  },
  {
    id: "documentary",
    label: "Documentary",
    icon: FileText,
    items: [{ id: "document-repository", label: "Document Repository", icon: Archive }],
  },
  {
    id: "operations",
    label: "Operations",
    icon: Settings,
    items: [
      { id: "partners", label: "Partners", icon: Building2 },
      { id: "archive-purge", label: "Archive & Purge", icon: Trash2 },
    ],
  },
  {
    id: "user-management",
    label: "User Management",
    icon: Users,
    items: [
      { id: "user-creation", label: "User Creation", icon: UserPlus },
      { id: "user-search", label: "User Search", icon: Search },
    ],
  },
]

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(["analytics"])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const getParentSection = (sectionId: string) => {
    for (const item of menuItems) {
      if (item.items.some((subItem) => subItem.id === sectionId)) {
        return item.id
      }
    }
    return sectionId
  }

  const activeParent = getParentSection(activeSection)

  return (
    <div className="w-72 glass-sidebar flex flex-col min-h-screen max-h-screen overflow-hidden">
      {/* Logo */}
      <div className="p-8 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 premium-gradient-blue rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              EDI Monitor
            </h1>
            <p className="text-sm text-slate-500 font-medium">Premium Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isExpanded = expandedItems.includes(item.id)
          const isParentActive = activeParent === item.id || activeSection === item.id

          return (
            <Collapsible key={item.id} open={isExpanded} onOpenChange={() => toggleExpanded(item.id)}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left px-4 py-3 h-auto hover:bg-white/60 hover:shadow-md rounded-xl transition-all duration-300 group",
                    isParentActive && "bg-white/80 shadow-lg backdrop-blur-sm",
                  )}
                  onClick={() => onSectionChange(item.id)}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300",
                      isParentActive ? "premium-gradient-blue shadow-lg" : "bg-slate-100 group-hover:bg-white",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 transition-colors duration-300",
                        isParentActive ? "text-white" : "text-slate-600 group-hover:text-slate-700",
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "flex-1 text-sm font-semibold transition-colors duration-300",
                      isParentActive ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900",
                    )}
                  >
                    {item.label}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-300" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-slate-400 transition-transform duration-300" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 mt-2 ml-4">
                {item.items.map((subItem) => {
                  const SubIcon = subItem.icon
                  return (
                    <Button
                      key={subItem.id}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-left pl-8 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-white/60 hover:shadow-sm",
                        activeSection === subItem.id &&
                          "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-l-3 border-blue-500 shadow-sm",
                      )}
                      onClick={() => onSectionChange(subItem.id)}
                    >
                      <SubIcon
                        className={cn(
                          "w-4 h-4 mr-3 transition-all duration-300",
                          activeSection === subItem.id ? "text-blue-500" : "text-slate-400",
                        )}
                      />
                      {subItem.label}
                    </Button>
                  )
                })}
              </CollapsibleContent>
            </Collapsible>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-white/10">
        <div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 border border-white/20 shadow-lg">
          <div className="w-12 h-12 premium-gradient rounded-xl flex items-center justify-center shadow-lg float-animation">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">Admin User</p>
            <p className="text-xs text-slate-500 font-medium">EDI Manager</p>
          </div>
        </div>
      </div>
    </div>
  )
}
