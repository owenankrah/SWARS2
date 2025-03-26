"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function DamageAssessmentPage() {
  const [date, setDate] = useState<Date>()

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Vehicle Damage Assessment</h1>

      <Card>
        <CardHeader>
          <CardTitle>Assessment Details</CardTitle>
          <CardDescription>Enter the details of the vehicle damage assessment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assessment-date">Date of Assessment</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle-registration">Vehicle Registration</Label>
              <Input id="vehicle-registration" placeholder="e.g. GR-1234-20" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="damage-severity">Damage Severity</Label>
            <Select>
              <SelectTrigger id="damage-severity">
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minor">Minor - Cosmetic damage only</SelectItem>
                <SelectItem value="moderate">Moderate - Functional but repairable</SelectItem>
                <SelectItem value="major">Major - Significant structural damage</SelectItem>
                <SelectItem value="total">Total Loss - Beyond economical repair</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="damage-description">Damage Description</Label>
            <Textarea id="damage-description" placeholder="Describe the damage to the vehicle in detail" rows={4} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="repair-estimate">Estimated Repair Cost (₵)</Label>
            <Input id="repair-estimate" type="number" placeholder="0.00" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="officer-opinion">Professional Opinion</Label>
            <Textarea
              id="officer-opinion"
              placeholder="Provide your professional opinion on the accident and damage"
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Submit Assessment</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

