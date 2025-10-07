"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HistoryTable } from "@/components/history-table"
import { Button } from "@/components/ui/button"
import { FileDown, FileText, Calendar } from "lucide-react"
import { useSensorData } from "@/hooks/use-sensor-data"

export function ReportsPage() {
  const { decisionLogs, sensors } = useSensorData()

  const generatePDFReport = () => {
    alert("PDF report generation would be implemented here")
  }

  const generateSummary = () => {
    alert("Summary report generation would be implemented here")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Reports & Export
          </h1>
          <p className="text-muted-foreground mt-1">Generate reports and export system data</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={generateSummary}>
            <Calendar className="h-4 w-4 mr-2" />
            Generate Summary
          </Button>
          <Button onClick={generatePDFReport}>
            <FileDown className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Decisions</CardDescription>
            <CardTitle className="text-3xl">{decisionLogs.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Critical Alerts</CardDescription>
            <CardTitle className="text-3xl text-red-500">
              {decisionLogs.filter((d) => d.severity === "critical").length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Sensors</CardDescription>
            <CardTitle className="text-3xl">{sensors.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>System Uptime</CardDescription>
            <CardTitle className="text-3xl">99.8%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* History Table with CSV Export */}
      <HistoryTable />
    </div>
  )
}
