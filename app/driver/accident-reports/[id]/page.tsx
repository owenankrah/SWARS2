"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, Printer } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"

/**
 * Accident Report Detail Page
 *
 * This component displays the full details of a specific accident report.
 * It includes information about the accident, vehicles involved, witnesses,
 * and fault determination.
 *
 * @component
 * @returns {JSX.Element} The accident report detail page UI
 *
 * @backend
 * Required API endpoints:
 * - GET /api/accident-reports/:id - Fetch accident report details
 * - GET /api/accident-reports/:id/download - Download report as PDF
 */

export default function AccidentReportPage() {
  const { user } = useAuth()
  const params = useParams()
  const reportId = params.id as string
  const [report, setReport] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  /**
   * Fetches the accident report data when the component mounts
   *
   * @backend
   * This effect should call the GET /api/accident-reports/:id endpoint
   * to retrieve the full accident report details
   */
  useEffect(() => {
    // This would be an API call in a real application
    // For demo purposes, we'll simulate fetching a report
    const fetchReport = () => {
      setLoading(true)
      // Simulate API delay
      setTimeout(() => {
        // Mock report data
        setReport({
          id: reportId,
          date: "May 15, 2023",
          time: "15:00",
          location: "Accra Ring Road, near Danquah Circle",
          municipality: "Accra Metropolitan",
          gpsCoordinates: "5.6037, -0.1870",
          status: "Approved",
          approvedBy: "Officer John Doe",
          approvedDate: "May 17, 2023",
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
          collisionDetails: {
            weather: "Clear",
            roadConditions: "Dry",
            locationType: "Intersection",
            description:
              "Vehicle 2 (Honda Civic) rear-ended Vehicle 1 (Toyota Corolla) while Vehicle 1 was stationary at a red light.",
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
            name: "Officer John Doe",
            badgeNumber: "3819",
            station: "Accra Central Police Station",
          },
        })
        setLoading(false)
      }, 1000)
    }

    fetchReport()
  }, [reportId])

  if (loading) {
    return (
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Loading Accident Report...</h1>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Accident Report Not Found</h1>
        <p>The requested accident report could not be found.</p>
        <Button asChild className="mt-4">
          <Link href="/driver/accident-reports">Back to Reports</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Accident Report: {report.id}</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Report Information</CardTitle>
              <Badge variant="success">{report.status}</Badge>
            </div>
            <CardDescription>
              Approved on {report.approvedDate} by {report.approvedBy}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Date & Time</p>
                <p>
                  {report.date} • {report.time}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Location</p>
                <p>{report.location}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Municipality</p>
                <p>{report.municipality}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">GPS Coordinates</p>
                <p>{report.gpsCoordinates}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fault Determination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">At Fault</p>
              <p className="font-medium">{report.faultDetermination.atFault}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Reason</p>
              <p>{report.faultDetermination.reason}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="report" className="space-y-4">
        <TabsList>
          <TabsTrigger value="report">Full Report</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicle Details</TabsTrigger>
          <TabsTrigger value="witnesses">Witness Information</TabsTrigger>
        </TabsList>

        <TabsContent value="report" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Official Accident Report</CardTitle>
              <CardDescription>Auto-generated from the information in the system</CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-bold text-center mb-4">GHANA POLICE SERVICE</h2>
                <h3 className="text-lg font-bold text-center mb-4">OFFICIAL ACCIDENT REPORT</h3>
                <p className="text-center mb-4">Report Number: {report.id}</p>
              </div>

              <h4 className="font-bold">1. ACCIDENT INFORMATION</h4>
              <p>
                On {report.date} at approximately {report.time}, a traffic collision occurred at {report.location} in{" "}
                {report.municipality}. The weather conditions were {report.collisionDetails.weather} and the road
                conditions were {report.collisionDetails.roadConditions}.
              </p>

              <h4 className="font-bold mt-4">2. VEHICLES INVOLVED</h4>
              <p>
                <strong>Vehicle 1:</strong> {report.vehicle1.year} {report.vehicle1.make} {report.vehicle1.model} (
                {report.vehicle1.color}), registration number {report.vehicle1.registration}, driven by{" "}
                {report.vehicle1.driver}, license number {report.vehicle1.driverLicense}. The vehicle is owned by{" "}
                {report.vehicle1.owner} and insured by {report.vehicle1.insurance.company} (Policy #
                {report.vehicle1.insurance.policyNumber}).
              </p>
              <p>
                <strong>Vehicle 2:</strong> {report.vehicle2.year} {report.vehicle2.make} {report.vehicle2.model} (
                {report.vehicle2.color}), registration number {report.vehicle2.registration}, driven by{" "}
                {report.vehicle2.driver}, license number {report.vehicle2.driverLicense}. The vehicle is owned by{" "}
                {report.vehicle2.owner} and insured by {report.vehicle2.insurance.company} (Policy #
                {report.vehicle2.insurance.policyNumber}).
              </p>

              <h4 className="font-bold mt-4">3. COLLISION DETAILS</h4>
              <p>{report.collisionDetails.description}</p>

              <h4 className="font-bold mt-4">4. DAMAGE ASSESSMENT</h4>
              <p>
                <strong>Vehicle 1:</strong> {report.vehicle1.damage.description} Damage severity:{" "}
                {report.vehicle1.damage.severity}. Estimated repair cost: {report.vehicle1.damage.estimatedCost}.
              </p>
              <p>
                <strong>Vehicle 2:</strong> {report.vehicle2.damage.description} Damage severity:{" "}
                {report.vehicle2.damage.severity}. Estimated repair cost: {report.vehicle2.damage.estimatedCost}.
              </p>

              <h4 className="font-bold mt-4">5. WITNESS STATEMENTS</h4>
              {report.witnesses.map((witness, index) => (
                <p key={index}>
                  <strong>Witness {index + 1}:</strong> {witness.name} ({witness.contact}) stated: "{witness.statement}"
                </p>
              ))}

              <h4 className="font-bold mt-4">6. FAULT DETERMINATION</h4>
              <p>
                Based on the evidence and statements collected, {report.faultDetermination.atFault} is determined to be
                at fault for this collision. Reason: {report.faultDetermination.reason}.
              </p>

              <div className="mt-8 pt-4 border-t">
                <p>
                  <strong>Report prepared by:</strong> {report.officerInfo.name} (Badge #
                  {report.officerInfo.badgeNumber})<br />
                  <strong>Station:</strong> {report.officerInfo.station}
                  <br />
                  <strong>Report approved on:</strong> {report.approvedDate}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                View Original Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="vehicles" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle 1</CardTitle>
                <CardDescription>
                  {report.vehicle1.make} {report.vehicle1.model}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Registration</p>
                      <p>{report.vehicle1.registration}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Year & Color</p>
                      <p>
                        {report.vehicle1.year} • {report.vehicle1.color}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Owner</p>
                      <p>{report.vehicle1.owner}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Driver</p>
                      <p>{report.vehicle1.driver}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Driver's License</p>
                      <p>{report.vehicle1.driverLicense}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="font-medium mb-2">Insurance Information</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Company</p>
                        <p>{report.vehicle1.insurance.company}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Policy Number</p>
                        <p>{report.vehicle1.insurance.policyNumber}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Expiry Date</p>
                        <p>{report.vehicle1.insurance.expiryDate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="font-medium mb-2">Damage Assessment</p>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Description</p>
                      <p>{report.vehicle1.damage.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Severity</p>
                        <p>{report.vehicle1.damage.severity}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Estimated Cost</p>
                        <p>{report.vehicle1.damage.estimatedCost}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vehicle 2</CardTitle>
                <CardDescription>
                  {report.vehicle2.make} {report.vehicle2.model}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Registration</p>
                      <p>{report.vehicle2.registration}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Year & Color</p>
                      <p>
                        {report.vehicle2.year} • {report.vehicle2.color}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Owner</p>
                      <p>{report.vehicle2.owner}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Driver</p>
                      <p>{report.vehicle2.driver}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Driver's License</p>
                      <p>{report.vehicle2.driverLicense}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="font-medium mb-2">Insurance Information</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Company</p>
                        <p>{report.vehicle2.insurance.company}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Policy Number</p>
                        <p>{report.vehicle2.insurance.policyNumber}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Expiry Date</p>
                        <p>{report.vehicle2.insurance.expiryDate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="font-medium mb-2">Damage Assessment</p>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Description</p>
                      <p>{report.vehicle2.damage.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Severity</p>
                        <p>{report.vehicle2.damage.severity}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Estimated Cost</p>
                        <p>{report.vehicle2.damage.estimatedCost}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="witnesses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Witness Information</CardTitle>
              <CardDescription>Statements from witnesses at the scene</CardDescription>
            </CardHeader>
            <CardContent>
              {report.witnesses.length === 0 ? (
                <p className="text-muted-foreground">No witnesses recorded for this accident.</p>
              ) : (
                <div className="space-y-6">
                  {report.witnesses.map((witness, index) => (
                    <div key={index} className="border rounded-md p-4">
                      <p className="font-medium">
                        Witness {index + 1}: {witness.name}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">Contact: {witness.contact}</p>
                      <p className="italic">"{witness.statement}"</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

