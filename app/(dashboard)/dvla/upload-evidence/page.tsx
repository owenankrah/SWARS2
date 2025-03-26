"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { useAuth } from "@/lib/auth-context"
import { EvidenceUploader } from "@/components/evidence-uploader"
import { EvidenceGallery } from "@/components/evidence-gallery"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function UploadEvidence() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const accidentId = searchParams.get("accidentId")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const { toast } = useToast()
  const router = useRouter()

  const handleUploadComplete = (fileUrls: string[]) => {
    setUploadedFiles((prev) => [...prev, ...fileUrls])
    toast({
      title: "Upload complete",
      description: `${fileUrls.length} file(s) uploaded successfully.`,
    })
  }

  const handleFinish = () => {
    toast({
      title: "Evidence submission complete",
      description: "All evidence has been successfully uploaded and linked to the accident report.",
    })
    router.push("/dashboard/dvla/dashboard")
  }

  if (!user) return null

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader title="Upload Evidence" user={user} />

      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Upload Evidence</h2>
            <p className="text-muted-foreground">Upload photos, videos, and documents related to the accident</p>
          </div>
        </div>

        {accidentId ? (
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Accident Information</CardTitle>
                <CardDescription>
                  You are uploading evidence for accident ID: <strong>{accidentId}</strong>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upload Evidence</CardTitle>
                <CardDescription>
                  Upload photos of vehicle damage, accident scene, documents, or video evidence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EvidenceUploader
                  accidentId={accidentId}
                  onUploadStart={() => setIsUploading(true)}
                  onUploadComplete={(urls) => {
                    setIsUploading(false)
                    handleUploadComplete(urls)
                  }}
                />
              </CardContent>
            </Card>

            {uploadedFiles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Uploaded Evidence</CardTitle>
                  <CardDescription>Review the evidence you have uploaded</CardDescription>
                </CardHeader>
                <CardContent>
                  <EvidenceGallery evidenceUrls={uploadedFiles} />
                </CardContent>
                <CardFooter>
                  <Button onClick={handleFinish} className="ml-auto">
                    Finish
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No Accident ID Provided</CardTitle>
              <CardDescription>
                Please access this page from an accident report or provide an accident ID
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <a href="/dashboard/dvla/dashboard">Return to Dashboard</a>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

