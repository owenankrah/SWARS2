"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Upload, X, FileText, Image, Film } from "lucide-react"
import { uploadEvidenceFile, createEvidence } from "@/services/evidence-service"
import { useAuth } from "@/lib/auth-context"
import { generateUniqueId } from "@/lib/utils"

interface EvidenceUploaderProps {
  accidentId: string
  onUploadComplete?: () => void
}

export function EvidenceUploader({ accidentId, onUploadComplete }: EvidenceUploaderProps) {
  const [files, setFiles] = useState<File[]>([])
  const [descriptions, setDescriptions] = useState<Record<string, string>>({})
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])

      // Initialize descriptions for new files
      const newDescriptions = { ...descriptions }
      newFiles.forEach((file) => {
        newDescriptions[file.name] = ""
      })
      setDescriptions(newDescriptions)
    }
  }

  const handleRemoveFile = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName))

    // Remove description for this file
    const newDescriptions = { ...descriptions }
    delete newDescriptions[fileName]
    setDescriptions(newDescriptions)
  }

  const handleDescriptionChange = (fileName: string, description: string) => {
    setDescriptions({
      ...descriptions,
      [fileName]: description,
    })
  }

  const handleUpload = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "You must be logged in to upload evidence",
      })
      return
    }

    if (files.length === 0) {
      toast({
        variant: "destructive",
        title: "No files selected",
        description: "Please select at least one file to upload",
      })
      return
    }

    setIsUploading(true)

    try {
      // Upload each file and create evidence records
      for (const file of files) {
        // Generate a unique ID for the evidence
        const evidenceId = `EV-${generateUniqueId()}`

        // Create a unique path for the file
        const fileExtension = file.name.split(".").pop()
        const filePath = `${accidentId}/${evidenceId}.${fileExtension}`

        // Upload the file to Supabase Storage
        await uploadEvidenceFile(file, filePath)

        // Create the evidence record in the database
        await createEvidence({
          id: evidenceId,
          accident_id: accidentId,
          file_path: filePath,
          file_type: file.type,
          uploaded_by: user.name,
          description: descriptions[file.name] || undefined,
        })
      }

      toast({
        title: "Upload successful",
        description: `${files.length} file(s) uploaded successfully`,
      })

      // Clear the form
      setFiles([])
      setDescriptions({})

      // Notify parent component if callback provided
      if (onUploadComplete) {
        onUploadComplete()
      }
    } catch (error) {
      console.error("Error uploading files:", error)
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error uploading your files. Please try again.",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <Image className="h-5 w-5 text-blue-500" />
    } else if (file.type.startsWith("video/")) {
      return <Film className="h-5 w-5 text-purple-500" />
    } else {
      return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Evidence</CardTitle>
        <CardDescription>Upload photos, videos, or documents related to the accident</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="evidence">Select Files</Label>
          <div className="flex items-center gap-2">
            <Input
              id="evidence"
              type="file"
              multiple
              accept="image/*,video/*,.pdf,.doc,.docx"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={() => document.getElementById("evidence")?.click()}
              disabled={isUploading}
            >
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {files.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Selected Files ({files.length})</h3>
            <div className="space-y-3">
              {files.map((file, index) => (
                <div key={index} className="rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getFileIcon(file)}
                      <span className="text-sm font-medium">{file.name}</span>
                      <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFile(file.name)}
                      disabled={isUploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2">
                    <Label htmlFor={`description-${index}`} className="text-xs">
                      Description (optional)
                    </Label>
                    <Textarea
                      id={`description-${index}`}
                      placeholder="Describe this evidence..."
                      className="mt-1 h-20 resize-none"
                      value={descriptions[file.name] || ""}
                      onChange={(e) => handleDescriptionChange(file.name, e.target.value)}
                      disabled={isUploading}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleUpload} disabled={isUploading || files.length === 0}>
          {isUploading ? (
            <>Uploading...</>
          ) : (
            <>
              Upload {files.length} file{files.length !== 1 ? "s" : ""}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

