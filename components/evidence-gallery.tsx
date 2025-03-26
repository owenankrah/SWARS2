"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getEvidenceByAccidentId, getEvidenceFileUrl, type Evidence } from "@/services/evidence-service"
import { FileText, Image, Film, Download, Eye } from "lucide-react"

interface EvidenceGalleryProps {
  accidentId: string
  refreshTrigger?: number
}

export function EvidenceGallery({ accidentId, refreshTrigger = 0 }: EvidenceGalleryProps) {
  const [evidence, setEvidence] = useState<Evidence[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null)

  useEffect(() => {
    const fetchEvidence = async () => {
      setLoading(true)
      try {
        const data = await getEvidenceByAccidentId(accidentId)
        setEvidence(data)
      } catch (error) {
        console.error("Error fetching evidence:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvidence()
  }, [accidentId, refreshTrigger])

  const filteredEvidence = evidence.filter((item) => {
    if (activeTab === "all") return true
    if (activeTab === "images") return item.file_type.startsWith("image/")
    if (activeTab === "videos") return item.file_type.startsWith("video/")
    if (activeTab === "documents") return !item.file_type.startsWith("image/") && !item.file_type.startsWith("video/")
    return true
  })

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <Image className="h-5 w-5 text-blue-500" />
    } else if (fileType.startsWith("video/")) {
      return <Film className="h-5 w-5 text-purple-500" />
    } else {
      return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const getFileUrl = (filePath: string) => {
    return getEvidenceFileUrl(filePath)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evidence</CardTitle>
        <CardDescription>Photos, videos, and documents related to the accident</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {loading ? (
              <div className="flex justify-center py-8">
                <p>Loading evidence...</p>
              </div>
            ) : filteredEvidence.length === 0 ? (
              <div className="flex justify-center py-8">
                <p className="text-muted-foreground">No evidence found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEvidence.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="aspect-video bg-muted relative">
                      {item.file_type.startsWith("image/") ? (
                        <img
                          src={getFileUrl(item.file_path) || "/placeholder.svg"}
                          alt={item.description || "Evidence"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          {getFileIcon(item.file_type)}
                        </div>
                      )}
                    </div>
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium truncate">{item.id}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(item.created_at)}</p>
                        </div>
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => setSelectedEvidence(item)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>Evidence Details</DialogTitle>
                              </DialogHeader>
                              {selectedEvidence && (
                                <div className="space-y-4">
                                  <div className="aspect-video bg-muted relative">
                                    {selectedEvidence.file_type.startsWith("image/") ? (
                                      <img
                                        src={getFileUrl(selectedEvidence.file_path) || "/placeholder.svg"}
                                        alt={selectedEvidence.description || "Evidence"}
                                        className="w-full h-full object-contain"
                                      />
                                    ) : selectedEvidence.file_type.startsWith("video/") ? (
                                      <video
                                        src={getFileUrl(selectedEvidence.file_path)}
                                        controls
                                        className="w-full h-full"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center">
                                        <FileText className="h-16 w-16 text-muted-foreground" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="space-y-2">
                                    <div>
                                      <p className="text-sm font-medium">ID</p>
                                      <p className="text-sm">{selectedEvidence.id}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">Uploaded By</p>
                                      <p className="text-sm">{selectedEvidence.uploaded_by}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">Date Uploaded</p>
                                      <p className="text-sm">{formatDate(selectedEvidence.created_at)}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">Description</p>
                                      <p className="text-sm">
                                        {selectedEvidence.description || "No description provided"}
                                      </p>
                                    </div>
                                  </div>
                                  <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => window.open(getFileUrl(selectedEvidence.file_path), "_blank")}
                                  >
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </Button>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => window.open(getFileUrl(item.file_path), "_blank")}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {item.description && <p className="text-xs mt-1 line-clamp-2">{item.description}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

