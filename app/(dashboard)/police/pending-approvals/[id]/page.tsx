"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DashboardHeader } from "@/components/dashboard-header"
import { useAuth } from "@/lib/auth-context"
import { accidentReports } from "@/lib/demo-data"
import { Separator } from "@/components/ui/separator"

export default function ReviewAccidentReport({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [approvalNotes, setApprovalNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [report, setReport] = useState<any>(null)
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true

    // Find the accident report by ID
    const foundReport = accidentReports.find((r) => r.id === params.id) || accidentReports[2]
    if (isMounted.current) {
      setReport(foundReport)
    }

    return () => {
      isMounted.current = false
    }
  }, [params.id])

  if (!user) return null
  if (!report) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <DashboardHeader title="Review Accident Report" user={user} />
        <div className="flex-1 p-8">
          <Card>
            <CardHeader>
              <CardTitle>Report Not Found</CardTitle>
              <CardDescription>The accident report you are looking for could not be found.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => router.push("/police/pending-approvals")}>Back to Pending Approvals</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  const handleApprove = () => {
    if (!isMounted.current) return
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      if (isMounted.current) {
        setIsSubmitting(false)
        setShowApproveDialog(false)
        router.push("/police/pending-approvals?success=approved")
      }
    }, 2000)
  }

  const handleReject = () => {
    if (!isMounted.current) return
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      if (isMounted.current) {
        setIsSubmitting(false)
        setShowRejectDialog(false)
        router.push("/police/pending-approvals?success=rejected")
      }
    }, 2000)
  }

  const getSeverityBadge = (severity: string) => {
    const colors = {
      minor: "bg-green-100 text-green-800",
      moderate: "bg-yellow-100 text-yellow-800",
      major: "bg-red-100 text-red-800",
    }
    return colors[severity as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader title="Review Accident Report" user={user} />

      <div className="flex-1 space-y-4 p-8">
        <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Accident Report: {report.id}</h2>
            <p className="text-muted-foreground">Review and approve or reject this accident report.</p>
          </div>
          <div className="flex space-x-2">
            <Dialog
              open={showRejectDialog}
              onOpenChange={(open) => {
                if (isMounted.current) {
                  setShowRejectDialog(open)
                }
              }}
            >
              <DialogTrigger asChild>
                <Button variant="outline">Reject Report</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reject Accident Report</DialogTitle>
                  <DialogDescription>Please provide a reason for rejecting this report.</DialogDescription>
                </DialogHeader>
                <Textarea
                  placeholder="Enter rejection reason..."
                  value={approvalNotes}
                  onChange={(e) => {
                    if (isMounted.current) {
                      setApprovalNotes(e.target.value)
                    }
                  }}
                  className="min-h-[100px]"
                />
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (isMounted.current) {
                        setShowRejectDialog(false)
                      }
                    }}
                  >
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleReject} disabled={isSubmitting}>
                    {isSubmitting ? "Rejecting..." : "Confirm Rejection"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog
              open={showApproveDialog}
              onOpenChange={(open) => {
                if (isMounted.current) {
                  setShowApproveDialog(open)
                }
              }}
            >
              <DialogTrigger asChild>
                <Button>Approve Report</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Approve Accident Report</DialogTitle>
                  <DialogDescription>Add any additional notes before approving this report.</DialogDescription>
                </DialogHeader>
                <Textarea
                  placeholder="Enter approval notes (optional)..."
                  value={approvalNotes}
                  onChange={(e) => {
                    if (isMounted.current) {
                      setApprovalNotes(e.target.value)
                    }
                  }}
                  className="min-h-[100px]"
                />
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (isMounted.current) {
                        setShowApproveDialog(false)
                      }
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleApprove} disabled={isSubmitting}>
                    {isSubmitting ? "Approving..." : "Confirm Approval"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            if (isMounted.current) {
              setActiveTab(value)
            }
          }}
        >
          <TabsList>
            <TabsTrigger value="details">Report Details</TabsTrigger>
            <TabsTrigger value="vehicles">Vehicle Information</TabsTrigger>
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Accident Details</CardTitle>
                <CardDescription>General information about the accident.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Date & Time</h4>
                    <p>
                      {report.date} at {report.time}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Location</h4>
                    <p>{report.location}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Severity</h4>
                    <Badge className={getSeverityBadge(report.severity)} variant="outline">
                      {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Description</h4>
                  <p className="mt-1">{report.description}</p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Weather Conditions</h4>
                    <p>{report.weatherConditions}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Road Conditions</h4>
                    <p>{report.roadConditions}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Light Conditions</h4>
                    <p>{report.lightConditions}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Injuries</h4>
                    <p>{report.injuries} person(s)</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Fatalities</h4>
                    <p>{report.fatalities} person(s)</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Reporting Officer</h4>
                  <p>{report.reportingOfficer}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Witness Statements</CardTitle>
                <CardDescription>Statements from witnesses at the scene.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {report.witnesses && report.witnesses.length > 0 ? (
                  report.witnesses.map((witness: any, index: number) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{witness.name}</h4>
                        <p className="text-sm text-gray-500">Contact: {witness.contact}</p>
                      </div>
                      <p className="text-sm">{witness.statement}</p>
                      {index < report.witnesses.length - 1 && <Separator className="my-2" />}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No witness statements recorded.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vehicles" className="space-y-4">
            {report.vehicles.map((vehicle: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>
                    Vehicle {index + 1}: {vehicle.make} {vehicle.model}
                  </CardTitle>
                  <CardDescription>Details about vehicle {index + 1} and its driver.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Make & Model</h4>
                      <p>
                        {vehicle.make} {vehicle.model} ({vehicle.year})
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">License Plate</h4>
                      <p>{vehicle.licensePlate}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Fault Percentage</h4>
                      <Badge
                        variant="outline"
                        className={
                          vehicle.faultPercentage > 50 ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {vehicle.faultPercentage}%
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Damage Description</h4>
                    <p className="mt-1">{vehicle.damage}</p>
                  </div>

                  <Separator className="my-2" />

                  <h3 className="text-lg font-semibold">Driver Information</h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Driver Name</h4>
                      <p>{vehicle.driver.name}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">License Number</h4>
                      <p>{vehicle.driver.license}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Contact</h4>
                    <p>{vehicle.driver.contact}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Insurance Company</h4>
                      <p>{vehicle.driver.insurance}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Policy Number</h4>
                      <p>{vehicle.driver.policyNumber}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="evidence" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Evidence</CardTitle>
                <CardDescription>Photos, videos, and other evidence collected at the scene.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {report.evidence && report.evidence.length > 0 ? (
                    report.evidence.map((item: any, index: number) => (
                      <div key={index} className="overflow-hidden rounded-lg border">
                        <div className="aspect-video w-full bg-gray-100">
                          <img
                            src={item.url || "/placeholder.svg"}
                            alt={item.description}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-2">
                          <p className="text-sm">{item.description}</p>
                          <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="col-span-full text-sm text-gray-500">No evidence uploaded.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

