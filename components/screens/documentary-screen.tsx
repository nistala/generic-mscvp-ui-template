"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Archive, Download, Eye, Search, Filter, Calendar, TrendingUp } from "lucide-react"

interface DocumentaryScreenProps {
  searchQuery: string
}

const documentStats = [
  {
    title: "Total Documents",
    value: "125,847",
    change: "+2,340",
    icon: FileText,
    color: "#00aae7",
  },
  {
    title: "Archived Documents",
    value: "89,234",
    change: "+1,890",
    icon: Archive,
    color: "#10b981",
  },
  {
    title: "Document Types",
    value: "12",
    change: "+2",
    icon: Filter,
    color: "#8b5cf6",
  },
  {
    title: "Storage Used",
    value: "2.4 TB",
    change: "+180 GB",
    icon: Download,
    color: "#f59e0b",
  },
]

const recentDocuments = [
  {
    id: "DOC-2024-001",
    name: "Purchase_Order_850_Walmart_20241207.edi",
    type: "850 - Purchase Order",
    partner: "Walmart Inc.",
    size: "2.4 KB",
    status: "processed",
    date: "2024-12-07 14:30:22",
  },
  {
    id: "DOC-2024-002",
    name: "Invoice_810_Target_20241207.edi",
    type: "810 - Invoice",
    partner: "Target Corp.",
    size: "3.1 KB",
    status: "processed",
    date: "2024-12-07 13:15:10",
  },
  {
    id: "DOC-2024-003",
    name: "ASN_856_Amazon_20241207.edi",
    type: "856 - Advance Ship Notice",
    partner: "Amazon LLC",
    size: "4.2 KB",
    status: "failed",
    date: "2024-12-07 12:45:33",
  },
  {
    id: "DOC-2024-004",
    name: "Acknowledgment_855_HomeDepot_20241207.edi",
    type: "855 - PO Acknowledgment",
    partner: "Home Depot",
    size: "1.8 KB",
    status: "processed",
    date: "2024-12-07 11:20:15",
  },
]

export function DocumentaryScreen({ searchQuery }: DocumentaryScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#0d416b] to-[#00aae7] rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0d416b] via-[#00aae7] to-[#0d416b] bg-clip-text text-transparent">
                  Documentary Management
                </h1>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <p className="text-[#b7b2b3] font-medium">Document Repository Active</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button className="bg-gradient-to-r from-[#0d416b] to-[#00aae7] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl font-semibold px-6">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button className="bg-gradient-to-r from-[#0d416b] to-[#00aae7] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl font-semibold px-6">
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>
          </div>
        </div>

        {/* Document Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {documentStats.map((stat) => {
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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-l-blue-500">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg mr-4">
                <Search className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0d416b]">Document Search</h3>
                <p className="text-[#b7b2b3] text-sm">Search through all documents and archives</p>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-[#0d416b] to-[#00aae7] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl font-semibold">
              Open Search
            </Button>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-l-green-500">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg mr-4">
                <Archive className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0d416b]">Archive Manager</h3>
                <p className="text-[#b7b2b3] text-sm">Manage document archiving and retention</p>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl font-semibold">
              Manage Archives
            </Button>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-l-purple-500">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mr-4">
                <Filter className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0d416b]">Advanced Filters</h3>
                <p className="text-[#b7b2b3] text-sm">Apply advanced filtering and sorting</p>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl font-semibold">
              Open Filters
            </Button>
          </div>
        </div>

        {/* Recent Documents */}
        <div className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-[#0d416b] to-[#00aae7] rounded-xl flex items-center justify-center shadow-lg mr-4">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0d416b]">Recent Documents</h3>
              <p className="text-[#b7b2b3]">Latest document activity and processing status</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-slate-200/50">
                  <TableHead className="text-[#0d416b] font-semibold">Document</TableHead>
                  <TableHead className="text-[#0d416b] font-semibold">Type</TableHead>
                  <TableHead className="text-[#0d416b] font-semibold">Partner</TableHead>
                  <TableHead className="text-[#0d416b] font-semibold">Size</TableHead>
                  <TableHead className="text-[#0d416b] font-semibold">Status</TableHead>
                  <TableHead className="text-[#0d416b] font-semibold">Date</TableHead>
                  <TableHead className="text-[#0d416b] font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentDocuments.map((doc) => (
                  <TableRow
                    key={doc.id}
                    className="hover:bg-white/50 transition-colors duration-200 border-b border-slate-100/50"
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium text-[#0d416b]">{doc.name}</p>
                        <p className="text-sm text-[#b7b2b3]">{doc.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100/80 text-blue-700 border-blue-200/50 hover:bg-blue-100/80">
                        {doc.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[#0d416b] font-medium">{doc.partner}</TableCell>
                    <TableCell className="text-[#b7b2b3]">{doc.size}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          doc.status === "processed"
                            ? "bg-green-100/80 text-green-800 hover:bg-green-100/80 border-green-200/50"
                            : "bg-red-100/80 text-red-800 hover:bg-red-100/80 border-red-200/50"
                        }
                      >
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[#b7b2b3]">{new Date(doc.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-200/50 text-blue-700 hover:bg-blue-50/80 rounded-lg"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-200/50 text-slate-700 hover:bg-slate-50/80 rounded-lg"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
