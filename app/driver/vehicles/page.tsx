"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Car, FileText, Shield } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function VehiclesPage() {
  const { user } = useAuth()

  const vehicles = [
    {
      id: "VEH001",
      make: "Toyota",
      model: "Corolla",
      year: "2020",
      registration: "GR-1234-20",
      color: "Silver",
      vin: "1HGCM82633A123456",
      policyNumber: "ENT-12345",
      insurer: "Enterprise Insurance",
      coverage: "Comprehensive",
      premium: "₵1,250",
      nextPayment: "15/06/2023",
      status: "Active",
    },
    {
      id: "VEH002",
      make: "Honda",
      model: "Civic",
      year: "2021",
      registration: "GW-5678-21",
      color: "Blue",
      vin: "2HGFG12637H123456",
      policyNumber: "ENT-67890",
      insurer: "Enterprise Insurance",
      coverage: "Comprehensive",
      premium: "₵1,450",
      nextPayment: "22/07/2023",
      status: "Active",
    },
  ]

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Vehicles</h1>
        <Button>+ Add Vehicle</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="overflow-hidden">
            <div className="h-40 bg-muted flex items-center justify-center">
              <Car className="h-20 w-20 text-muted-foreground" />
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>
                  {vehicle.make} {vehicle.model}
                </CardTitle>
                <Badge>{vehicle.status}</Badge>
              </div>
              <CardDescription>
                {vehicle.registration} • {vehicle.year}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Policy Number:</span>
                <span>{vehicle.policyNumber}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Insurer:</span>
                <span>{vehicle.insurer}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Coverage:</span>
                <span>{vehicle.coverage}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Premium:</span>
                <span className="font-medium">{vehicle.premium}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Next Payment:</span>
                <span>{vehicle.nextPayment}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">View Details</Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Vehicle Details</DialogTitle>
                    <DialogDescription>Detailed information about your vehicle</DialogDescription>
                  </DialogHeader>

                  <Tabs defaultValue="details" className="mt-4">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="details">Vehicle Details</TabsTrigger>
                      <TabsTrigger value="insurance">Insurance</TabsTrigger>
                      <TabsTrigger value="history">History</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-4 pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Basic Information</h3>
                          <div className="border rounded-md p-3">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="text-muted-foreground">Make:</div>
                              <div>{vehicle.make}</div>
                              <div className="text-muted-foreground">Model:</div>
                              <div>{vehicle.model}</div>
                              <div className="text-muted-foreground">Year:</div>
                              <div>{vehicle.year}</div>
                              <div className="text-muted-foreground">Color:</div>
                              <div>{vehicle.color}</div>
                              <div className="text-muted-foreground">Registration:</div>
                              <div>{vehicle.registration}</div>
                              <div className="text-muted-foreground">VIN:</div>
                              <div>{vehicle.vin}</div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Technical Information</h3>
                          <div className="border rounded-md p-3">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="text-muted-foreground">Engine:</div>
                              <div>1.8L 4-Cylinder</div>
                              <div className="text-muted-foreground">Transmission:</div>
                              <div>Automatic</div>
                              <div className="text-muted-foreground">Fuel Type:</div>
                              <div>Petrol</div>
                              <div className="text-muted-foreground">Mileage:</div>
                              <div>35,250 km</div>
                              <div className="text-muted-foreground">Last Service:</div>
                              <div>March 15, 2023</div>
                              <div className="text-muted-foreground">Next Service:</div>
                              <div>September 15, 2023</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Documents</h3>
                        <div className="border rounded-md p-3">
                          <div className="flex items-center justify-between p-2">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Vehicle Registration</p>
                                <p className="text-xs text-muted-foreground">PDF • 1.2 MB • Expires: 15/05/2024</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-2">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Roadworthy Certificate</p>
                                <p className="text-xs text-muted-foreground">PDF • 0.8 MB • Expires: 10/08/2023</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="insurance" className="space-y-4 pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Policy Information</h3>
                          <div className="border rounded-md p-3">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="text-muted-foreground">Policy Number:</div>
                              <div>{vehicle.policyNumber}</div>
                              <div className="text-muted-foreground">Insurer:</div>
                              <div>{vehicle.insurer}</div>
                              <div className="text-muted-foreground">Coverage Type:</div>
                              <div>{vehicle.coverage}</div>
                              <div className="text-muted-foreground">Start Date:</div>
                              <div>15/06/2022</div>
                              <div className="text-muted-foreground">End Date:</div>
                              <div>14/06/2023</div>
                              <div className="text-muted-foreground">Status:</div>
                              <div>
                                <Badge variant="success">Active</Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Payment Information</h3>
                          <div className="border rounded-md p-3">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="text-muted-foreground">Annual Premium:</div>
                              <div>₵1,250</div>
                              <div className="text-muted-foreground">Payment Frequency:</div>
                              <div>Monthly</div>
                              <div className="text-muted-foreground">Monthly Payment:</div>
                              <div>₵104.17</div>
                              <div className="text-muted-foreground">Next Payment:</div>
                              <div>15/06/2023</div>
                              <div className="text-muted-foreground">Payment Method:</div>
                              <div>Credit Card</div>
                              <div className="text-muted-foreground">Auto-Renewal:</div>
                              <div>Enabled</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Coverage Details</h3>
                        <div className="border rounded-md p-3">
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-green-500" />
                                <p className="font-medium">Liability</p>
                              </div>
                              <p className="text-xs text-muted-foreground">₵100,000 coverage</p>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-green-500" />
                                <p className="font-medium">Collision</p>
                              </div>
                              <p className="text-xs text-muted-foreground">₵500 deductible</p>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-green-500" />
                                <p className="font-medium">Comprehensive</p>
                              </div>
                              <p className="text-xs text-muted-foreground">₵500 deductible</p>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-green-500" />
                                <p className="font-medium">Medical</p>
                              </div>
                              <p className="text-xs text-muted-foreground">₵10,000 coverage</p>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-green-500" />
                                <p className="font-medium">Uninsured Motorist</p>
                              </div>
                              <p className="text-xs text-muted-foreground">₵50,000 coverage</p>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-green-500" />
                                <p className="font-medium">Roadside Assistance</p>
                              </div>
                              <p className="text-xs text-muted-foreground">Included</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="history" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Accident History</h3>
                        <div className="border rounded-md p-3">
                          <div className="space-y-3">
                            <div className="border-l-2 border-primary pl-3 pb-3">
                              <p className="text-xs text-muted-foreground">May 15, 2023</p>
                              <p className="text-sm font-medium">Rear-end collision</p>
                              <p className="text-sm">Accra Ring Road, near Danquah Circle</p>
                              <p className="text-xs text-muted-foreground mt-1">Claim #CLM001 • In Progress</p>
                            </div>
                            <div className="border-l-2 border-muted pl-3">
                              <p className="text-xs text-muted-foreground">November 10, 2022</p>
                              <p className="text-sm font-medium">Minor scratch on driver's side</p>
                              <p className="text-sm">Parking lot incident</p>
                              <p className="text-xs text-muted-foreground mt-1">No claim filed</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Service History</h3>
                        <div className="border rounded-md p-3">
                          <div className="space-y-3">
                            <div className="border-l-2 border-primary pl-3 pb-3">
                              <p className="text-xs text-muted-foreground">March 15, 2023</p>
                              <p className="text-sm font-medium">Regular maintenance service</p>
                              <p className="text-sm">Oil change, filter replacement, and general inspection</p>
                              <p className="text-xs text-muted-foreground mt-1">Toyota Service Center</p>
                            </div>
                            <div className="border-l-2 border-primary pl-3 pb-3">
                              <p className="text-xs text-muted-foreground">December 10, 2022</p>
                              <p className="text-sm font-medium">Tire replacement</p>
                              <p className="text-sm">All four tires replaced with new ones</p>
                              <p className="text-xs text-muted-foreground mt-1">Goodyear Service Center</p>
                            </div>
                            <div className="border-l-2 border-primary pl-3">
                              <p className="text-xs text-muted-foreground">September 5, 2022</p>
                              <p className="text-sm font-medium">Regular maintenance service</p>
                              <p className="text-sm">Oil change, brake inspection, and fluid top-up</p>
                              <p className="text-xs text-muted-foreground mt-1">Toyota Service Center</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <DialogFooter>
                    <Button variant="outline">Close</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button>Renew Policy</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

