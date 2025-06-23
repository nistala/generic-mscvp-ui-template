"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar,Filter,Download,Sparkles } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building2, Mail, Phone, Settings, CheckCircle, XCircle } from "lucide-react"

const partners = [
  {
    id: "P001",
    name: "Walmart Inc.",
    contact: {
      name: "John Smith",
      email: "john.smith@walmart.com",
      phone: "+1 (555) 123-4567",
    },
    status: "active",
    connectionType: "AS2",
    lastActivity: "2024-12-07 15:30:00",
    alertsEnabled: true,
    acknowledgmentRequired: true,
    slaThreshold: 24,
    transactionTypes: ["850", "855", "856", "810"],
  },
  {
    id: "P002",
    name: "Target Corp.",
    contact: {
      name: "Sarah Johnson",
      email: "sarah.johnson@target.com",
      phone: "+1 (555) 234-5678",
    },
    status: "active",
    connectionType: "SFTP",
    lastActivity: "2024-12-07 14:45:00",
    alertsEnabled: true,
    acknowledgmentRequired: false,
    slaThreshold: 12,
    transactionTypes: ["850", "810", "997"],
  },
  {
    id: "P003",
    name: "Amazon LLC",
    contact: {
      name: "Mike Davis",
      email: "mike.davis@amazon.com",
      phone: "+1 (555) 345-6789",
    },
    status: "inactive",
    connectionType: "AS2",
    lastActivity: "2024-12-06 09:15:00",
    alertsEnabled: false,
    acknowledgmentRequired: true,
    slaThreshold: 6,
    transactionTypes: ["850", "855", "856"],
  },
  {
    id: "P004",
    name: "Home Depot",
    contact: {
      name: "Lisa Wilson",
      email: "lisa.wilson@homedepot.com",
      phone: "+1 (555) 456-7890",
    },
    status: "active",
    connectionType: "HTTPS",
    lastActivity: "2024-12-07 16:20:00",
    alertsEnabled: true,
    acknowledgmentRequired: true,
    slaThreshold: 24,
    transactionTypes: ["850", "855", "810", "997"],
  },
  {
    id: "P005",
    name: "Costco",
    contact: {
      name: "Robert Brown",
      email: "robert.brown@costco.com",
      phone: "+1 (555) 567-8901",
    },
    status: "active",
    connectionType: "AS2",
    lastActivity: "2024-12-07 13:10:00",
    alertsEnabled: true,
    acknowledgmentRequired: false,
    slaThreshold: 48,
    transactionTypes: ["850", "997"],
  },
]

