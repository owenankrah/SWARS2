"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { accidentReports } from "@/lib/demo-data"
import { Search, Filter } from "lucide-react"

export default function PendingApprovals() {
  const { user } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  if (!user) return null

  // Filter pending reports
  const pendingReports = accidentReports.filter((report) => report.status === "pending")

  // Filter by search query
  const filteredReports = pendingReports.filter(
    (report) =>
      report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportingOfficer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getSeverityBadge = (severity: string) => {
    const colors: Record<string, string> = {
      minor: "bg-green-100 text-green-800",
      moderate: "bg-yellow-100 text-yellow-800",
      major: "bg-red-100 text-red-800",
    }
    return colors[severity] || "bg-gray-100 text-gray-800"
  }

  const handleReviewClick = (reportId: string) => {
    router.push(`/police/pending-approvals/${reportId}`)
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-lg font-semibold">Pending Approvals</h1>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Pending Accident Reports</h2>
            <p className="text-muted-foreground">Review and approve accident reports submitted by officers.</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pending Reports</CardTitle>
            <CardDescription>{filteredReports.length} reports pending your review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search reports..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Reporting Officer</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>{report.location}</TableCell>
                        <TableCell>
                          <Badge className={getSeverityBadge(report.severity)} variant="outline">
                            {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{report.reportingOfficer}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => handleReviewClick(report.id)}>
                            Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No pending reports found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

