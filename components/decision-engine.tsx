"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, AlertTriangle, CheckCircle, Info, TrendingUp } from "@/components/icons"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSensorData } from "@/hooks/use-sensor-data"
import { Progress } from "@/components/ui/progress"

export function DecisionEngine() {
  const { decisionLogs } = useSensorData()

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-chart-3" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-chart-2" />
      default:
        return <Info className="h-4 w-4 text-primary" />
    }
  }

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

  const latestDecision = Array.isArray(decisionLogs) && decisionLogs.length > 0 ? decisionLogs[0] : null

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <CardTitle>AI Decision Engine</CardTitle>
          </div>
          <Badge variant="outline" className="gap-1">
            <div className="h-2 w-2 rounded-full bg-chart-2 animate-pulse" />
            Active
          </Badge>
        </div>
        <CardDescription>Intelligent decision-making with EMA smoothing and pattern recognition</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {latestDecision && (
          <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Current Analysis
              </p>
              <Badge variant="secondary" className="gap-1">
                {Math.round(latestDecision.confidence * 100)}% confidence
              </Badge>
            </div>
            <Progress value={latestDecision.confidence * 100} className="h-2" />
            <p className="text-sm text-muted-foreground">{latestDecision.decision}</p>
          </div>
        )}

        <div>
          <h4 className="text-sm font-medium mb-3">Decision Log</h4>
          <ScrollArea className="h-[300px] pr-4">
            {Array.isArray(decisionLogs) && decisionLogs.length > 0 ? (
              <div className="space-y-3">
                {decisionLogs.slice(0, 10).map((decision) => (
                  <div key={decision.id} className="rounded-lg border border-border bg-card p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {getSeverityIcon(decision.severity)}
                        <h5 className="text-sm font-medium">{decision.issue}</h5>
                      </div>
                      <Badge variant={getSeverityVariant(decision.severity)} className="text-xs">
                        {decision.severity}
                      </Badge>
                    </div>

                    <div className="space-y-1 text-sm">
                      <div>
                        <span className="text-muted-foreground">Decision:</span>
                        <span className="ml-2 font-medium text-primary">{decision.decision}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Rationale:</span>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{decision.rationale}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Action:</span>
                        <code className="ml-2 text-xs bg-muted px-2 py-1 rounded">{decision.action}</code>
                      </div>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {Object.entries(decision.sensorValues).map(([key, value]) => (
                          <Badge key={key} variant="outline" className="text-xs">
                            {key}: {typeof value === "number" ? value.toFixed(1) : value}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                      {decision.timestamp instanceof Date
                        ? decision.timestamp.toLocaleString()
                        : new Date(decision.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                Waiting for sensor data...
              </div>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}
