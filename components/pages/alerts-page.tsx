"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useSensorData } from "@/hooks/use-sensor-data"
import { Bell, CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react"
import { useState } from "react"

export function AlertsPage() {
  const { sensors, decisionLogs } = useSensorData()
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">("all")

  // Generate alerts from sensors and decisions
  const alerts = [
    ...sensors
      .filter((s) => s.status !== "optimal")
      .map((s) => ({
        id: s.id,
        type: s.status,
        title: `${s.name} ${s.status === "critical" ? "Critical" : "Warning"}`,
        message: `${s.name} is at ${s.value}${s.unit}, outside optimal range (${s.optimal.min}-${s.optimal.max}${s.unit})`,
        timestamp: s.timestamp,
        acknowledged: false,
      })),
    ...decisionLogs
      .filter((d) => d.severity !== "success")
      .map((d) => ({
        id: d.id,
        type: d.severity,
        title: d.issue,
        message: d.decision,
        timestamp: d.timestamp,
        acknowledged: false,
      })),
  ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  const filteredAlerts = filter === "all" ? alerts : alerts.filter((a) => a.type === filter)

  const getIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance flex items-center gap-2">
            <Bell className="h-8 w-8" />
            Alerts & Notifications
          </h1>
          <p className="text-muted-foreground mt-1">System alerts and critical notifications</p>
        </div>
        <div className="flex gap-2">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            All ({alerts.length})
          </Button>
          <Button
            variant={filter === "critical" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("critical")}
          >
            Critical ({alerts.filter((a) => a.type === "critical").length})
          </Button>
          <Button variant={filter === "warning" ? "default" : "outline"} size="sm" onClick={() => setFilter("warning")}>
            Warning ({alerts.filter((a) => a.type === "warning").length})
          </Button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <p className="text-lg font-semibold">No alerts</p>
              <p className="text-sm text-muted-foreground">All systems operating normally</p>
            </CardContent>
          </Card>
        ) : (
          filteredAlerts.map((alert) => (
            <Card
              key={alert.id}
              className="border-l-4"
              style={{ borderLeftColor: alert.type === "critical" ? "hsl(var(--destructive))" : "hsl(var(--warning))" }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getIcon(alert.type)}
                    <div>
                      <CardTitle className="text-base">{alert.title}</CardTitle>
                      <CardDescription className="text-xs mt-1">{alert.timestamp.toLocaleString()}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={alert.type === "critical" ? "destructive" : "outline"}>{alert.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">{alert.message}</p>
                <Button size="sm" variant="outline">
                  Acknowledge
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
