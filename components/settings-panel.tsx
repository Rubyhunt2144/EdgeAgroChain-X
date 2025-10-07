"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, RotateCcw } from "lucide-react"

export function SettingsPanel() {
  const [settings, setSettings] = useState({
    // Sensor thresholds
    soilMoistureMin: 40,
    soilMoistureMax: 70,
    temperatureMin: 20,
    temperatureMax: 30,
    humidityMin: 50,
    humidityMax: 80,
    co2Min: 350,
    co2Max: 500,

    // System settings
    updateInterval: 2000,
    emaAlpha: 0.3,
    autoIrrigation: true,
    notifications: true,
    dataLogging: true,

    // Alert settings
    criticalAlerts: true,
    warningAlerts: true,
    emailNotifications: false,
    smsNotifications: false,
  })

  const handleSave = () => {
    console.log("[v0] Saving settings:", settings)
    // In a real application, this would save to backend/localStorage
    alert("Settings saved successfully!")
  }

  const handleReset = () => {
    console.log("[v0] Resetting settings to defaults")
    // Reset to default values
    setSettings({
      soilMoistureMin: 40,
      soilMoistureMax: 70,
      temperatureMin: 20,
      temperatureMax: 30,
      humidityMin: 50,
      humidityMax: 80,
      co2Min: 350,
      co2Max: 500,
      updateInterval: 2000,
      emaAlpha: 0.3,
      autoIrrigation: true,
      notifications: true,
      dataLogging: true,
      criticalAlerts: true,
      warningAlerts: true,
      emailNotifications: false,
      smsNotifications: false,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>Configure sensor thresholds, system behavior, and alert preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="thresholds" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="thresholds" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Soil Moisture Range (%)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="soil-min" className="text-xs text-muted-foreground">
                      Minimum
                    </Label>
                    <Input
                      id="soil-min"
                      type="number"
                      value={settings.soilMoistureMin}
                      onChange={(e) => setSettings({ ...settings, soilMoistureMin: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="soil-max" className="text-xs text-muted-foreground">
                      Maximum
                    </Label>
                    <Input
                      id="soil-max"
                      type="number"
                      value={settings.soilMoistureMax}
                      onChange={(e) => setSettings({ ...settings, soilMoistureMax: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Temperature Range (°C)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="temp-min" className="text-xs text-muted-foreground">
                      Minimum
                    </Label>
                    <Input
                      id="temp-min"
                      type="number"
                      value={settings.temperatureMin}
                      onChange={(e) => setSettings({ ...settings, temperatureMin: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="temp-max" className="text-xs text-muted-foreground">
                      Maximum
                    </Label>
                    <Input
                      id="temp-max"
                      type="number"
                      value={settings.temperatureMax}
                      onChange={(e) => setSettings({ ...settings, temperatureMax: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Humidity Range (%)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="humidity-min" className="text-xs text-muted-foreground">
                      Minimum
                    </Label>
                    <Input
                      id="humidity-min"
                      type="number"
                      value={settings.humidityMin}
                      onChange={(e) => setSettings({ ...settings, humidityMin: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="humidity-max" className="text-xs text-muted-foreground">
                      Maximum
                    </Label>
                    <Input
                      id="humidity-max"
                      type="number"
                      value={settings.humidityMax}
                      onChange={(e) => setSettings({ ...settings, humidityMax: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>CO₂ Range (ppm)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="co2-min" className="text-xs text-muted-foreground">
                      Minimum
                    </Label>
                    <Input
                      id="co2-min"
                      type="number"
                      value={settings.co2Min}
                      onChange={(e) => setSettings({ ...settings, co2Min: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="co2-max" className="text-xs text-muted-foreground">
                      Maximum
                    </Label>
                    <Input
                      id="co2-max"
                      type="number"
                      value={settings.co2Max}
                      onChange={(e) => setSettings({ ...settings, co2Max: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="update-interval">Update Interval: {settings.updateInterval}ms</Label>
                <Slider
                  id="update-interval"
                  value={[settings.updateInterval]}
                  onValueChange={([value]) => setSettings({ ...settings, updateInterval: value })}
                  min={1000}
                  max={10000}
                  step={1000}
                />
                <p className="text-xs text-muted-foreground">How often sensor data is updated</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ema-alpha">EMA Smoothing Factor: {settings.emaAlpha.toFixed(2)}</Label>
                <Slider
                  id="ema-alpha"
                  value={[settings.emaAlpha * 100]}
                  onValueChange={([value]) => setSettings({ ...settings, emaAlpha: value / 100 })}
                  min={10}
                  max={90}
                  step={5}
                />
                <p className="text-xs text-muted-foreground">
                  Controls sensitivity of trend detection (lower = smoother)
                </p>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-irrigation">Automatic Irrigation</Label>
                  <p className="text-xs text-muted-foreground">Enable AI-controlled irrigation system</p>
                </div>
                <Switch
                  id="auto-irrigation"
                  checked={settings.autoIrrigation}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoIrrigation: checked })}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">System Notifications</Label>
                  <p className="text-xs text-muted-foreground">Show in-app notifications for events</p>
                </div>
                <Switch
                  id="notifications"
                  checked={settings.notifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="data-logging">Data Logging</Label>
                  <p className="text-xs text-muted-foreground">Record all sensor data and decisions</p>
                </div>
                <Switch
                  id="data-logging"
                  checked={settings.dataLogging}
                  onCheckedChange={(checked) => setSettings({ ...settings, dataLogging: checked })}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="critical-alerts">Critical Alerts</Label>
                  <p className="text-xs text-muted-foreground">Immediate notifications for critical issues</p>
                </div>
                <Switch
                  id="critical-alerts"
                  checked={settings.criticalAlerts}
                  onCheckedChange={(checked) => setSettings({ ...settings, criticalAlerts: checked })}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="warning-alerts">Warning Alerts</Label>
                  <p className="text-xs text-muted-foreground">Notifications for warning conditions</p>
                </div>
                <Switch
                  id="warning-alerts"
                  checked={settings.warningAlerts}
                  onCheckedChange={(checked) => setSettings({ ...settings, warningAlerts: checked })}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">Send alerts via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-xs text-muted-foreground">Send critical alerts via SMS</p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                />
              </div>

              {(settings.emailNotifications || settings.smsNotifications) && (
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Information</Label>
                  <Input
                    id="contact"
                    type="text"
                    placeholder={settings.emailNotifications ? "email@example.com" : "+1234567890"}
                  />
                  <p className="text-xs text-muted-foreground">
                    {settings.emailNotifications ? "Email address for notifications" : "Phone number for SMS alerts"}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 mt-6 pt-6 border-t border-border">
          <Button onClick={handleSave} className="flex-1 gap-2">
            <Save className="h-4 w-4" />
            Save Settings
          </Button>
          <Button onClick={handleReset} variant="outline" className="gap-2 bg-transparent">
            <RotateCcw className="h-4 w-4" />
            Reset to Defaults
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
