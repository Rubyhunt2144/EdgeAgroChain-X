"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DecisionEngine } from "@/components/decision-engine"
import { useSensorData } from "@/hooks/use-sensor-data"
import { Badge } from "@/components/ui/badge"
import { Brain, AlertTriangle, CheckCircle, Info } from "@/components/icons"
import { getSeverityColor } from "@/lib/sensor-data"

export function DecisionsPage() {
  const { decisionLogs } = useSensorData()

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "success":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance flex items-center gap-2">
          <Brain className="h-8 w-8" />
          AI Decision Engine
        </h1>
        <p className="text-muted-foreground mt-1">Intelligent decision-making based on real-time sensor data</p>
      </div>

      {/* Current Decision */}
      <DecisionEngine />

      {/* Decision History */}
      <Card>
        <CardHeader>
          <CardTitle>Decision History</CardTitle>
          <CardDescription>Complete log of all AI-generated decisions and actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {decisionLogs
              .slice()
              .reverse()
              .map((log) => (
                <Card key={log.id} className="border-l-4" style={{ borderLeftColor: getSeverityColor(log.severity) }}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-base flex items-center gap-2">
                          {getSeverityIcon(log.severity)}
                          {log.issue}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {log.timestamp.toLocaleString()} • Confidence: {(log.confidence * 100).toFixed(0)}%
                        </CardDescription>
                      </div>
                      <Badge
                        variant={
                          log.severity === "critical"
                            ? "destructive"
                            : log.severity === "warning"
                              ? "outline"
                              : "default"
                        }
                      >
                        {log.severity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">Decision</p>
                      <p className="text-sm">{log.decision}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">Rationale</p>
                      <p className="text-sm">{log.rationale}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-1">Action Taken</p>
                      <p className="text-sm font-mono text-xs bg-muted p-2 rounded">{log.action}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-1">Sensor Values</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {Object.entries(log.sensorValues).map(([key, value]) => (
                          <div key={key} className="text-xs bg-muted p-2 rounded">
                            <span className="font-semibold">{key}:</span> {value}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
