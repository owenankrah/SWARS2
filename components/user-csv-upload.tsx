"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, FileText, Upload } from "lucide-react"

export interface UserCsvUploadProps {
  onUpload?: (data: any[]) => void
  title?: string
  description?: string
}

export function UserCsvUpload({
  onUpload,
  title = "Upload Users",
  description = "Upload a CSV file containing user information.",
}: UserCsvUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
        setError("Please upload a CSV file")
        setFile(null)
        return
      }
      setFile(selectedFile)
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload")
      return
    }

    try {
      // Read the file
      const text = await file.text()
      const rows = text.split("\n")
      const headers = rows[0].split(",").map((header) => header.trim())

      // Validate required headers
      const requiredHeaders = ["email", "name", "role"]
      const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header))

      if (missingHeaders.length > 0) {
        setError(`CSV is missing required headers: ${missingHeaders.join(", ")}`)
        return
      }

      // Parse the data
      const data = rows
        .slice(1)
        .filter((row) => row.trim())
        .map((row) => {
          const values = row.split(",").map((value) => value.trim())
          const record: Record<string, string> = {}

          headers.forEach((header, index) => {
            record[header] = values[index] || ""
          })

          return record
        })

      // Validate data
      const invalidRows = data.filter((row) => !row.email || !row.name || !row.role)
      if (invalidRows.length > 0) {
        setError(`${invalidRows.length} rows are missing required fields`)
        return
      }

      // Call the onUpload callback
      if (onUpload) {
        onUpload(data)
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      setFile(null)

      // Reset the file input
      const fileInput = document.getElementById("csv-upload") as HTMLInputElement
      if (fileInput) {
        fileInput.value = ""
      }
    } catch (err) {
      setError("Failed to parse CSV file")
      console.error(err)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="csv-upload" className="text-sm font-medium">
              CSV File
            </label>
            <Input id="csv-upload" type="file" accept=".csv" onChange={handleFileChange} />
            <p className="text-xs text-muted-foreground">
              The CSV file should include the following columns: email, name, role
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <FileText className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>CSV file uploaded successfully</AlertDescription>
            </Alert>
          )}

          <div className="bg-muted p-3 rounded-md">
            <h4 className="font-medium mb-2">CSV Format Example:</h4>
            <pre className="text-xs overflow-x-auto">
              email,name,role,department
              <br />
              john@police.gov.gh,John Doe,police,Traffic
              <br />
              jane@dvla.gov.gh,Jane Smith,dvla,Registration
              <br />
              mark@insurance.com,Mark Johnson,insurance,Claims
            </pre>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpload} disabled={!file || success} className="w-full">
          <Upload className="mr-2 h-4 w-4" />
          Upload CSV
        </Button>
      </CardFooter>
    </Card>
  )
}

