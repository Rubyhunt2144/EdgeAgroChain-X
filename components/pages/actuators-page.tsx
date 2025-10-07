"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ActuatorPanel } from "@/components/actuator-panel"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { Power, Droplets, Wind, Sun, Thermometer } from "lucide-react"

export function ActuatorsPage() {
  const [actuators, setActuators] = useState([
    { id: "irrigation", name: "Irrigation System", icon: Droplets, status: "auto", intensity: 60 },
    { id: "ventilation", name: "Ventilation", icon: Wind, status: "off", intensity: 0 },
    { id: "lighting", name: "Grow Lights", icon: Sun, status: "on", intensity: 80 },
    { id: "heating", name: "Heating System", icon: Thermometer, status: "auto", intensity: 45 },
  ])

  const toggleActuator = (id: string) => {
    setActuators((prev) => prev.map((a) => (a.id === id ? { ...a, status: a.status === "off" ? "on" : "off" } : a)))
  }

  const setAutoMode = (id: string, auto: boolean) => {
    setActuators((prev) => prev.map((a) => (a.id === id ? { ...a, status: auto ? "auto" : "off" } : a)))
  }

  const setIntensity = (id: string, intensity: number) => {
    setActuators((prev) => prev.map((a) => (a.id === id ? { ...a, intensity } : a)))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance">Actuator Control Panel</h1>
        <p className="text-muted-foreground mt-1">Manual and automatic control of agricultural systems</p>
      </div>

      {/* Main Control Panel */}
      <ActuatorPanel />

      {/* Detailed Controls */}
      <div className="grid gap-4 md:grid-cols-2">
        {actuators.map((actuator) => {
          const Icon = actuator.icon
          return (
            <Card key={actuator.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  {actuator.name}
                </CardTitle>
                <CardDescription>
                  Status: <span className="font-semibold capitalize">{actuator.status}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`${actuator.id}-power`}>Power</Label>
                  <Button
                    id={`${actuator.id}-power`}
                    variant={actuator.status === "off" ? "outline" : "default"}
                    size="sm"
                    onClick={() => toggleActuator(actuator.id)}
                  >
                    <Power className="h-4 w-4 mr-2" />
                    {actuator.status === "off" ? "Turn On" : "Turn Off"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor={`${actuator.id}-auto`}>Auto Mode</Label>
                  <Switch
                    id={`${actuator.id}-auto`}
                    checked={actuator.status === "auto"}
                    onCheckedChange={(checked) => setAutoMode(actuator.id, checked)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`${actuator.id}-intensity`}>Intensity</Label>
                    <span className="text-sm font-semibold">{actuator.intensity}%</span>
                  </div>
                  <Slider
                    id={`${actuator.id}-intensity`}
                    value={[actuator.intensity]}
                    onValueChange={([value]) => setIntensity(actuator.id, value)}
                    max={100}
                    step={5}
                    disabled={actuator.status === "off"}
                  />
                </div>

                <div className="pt-2 border-t text-xs text-muted-foreground">
                  Last activated: {new Date().toLocaleTimeString()}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
