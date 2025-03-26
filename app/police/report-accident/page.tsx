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
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function ReportAccidentPage() {
  const [step, setStep] = useState(1)
  const [date, setDate] = useState<Date>()

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Report New Accident</h1>

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
            <CardDescription>Enter the basic information about the accident</CardDescription>
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
                <Input id="accident-time" type="time" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accident-location">Location</Label>
              <Input id="accident-location" placeholder="Enter the accident location" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accident-description">Description</Label>
              <Textarea id="accident-description" placeholder="Describe how the accident occurred" rows={4} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accident-severity">Severity</Label>
              <Select>
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
            <Button variant="outline" disabled>
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
            <CardDescription>Enter details about the vehicles involved</CardDescription>
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
                    <Input id="v1-registration" placeholder="e.g. GR-1234-20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="v1-make">Make & Model</Label>
                    <Input id="v1-make" placeholder="e.g. Toyota Corolla" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="v1-owner">Owner's Name</Label>
                  <Input id="v1-owner" placeholder="Full name of vehicle owner" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="v1-driver">Driver's Name</Label>
                  <Input id="v1-driver" placeholder="Full name of driver" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="v1-license">Driver's License Number</Label>
                  <Input id="v1-license" placeholder="Driver's license number" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="v1-insurance">Insurance Company</Label>
                  <Select>
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
                  <Input id="v1-policy" placeholder="Insurance policy number" />
                </div>

                <div className="space-y-2">
                  <Label>Damage Description</Label>
                  <Textarea placeholder="Describe the damage to the vehicle" rows={3} />
                </div>
              </TabsContent>

              <TabsContent value="vehicle2" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="v2-registration">Registration Number</Label>
                    <Input id="v2-registration" placeholder="e.g. GW-5678-21" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="v2-make">Make & Model</Label>
                    <Input id="v2-make" placeholder="e.g. Honda Civic" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="v2-owner">Owner's Name</Label>
                  <Input id="v2-owner" placeholder="Full name of vehicle owner" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="v2-driver">Driver's Name</Label>
                  <Input id="v2-driver" placeholder="Full name of driver" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="v2-license">Driver's License Number</Label>
                  <Input id="v2-license" placeholder="Driver's license number" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="v2-insurance">Insurance Company</Label>
                  <Select>
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
                  <Input id="v2-policy" placeholder="Insurance policy number" />
                </div>

                <div className="space-y-2">
                  <Label>Damage Description</Label>
                  <Textarea placeholder="Describe the damage to the vehicle" rows={3} />
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
            <CardDescription>Enter details about any witnesses to the accident</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox id="has-witnesses" />
              <Label htmlFor="has-witnesses">There were witnesses to the accident</Label>
            </div>

            <div className="border p-4 rounded-md space-y-4">
              <h3 className="font-medium">Witness 1</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="w1-name">Full Name</Label>
                  <Input id="w1-name" placeholder="Witness full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="w1-contact">Contact Number</Label>
                  <Input id="w1-contact" placeholder="Witness contact number" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="w1-statement">Statement</Label>
                <Textarea id="w1-statement" placeholder="Witness statement about what they observed" rows={3} />
              </div>
            </div>

            <Button variant="outline" className="w-full">
              + Add Another Witness
            </Button>

            <div className="space-y-2 pt-4">
              <Label htmlFor="officer-notes">Officer Notes</Label>
              <Textarea id="officer-notes" placeholder="Additional notes about the accident scene" rows={4} />
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
            <CardTitle>Review & Submit</CardTitle>
            <CardDescription>Review all information before submitting the accident report</CardDescription>
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
            <Button>Submit Report</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

