"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SensorGrid } from "@/components/sensor-grid"
import { DecisionEngine } from "@/components/decision-engine"
import { ActuatorPanel } from "@/components/actuator-panel"
import { HistoryTable } from "@/components/history-table"
import { SettingsPanel } from "@/components/settings-panel"
import { Header } from "@/components/header"
import { Activity, Gauge, Zap, History, Settings } from "lucide-react"

export function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-balance">EdgeAgroChain-X Dashboard</h2>
            <p className="text-muted-foreground">Real-time agricultural monitoring and intelligent decision system</p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="overview" className="gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="sensors" className="gap-2">
              <Gauge className="h-4 w-4" />
              <span className="hidden sm:inline">Sensors</span>
            </TabsTrigger>
            <TabsTrigger value="control" className="gap-2">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Control</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <SensorGrid />
            <div className="grid gap-4 md:grid-cols-2">
              <DecisionEngine />
              <ActuatorPanel />
            </div>
          </TabsContent>

          <TabsContent value="sensors" className="space-y-4">
            <SensorGrid detailed />
          </TabsContent>

          <TabsContent value="control" className="space-y-4">
            <ActuatorPanel detailed />
            <DecisionEngine />
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <HistoryTable />
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
