"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SensorDonut } from "@/components/sensor-donut"
import { SensorChart } from "@/components/sensor-chart"
import { useSensorData } from "@/hooks/use-sensor-data"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Activity, RefreshCw } from "@/components/icons"

export function SensorsPage() {
  const { sensors, history, updateInterval, setUpdateInterval, refreshData } = useSensorData()
  const [selectedSensor, setSelectedSensor] = useState<string>("soil")

  const currentSensor = sensors.find((s) => s.type === selectedSensor)

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Sensor Monitoring</h1>
          <p className="text-muted-foreground mt-1">Real-time agricultural sensor data and analytics</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="update-interval" className="text-sm">
              Update Interval:
            </Label>
            <Select value={updateInterval.toString()} onValueChange={(v) => setUpdateInterval(Number(v))}>
              <SelectTrigger id="update-interval" className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2000">2 seconds</SelectItem>
                <SelectItem value="5000">5 seconds</SelectItem>
                <SelectItem value="10000">10 seconds</SelectItem>
                <SelectItem value="30000">30 seconds</SelectItem>
                <SelectItem value="60000">1 minute</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* All sensors grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sensors.map((sensor) => (
          <Card
            key={sensor.id}
            className="cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => setSelectedSensor(sensor.type)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="h-4 w-4" />
                {sensor.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SensorDonut
                value={sensor.value}
                min={sensor.min}
                max={sensor.max}
                optimal={sensor.optimal}
                color="hsl(var(--chart-1))"
                status={sensor.status}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed view of selected sensor */}
      {currentSensor && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed View: {currentSensor.name}</CardTitle>
            <CardDescription>
              Historical trends and current status for {currentSensor.name.toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col items-center justify-center">
                <SensorDonut
                  value={currentSensor.value}
                  min={currentSensor.min}
                  max={currentSensor.max}
                  optimal={currentSensor.optimal}
                  color="hsl(var(--chart-1))"
                  status={currentSensor.status}
                />
                <div className="mt-4 text-center space-y-1">
                  <p className="text-sm text-muted-foreground">Optimal Range</p>
                  <p className="text-lg font-semibold">
                    {currentSensor.optimal.min} - {currentSensor.optimal.max} {currentSensor.unit}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Current Value</p>
                    <p className="text-2xl font-bold">
                      {currentSensor.value} {currentSensor.unit}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="text-2xl font-bold capitalize">{currentSensor.status}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Min Value</p>
                    <p className="text-lg font-semibold">
                      {currentSensor.min} {currentSensor.unit}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Max Value</p>
                    <p className="text-lg font-semibold">
                      {currentSensor.max} {currentSensor.unit}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Last Updated</p>
                  <p className="text-sm font-medium">{currentSensor.timestamp.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Historical Trend (Last 20 readings)</h3>
              <SensorChart
                data={(history[currentSensor.type] || []).map((d) => d.value)}
                name={currentSensor.name}
                unit={currentSensor.unit}
                color="hsl(var(--chart-1))"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
