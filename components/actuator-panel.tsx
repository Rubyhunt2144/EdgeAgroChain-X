"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Droplets, Power, Zap, Fan, Lightbulb, Flame } from "lucide-react"
import { useSensorData } from "@/hooks/use-sensor-data"

interface ActuatorPanelProps {
  detailed?: boolean
}

export function ActuatorPanel({ detailed = false }: ActuatorPanelProps) {
  const { actuators, toggleActuator, setActuatorIntensity, setActuatorMode } = useSensorData()

  const getActuatorIcon = (type: string) => {
    switch (type) {
      case "irrigation":
        return <Droplets className="h-5 w-5 text-chart-1" />
      case "ventilation":
        return <Fan className="h-5 w-5 text-chart-1" />
      case "lighting":
        return <Lightbulb className="h-5 w-5 text-chart-3" />
      case "heating":
        return <Flame className="h-5 w-5 text-chart-4" />
      default:
        return <Zap className="h-5 w-5" />
    }
  }

  const irrigationActuator = actuators.find((a) => a.type === "irrigation")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-chart-3" />
            <CardTitle>Actuator Control</CardTitle>
          </div>
          <Badge variant={irrigationActuator?.status === "auto" ? "default" : "secondary"}>
            {irrigationActuator?.status === "auto" ? "Auto Mode" : "Manual Mode"}
          </Badge>
        </div>
        <CardDescription>Control irrigation, ventilation, lighting, and heating systems</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primary Irrigation System */}
        {irrigationActuator && (
          <div className="space-y-4 rounded-lg border border-border p-4 bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getActuatorIcon(irrigationActuator.type)}
                <div>
                  <h4 className="text-sm font-medium">{irrigationActuator.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {irrigationActuator.status === "on" ? "Currently active" : "Standby"}
                  </p>
                </div>
              </div>
              <Badge variant={irrigationActuator.status === "on" ? "default" : "outline"} className="gap-1">
                <Power className="h-3 w-3" />
                {irrigationActuator.status.toUpperCase()}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="irrigation-mode" className="text-sm">
                Automatic Control
              </Label>
              <Switch
                id="irrigation-mode"
                checked={irrigationActuator.status === "auto"}
                onCheckedChange={(checked) => {
                  setActuatorMode(irrigationActuator.id, checked ? "auto" : "off")
                }}
              />
            </div>

            {irrigationActuator.status !== "auto" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="irrigation-intensity" className="text-sm">
                    Irrigation Intensity: {irrigationActuator.intensity}%
                  </Label>
                  <Slider
                    id="irrigation-intensity"
                    value={[irrigationActuator.intensity]}
                    onValueChange={(value) => setActuatorIntensity(irrigationActuator.id, value[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <Button
                  onClick={() => toggleActuator(irrigationActuator.id)}
                  className="w-full"
                  variant={irrigationActuator.status === "on" ? "destructive" : "default"}
                >
                  {irrigationActuator.status === "on" ? "Stop Irrigation" : "Start Irrigation"}
                </Button>
              </>
            )}

            {irrigationActuator.status === "auto" && (
              <div className="rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
                System will automatically activate when soil moisture drops below 40% or based on AI recommendations.
              </div>
            )}

            {irrigationActuator.lastActivated && (
              <div className="text-xs text-muted-foreground">
                Last activated: {irrigationActuator.lastActivated.toLocaleString()}
              </div>
            )}
          </div>
        )}

        {/* Other Actuators */}
        {detailed &&
          actuators
            .filter((a) => a.type !== "irrigation")
            .map((actuator) => (
              <div key={actuator.id} className="space-y-4 rounded-lg border border-border p-4 bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getActuatorIcon(actuator.type)}
                    <div>
                      <h4 className="text-sm font-medium">{actuator.name}</h4>
                      <p className="text-xs text-muted-foreground capitalize">{actuator.type} control</p>
                    </div>
                  </div>
                  <Switch
                    checked={actuator.status === "on" || actuator.status === "auto"}
                    onCheckedChange={() => toggleActuator(actuator.id)}
                  />
                </div>
                {actuator.lastActivated && (
                  <div className="text-xs text-muted-foreground">
                    Last activated: {actuator.lastActivated.toLocaleString()}
                  </div>
                )}
              </div>
            ))}

        {/* System Status Summary */}
        <div className="rounded-lg bg-muted/50 p-4 space-y-2">
          <h4 className="text-sm font-medium">System Status</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {actuators.map((actuator) => (
              <div key={actuator.id} className="flex justify-between">
                <span className="text-muted-foreground">{actuator.name}:</span>
                <span className="font-medium capitalize">{actuator.status}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
