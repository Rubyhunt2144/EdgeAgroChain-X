"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SensorDonut } from "@/components/sensor-donut"
import { SensorChart } from "@/components/sensor-chart"
import { Droplets, Thermometer, Wind, Sun, Cloud, Waves } from "@/components/icons"
import { useSensorData } from "@/hooks/use-sensor-data"
import { Badge } from "@/components/ui/badge"

interface SensorGridProps {
  detailed?: boolean
}

export function SensorGrid({ detailed = false }: SensorGridProps) {
  const { sensors, history } = useSensorData()

  const sensorIcons = {
    soil: Droplets,
    temperature: Thermometer,
    humidity: Wind,
    light: Sun,
    co2: Cloud,
    water: Waves,
  }

  const sensorColors = {
    soil: "hsl(var(--chart-2))",
    temperature: "hsl(var(--chart-4))",
    humidity: "hsl(var(--chart-1))",
    light: "hsl(var(--chart-3))",
    co2: "hsl(var(--chart-5))",
    water: "hsl(var(--chart-1))",
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.isArray(sensors) &&
        sensors.map((sensor) => {
          const Icon = sensorIcons[sensor.type]
          const color = sensorColors[sensor.type]
          const series = (history?.[sensor.type] ?? []).map((p) => p.value)

          return (
            <Card key={sensor.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <Icon className="h-4 w-4" style={{ color }} />
                    {sensor.name}
                  </CardTitle>
                  <Badge
                    variant={
                      sensor.status === "optimal"
                        ? "default"
                        : sensor.status === "warning"
                          ? "secondary"
                          : "destructive"
                    }
                    className="text-xs"
                  >
                    {sensor.status}
                  </Badge>
                </div>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold" style={{ color }}>
                    {sensor.value}
                  </div>
                  <span className="text-sm font-normal text-muted-foreground">{sensor.unit}</span>
                </div>
                <CardDescription className="text-xs">
                  Optimal: {sensor.optimal.min}-{sensor.optimal.max} {sensor.unit}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <SensorDonut
                  value={sensor.value}
                  min={sensor.min}
                  max={sensor.max}
                  optimal={sensor.optimal}
                  color={color}
                  status={sensor.status}
                />
                {detailed && series.length > 0 && (
                  <SensorChart data={series} color={color} unit={sensor.unit} name={sensor.name} />
                )}
              </CardContent>
            </Card>
          )
        })}
    </div>
  )
}
