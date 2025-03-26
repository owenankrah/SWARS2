"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalendarIcon, ChevronLeft, ChevronRight, FileText, Search } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export default function UpdateReportPage() {
  const { user } = useAuth()
  const [step, setStep] = useState(0)
  const [date, setDate] = useState<Date>(new Date("2023-05-15"))
  const [accidentId, setAccidentId] = useState("")
  const [reportFound, setReportFound] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [searchTab, setSearchTab] = useState<string>("id")

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

  const searchReport = () => {
    if (accidentId.trim() !== "") {
      setReportFound(true)
      setStep(1)
    }
  }

  const selectIncompleteReport = (id: string) => {
    setAccidentId(id)
    setReportFound(true)
    setStep(1)
  }

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
            The accident report <span className="font-bold">{accidentId}</span> has been successfully updated.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>The accident report has been updated and is now available in the system.</CardDescription>
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
      <h1 className="text-3xl font-bold mb-6">Update Accident Report</h1>

      {step === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Find Report</CardTitle>
            <CardDescription>Search for an existing report to update</CardDescription>
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
              <div className={cn("h-1 w-12", step >= 3 ? "bg-primary" : "bg-muted")} />
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2",
                  step >= 3
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted bg-muted text-muted-foreground",
                )}
              >
                3
              </div>
              <div className={cn("h-1 w-12", step >= 4 ? "bg-primary" : "bg-muted")} />
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2",
                  step >= 4
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted bg-muted text-muted-foreground",
                )}
              >
                4
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Step {step} of 4</div>
          </div>

          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Accident Details</CardTitle>
                <CardDescription>Update the basic information about the accident</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accident-date">Date of Accident</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accident-time">Time of Accident</Label>
                    <Input id="accident-time" type="time" defaultValue="14:30" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accident-location">Location</Label>
                  <Input id="accident-location" defaultValue="Accra Ring Road, near Danquah Circle" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accident-description">Description</Label>
                  <Textarea
                    id="accident-description"
                    defaultValue="Rear-end collision at traffic light. Vehicle was stationary when hit from behind."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accident-severity">Severity</Label>
                  <Select defaultValue="moderate">
                    <SelectTrigger id="accident-severity">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minor">Minor - No injuries</SelectItem>
                      <SelectItem value="moderate">Moderate - Minor injuries</SelectItem>
                      <SelectItem value="major">Major - Serious injuries</SelectItem>
                      <SelectItem value="fatal">Fatal - Fatalities involved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Weather Conditions</Label>
                  <RadioGroup defaultValue="clear">
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="clear" id="weather-clear" />
                        <Label htmlFor="weather-clear">Clear</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="rainy" id="weather-rainy" />
                        <Label htmlFor="weather-rainy">Rainy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="foggy" id="weather-foggy" />
                        <Label htmlFor="weather-foggy">Foggy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="night" id="weather-night" />
                        <Label htmlFor="weather-night">Night/Dark</Label>
                      </div>
                    </div>
                  </RadioGroup>
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
                <CardTitle>Vehicle Information</CardTitle>
                <CardDescription>Update details about the vehicles involved</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="vehicle1" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="vehicle1">Vehicle 1</TabsTrigger>
                    <TabsTrigger value="vehicle2">Vehicle 2</TabsTrigger>
                  </TabsList>
                  <TabsContent value="vehicle1" className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="v1-registration">Registration Number</Label>
                        <Input id="v1-registration" defaultValue="GR-1234-20" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="v1-make">Make & Model</Label>
                        <Input id="v1-make" defaultValue="Toyota Corolla" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="v1-owner">Owner's Name</Label>
                      <Input id="v1-owner" defaultValue="Kofi Mensah" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="v1-driver">Driver's Name</Label>
                      <Input id="v1-driver" defaultValue="Kofi Mensah" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="v1-license">Driver's License Number</Label>
                      <Input id="v1-license" defaultValue="DL-78901234" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="v1-insurance">Insurance Company</Label>
                      <Select defaultValue="enterprise">
                        <SelectTrigger id="v1-insurance">
                          <SelectValue placeholder="Select insurance company" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enterprise">Enterprise Insurance</SelectItem>
                          <SelectItem value="sic">SIC Insurance</SelectItem>
                          <SelectItem value="star">Star Assurance</SelectItem>
                          <SelectItem value="phoenix">Phoenix Insurance</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="v1-policy">Insurance Policy Number</Label>
                      <Input id="v1-policy" defaultValue="ENT-12345" />
                    </div>

                    <div className="space-y-2">
                      <Label>Damage Description</Label>
                      <Textarea
                        defaultValue="Rear bumper damage, broken tail lights, and minor trunk damage."
                        rows={3}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="vehicle2" className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="v2-registration">Registration Number</Label>
                        <Input id="v2-registration" defaultValue="GW-5678-21" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="v2-make">Make & Model</Label>
                        <Input id="v2-make" defaultValue="Honda Civic" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="v2-owner">Owner's Name</Label>
                      <Input id="v2-owner" defaultValue="Ama Owusu" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="v2-driver">Driver's Name</Label>
                      <Input id="v2-driver" defaultValue="Ama Owusu" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="v2-license">Driver's License Number</Label>
                      <Input id="v2-license" defaultValue="DL-56789012" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="v2-insurance">Insurance Company</Label>
                      <Select defaultValue="sic">
                        <SelectTrigger id="v2-insurance">
                          <SelectValue placeholder="Select insurance company" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enterprise">Enterprise Insurance</SelectItem>
                          <SelectItem value="sic">SIC Insurance</SelectItem>
                          <SelectItem value="star">Star Assurance</SelectItem>
                          <SelectItem value="phoenix">Phoenix Insurance</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="v2-policy">Insurance Policy Number</Label>
                      <Input id="v2-policy" defaultValue="SIC-67890" />
                    </div>

                    <div className="space-y-2">
                      <Label>Damage Description</Label>
                      <Textarea defaultValue="Front bumper damage, hood damage, and radiator damage." rows={3} />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={nextStep}>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Witness Information</CardTitle>
                <CardDescription>Update details about any witnesses to the accident</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox id="has-witnesses" defaultChecked />
                  <Label htmlFor="has-witnesses">There were witnesses to the accident</Label>
                </div>

                <div className="border p-4 rounded-md space-y-4">
                  <h3 className="font-medium">Witness 1</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="w1-name">Full Name</Label>
                      <Input id="w1-name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="w1-contact">Contact Number</Label>
                      <Input id="w1-contact" defaultValue="0244123456" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="w1-statement">Statement</Label>
                    <Textarea
                      id="w1-statement"
                      defaultValue="I was standing at the bus stop when I saw the Honda Civic hit the Toyota Corolla from behind while it was stopped at the red light."
                      rows={3}
                    />
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  + Add Another Witness
                </Button>

                <div className="space-y-2 pt-4">
                  <Label htmlFor="officer-notes">Officer Notes</Label>
                  <Textarea
                    id="officer-notes"
                    defaultValue="The accident scene was cleared within 30 minutes. Both vehicles were drivable. No injuries reported at the scene."
                    rows={4}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={nextStep}>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Review & Update</CardTitle>
                <CardDescription>Review all information before updating the accident report</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Accident Details</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Date & Time:</div>
                    <div>{date ? format(date, "PPP") : "Not specified"} • 14:30</div>
                    <div className="text-muted-foreground">Location:</div>
                    <div>Accra Ring Road, near Danquah Circle</div>
                    <div className="text-muted-foreground">Severity:</div>
                    <div>Moderate - Minor injuries</div>
                    <div className="text-muted-foreground">Weather:</div>
                    <div>Clear</div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Vehicle 1</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Registration:</div>
                    <div>GR-1234-20</div>
                    <div className="text-muted-foreground">Make & Model:</div>
                    <div>Toyota Corolla</div>
                    <div className="text-muted-foreground">Driver:</div>
                    <div>Kofi Mensah</div>
                    <div className="text-muted-foreground">Insurance:</div>
                    <div>Enterprise Insurance • Policy #ENT-12345</div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Vehicle 2</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Registration:</div>
                    <div>GW-5678-21</div>
                    <div className="text-muted-foreground">Make & Model:</div>
                    <div>Honda Civic</div>
                    <div className="text-muted-foreground">Driver:</div>
                    <div>Ama Owusu</div>
                    <div className="text-muted-foreground">Insurance:</div>
                    <div>SIC Insurance • Policy #SIC-67890</div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Witnesses</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Witness 1:</div>
                    <div>John Doe • 0244123456</div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Officer Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Officer Name:</div>
                    <div>{user?.name || "Officer"}</div>
                    <div className="text-muted-foreground">Badge Number:</div>
                    <div>POL-456</div>
                    <div className="text-muted-foreground">Station:</div>
                    <div>Accra Central Police Station</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="confirm-accurate" />
                  <Label htmlFor="confirm-accurate">
                    I confirm that all information provided is accurate to the best of my knowledge
                  </Label>
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

