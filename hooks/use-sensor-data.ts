"use client"

import { useState, useEffect, useCallback } from "react"
import {
  generateSensorReading,
  generateDecisionLog,
  type SensorReading,
  type DecisionLog,
  type ActuatorState,
  type SensorType,
} from "@/lib/sensor-data"

export function useSensorData(initialInterval = 3000) {
  const [updateInterval, setUpdateInterval] = useState(initialInterval)
  const [sensors, setSensors] = useState<SensorReading[]>([])
  const [history, setHistory] = useState<Record<SensorType, Array<{ timestamp: Date; value: number }>>>({
    soil: [],
    temperature: [],
    humidity: [],
    light: [],
    co2: [],
    water: [],
  })
  const [decisionLogs, setDecisionLogs] = useState<DecisionLog[]>([])
  const [actuators, setActuators] = useState<ActuatorState[]>([
    { id: "irr-1", name: "Irrigation System", type: "irrigation", status: "auto", intensity: 0 },
    { id: "vent-1", name: "Ventilation", type: "ventilation", status: "auto", intensity: 0 },
    { id: "light-1", name: "Grow Lights", type: "lighting", status: "off", intensity: 0 },
    { id: "heat-1", name: "Heating System", type: "heating", status: "auto", intensity: 0 },
  ])

  const API_URL = typeof window !== "undefined" ? (process?.env?.NEXT_PUBLIC_API_URL as string) : undefined

  const fetchFromApi = useCallback(async () => {
    if (!API_URL) return false
    try {
      const [sRes, dRes] = await Promise.all([fetch(`${API_URL}/api/sensors`), fetch(`${API_URL}/api/decisions`)])
      if (!sRes.ok || !dRes.ok) return false
      const sJson = await sRes.json()
      const dJson = await dRes.json()

      const newSensors = (sJson?.sensors || []).map((s: any) => ({
        ...s,
        timestamp: new Date(s.timestamp || Date.now()),
      }))
      setSensors(newSensors)

      setHistory((prev) => {
        const updated = { ...prev }
        newSensors.forEach((sensor: any) => {
          const arr = updated[sensor.type] ?? []
          updated[sensor.type] = [...arr, { timestamp: sensor.timestamp, value: sensor.value }].slice(-20)
        })
        return updated
      })

      const dec = dJson?.decision
        ? {
            id: `${Date.now()}`,
            timestamp: new Date(dJson.timestamp || Date.now()),
            issue: dJson.decision.issue,
            decision: dJson.decision.decision,
            rationale: dJson.decision.rationale,
            action: dJson.decision.action,
            severity: dJson.decision.severity,
            confidence: dJson.decision.confidence,
            sensorValues: dJson.decision.sensorValues,
          }
        : generateDecisionLog(newSensors)

      setDecisionLogs((prev) => [dec, ...prev].slice(0, 100))
      return true
    } catch (e) {
      console.log("[v0] API fetch failed, falling back to local generator", e)
      return false
    }
  }, [API_URL])

  const updateSensors = useCallback(async () => {
    // Try API first, fallback to local generation
    const ok = await fetchFromApi()
    if (ok) return

    const newSensors: SensorReading[] = [
      generateSensorReading("soil"),
      generateSensorReading("temperature"),
      generateSensorReading("humidity"),
      generateSensorReading("light"),
      generateSensorReading("co2"),
      generateSensorReading("water"),
    ]

    setSensors(newSensors)

    setHistory((prev) => {
      const updated = { ...prev }
      newSensors.forEach((sensor) => {
        updated[sensor.type] = [
          ...(prev[sensor.type] ?? []),
          { timestamp: sensor.timestamp, value: sensor.value },
        ].slice(-20)
      })
      return updated
    })

    const decision = generateDecisionLog(newSensors)
    setDecisionLogs((prev) => [decision, ...prev].slice(0, 100))

    // auto-update actuators as before
    if (decision.severity === "critical") {
      setActuators((prev) =>
        prev.map((actuator) => {
          if (decision.action.includes("Irrigation") && actuator.type === "irrigation") {
            return { ...actuator, status: "on", intensity: 80, lastActivated: new Date() }
          }
          if (decision.action.includes("Ventilation") && actuator.type === "ventilation") {
            return { ...actuator, status: "on", intensity: 100, lastActivated: new Date() }
          }
          return actuator
        }),
      )
    }
  }, [fetchFromApi])

  useEffect(() => {
    // Initial update
    updateSensors()

    // Set up interval for continuous updates
    const interval = setInterval(updateSensors, updateInterval)

    return () => clearInterval(interval)
  }, [updateSensors, updateInterval])

  const toggleActuator = useCallback((id: string) => {
    setActuators((prev) =>
      prev.map((actuator) => {
        if (actuator.id === id) {
          const newStatus = actuator.status === "on" ? "off" : "on"
          return {
            ...actuator,
            status: newStatus,
            lastActivated: newStatus === "on" ? new Date() : actuator.lastActivated,
          }
        }
        return actuator
      }),
    )
  }, [])

  const setActuatorIntensity = useCallback((id: string, intensity: number) => {
    setActuators((prev) =>
      prev.map((actuator) => {
        if (actuator.id === id) {
          return { ...actuator, intensity }
        }
        return actuator
      }),
    )
  }, [])

  const setActuatorMode = useCallback((id: string, mode: "auto" | "on" | "off") => {
    setActuators((prev) =>
      prev.map((actuator) => {
        if (actuator.id === id) {
          return { ...actuator, status: mode }
        }
        return actuator
      }),
    )
  }, [])

  return {
    sensors,
    history,
    decisionLogs,
    actuators,
    updateInterval,
    setUpdateInterval,
    toggleActuator,
    setActuatorIntensity,
    setActuatorMode,
    refreshData: updateSensors,
  }
}
