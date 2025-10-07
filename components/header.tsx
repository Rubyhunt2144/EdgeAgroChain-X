"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Wifi, WifiOff, Download } from "@/components/icons"

export function Header() {
  const [isConnected, setIsConnected] = useState(true)
  const [notifications, setNotifications] = useState(3)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">EA</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-sm font-semibold">EdgeAgroChain-X</h1>
              <p className="text-xs text-muted-foreground">v2.0.0</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <span>{currentTime.toLocaleTimeString()}</span>
            <span className="text-xs">|</span>
            <span>{currentTime.toLocaleDateString()}</span>
          </div>

          <Badge variant={isConnected ? "default" : "destructive"} className="gap-1">
            {isConnected ? (
              <>
                <Wifi className="h-3 w-3" />
                <span className="hidden sm:inline">Connected</span>
              </>
            ) : (
              <>
                <WifiOff className="h-3 w-3" />
                <span className="hidden sm:inline">Offline</span>
              </>
            )}
          </Badge>

          <button
            className="relative h-9 w-9 inline-flex items-center justify-center rounded-md hover:bg-muted"
            onClick={() => setShowNotifications((s) => !s)}
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-4 top-12 z-50 w-80 rounded-md border bg-card p-3 shadow-lg">
              <p className="text-sm font-medium mb-2">Notifications</p>
              <ul className="space-y-2 text-xs">
                <li className="p-2 rounded bg-muted">Low Soil Moisture Alert • 5 min ago</li>
                <li className="p-2 rounded bg-muted">Irrigation Activated • 12 min ago</li>
                <li className="p-2 rounded bg-muted">High Temperature Warning • 1 hour ago</li>
              </ul>
            </div>
          )}

          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export Data</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
