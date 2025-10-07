"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SensorChart } from "@/components/sensor-chart"
import { useSensorData } from "@/hooks/use-sensor-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Activity } from "@/components/icons"

export function AnalyticsPage() {
  const { sensors, history } = useSensorData()

  // Calculate statistics
  const getStats = (sensorType: string) => {
    const data = history[sensorType] || []
    if (data.length === 0) return { avg: 0, min: 0, max: 0, trend: 0 }

    const values = data.map((d) => d.value)
    const avg = values.reduce((a, b) => a + b, 0) / values.length
    const min = Math.min(...values)
    const max = Math.max(...values)
    const trend = data.length > 1 ? ((data[data.length - 1].value - data[0].value) / data[0].value) * 100 : 0

    return { avg: avg.toFixed(1), min: min.toFixed(1), max: max.toFixed(1), trend: trend.toFixed(1) }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-1">Historical data analysis and trends</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sensors.map((sensor) => {
          const stats = getStats(sensor.type)
          return (
            <Card key={sensor.id}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  {sensor.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average</span>
                  <span className="text-lg font-bold">
                    {stats.avg} {sensor.unit}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Min / Max</span>
                  <span className="text-sm font-semibold">
                    {stats.min} / {stats.max}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Trend</span>
                  <span
                    className={`text-sm font-semibold flex items-center gap-1 ${Number(stats.trend) > 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    <TrendingUp className="h-3 w-3" />
                    {stats.trend}%
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <Tabs defaultValue="soil" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="soil">Soil</TabsTrigger>
          <TabsTrigger value="temperature">Temp</TabsTrigger>
          <TabsTrigger value="humidity">Humidity</TabsTrigger>
          <TabsTrigger value="light">Light</TabsTrigger>
          <TabsTrigger value="co2">CO₂</TabsTrigger>
          <TabsTrigger value="water">Water</TabsTrigger>
        </TabsList>

        {sensors.map((sensor) => (
          <TabsContent key={sensor.type} value={sensor.type} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  {sensor.name} Trend Analysis
                </CardTitle>
                <CardDescription>
                  Historical data showing {sensor.name.toLowerCase()} variations over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SensorChart
                  data={(history[sensor.type] || []).map((d) => d.value)}
                  name={sensor.name}
                  color="hsl(var(--chart-1))"
                  unit={sensor.unit}
                  height={400 as any}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