export function PartnersScreen() {
  const [selectedPartner, setSelectedPartner] = useState<(typeof partners)[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
    const [isAccordionOpen, setIsAccordionOpen] = useState(false)

  const filteredPartners = partners.filter(
    (partner) =>
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.contact.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const activePartners = partners.filter((p) => p.status === "active").length
  const inactivePartners = partners.filter((p) => p.status === "inactive").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-150 via-blue-150 to-indigo-200 p-3 w-full">
     <div className="space-y-3 w-full">
       <div className="flex items-center justify-between w-full">
           <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#0d416b] via-[#00aae7] to-[#0d416b] bg-clip-text text-transparent">
             Trading Partners
          </h1>
          <p className="text-[#b7b2b3] mt-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             Partner contact information and configuration settings
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
       <Card className="w-full">
       {/* <CardHeader>
      <CardTitle className="text-[#0d416b] flex items-center">
        <Building2 className="h-5 w-5 mr-2" />
        Trading Partners
      </CardTitle>
      <CardDescription>Partner contact information and configuration settings</CardDescription>
       </CardHeader> */}
       <CardContent className="w-full">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
         <TableHead>Partner</TableHead>
         <TableHead>Contact</TableHead>
         <TableHead>Connection</TableHead>
         <TableHead>Status</TableHead>
         <TableHead>Last Activity</TableHead>
         <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPartners.map((partner) => (
         <TableRow key={partner.id} className="hover:bg-gray-50">
           <TableCell>
          <div>
            <p className="font-medium text-[#0d416b]">{partner.name}</p>
            <p className="text-sm text-[#b7b2b3]">{partner.id}</p>
          </div>
           </TableCell>
           <TableCell>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Mail className="h-3 w-3 text-[#00aae7]" />
              <span className="text-sm text-[#0d416b]">{partner.contact.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-[#b7b2b3]">{partner.contact.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-3 w-3 text-[#00aae7]" />
              <span className="text-xs text-[#b7b2b3]">{partner.contact.phone}</span>
            </div>
          </div>
           </TableCell>
           <TableCell>
          <Badge variant="outline" className="border-[#00aae7] text-[#00aae7]">
            {partner.connectionType}
          </Badge>
           </TableCell>
           <TableCell>
          {partner.status === "active" ? (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              <CheckCircle className="h-3 w-3 mr-1" />
              Active
            </Badge>
          ) : (
            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
              <XCircle className="h-3 w-3 mr-1" />
              Inactive
            </Badge>
          )}
           </TableCell>
           <TableCell className="text-[#b7b2b3]">
          {new Date(partner.lastActivity).toLocaleDateString()}
          <p className="text-xs">{new Date(partner.lastActivity).toLocaleTimeString()}</p>
           </TableCell>
           <TableCell>
          <Dialog>
            <DialogTrigger asChild>
              <Button
             variant="outline"
             size="sm"
             className="border-[#00aae7] text-[#00aae7] hover:bg-[#00aae7]/10"
             onClick={() => setSelectedPartner(partner)}
              >
             <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
             <DialogTitle className="text-[#0d416b]">Partner Settings</DialogTitle>
             <DialogDescription>{selectedPartner?.name} configuration</DialogDescription>
              </DialogHeader>
              {selectedPartner && (
             <div className="space-y-6">
               {/* Contact Information */}
               <div className="space-y-4">
              <h4 className="font-medium text-[#0d416b]">Contact Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input
                 id="contactName"
                 defaultValue={selectedPartner.contact.name}
                 className="border-[#b7b2b3]/30 focus:border-[#00aae7]"
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                 id="contactEmail"
                 defaultValue={selectedPartner.contact.email}
                 className="border-[#b7b2b3]/30 focus:border-[#00aae7]"
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Phone</Label>
                  <Input
                 id="contactPhone"
                 defaultValue={selectedPartner.contact.phone}
                 className="border-[#b7b2b3]/30 focus:border-[#00aae7]"
                  />
                </div>
                <div>
                  <Label htmlFor="slaThreshold">SLA Threshold (hours)</Label>
                  <Input
                 id="slaThreshold"
                 type="number"
                 defaultValue={selectedPartner.slaThreshold}
                 className="border-[#b7b2b3]/30 focus:border-[#00aae7]"
                  />
                </div>
              </div>
               </div>

               {/* Alert Settings */}
               <div className="space-y-4">
              <h4 className="font-medium text-[#0d416b]">Alert & Acknowledgment Settings</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                 <Label className="text-[#0d416b]">Enable Alerts</Label>
                 <p className="text-sm text-[#b7b2b3]">Receive notifications for this partner</p>
                  </div>
                  <Switch defaultChecked={selectedPartner.alertsEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                 <Label className="text-[#0d416b]">Acknowledgment Required</Label>
                 <p className="text-sm text-[#b7b2b3]">Require acknowledgment for transactions</p>
                  </div>
                  <Switch defaultChecked={selectedPartner.acknowledgmentRequired} />
                </div>
              </div>
               </div>

               {/* Transaction Types */}
               <div className="space-y-4">
              <h4 className="font-medium text-[#0d416b]">Supported Transaction Types</h4>
              <div className="flex flex-wrap gap-2">
                {selectedPartner.transactionTypes.map((type) => (
                  <Badge key={type} variant="outline" className="border-[#00aae7] text-[#00aae7]">
                 {type}
                  </Badge>
                ))}
              </div>
               </div>

               <div className="flex justify-end space-x-2">
              <Button variant="outline" className="border-[#b7b2b3] text-[#0d416b]">
                Cancel
              </Button>
              <Button className="bg-[#00aae7] hover:bg-[#0d416b]">Save Settings</Button>
               </div>
             </div>
              )}
            </DialogContent>
          </Dialog>
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
