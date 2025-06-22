"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Play, Pause } from "lucide-react"

const scheduledJobs = [
  {
    id: "SCH-001",
    name: "Daily Transaction Report",
    schedule: "0 6 * * *",
    nextRun: "2024-12-08 06:00:00",
    status: "active",
    lastRun: "2024-12-07 06:00:00",
  },
  {
    id: "SCH-002",
    name: "Partner Volume Analysis",
    schedule: "0 0 * * 1",
    nextRun: "2024-12-09 00:00:00",
    status: "active",
    lastRun: "2024-12-02 00:00:00",
  },
  {
    id: "SCH-003",
    name: "SLA Compliance Check",
    schedule: "0 */4 * * *",
    nextRun: "2024-12-07 20:00:00",
    status: "paused",
    lastRun: "2024-12-07 16:00:00",
  },
]

export function SchedulerScreen() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-[#0d416b] flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Scheduler
          </CardTitle>
          <CardDescription>Manage scheduled jobs and automated tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#0d416b]">{scheduledJobs.length}</div>
                <p className="text-sm text-[#b7b2b3]">Total Jobs</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {scheduledJobs.filter((j) => j.status === "active").length}
                </div>
                <p className="text-sm text-[#b7b2b3]">Active</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {scheduledJobs.filter((j) => j.status === "paused").length}
                </div>
                <p className="text-sm text-[#b7b2b3]">Paused</p>
              </div>
            </div>
            <Button className="bg-[#00aae7] hover:bg-[#0d416b]">Create New Job</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Name</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Next Run</TableHead>
                <TableHead>Last Run</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduledJobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <p className="font-medium text-[#0d416b]">{job.name}</p>
                      <p className="text-sm text-[#b7b2b3]">{job.id}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-[#0d416b]">{job.schedule}</TableCell>
                  <TableCell className="text-[#0d416b]">
                    {new Date(job.nextRun).toLocaleDateString()}
                    <p className="text-xs text-[#b7b2b3]">{new Date(job.nextRun).toLocaleTimeString()}</p>
                  </TableCell>
                  <TableCell className="text-[#b7b2b3]">
                    {new Date(job.lastRun).toLocaleDateString()}
                    <p className="text-xs">{new Date(job.lastRun).toLocaleTimeString()}</p>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        job.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      }
                    >
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className={
                          job.status === "active"
                            ? "border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                            : "border-green-500 text-green-600 hover:bg-green-50"
                        }
                      >
                        {job.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#00aae7] text-[#00aae7] hover:bg-[#00aae7]/10"
                      >
                        Edit
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
