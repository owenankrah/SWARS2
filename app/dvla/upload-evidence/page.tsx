"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { DashboardHeader } from "@/components/dashboard-header"
import { EvidenceUploader } from "@/components/evidence-uploader"
import { EvidenceGallery } from "@/components/evidence-gallery"
import { useAuth } from "@/lib/auth-context"
import { getAccidentReports } from "@/services/accident-service"
import { ArrowLeft } from "lucide-react"

export default function UploadEvidencePage() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [selectedAccident, setSelectedAccident] = useState<string>("")
  const [accidents, setAccidents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Get accident ID from URL if provided
  useEffect(() => {
    const accidentId = searchParams.get("accidentId")
    if (accidentId) {
      setSelectedAccident(accidentId)
    }
  }, [searchParams])

  // Fetch accidents
  useEffect(() => {
    const fetchAccidents = async () => {
      setLoading(true)
      try {
        const data = await getAccidentReports()
        setAccidents(data)
      } catch (error) {
        console.error("Error fetching accidents:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load accident reports",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAccidents()
  }, [toast])

  const handleUploadComplete = () => {
    // Trigger a refresh of the evidence gallery
    setRefreshTrigger((prev) => prev + 1)
  }

  if (!user) return null

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader title="Upload Evidence" user={user} />

      <div className="flex-1 space-y-4 p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Evidence Upload</h2>
            <p className="text-muted-foreground">Upload photos, videos, and documents related to vehicle accidents</p>
          </div>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select Accident</CardTitle>
            <CardDescription>Choose the accident for which you want to upload evidence</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="accident">Accident</Label>
                <Select value={selectedAccident} onValueChange={setSelectedAccident} disabled={loading}>
                  <SelectTrigger id="accident">
                    <SelectValue placeholder="Select an accident" />
                  </SelectTrigger>
                  <SelectContent>
                    {accidents.map((accident) => (
                      <SelectItem key={accident.id} value={accident.id}>
                        {accident.id} - {accident.location} ({new Date(accident.date).toLocaleDateString()})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {selectedAccident && (
          <div className="grid gap-4 md:grid-cols-2">
            <EvidenceUploader accidentId={selectedAccident} onUploadComplete={handleUploadComplete} />
            <EvidenceGallery accidentId={selectedAccident} refreshTrigger={refreshTrigger} />
          </div>
        )}
      </div>
    </div>
  )
}

