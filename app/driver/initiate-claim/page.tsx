"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileImage, FileVideo, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"

export default function InitiateClaimPage() {
  const { user } = useAuth()
  const [accidentId, setAccidentId] = useState("")
  const [accidentFound, setAccidentFound] = useState(false)
  const [photos, setPhotos] = useState<string[]>([])
  const [videos, setVideos] = useState<string[]>([])

  // This would be replaced with actual file upload logic
  const handlePhotoUpload = () => {
    setPhotos([...photos, `/placeholder.svg?height=200&width=300`])
  }

  const handleVideoUpload = () => {
    setVideos([...videos, `/placeholder.svg?height=200&width=300`])
  }

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  const removeVideo = (index: number) => {
    setVideos(videos.filter((_, i) => i !== index))
  }

  const searchAccident = () => {
    // This would be an API call in a real application
    // For demo purposes, we'll simulate finding an accident
    if (accidentId.trim() !== "") {
      setAccidentFound(true)
    }
  }

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Initiate Insurance Claim</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Accident Information</CardTitle>
          <CardDescription>Enter the accident ID to auto-populate information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
                <Button onClick={searchAccident}>Search</Button>
              </div>
            </div>
          </div>

          {accidentFound && (
            <Alert className="bg-green-50 border-green-200">
              <AlertTitle>Accident found!</AlertTitle>
              <AlertDescription>Accident details have been auto-populated below.</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {accidentFound && (
        <>
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Accident Details</CardTitle>
                <CardDescription>Auto-populated from accident report</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date of Accident</Label>
                    <p className="text-sm">May 15, 2023</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Time of Accident</Label>
                    <p className="text-sm">14:30</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <p className="text-sm">Accra Ring Road, near Danquah Circle</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Severity</Label>
                    <p className="text-sm">Moderate - Minor injuries</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Accident Description</Label>
                  <p className="text-sm">
                    Rear-end collision at traffic light. Vehicle was stationary when hit from behind.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Police Report</Label>
                  <p className="text-sm">Filed by Officer John Doe (ID: POL-456)</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vehicle Information</CardTitle>
                <CardDescription>Auto-populated from accident report</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Vehicle Registration</Label>
                    <p className="text-sm">GR-1234-20</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Make & Model</Label>
                    <p className="text-sm">Toyota Corolla</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <p className="text-sm">2020</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Insurance Policy</Label>
                    <p className="text-sm">ENT-12345</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Damage Description</Label>
                  <p className="text-sm">Rear bumper damage, broken tail lights, and minor trunk damage.</p>
                </div>

                <div className="space-y-2">
                  <Label>DVLA Assessment</Label>
                  <p className="text-sm">Moderate damage, vehicle is drivable but requires repairs.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Claim Details</CardTitle>
              <CardDescription>Provide additional information for your claim</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="claim-amount">Claim Amount (₵)</Label>
                <Input id="claim-amount" type="number" placeholder="0.00" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="claim-description">Claim Description</Label>
                <Textarea id="claim-description" placeholder="Provide additional details about your claim" rows={4} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="repair-shop">Preferred Repair Shop (Optional)</Label>
                <Input id="repair-shop" placeholder="Enter repair shop name" />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Additional Evidence</CardTitle>
              <CardDescription>Upload additional photos or videos to support your claim</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="photos" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="photos">Photos</TabsTrigger>
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                </TabsList>
                <TabsContent value="photos" className="space-y-4 pt-4">
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
                </TabsContent>

                <TabsContent value="videos" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {videos.map((video, index) => (
                      <div key={index} className="relative group">
                        <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center">
                          <img
                            src={video || "/placeholder.svg"}
                            alt={`Vehicle damage video ${index + 1}`}
                            className="w-full h-full object-cover rounded-md"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
                              <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeVideo(index)}
                          className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <div
                      className="border-2 border-dashed rounded-md flex flex-col items-center justify-center h-48 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={handleVideoUpload}
                    >
                      <FileVideo className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Click to add videos</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Submit Claim</Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  )
}

