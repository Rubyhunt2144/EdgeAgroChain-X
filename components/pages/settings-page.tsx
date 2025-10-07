"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SettingsPanel } from "@/components/settings-panel"
import { SettingsIcon, Database, Bell, Sliders } from "lucide-react"

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance flex items-center gap-2">
          <SettingsIcon className="h-8 w-8" />
          System Settings
        </h1>
        <p className="text-muted-foreground mt-1">Configure thresholds, system behavior, and notifications</p>
      </div>

      {/* Quick Info Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Sliders className="h-4 w-4" />
              Sensor Thresholds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Configure optimal ranges for all sensors to trigger appropriate alerts and actions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Database className="h-4 w-4" />
              System Behavior
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Adjust update intervals, EMA smoothing, and automatic control settings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Alert Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Manage notification channels including email, SMS, and in-app alerts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Settings Panel */}
      <SettingsPanel />
    </div>
  )
}
