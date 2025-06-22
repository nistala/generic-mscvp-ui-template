"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Download, Eye, Calendar, User, Hash } from "lucide-react"

interface DocumentRepositoryProps {
  searchQuery: string
}

const documents = [
  {
    id: "DOC-001",
    name: "Purchase_Order_850_Walmart_20241201.edi",
    type: "850 - Purchase Order",
    partner: "Walmart Inc.",
    size: "2.4 KB",
    status: "processed",
    createdAt: "2024-12-01 14:30:22",
    processedAt: "2024-12-01 14:30:45",
    content: `ISA*00*          *00*          *ZZ*SENDER         *ZZ*RECEIVER       *241201*1430*U*00401*000000001*0*P*>~
GS*PO*SENDER*RECEIVER*20241201*1430*1*X*004010~
ST*850*0001~
BEG*00*SA*PO123456**20241201~
REF*DP*DEPT001~
DTM*002*20241205~
N1*ST*SHIP TO LOCATION~
N3*123 MAIN STREET~
N4*ANYTOWN*NY*12345*US~
PO1*1*100*EA*12.50*PE*VP*ITEM001*SK*SKU123~
CTT*1~
SE*10*0001~
GE*1*1~
IEA*1*000000001~`,
  },
  {
    id: "DOC-002",
    name: "Invoice_810_Target_20241201.edi",
    type: "810 - Invoice",
    partner: "Target Corp.",
    size: "3.1 KB",
    status: "processed",
    createdAt: "2024-12-01 13:15:10",
    processedAt: "2024-12-01 13:15:28",
    content: `ISA*00*          *00*          *ZZ*SENDER         *ZZ*TARGET         *241201*1315*U*00401*000000002*0*P*>~
GS*IN*SENDER*TARGET*20241201*1315*2*X*004010~
ST*810*0002~
BIG*20241201*INV456789*20241130*PO789012~
REF*DP*DEPT002~
N1*BT*BILL TO~
N3*456 COMMERCE BLVD~
N4*MINNEAPOLIS*MN*55401*US~
IT1*1*50*EA*25.00**VP*ITEM002*SK*SKU456~
TDS*125000~
CTT*1~
SE*12*0002~
GE*1*2~
IEA*1*000000002~`,
  },
  {
    id: "DOC-003",
    name: "ASN_856_Amazon_20241201.edi",
    type: "856 - Advance Ship Notice",
    partner: "Amazon LLC",
    size: "4.2 KB",
    status: "failed",
    createdAt: "2024-12-01 12:45:33",
    processedAt: "2024-12-01 12:45:55",
    content: `ISA*00*          *00*          *ZZ*SENDER         *ZZ*AMAZON         *241201*1245*U*00401*000000003*0*P*>~
GS*SH*SENDER*AMAZON*20241201*1245*3*X*004010~
ST*856*0003~
BSN*00*SHIP123*20241201*1245~
DTM*011*20241202~
N1*SF*SHIP FROM~
N3*789 WAREHOUSE DR~
N4*SEATTLE*WA*98101*US~
HL*1**S~
TD5*B*2*UPS*G*GROUND~
REF*BM*BOL789~
HL*2*1*O~
PRF*PO345678~
HL*3*2*I~
LIN*1*SK*SKU789~
SN1*1*100*EA~
CTT*3~
SE*16*0003~
GE*1*3~
IEA*1*000000003~`,
  },
  {
    id: "DOC-004",
    name: "Acknowledgment_855_HomeDepot_20241201.edi",
    type: "855 - Purchase Order Acknowledgment",
    partner: "Home Depot",
    size: "1.8 KB",
    status: "processed",
    createdAt: "2024-12-01 11:20:15",
    processedAt: "2024-12-01 11:20:32",
    content: `ISA*00*          *00*          *ZZ*SENDER         *ZZ*HOMEDEPOT      *241201*1120*U*00401*000000004*0*P*>~
GS*PR*SENDER*HOMEDEPOT*20241201*1120*4*X*004010~
ST*855*0004~
BAK*00*AC*PO567890**20241201~
REF*DP*DEPT003~
DTM*002*20241206~
N1*ST*SHIP TO STORE~
N3*321 RETAIL PLAZA~
N4*ATLANTA*GA*30309*US~
PO1*1*75*EA*18.99*PE*VP*ITEM003*SK*SKU321~
ACK*AC*75*EA*18.99*PE~
CTT*1~
SE*11*0004~
GE*1*4~
IEA*1*000000004~`,
  },
  {
    id: "DOC-005",
    name: "FunctionalAck_997_Costco_20241201.edi",
    type: "997 - Functional Acknowledgment",
    partner: "Costco",
    size: "0.9 KB",
    status: "processed",
    createdAt: "2024-12-01 10:55:42",
    processedAt: "2024-12-01 10:55:48",
    content: `ISA*00*          *00*          *ZZ*SENDER         *ZZ*COSTCO         *241201*1055*U*00401*000000005*0*P*>~
GS*FA*SENDER*COSTCO*20241201*1055*5*X*004010~
ST*997*0005~
AK1*PO*12345~
AK2*850*0001~
AK5*A~
AK9*A*1*1*1~
SE*6*0005~
GE*1*5~
IEA*1*000000005~`,
  },
]

export function DocumentRepository({ searchQuery }: DocumentRepositoryProps) {
  const [selectedDocument, setSelectedDocument] = useState<(typeof documents)[0] | null>(null)

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.partner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-[#0d416b] flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Document Repository
          </CardTitle>
          <CardDescription>EDI documents, acknowledgments, and error logs</CardDescription>
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
                <TableRow key={doc.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-[#0d416b]">{doc.name}</p>
                      <p className="text-sm text-[#b7b2b3]">{doc.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-[#00aae7] text-[#00aae7]">
                      {doc.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[#0d416b]">{doc.partner}</TableCell>
                  <TableCell className="text-[#b7b2b3]">{doc.size}</TableCell>
                  <TableCell>
                    <Badge
                      variant={doc.status === "processed" ? "default" : "destructive"}
                      className={
                        doc.status === "processed"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[#b7b2b3]">{new Date(doc.createdAt).toLocaleDateString()}</TableCell>
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
                            <DialogTitle className="text-[#0d416b]">Document Details</DialogTitle>
                            <DialogDescription>{selectedDocument?.name}</DialogDescription>
                          </DialogHeader>
                          {selectedDocument && (
                            <div className="space-y-4">
                              {/* Document Metadata */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-2">
                                  <Hash className="h-4 w-4 text-[#00aae7]" />
                                  <div>
                                    <p className="text-xs text-[#b7b2b3]">Document ID</p>
                                    <p className="font-medium text-[#0d416b]">{selectedDocument.id}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <User className="h-4 w-4 text-[#00aae7]" />
                                  <div>
                                    <p className="text-xs text-[#b7b2b3]">Partner</p>
                                    <p className="font-medium text-[#0d416b]">{selectedDocument.partner}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Calendar className="h-4 w-4 text-[#00aae7]" />
                                  <div>
                                    <p className="text-xs text-[#b7b2b3]">Created</p>
                                    <p className="font-medium text-[#0d416b]">{selectedDocument.createdAt}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <FileText className="h-4 w-4 text-[#00aae7]" />
                                  <div>
                                    <p className="text-xs text-[#b7b2b3]">Size</p>
                                    <p className="font-medium text-[#0d416b]">{selectedDocument.size}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Document Content */}
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
