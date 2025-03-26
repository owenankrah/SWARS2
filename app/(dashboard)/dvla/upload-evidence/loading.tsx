import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function UploadEvidenceLoading() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader title="Upload Evidence" />

      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Upload Evidence</h2>
            <p className="text-muted-foreground">Upload photos, videos, and documents related to the accident</p>
          </div>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Accident Information</CardTitle>
              <CardDescription>Loading accident information...</CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-[250px]" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upload Evidence</CardTitle>
              <CardDescription>
                Upload photos of vehicle damage, accident scene, documents, or video evidence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-[200px] w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

