"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Filter, Search, SlidersHorizontal } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"

/**
 * Accident Reports List Page
 *
 * This component displays a list of accident reports associated with the current user.
 * It allows filtering, searching, and viewing individual reports.
 *
 * @component
 * @returns {JSX.Element} The accident reports list page UI
 *
 * @backend
 * Required API endpoints:
 * - GET /api/accident-reports - Fetch all accident reports for the current user
 * - GET /api/accident-reports?search={query} - Search accident reports
 * - GET /api/accident-reports?status={status} - Filter reports by status
 */
export default function AccidentReportsPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for accident reports
  const reports = [
    {
      id: "ACC-12345",
      date: "May 15, 2023",
      location: "Accra Ring Road, near Danquah Circle",
      vehicle: "Toyota Corolla (GR-1234-20)",
      status: "Approved",
      otherParty: "Honda Civic (GW-5678-21)",
    },
    {
      id: "ACC-23456",
      date: "March 10, 2023",
      location: "Tema Motorway",
      vehicle: "Honda Civic (GW-5678-21)",
      status: "Approved",
      otherParty: "Nissan Altima (GR-3456-22)",
    },
    {
      id: "ACC-34567",
      date: "January 5, 2023",
      location: "Spintex Road",
      vehicle: "Toyota Corolla (GR-1234-20)",
      status: "Approved",
      otherParty: "Ford Focus (GN-7890-21)",
    },
  ]

  // Filter reports based on search query
  const filteredReports = reports.filter(
    (report) =>
      report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.vehicle.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Accident Reports</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Sort
        </Button>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reports</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Reports</CardTitle>
          <CardDescription>View all your accident reports</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredReports.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">No reports found matching your search criteria.</p>
          ) : (
            <div className="rounded-md border">
              <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                <div>Report ID</div>
                <div className="col-span-2">Location</div>
                <div>Date</div>
                <div>Status</div>
                <div>Actions</div>
              </div>
              {filteredReports.map((report) => (
                <div key={report.id} className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-muted/50">
                  <div className="font-medium">{report.id}</div>
                  <div className="col-span-2">
                    <div>{report.location}</div>
                    <div className="text-sm text-muted-foreground">{report.vehicle}</div>
                  </div>
                  <div>{report.date}</div>
                  <div>
                    <Badge
                      variant={
                        report.status === "Approved" ? "success" : report.status === "Pending" ? "outline" : "secondary"
                      }
                    >
                      {report.status}
                    </Badge>
                  </div>
                  <div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/driver/accident-reports/${report.id}`}>
                        <FileText className="h-4 w-4 mr-2" />
                        View
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

