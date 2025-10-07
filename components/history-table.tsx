"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Search, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface HistoryEntry {
  id: string
  timestamp: Date
  issue: string
  sensorValues: string
  decision: string
  rationale: string
  action: string
  severity: "critical" | "warning" | "info" | "success"
}

export function HistoryTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSeverity, setFilterSeverity] = useState<string>("all")

  const [history] = useState<HistoryEntry[]>([
    {
      id: "1",
      timestamp: new Date(Date.now() - 300000),
      issue: "Low Soil Moisture",
      sensorValues: "Soil: 45%, Temp: 28°C, Humidity: 65%",
      decision: "Activate Irrigation",
      rationale: "Soil moisture approaching lower threshold with declining EMA trend",
      action: "AUTO_IRRIGATE",
      severity: "warning",
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 600000),
      issue: "High Temperature",
      sensorValues: "Temp: 35°C, Humidity: 55%, Light: 85000 lux",
      decision: "Increase Ventilation",
      rationale: "Temperature exceeded optimal range, activate cooling",
      action: "VENTILATION_HIGH",
      severity: "warning",
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 900000),
      issue: "Optimal Conditions",
      sensorValues: "All sensors within optimal range",
      decision: "Maintain Current State",
      rationale: "All environmental parameters optimal for crop growth",
      action: "MAINTAIN",
      severity: "success",
    },
    {
      id: "4",
      timestamp: new Date(Date.now() - 1200000),
      issue: "Low Light Intensity",
      sensorValues: "Light: 15000 lux, Temp: 24°C",
      decision: "Activate Supplemental Lighting",
      rationale: "Light intensity below optimal threshold during growth period",
      action: "LIGHTING_ON",
      severity: "info",
    },
    {
      id: "5",
      timestamp: new Date(Date.now() - 1500000),
      issue: "Critical CO₂ Level",
      sensorValues: "CO₂: 850 ppm, Temp: 29°C, Humidity: 70%",
      decision: "Emergency Ventilation",
      rationale: "CO₂ levels approaching dangerous threshold, immediate action required",
      action: "EMERGENCY_VENT",
      severity: "critical",
    },
  ])

  const exportToCSV = () => {
    const headers = ["Time", "Issue", "Sensor Values", "Decision", "Rationale", "Action"]
    const csvContent = [
      headers.join(","),
      ...history.map((entry) =>
        [
          entry.timestamp.toLocaleString(),
          `"${entry.issue}"`,
          `"${entry.sensorValues}"`,
          `"${entry.decision}"`,
          `"${entry.rationale}"`,
          entry.action,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `edgeagrochain-history-${Date.now()}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredHistory = history.filter((entry) => {
    const matchesSearch =
      entry.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.decision.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = filterSeverity === "all" || entry.severity === filterSeverity
    return matchesSearch && matchesSeverity
  })

  const getSeverityVariant = (severity: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "warning":
        return "secondary"
      case "success":
        return "default"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Decision History</CardTitle>
            <CardDescription>Complete log of all system decisions and actions</CardDescription>
          </div>
          <Button onClick={exportToCSV} className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={filterSeverity} onValueChange={setFilterSeverity}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="success">Success</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Sensor Values</TableHead>
                <TableHead>Decision</TableHead>
                <TableHead>Rationale</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No history entries found
                  </TableCell>
                </TableRow>
              ) : (
                filteredHistory.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-mono text-xs whitespace-nowrap">
                      {entry.timestamp.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-medium">{entry.issue}</TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-[200px]">{entry.sensorValues}</TableCell>
                    <TableCell className="font-medium text-primary">{entry.decision}</TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-[300px]">{entry.rationale}</TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">{entry.action}</code>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getSeverityVariant(entry.severity)}>{entry.severity}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>
            Showing {filteredHistory.length} of {history.length} entries
          </p>
          <p>Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </CardContent>
    </Card>
  )
}
