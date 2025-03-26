"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { useAuth } from "@/lib/auth-context"
import { Upload, X, Plus, Camera, FileText } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function DVLAUpload() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("photos")
  const [accidentId, setAccidentId] = useState("")
  const [vehicleReg, setVehicleReg] = useState("")
  const [description, setDescription] = useState("")
  const [damageType, setDamageType] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!user) return null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setUploadedFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!accidentId || !vehicleReg || !description || !damageType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (uploadedFiles.length === 0) {
      toast({
        title: "No files uploaded",
        description: "Please upload at least one photo or video.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Evidence uploaded successfully",
        description: `${uploadedFiles.length} files uploaded for accident ${accidentId}.`,
      })
      setIsSubmitting(false)

      // Reset form
      setAccidentId("")
      setVehicleReg("")
      setDescription("")
      setDamageType("")
      setUploadedFiles([])
    }, 2000)
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader title="Upload Evidence" user={user} />

      <div className="flex-1 space-y-4 p-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Evidence Upload</h2>
          <p className="text-muted-foreground">Upload photos and videos of vehicle damage for accident reports.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="photos">
              <Camera className="mr-2 h-4 w-4" />
              Photos & Videos
            </TabsTrigger>
            <TabsTrigger value="documents">
              <FileText className="mr-2 h-4 w-4" />
              Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="photos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload Accident Evidence</CardTitle>
                <CardDescription>
                  Upload photos and videos of vehicle damage for accident investigation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="accidentId">Accident ID*</Label>
                      <Input
                        id="accidentId"
                        placeholder="e.g. ACC-2023-001"
                        value={accidentId}
                        onChange={(e) => setAccidentId(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicleReg">Vehicle Registration*</Label>
                      <Input
                        id="vehicleReg"
                        placeholder="e.g. GR-123-23"
                        value={vehicleReg}
                        onChange={(e) => setVehicleReg(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="damageType">Damage Type*</Label>
                    <Select value={damageType} onValueChange={setDamageType} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select damage type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="front">Front Damage</SelectItem>
                        <SelectItem value="rear">Rear Damage</SelectItem>
                        <SelectItem value="side">Side Damage</SelectItem>
                        <SelectItem value="rollover">Rollover</SelectItem>
                        <SelectItem value="undercarriage">Undercarriage</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description*</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the damage and evidence being uploaded..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Upload Photos/Videos*</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Input
                        type="file"
                        className="hidden"
                        id="file-upload"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                      />
                      <Label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm font-medium">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">JPG, PNG, GIF, MP4 up to 10MB</p>
                      </Label>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <Label>Uploaded Files ({uploadedFiles.length})</Label>
                        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="relative rounded-md border bg-gray-50 p-2">
                              <div className="flex items-center space-x-2">
                                <div className="flex-shrink-0">
                                  {file.type.startsWith("image/") ? (
                                    <img
                                      src={URL.createObjectURL(file) || "/placeholder.svg"}
                                      alt={file.name}
                                      className="h-10 w-10 rounded-md object-cover"
                                    />
                                  ) : (
                                    <video className="h-10 w-10 rounded-md object-cover">
                                      <source src={URL.createObjectURL(file)} />
                                    </video>
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-xs font-medium">{file.name}</p>
                                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                              </div>
                              <button
                                type="button"
                                className="absolute -right-1 -top-1 rounded-full bg-red-100 p-1 text-red-600"
                                onClick={() => removeFile(index)}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                          <label
                            htmlFor="file-upload"
                            className="flex h-[76px] cursor-pointer items-center justify-center rounded-md border border-dashed bg-gray-50 p-2"
                          >
                            <div className="flex flex-col items-center">
                              <Plus className="h-5 w-5 text-gray-400" />
                              <span className="mt-1 text-xs text-gray-500">Add more</span>
                            </div>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Uploading..." : "Upload Evidence"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload Supporting Documents</CardTitle>
                <CardDescription>
                  Upload supporting documents such as inspection reports and repair estimates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border-2 border-dashed p-10">
                  <FileText className="h-10 w-10 text-gray-400" />
                  <h3 className="text-lg font-medium">Document Upload</h3>
                  <p className="text-sm text-gray-500 text-center">
                    This feature will be available soon. Please use the Photos & Videos tab for now.
                  </p>
                  <Button variant="outline" disabled>
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

