"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, AlertTriangle, Clock, Database } from "lucide-react"

const archiveJobs = [
  {
    id: "ARC-001",
    name: "Monthly Document Archive",
    schedule: "0 0 1 * *",
    lastRun: "2024-12-01 00:00:00",
    nextRun: "2025-01-01 00:00:00",
    status: "active",
    documentsArchived: 125000,
    retentionDays: 2555, // 7 years
  },
  {
    id: "ARC-002",
    name: "Weekly Log Archive",
    schedule: "0 0 * * 0",
    lastRun: "2024-12-01 00:00:00",
    nextRun: "2024-12-08 00:00:00",
    status: "active",
    documentsArchived: 45000,
    retentionDays: 365, // 1 year
  },
  {
    id: "ARC-003",
    name: "Failed Transaction Cleanup",
    schedule: "0 2 * * *",
    lastRun: "2024-12-07 02:00:00",
    nextRun: "2024-12-08 02:00:00",
    status: "active",
    documentsArchived: 2300,
    retentionDays: 90, // 3 months
  },
]

const retentionPolicies = [
  {
    type: "EDI Documents",
    retentionPeriod: "7 years",
    autoArchive: true,
    autoPurge: false,
    currentCount: 2500000,
    archivedCount: 1200000,
  },
  {
    type: "Transaction Logs",
    retentionPeriod: "1 year",
    autoArchive: true,
    autoPurge: true,
    currentCount: 850000,
    archivedCount: 450000,
  },
  {
    type: "Error Logs",
    retentionPeriod: "3 months",
    autoArchive: true,
    autoPurge: true,
    currentCount: 125000,
    archivedCount: 75000,
  },
  {
    type: "Acknowledgments",
    retentionPeriod: "2 years",
    autoArchive: true,
    autoPurge: false,
    currentCount: 1800000,
    archivedCount: 900000,
  },
]

export function ArchivePurgeScreen() {
  const [showPurgeConfirm, setShowPurgeConfirm] = useState(false)
  const [selectedPolicy, setSelectedPolicy] = useState("")

  const totalDocuments = retentionPolicies.reduce((sum, policy) => sum + policy.currentCount, 0)
  const totalArchived = retentionPolicies.reduce((sum, policy) => sum + policy.archivedCount, 0)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-[#00aae7]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#0d416b]">Total Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0d416b]">{totalDocuments.toLocaleString()}</div>
            <p className="text-xs text-[#b7b2b3] mt-1">Active documents</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#0d416b]">Archived</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0d416b]">{totalArchived.toLocaleString()}</div>
            <p className="text-xs text-[#b7b2b3] mt-1">Archived documents</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#0d416b]">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0d416b]">
              {archiveJobs.filter((j) => j.status === "active").length}
            </div>
            <p className="text-xs text-[#b7b2b3] mt-1">Scheduled jobs</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#0d416b]">Storage Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0d416b]">2.4 TB</div>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mt-1">65% reduction</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Manual Purge Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#0d416b] flex items-center">
            <Trash2 className="h-5 w-5 mr-2" />
            Manual Purge
          </CardTitle>
          <CardDescription>Manually purge documents with confirmation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="purgeType">Document Type</Label>
                <Select value={selectedPolicy} onValueChange={setSelectedPolicy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {retentionPolicies.map((policy) => (
                      <SelectItem key={policy.type} value={policy.type}>
                        {policy.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="purgeDate">Purge Before Date</Label>
                <Input id="purgeDate" type="date" className="border-[#b7b2b3]/30 focus:border-[#00aae7]" />
              </div>
              <div className="flex items-end">
                <Button variant="destructive" onClick={() => setShowPurgeConfirm(true)} disabled={!selectedPolicy}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Purge Documents
                </Button>
              </div>
            </div>

            {showPurgeConfirm && (
              <Alert className="border-red-500">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="text-red-600">Confirm Purge Operation</AlertTitle>
                <AlertDescription>
                  <p className="text-red-600 mb-4">
                    This action will permanently delete documents and cannot be undone. Please confirm you want to
                    proceed with purging {selectedPolicy} documents.
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="destructive" size="sm" onClick={() => setShowPurgeConfirm(false)}>
                      Confirm Purge
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowPurgeConfirm(false)}>
                      Cancel
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Retention Policies */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#0d416b] flex items-center">
            <Database className="h-5 w-5 mr-2" />
            Retention Policy Configuration
          </CardTitle>
          <CardDescription>Configure automatic archiving and purging policies</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Type</TableHead>
                <TableHead>Retention Period</TableHead>
                <TableHead>Current Count</TableHead>
                <TableHead>Archived Count</TableHead>
                <TableHead>Auto Archive</TableHead>
                <TableHead>Auto Purge</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {retentionPolicies.map((policy) => (
                <TableRow key={policy.type} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-[#0d416b]">{policy.type}</TableCell>
                  <TableCell className="text-[#0d416b]">{policy.retentionPeriod}</TableCell>
                  <TableCell className="text-[#0d416b]">{policy.currentCount.toLocaleString()}</TableCell>
                  <TableCell className="text-[#b7b2b3]">{policy.archivedCount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Switch defaultChecked={policy.autoArchive} />
                  </TableCell>
                  <TableCell>
                    <Switch defaultChecked={policy.autoPurge} />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#00aae7] text-[#00aae7] hover:bg-[#00aae7]/10"
                    >
                      Configure
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Scheduled Archive Jobs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#0d416b] flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Scheduled Archive Jobs
          </CardTitle>
          <CardDescription>Schedule-based archive jobs and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Name</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Last Run</TableHead>
                <TableHead>Next Run</TableHead>
                <TableHead>Documents Archived</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {archiveJobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <p className="font-medium text-[#0d416b]">{job.name}</p>
                      <p className="text-sm text-[#b7b2b3]">{job.id}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-[#0d416b]">{job.schedule}</TableCell>
                  <TableCell className="text-[#b7b2b3]">
                    {new Date(job.lastRun).toLocaleDateString()}
                    <p className="text-xs">{new Date(job.lastRun).toLocaleTimeString()}</p>
                  </TableCell>
                  <TableCell className="text-[#0d416b]">
                    {new Date(job.nextRun).toLocaleDateString()}
                    <p className="text-xs">{new Date(job.nextRun).toLocaleTimeString()}</p>
                  </TableCell>
                  <TableCell className="text-[#0d416b] font-medium">{job.documentsArchived.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{job.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#00aae7] text-[#00aae7] hover:bg-[#00aae7]/10"
                      >
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="border-green-500 text-green-600 hover:bg-green-50">
                        Run Now
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
