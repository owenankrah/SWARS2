"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { useAuth } from "@/lib/auth-context"
import { Separator } from "@/components/ui/separator"
import { generateUniqueAccidentId } from "@/lib/utils"

// Form schema for accident report
const formSchema = z.object({
  // Accident Details
  accidentId: z.string(),
  date: z.string(),
  time: z.string(),
  location: z.string().min(5, {
    message: "Location must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  weatherConditions: z.string(),
  roadConditions: z.string(),
  lightConditions: z.string(),

  // Vehicle 1 Details
  vehicle1Make: z.string().min(2, {
    message: "Vehicle make must be at least 2 characters.",
  }),
  vehicle1Model: z.string().min(2, {
    message: "Vehicle model must be at least 2 characters.",
  }),
  vehicle1Year: z.string(),
  vehicle1LicensePlate: z.string().min(5, {
    message: "License plate must be at least 5 characters.",
  }),
  vehicle1Damage: z.string().min(5, {
    message: "Damage description must be at least 5 characters.",
  }),

  // Driver 1 Details
  driver1Name: z.string().min(3, {
    message: "Driver name must be at least 3 characters.",
  }),
  driver1License: z.string().min(5, {
    message: "Driver license must be at least 5 characters.",
  }),
  driver1Contact: z.string().min(10, {
    message: "Contact number must be at least 10 characters.",
  }),
  driver1Insurance: z.string().min(3, {
    message: "Insurance company must be at least 3 characters.",
  }),
  driver1PolicyNumber: z.string().min(5, {
    message: "Policy number must be at least 5 characters.",
  }),

  // Vehicle 2 Details
  vehicle2Make: z.string().min(2, {
    message: "Vehicle make must be at least 2 characters.",
  }),
  vehicle2Model: z.string().min(2, {
    message: "Vehicle model must be at least 2 characters.",
  }),
  vehicle2Year: z.string(),
  vehicle2LicensePlate: z.string().min(5, {
    message: "License plate must be at least 5 characters.",
  }),
  vehicle2Damage: z.string().min(5, {
    message: "Damage description must be at least 5 characters.",
  }),

  // Driver 2 Details
  driver2Name: z.string().min(3, {
    message: "Driver name must be at least 3 characters.",
  }),
  driver2License: z.string().min(5, {
    message: "Driver license must be at least 5 characters.",
  }),
  driver2Contact: z.string().min(10, {
    message: "Contact number must be at least 10 characters.",
  }),
  driver2Insurance: z.string().min(3, {
    message: "Insurance company must be at least 3 characters.",
  }),
  driver2PolicyNumber: z.string().min(5, {
    message: "Policy number must be at least 5 characters.",
  }),

  // Fault Assessment
  vehicle1FaultPercentage: z.string(),
  vehicle2FaultPercentage: z.string(),

  // Injuries and Witnesses
  injuries: z.string(),
  fatalities: z.string(),
  witnesses: z.string(),
})

export default function CreateAccidentReport() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("accident-details")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Generate a unique accident ID
  const uniqueAccidentId = generateUniqueAccidentId()

  // Initialize form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accidentId: uniqueAccidentId,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toTimeString().split(" ")[0].substring(0, 5),
      location: "",
      description: "",
      weatherConditions: "clear",
      roadConditions: "dry",
      lightConditions: "daylight",

      vehicle1Make: "",
      vehicle1Model: "",
      vehicle1Year: new Date().getFullYear().toString(),
      vehicle1LicensePlate: "",
      vehicle1Damage: "",

      driver1Name: "",
      driver1License: "",
      driver1Contact: "",
      driver1Insurance: "",
      driver1PolicyNumber: "",

      vehicle2Make: "",
      vehicle2Model: "",
      vehicle2Year: new Date().getFullYear().toString(),
      vehicle2LicensePlate: "",
      vehicle2Damage: "",

      driver2Name: "",
      driver2License: "",
      driver2Contact: "",
      driver2Insurance: "",
      driver2PolicyNumber: "",

      vehicle1FaultPercentage: "50",
      vehicle2FaultPercentage: "50",

      injuries: "0",
      fatalities: "0",
      witnesses: "",
    },
  })

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      router.push("/police/dashboard?success=true")
    }, 2000)
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  // Move to next tab
  const goToNextTab = () => {
    if (activeTab === "accident-details") {
      setActiveTab("vehicle1-details")
    } else if (activeTab === "vehicle1-details") {
      setActiveTab("vehicle2-details")
    } else if (activeTab === "vehicle2-details") {
      setActiveTab("fault-assessment")
    }
  }

  // Move to previous tab
  const goToPreviousTab = () => {
    if (activeTab === "fault-assessment") {
      setActiveTab("vehicle2-details")
    } else if (activeTab === "vehicle2-details") {
      setActiveTab("vehicle1-details")
    } else if (activeTab === "vehicle1-details") {
      setActiveTab("accident-details")
    }
  }

  if (!user) return null

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader title="Create Accident Report" user={user} />

      <div className="flex-1 space-y-4 p-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">New Accident Report</h2>
          <p className="text-muted-foreground">
            Fill in the details of the accident report. All fields marked with * are required.
          </p>
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Accident ID:</p>
            <p className="text-sm font-bold">{uniqueAccidentId}</p>
            <p className="text-xs text-muted-foreground">
              (This unique ID will connect all entries related to this accident)
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="accident-details">Accident Details</TabsTrigger>
                <TabsTrigger value="vehicle1-details">Vehicle 1 Details</TabsTrigger>
                <TabsTrigger value="vehicle2-details">Vehicle 2 Details</TabsTrigger>
                <TabsTrigger value="fault-assessment">Fault Assessment</TabsTrigger>
              </TabsList>

              <TabsContent value="accident-details" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Accident Details</CardTitle>
                    <CardDescription>Enter the general details about the accident.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date*</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time*</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Accra Ring Road, near Danquah Circle" {...field} />
                          </FormControl>
                          <FormDescription>Provide a detailed location including landmarks.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Accident Description*</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe how the accident occurred..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="weatherConditions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weather Conditions*</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select weather conditions" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="clear">Clear</SelectItem>
                                <SelectItem value="cloudy">Cloudy</SelectItem>
                                <SelectItem value="rain">Rain</SelectItem>
                                <SelectItem value="fog">Fog</SelectItem>
                                <SelectItem value="snow">Snow</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="roadConditions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Road Conditions*</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select road conditions" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="dry">Dry</SelectItem>
                                <SelectItem value="wet">Wet</SelectItem>
                                <SelectItem value="icy">Icy</SelectItem>
                                <SelectItem value="snow">Snow</SelectItem>
                                <SelectItem value="muddy">Muddy</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lightConditions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Light Conditions*</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select light conditions" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="daylight">Daylight</SelectItem>
                                <SelectItem value="dawn">Dawn</SelectItem>
                                <SelectItem value="dusk">Dusk</SelectItem>
                                <SelectItem value="night-lit">Night - Well Lit</SelectItem>
                                <SelectItem value="night-unlit">Night - Unlit</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" disabled>
                      Previous
                    </Button>
                    <Button type="button" onClick={goToNextTab}>
                      Next
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="vehicle1-details" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle 1 Details</CardTitle>
                    <CardDescription>Enter details about the first vehicle involved in the accident.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="vehicle1Make"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle Make*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Toyota" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="vehicle1Model"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle Model*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Corolla" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="vehicle1Year"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle Year*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 2020" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="vehicle1LicensePlate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Plate*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. GR 1234-20" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="vehicle1Damage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Damage Description*</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the damage to the vehicle..."
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator className="my-4" />

                    <h3 className="text-lg font-semibold">Driver Information</h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="driver1Name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Driver Name*</FormLabel>
                            <FormControl>
                              <Input placeholder="Full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="driver1License"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Driver License Number*</FormLabel>
                            <FormControl>
                              <Input placeholder="License number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="driver1Contact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Number*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 0244123456" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="driver1Insurance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Insurance Company*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Star Assurance" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="driver1PolicyNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Policy Number*</FormLabel>
                            <FormControl>
                              <Input placeholder="Insurance policy number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={goToPreviousTab}>
                      Previous
                    </Button>
                    <Button type="button" onClick={goToNextTab}>
                      Next
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="vehicle2-details" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle 2 Details</CardTitle>
                    <CardDescription>Enter details about the second vehicle involved in the accident.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="vehicle2Make"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle Make*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Honda" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="vehicle2Model"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle Model*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Civic" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="vehicle2Year"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle Year*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 2020" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="vehicle2LicensePlate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Plate*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. GS 5678-20" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="vehicle2Damage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Damage Description*</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the damage to the vehicle..."
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator className="my-4" />

                    <h3 className="text-lg font-semibold">Driver Information</h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="driver2Name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Driver Name*</FormLabel>
                            <FormControl>
                              <Input placeholder="Full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="driver2License"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Driver License Number*</FormLabel>
                            <FormControl>
                              <Input placeholder="License number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="driver2Contact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Number*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 0277654321" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="driver2Insurance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Insurance Company*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Enterprise Insurance" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="driver2PolicyNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Policy Number*</FormLabel>
                            <FormControl>
                              <Input placeholder="Insurance policy number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={goToPreviousTab}>
                      Previous
                    </Button>
                    <Button type="button" onClick={goToNextTab}>
                      Next
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="fault-assessment" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Fault Assessment & Additional Information</CardTitle>
                    <CardDescription>Determine fault percentages and provide additional details.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Fault Determination</h3>
                      <p className="text-sm text-muted-foreground">
                        Assign fault percentages to each vehicle. The total must equal 100%.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="vehicle1FaultPercentage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle 1 Fault Percentage*</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" max="100" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="vehicle2FaultPercentage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle 2 Fault Percentage*</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" max="100" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Injuries & Witnesses</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="injuries"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Injuries*</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="fatalities"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Fatalities*</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="witnesses"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Witness Information</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter witness names and contact information..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>Include names and contact details of any witnesses.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="rounded-md bg-blue-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-3 flex-1 md:flex md:justify-between">
                          <p className="text-sm text-blue-700">
                            The unique accident ID ({uniqueAccidentId}) will connect this report with any other entries
                            related to this accident.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={goToPreviousTab}>
                      Previous
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Report"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </div>
    </div>
  )
}

