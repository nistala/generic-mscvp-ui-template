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
import { FileText, Download, Eye, Search, Filter, RefreshCw } from "lucide-react"

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
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#0d416b] flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Document Repository
          </CardTitle>
          <CardDescription>Searchable archive of EDI documents with download and preview options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search documents..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-10 border-[#b7b2b3]/30 focus:border-[#00aae7]"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="acknowledged">Acknowledged</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="850">850 - Purchase Order</SelectItem>
                <SelectItem value="810">810 - Invoice</SelectItem>
                <SelectItem value="856">856 - ASN</SelectItem>
                <SelectItem value="855">855 - PO Acknowledgment</SelectItem>
                <SelectItem value="997">997 - Functional Ack</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-[#00aae7] hover:bg-[#0d416b]">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
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
        </CardHeader>
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
  )
}
