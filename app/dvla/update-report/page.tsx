"use client"

/**
 * DVLA Update Report Page
 *
 * This component allows DVLA officers to update accident reports with:
 * - Vehicle damage assessment
 * - Estimated repair costs
 * - Roadworthiness evaluation
 * - Evidence photos
 *
 * @component
 * @returns {JSX.Element} The update report form UI
 *
 * @backend
 * Required API endpoints:
 * - GET /api/accident-reports/:id - Fetch report details
 * - PATCH /api/accident-reports/:id/assessment - Update damage assessment
 * - POST /api/accident-reports/:id/evidence - Upload evidence photos
 */

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, ChevronLeft, ChevronRight, FileImage, FileText, Search, Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useSearchParams } from "next/navigation"

export default function UpdateReportPage() {
  const { user } = useAuth()
  const [step, setStep] = useState(0)
  const [accidentId, setAccidentId] = useState("")
  const [reportFound, setReportFound] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [searchTab, setSearchTab] = useState<string>("id")
  const [photos, setPhotos] = useState<string[]>([])
  const [vehicleDetails, setVehicleDetails] = useState<any>(null)

  const searchParams = useSearchParams()
  const vehicleIdFromUrl = searchParams.get("vehicleId")

  useEffect(() => {
    if (vehicleIdFromUrl) {
      // In a real application, this would fetch the specific vehicle data
      // For demo purposes, we'll just set a mock ID and trigger the search
      setAccidentId(`ACC-${vehicleIdFromUrl}`)
      searchReport()
    }
  }, [vehicleIdFromUrl])

  // Mock data for incomplete reports
  const incompleteReports = [
    {
      id: "ACC-12345",
      date: "May 15, 2023",
      location: "Accra Ring Road",
      status: "Incomplete",
      lastUpdated: "3 days ago",
    },
    {
      id: "ACC-23456",
      date: "May 18, 2023",
      location: "Tema Motorway",
      status: "Incomplete",
      lastUpdated: "1 day ago",
    },
    {
      id: "ACC-34567",
      date: "May 20, 2023",
      location: "Spintex Road",
      status: "Incomplete",
      lastUpdated: "12 hours ago",
    },
  ]

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  /**
   * Searches for an accident report by ID
   *
   * @backend
   * This function should call the GET /api/accidents/:id endpoint
   * to retrieve the accident report details including vehicle information
   */
  const searchReport = () => {
    if (accidentId.trim() !== "") {
      setReportFound(true)
      // Mock vehicle details that would come from the database
      setVehicleDetails({
        registration: "GR-1234-20",
        make: "Toyota",
        model: "Corolla",
        year: "2008",
        color: "Grey",
        owner: "Jane Mensah-Koduah",
        driver: "Owen Ankrah",
        damageDescription: "Rear bumper damage, broken tail lights, and minor trunk damage.",
      })
      setStep(1)
    }
  }

  const selectIncompleteReport = (id: string) => {
    setAccidentId(id)
    setReportFound(true)
    // Mock vehicle details that would come from the database
    setVehicleDetails({
      registration: "GR-1234-20",
      make: "Toyota",
      model: "Corolla",
      year: "2008",
      color: "Grey",
      owner: "Jane Mensah-Koduah",
      driver: "Owen Ankrah",
      damageDescription: "Rear bumper damage, broken tail lights, and minor trunk damage.",
    })
    setStep(1)
  }

  /**
   * Handles photo upload for evidence
   *
   * @backend
   * This function should call POST /api/accident-reports/:id/evidence
   * with the photo files. The backend should store the photos and
   * associate them with the accident report.
   */
  // This would be replaced with actual file upload logic
  const handlePhotoUpload = () => {
    setPhotos([...photos, `/placeholder.svg?height=200&width=300`])
  }

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  /**
   * Submits the updated report with damage assessment
   *
   * @backend
   * This function should call PATCH /api/accident-reports/:id/assessment
   * with the damage assessment data. The backend should update the
   * report record and notify relevant parties.
   */
  const handleUpdate = () => {
    setUpdated(true)
  }

  if (updated) {
    return (
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Report Updated</h1>

        <Alert className="mb-6">
          <AlertTitle className="text-lg">Success!</AlertTitle>
          <AlertDescription>
            The accident report <span className="font-bold">{accidentId}</span> has been successfully updated with DVLA
            assessment.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>
              The accident report has been updated with your damage assessment and is now available in the system.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 border rounded-md">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">View Updated Report</p>
                <p className="text-sm text-muted-foreground">
                  You can view the full report details with your recent changes.
                </p>
              </div>
              <Button className="ml-auto" variant="outline">
                View
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setUpdated(false)
                setStep(0)
                setReportFound(false)
                setAccidentId("")
                setPhotos([])
              }}
            >
              Update Another Report
            </Button>
            <Button>Done</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Update Accident Report (DVLA)</h1>

      {step === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Find Report</CardTitle>
            <CardDescription>Search for an existing report to update with DVLA assessment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue={searchTab} onValueChange={setSearchTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="id">Search by ID</TabsTrigger>
                <TabsTrigger value="incomplete">Incomplete Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="id" className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="accident-id">Accident ID</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accident-id"
                        placeholder="e.g. ACC-12345"
                        value={accidentId}
                        onChange={(e) => setAccidentId(e.target.value)}
                      />
                      <Button onClick={searchReport}>
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="incomplete" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Recently Updated Incomplete Reports</Label>
                  <div className="border rounded-md divide-y">
                    {incompleteReports.map((report) => (
                      <div
                        key={report.id}
                        className="p-4 flex items-center justify-between hover:bg-muted/50 cursor-pointer"
                        onClick={() => selectIncompleteReport(report.id)}
                      >
                        <div>
                          <p className="font-medium">{report.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {report.location} • {report.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{report.status}</Badge>
                          <p className="text-xs text-muted-foreground">Updated {report.lastUpdated}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {reportFound && step >= 1 && (
        <>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2",
                  step >= 1
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted bg-muted text-muted-foreground",
                )}
              >
                1
              </div>
              <div className={cn("h-1 w-12", step >= 2 ? "bg-primary" : "bg-muted")} />
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2",
                  step >= 2
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted bg-muted text-muted-foreground",
                )}
              >
                2
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Step {step} of 2</div>
          </div>

          {step === 1 && vehicleDetails && (
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Damage Assessment</CardTitle>
                <CardDescription>Update the damage assessment for the vehicle</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-4 mb-4">
                  <h3 className="font-medium mb-2">Vehicle Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Registration:</div>
                    <div>{vehicleDetails.registration}</div>
                    <div className="text-muted-foreground">Make & Model:</div>
                    <div>
                      {vehicleDetails.make} {vehicleDetails.model}
                    </div>
                    <div className="text-muted-foreground">Year & Color:</div>
                    <div>
                      {vehicleDetails.year} • {vehicleDetails.color}
                    </div>
                    <div className="text-muted-foreground">Owner:</div>
                    <div>{vehicleDetails.owner}</div>
                    <div className="text-muted-foreground">Driver:</div>
                    <div>{vehicleDetails.driver}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="damage-description">Damage Description</Label>
                  <Textarea id="damage-description" defaultValue={vehicleDetails.damageDescription} rows={4} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="damage-severity">Damage Severity</Label>
                  <Select defaultValue="moderate">
                    <SelectTrigger id="damage-severity">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="severe">Severe</SelectItem>
                      <SelectItem value="demolished">Demolished</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Damage Location on Vehicle</Label>
                  <div className="border rounded-md p-4">
                    <div className="grid grid-cols-4 gap-2">
                      <div className="col-start-2 col-span-2">
                        <Button variant="outline" className="w-full">
                          Front
                        </Button>
                      </div>
                      <div className="col-start-1 row-start-2 row-span-2">
                        <Button variant="outline" className="w-full h-full">
                          Left Side
                        </Button>
                      </div>
                      <div className="col-start-2 col-span-2 row-start-2 row-span-2">
                        <div className="h-full border-2 border-dashed rounded-md flex items-center justify-center">
                          <span className="text-muted-foreground">Vehicle</span>
                        </div>
                      </div>
                      <div className="col-start-4 row-start-2 row-span-2">
                        <Button variant="outline" className="w-full h-full">
                          Right Side
                        </Button>
                      </div>
                      <div className="col-start-2 col-span-2 row-start-4">
                        <Button variant="outline" className="w-full">
                          Rear
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="repair-estimate">Estimated Repair Cost (₵)</Label>
                  <Input id="repair-estimate" type="number" defaultValue="4680" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roadworthiness">Roadworthiness Assessment</Label>
                  <Select defaultValue="minor-repairs">
                    <SelectTrigger id="roadworthiness">
                      <SelectValue placeholder="Select assessment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="roadworthy">Roadworthy - Safe to drive</SelectItem>
                      <SelectItem value="minor-repairs">Minor Repairs Needed - Can be driven with caution</SelectItem>
                      <SelectItem value="major-repairs">Major Repairs Needed - Not safe to drive</SelectItem>
                      <SelectItem value="total-loss">Total Loss - Beyond repair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recommendations">Recommendations</Label>
                  <Textarea
                    id="recommendations"
                    defaultValue="Left TailLight - Replace, Rear Bumper - Replace, Trunk/Hatch - Replace"
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(0)}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={nextStep}>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Upload Evidence Photos</CardTitle>
                <CardDescription>Upload photos of the vehicle damage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo || "/placeholder.svg"}
                        alt={`Vehicle damage ${index + 1}`}
                        className="w-full h-40 object-cover rounded-md"
                      />
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <div
                    className="border-2 border-dashed rounded-md flex flex-col items-center justify-center h-40 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={handlePhotoUpload}
                  >
                    <FileImage className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to add photos</p>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <Button variant="outline" className="gap-2">
                    <Camera className="h-4 w-4" />
                    Take Photo
                  </Button>
                  <span className="mx-2 text-muted-foreground">or</span>
                  <Button variant="outline" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Photos
                  </Button>
                </div>

                <div className="space-y-2 pt-4">
                  <Label htmlFor="photo-notes">Photo Notes</Label>
                  <Textarea id="photo-notes" placeholder="Add notes about the uploaded photos" rows={3} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleUpdate}>Update Report</Button>
              </CardFooter>
            </Card>
          )}
        </>
      )}
    </div>
  )
}

