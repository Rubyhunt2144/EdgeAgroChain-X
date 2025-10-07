"use client"

import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip, CartesianGrid } from "recharts"

interface SensorChartProps {
  data: number[]
  color: string
  unit: string
  name: string
}

export function SensorChart({ data, color, unit, name }: SensorChartProps) {
  const chartData = data.map((value, index) => ({
    index,
    value,
  }))

  return (
    <div className="h-20">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <YAxis hide domain={["dataMin - 5", "dataMax + 5"]} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="text-xs font-medium">
                      {payload[0].value} {unit}
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} animationDuration={300} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
