// Sensor data types and utilities for EdgeAgroChain-X system

export type SensorType = "soil" | "temperature" | "humidity" | "light" | "co2" | "water"

export interface SensorReading {
  id: string
  type: SensorType
  name: string
  value: number
  unit: string
  min: number
  max: number
  optimal: { min: number; max: number }
  timestamp: Date
  status: "optimal" | "warning" | "critical"
}

export interface DecisionLog {
  id: string
  timestamp: Date
  issue: string
  sensorValues: Record<string, number>
  decision: string
  rationale: string
  action: string
  severity: "info" | "warning" | "critical" | "success"
  confidence: number
}

export interface ActuatorState {
  id: string
  name: string
  type: "irrigation" | "ventilation" | "lighting" | "heating"
  status: "on" | "off" | "auto"
  intensity: number
  lastActivated?: Date
}

// Generate realistic sensor data with EMA smoothing
const previousValues: Record<SensorType, number> = {
  soil: 45,
  temperature: 24,
  humidity: 65,
  light: 450,
  co2: 420,
  water: 2.5,
}

const EMA_FACTOR = 0.3

export function generateSensorReading(type: SensorType): SensorReading {
  const configs = {
    soil: { name: "Soil Moisture", unit: "%", min: 0, max: 100, optimal: { min: 40, max: 70 }, variance: 8 },
    temperature: { name: "Temperature", unit: "°C", min: 0, max: 50, optimal: { min: 18, max: 28 }, variance: 3 },
    humidity: { name: "Humidity", unit: "%", min: 0, max: 100, optimal: { min: 50, max: 80 }, variance: 10 },
    light: { name: "Light Intensity", unit: "lux", min: 0, max: 1000, optimal: { min: 300, max: 800 }, variance: 120 },
    co2: { name: "CO₂ Level", unit: "ppm", min: 300, max: 1000, optimal: { min: 400, max: 600 }, variance: 45 },
    water: { name: "Water Flow", unit: "L/min", min: 0, max: 10, optimal: { min: 2, max: 5 }, variance: 0.8 },
  }

  const config = configs[type]

  // Generate new random value
  const randomChange = (Math.random() - 0.5) * config.variance * 2
  const spike = Math.random() < 0.05 ? (Math.random() - 0.5) * config.variance * 4 : 0
  const targetValue = previousValues[type] + randomChange + spike

  // Apply EMA smoothing
  const smoothedValue = EMA_FACTOR * targetValue + (1 - EMA_FACTOR) * previousValues[type]

  // Clamp to min/max
  const clampedValue = Math.max(config.min, Math.min(config.max, smoothedValue))
  previousValues[type] = clampedValue

  // Determine status based on optimal range
  let status: "optimal" | "warning" | "critical"
  if (clampedValue >= config.optimal.min && clampedValue <= config.optimal.max) {
    status = "optimal"
  } else if (clampedValue >= config.optimal.min - 10 && clampedValue <= config.optimal.max + 10) {
    status = "warning"
  } else {
    status = "critical"
  }

  return {
    id: `${type}-${Date.now()}`,
    type,
    name: config.name,
    value: Math.round(clampedValue * 10) / 10,
    unit: config.unit,
    min: config.min,
    max: config.max,
    optimal: config.optimal,
    timestamp: new Date(),
    status,
  }
}

export function generateDecisionLog(sensors: SensorReading[]): DecisionLog {
  const sensorValues: Record<string, number> = {}
  sensors.forEach((s) => {
    sensorValues[s.name] = s.value
  })

  // AI Decision Engine Logic
  const criticalSensors = sensors.filter((s) => s.status === "critical")
  const warningSensors = sensors.filter((s) => s.status === "warning")

  let issue = "System Normal"
  let decision = "Continue monitoring"
  let rationale = "All sensors within acceptable ranges"
  let action = "No action required"
  let severity: DecisionLog["severity"] = "success"
  let confidence = 0.95

  if (criticalSensors.length > 0) {
    const sensor = criticalSensors[0]
    severity = "critical"
    confidence = 0.88

    if (sensor.type === "soil" && sensor.value < sensor.optimal.min) {
      issue = "Critical: Low Soil Moisture"
      decision = "Activate irrigation immediately"
      rationale = `Soil moisture at ${sensor.value}% is critically below optimal range (${sensor.optimal.min}-${sensor.optimal.max}%). Immediate irrigation required to prevent crop stress.`
      action = "AUTO: Irrigation system activated at 80% intensity"
    } else if (sensor.type === "temperature" && sensor.value > sensor.optimal.max) {
      issue = "Critical: High Temperature"
      decision = "Activate cooling and ventilation"
      rationale = `Temperature at ${sensor.value}°C exceeds safe threshold. Risk of heat stress to crops.`
      action = "AUTO: Ventilation activated, misting system engaged"
    } else if (sensor.type === "humidity" && sensor.value < sensor.optimal.min) {
      issue = "Critical: Low Humidity"
      decision = "Increase humidity levels"
      rationale = `Humidity at ${sensor.value}% is too low. May cause plant dehydration.`
      action = "AUTO: Misting system activated"
    }
  } else if (warningSensors.length > 0) {
    const sensor = warningSensors[0]
    severity = "warning"
    confidence = 0.82

    issue = `Warning: ${sensor.name} approaching limits`
    decision = "Prepare corrective measures"
    rationale = `${sensor.name} at ${sensor.value}${sensor.unit} is outside optimal range but not critical yet.`
    action = "STANDBY: Monitoring closely, ready to intervene"
  }

  return {
    id: `decision-${Date.now()}`,
    timestamp: new Date(),
    issue,
    sensorValues,
    decision,
    rationale,
    action,
    severity,
    confidence,
  }
}

export function getStatusColor(status: "optimal" | "warning" | "critical"): string {
  switch (status) {
    case "optimal":
      return "hsl(var(--chart-2))" // Green
    case "warning":
      return "hsl(var(--chart-3))" // Yellow
    case "critical":
      return "hsl(var(--chart-5))" // Red
  }
}

export function getSeverityColor(severity: DecisionLog["severity"]): string {
  switch (severity) {
    case "success":
      return "hsl(var(--chart-2))" // Green
    case "info":
      return "hsl(var(--chart-1))" // Blue
    case "warning":
      return "hsl(var(--chart-3))" // Yellow
    case "critical":
      return "hsl(var(--chart-5))" // Red
  }
}
