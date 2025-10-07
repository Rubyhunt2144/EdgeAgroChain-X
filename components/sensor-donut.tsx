"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface SensorDonutProps {
  value: number
  min: number
  max: number
  optimal: { min: number; max: number }
  color: string
  status: "optimal" | "warning" | "critical"
}

export function SensorDonut({ value, min, max, optimal, color, status }: SensorDonutProps) {
  // Calculate percentage based on position in range
  const percentage = ((value - min) / (max - min)) * 100

  const getStatusColor = () => {
    switch (status) {
      case "optimal":
        return "hsl(var(--chart-2))" // Green
      case "warning":
        return "hsl(var(--chart-3))" // Yellow
      case "critical":
        return "hsl(var(--chart-5))" // Red
    }
  }

  const statusColor = getStatusColor()

  const data = [
    { name: "Value", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ]

  return (
    <div className="relative h-32">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            startAngle={90}
            endAngle={-270}
            paddingAngle={0}
            dataKey="value"
          >
            <Cell fill={statusColor} />
            <Cell fill="hsl(var(--muted))" fillOpacity={0.3} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: statusColor }}>
            {percentage.toFixed(0)}%
          </div>
          <div className="text-xs text-muted-foreground capitalize">{status}</div>
        </div>
      </div>
    </div>
  )
}
