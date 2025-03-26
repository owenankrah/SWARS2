"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle, Eye, Filter, Search, SlidersHorizontal } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Textarea } from "@/components/ui/textarea"
import { approveAndGenerateReport } from "@/lib/generate-accident-report"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

/**
 * Approve Reports Page
 *
 * This component allows police officers to review and approve accident reports.
 * When a report is approved, it triggers the auto-generation of the official report.
 *
 * @component
 * @returns {JSX.Element} The approve reports page UI
 *
 * @backend
 * Required API endpoints:
 * - GET /api/accident-reports?status=pending - Fetch reports pending approval
 * - GET /api/accident-reports?status=approved - Fetch recently approved reports
 * - GET /api/accident-reports/:id - Fetch detailed report information
 * - PATCH /api/accident-reports/:id/approve - Approve a report
 * - PATCH /api/accident-reports/:id/reject - Reject a report
 * - POST /api/accident-reports/:id/generate - Generate the official report
 */

export default function ApproveReportsPage() {
  const { user } = useAuth()
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [viewingReport, setViewingReport] = useState(false)
  const [approvalNotes, setApprovalNotes] = useState("")
  const [reportApproved, setReportApproved] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for pending reports
  const pendingReports = [
    {
      id: "ACC-12345",
      date: "May 15, 2023",
      location: "Accra Ring Road, near Danquah Circle",
      officer: "Officer Jane Smith",
      submitted: "May 16, 2023",
      status: "Pending Approval",
      priority: "High",
    },
    {
      id: "ACC-23456",
      date: "May 18, 2023",
      location: "Tema Motorway",
      officer: "Officer John Doe",
      submitted: "May 19, 2023",
      status: "Pending Approval",
      priority: "Medium",
    },
    {
      id: "ACC-34567",
      date: "May 20, 2023",
      location: "Spintex Road",
      officer: "Officer Kwame Asante",
      submitted: "May 21, 2023",
      status: "Pending Approval",
      priority: "Low",
    },
  ]

  // Filter reports based on search query
  const filteredReports = pendingReports.filter(
    (report) =>
      report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.officer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  /**
   * Approves an accident report and triggers report generation
   *
   * @backend
   * This function should call:
   * - PATCH /api/accident-reports/:id/approve - To approve the report
   * - POST /api/accident-reports/:id/generate - To generate the official report
   *
   * The backend should update the report status, record the approving officer,
   * and generate the official report document.
   */
  const handleApproveReport = () => {
    // In a real application, this would call the API to approve the report
    // For demo purposes, we'll just simulate the approval

    // This would trigger the auto-generation of the report
    const reportData = {
      id: selectedReport,
      date: "May 15, 2023",
      time: "15:00",
      location: "Accra Ring Road, near Danquah Circle",
      municipality: "Accra Metropolitan",
      collisionDetails: {
        weather: "Clear",
        roadConditions: "Dry",
        locationType: "Intersection",
        description:
          "Vehicle 2 (Honda Civic) rear-ended Vehicle 1 (Toyota Corolla) while Vehicle 1 was stationary at a red light.",
      },
      vehicle1: {
        registration: "GR-1234-20",
        make: "Toyota",
        model: "Corolla",
        year: "2008",
        color: "Grey",
        owner: "Jane Mensah-Koduah",
        driver: "Owen Ankrah",
        driverLicense: "A59396132880406",
        insurance: {
          company: "Belair Insurance",
          policyNumber: "E840364",
          expiryDate: "2025-02-01",
        },
        damage: {
          description: "Rear bumper damage, broken tail lights, and minor trunk damage.",
          severity: "Moderate",
          estimatedCost: "₵4,680",
        },
      },
      vehicle2: {
        registration: "GW-5678-21",
        make: "Honda",
        model: "Civic",
        year: "2005",
        color: "Silver",
        owner: "William Hay",
        driver: "William Hay",
        driverLicense: "H09527857800408",
        insurance: {
          company: "Security National",
          policyNumber: "00105255359",
          expiryDate: "2024-12-31",
        },
        damage: {
          description: "Front bumper damage, hood damage, and radiator damage.",
          severity: "Moderate",
          estimatedCost: "₵5,200",
        },
      },
      witnesses: [
        {
          name: "Damian",
          contact: "(289) 923-2961",
          statement:
            "I was standing at the bus stop when I saw the Honda Civic hit the Toyota Corolla from behind while it was stopped at the red light.",
        },
      ],
      faultDetermination: {
        atFault: "Vehicle 2",
        reason: "Failed to maintain safe stopping distance",
      },
      officerInfo: {
        name: user?.name || "Officer John Doe",
        badgeNumber: "3819",
        station: "Accra Central Police Station",
      },
    }

    // Call the function to approve and generate the report
    approveAndGenerateReport(reportData)

    setReportApproved(true)
  }

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Approve Accident Reports</h1>

      {reportApproved && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            The accident report {selectedReport} has been approved and auto-generated. It is now available in the
            system.
          </AlertDescription>
        </Alert>
      )}

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
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="approved">Recently Approved</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports Pending Approval</CardTitle>
              <CardDescription>Review and approve accident reports</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredReports.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">
                  No reports found matching your search criteria.
                </p>
              ) : (
                <div className="space-y-4">
                  {filteredReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                      onClick={() => setSelectedReport(report.id)}
                    >
                      <div>
                        <p className="font-medium">{report.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {report.location} • {report.date}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Submitted by {report.officer} • {report.submitted}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge
                          variant={
                            report.priority === "High"
                              ? "destructive"
                              : report.priority === "Medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {report.priority}
                        </Badge>
                        <Button size="sm">Review</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Approved Reports</CardTitle>
              <CardDescription>Reports that have been approved in the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No recently approved reports to display</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedReport} onOpenChange={(open) => !open && setSelectedReport(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Report - {selectedReport}</DialogTitle>
            <DialogDescription>Review the accident report before approval</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex justify-end">
              <Button variant="outline" className="gap-2" onClick={() => setViewingReport(true)}>
                <Eye className="h-4 w-4" />
                Preview Generated Report
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Accident Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-sm text-muted-foreground">Date:</p>
                      <p className="text-sm">May 15, 2023</p>
                      <p className="text-sm text-muted-foreground">Time:</p>
                      <p className="text-sm">15:00</p>
                      <p className="text-sm text-muted-foreground">Location:</p>
                      <p className="text-sm">Accra Ring Road, near Danquah Circle</p>
                      <p className="text-sm text-muted-foreground">Weather:</p>
                      <p className="text-sm">Clear</p>
                      <p className="text-sm text-muted-foreground">Road Conditions:</p>
                      <p className="text-sm">Dry</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vehicles Involved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Vehicle 1:</p>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <p className="text-sm text-muted-foreground">Registration:</p>
                        <p className="text-sm">GR-1234-20</p>
                        <p className="text-sm text-muted-foreground">Make & Model:</p>
                        <p className="text-sm">Toyota Corolla</p>
                        <p className="text-sm text-muted-foreground">Driver:</p>
                        <p className="text-sm">Owen Ankrah</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Vehicle 2:</p>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <p className="text-sm text-muted-foreground">Registration:</p>
                        <p className="text-sm">GW-5678-21</p>
                        <p className="text-sm text-muted-foreground">Make & Model:</p>
                        <p className="text-sm">Honda Civic</p>
                        <p className="text-sm text-muted-foreground">Driver:</p>
                        <p className="text-sm">William Hay</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Collision Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Vehicle 2 (Honda Civic) rear-ended Vehicle 1 (Toyota Corolla) while Vehicle 1 was stationary at a red
                  light.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fault Determination</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-muted-foreground">At Fault:</p>
                  <p className="text-sm">Vehicle 2</p>
                  <p className="text-sm text-muted-foreground">Reason:</p>
                  <p className="text-sm">Failed to maintain safe stopping distance</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Approval Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add any notes or comments about this report approval"
                  rows={4}
                  value={approvalNotes}
                  onChange={(e) => setApprovalNotes(e.target.value)}
                />
              </CardContent>
            </Card>
          </div>

          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setSelectedReport(null)}>
              Cancel
            </Button>
            <div className="space-x-2">
              <Button variant="destructive">Reject</Button>
              <Button onClick={handleApproveReport}>Approve & Generate Report</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Generated Report Dialog */}
      <Dialog open={viewingReport} onOpenChange={setViewingReport}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preview Generated Report: {selectedReport}</DialogTitle>
            <DialogDescription>This is how the report will look when approved</DialogDescription>
          </DialogHeader>

          <div className="prose max-w-none">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-xl font-bold text-center mb-4">GHANA POLICE SERVICE</h2>
              <h3 className="text-lg font-bold text-center mb-4">OFFICIAL ACCIDENT REPORT</h3>
              <p className="text-center mb-4">Report Number: {selectedReport}</p>
            </div>

            <h4 className="font-bold">1. ACCIDENT INFORMATION</h4>
            <p>
              On May 15, 2023 at approximately 15:00, a traffic collision occurred at Accra Ring Road, near Danquah
              Circle in Accra Metropolitan. The weather conditions were Clear and the road conditions were Dry.
            </p>

            <h4 className="font-bold mt-4">2. VEHICLES INVOLVED</h4>
            <p>
              <strong>Vehicle 1:</strong> 2008 Toyota Corolla (Grey), registration number GR-1234-20, driven by Owen
              Ankrah, license number A59396132880406. The vehicle is owned by Jane Mensah-Koduah and insured by Belair
              Insurance (Policy #E840364).
            </p>
            <p>
              <strong>Vehicle 2:</strong> 2005 Honda Civic (Silver), registration number GW-5678-21, driven by William
              Hay, license number H09527857800408. The vehicle is owned by William Hay and insured by Security National
              (Policy #00105255359).
            </p>

            <h4 className="font-bold mt-4">3. COLLISION DETAILS</h4>
            <p>
              Vehicle 2 (Honda Civic) rear-ended Vehicle 1 (Toyota Corolla) while Vehicle 1 was stationary at a red
              light.
            </p>

            <h4 className="font-bold mt-4">4. DAMAGE ASSESSMENT</h4>
            <p>
              <strong>Vehicle 1:</strong> Rear bumper damage, broken tail lights, and minor trunk damage. Damage
              severity: Moderate. Estimated repair cost: ₵4,680.
            </p>
            <p>
              <strong>Vehicle 2:</strong> Front bumper damage, hood damage, and radiator damage. Damage severity:
              Moderate. Estimated repair cost: ₵5,200.
            </p>

            <h4 className="font-bold mt-4">5. WITNESS STATEMENTS</h4>
            <p>
              <strong>Witness 1:</strong> Damian ((289) 923-2961) stated: "I was standing at the bus stop when I saw the
              Honda Civic hit the Toyota Corolla from behind while it was stopped at the red light."
            </p>

            <h4 className="font-bold mt-4">6. FAULT DETERMINATION</h4>
            <p>
              Based on the evidence and statements collected, Vehicle 2 is determined to be at fault for this collision.
              Reason: Failed to maintain safe stopping distance.
            </p>

            <div className="mt-8 pt-4 border-t">
              <p>
                <strong>Report prepared by:</strong> {user?.name || "Officer John Doe"} (Badge #3819)
                <br />
                <strong>Station:</strong> Accra Central Police Station
                <br />
                <strong>Report approved on:</strong> {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewingReport(false)}>
              Close Preview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

