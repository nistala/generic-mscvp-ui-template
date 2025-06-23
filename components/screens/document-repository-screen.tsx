"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Download, Eye, Search, Filter, RefreshCw,Calendar,Sparkles } from "lucide-react"

interface DocumentRepositoryScreenProps {
  searchQuery: string
}

const documents = [
  {
    id: "DOC-001",
    name: "PO_850_Walmart_20241207.edi",
    type: "850",
    partner: "Walmart Inc.",
    size: "2.4 KB",
    status: "acknowledged",
    createdAt: "2024-12-07 14:30:22",
    processedAt: "2024-12-07 14:30:45",
    reprocessed: false,
    content: `ISA*00*          *00*          *ZZ*SENDER         *ZZ*RECEIVER       *241207*1430*U*00401*000000001*0*P*>~`,
  },
  {
    id: "DOC-002",
    name: "INV_810_Target_20241207.edi",
    type: "810",
    partner: "Target Corp.",
    size: "3.1 KB",
    status: "acknowledged",
    createdAt: "2024-12-07 13:15:10",
    processedAt: "2024-12-07 13:15:28",
    reprocessed: false,
    content: `ISA*00*          *00*          *ZZ*SENDER         *ZZ*TARGET         *241207*1315*U*00401*000000002*0*P*>~`,
  },
  {
    id: "DOC-003",
    name: "ASN_856_Amazon_20241207.edi",
    type: "856",
    partner: "Amazon LLC",
    size: "4.2 KB",
    status: "failed",
    createdAt: "2024-12-07 12:45:33",
    processedAt: "2024-12-07 12:45:55",
    reprocessed: true,
    content: `ISA*00*          *00*          *ZZ*SENDER         *ZZ*AMAZON         *241207*1245*U*00401*000000003*0*P*>~`,
  },
  {
    id: "DOC-004",
    name: "ACK_855_HomeDepot_20241207.edi",
    type: "855",
    partner: "Home Depot",
    size: "1.8 KB",
    status: "acknowledged",
    createdAt: "2024-12-07 11:20:15",
    processedAt: "2024-12-07 11:20:32",
    reprocessed: false,
    content: `ISA*00*          *00*          *ZZ*SENDER         *ZZ*HOMEDEPOT      *241207*1120*U*00401*000000004*0*P*>~`,
  },
  {
    id: "DOC-005",
    name: "FA_997_Costco_20241207.edi",
    type: "997",
    partner: "Costco",
    size: "0.9 KB",
    status: "acknowledged",
    createdAt: "2024-12-07 10:55:42",
    processedAt: "2024-12-07 10:55:48",
    reprocessed: false,
    content: `ISA*00*          *00*          *ZZ*SENDER         *ZZ*COSTCO         *241207*1055*U*00401*000000005*0*P*>~`,
  },
]

export function DocumentRepositoryScreen({ searchQuery }: DocumentRepositoryScreenProps) {
  const [selectedDocument, setSelectedDocument] = useState<(typeof documents)[0] | null>(null)
  const [localSearch, setLocalSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const [isAccordionOpen, setIsAccordionOpen] = useState(false)
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes((searchQuery || localSearch).toLowerCase()) ||
      doc.partner.toLowerCase().includes((searchQuery || localSearch).toLowerCase()) ||
      doc.type.toLowerCase().includes((searchQuery || localSearch).toLowerCase())

    const matchesStatus = statusFilter === "all" || doc.status === statusFilter
    const matchesType = typeFilter === "all" || doc.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string, reprocessed: boolean) => {
    if (reprocessed) {
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Reprocessed</Badge>
    }

    switch (status) {
      case "acknowledged":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Acknowledged</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
    }
  }

  const getTypeDescription = (type: string) => {
    const types: { [key: string]: string } = {
      "850": "Purchase Order",
      "810": "Invoice",
      "856": "Advance Ship Notice",
      "855": "PO Acknowledgment",
      "997": "Functional Acknowledgment",
    }
    return types[type] || type
  }

  return (
       <div className="min-h-screen bg-gradient-to-br from-slate-150 via-blue-150 to-indigo-200 p-3">
      <div className="space-y-3 ">
           <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-[#0d416b] via-[#00aae7] to-[#0d416b] bg-clip-text text-transparent">
                       EDI Document Repository
                    </h1>
                    <p className="text-[#b7b2b3] mt-2 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                       Searchable archive of EDI documents with download and preview
                    </p>
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
        <Card>
        {/* <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#0d416b]">EDI Documents</CardTitle>
              <CardDescription>
                Showing {filteredDocuments.length} of {documents.length} documents
              </CardDescription>
            </div>
            <Button variant="outline" className="border-[#b7b2b3] text-[#0d416b]">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </CardHeader> */}
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Partner</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <p className="font-medium text-[#0d416b]">{doc.name}</p>
                      <p className="text-sm text-[#b7b2b3]">{doc.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Badge variant="outline" className="border-[#00aae7] text-[#00aae7]">
                        {doc.type}
                      </Badge>
                      <p className="text-xs text-[#b7b2b3] mt-1">{getTypeDescription(doc.type)}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#0d416b]">{doc.partner}</TableCell>
                  <TableCell className="text-[#b7b2b3]">{doc.size}</TableCell>
                  <TableCell>{getStatusBadge(doc.status, doc.reprocessed)}</TableCell>
                  <TableCell className="text-[#b7b2b3]">
                    {new Date(doc.createdAt).toLocaleDateString()}
                    <p className="text-xs">{new Date(doc.createdAt).toLocaleTimeString()}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#00aae7] text-[#00aae7] hover:bg-[#00aae7]/10"
                            onClick={() => setSelectedDocument(doc)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-[#0d416b]">Document Preview</DialogTitle>
                            <DialogDescription>{selectedDocument?.name}</DialogDescription>
                          </DialogHeader>
                          {selectedDocument && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                                <div>
                                  <p className="text-xs text-[#b7b2b3]">Document ID</p>
                                  <p className="font-medium text-[#0d416b]">{selectedDocument.id}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-[#b7b2b3]">Partner</p>
                                  <p className="font-medium text-[#0d416b]">{selectedDocument.partner}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-[#b7b2b3]">Type</p>
                                  <p className="font-medium text-[#0d416b]">
                                    {selectedDocument.type} - {getTypeDescription(selectedDocument.type)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-[#b7b2b3]">Status</p>
                                  {getStatusBadge(selectedDocument.status, selectedDocument.reprocessed)}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium text-[#0d416b] mb-2">Document Content</h4>
                                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto font-mono">
                                  {selectedDocument.content}
                                </pre>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#b7b2b3] text-[#0d416b] hover:bg-[#00aae7]/10"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      {doc.status === "failed" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-orange-500 text-orange-600 hover:bg-orange-50"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
       
  </div>
    </div>
  )
}
