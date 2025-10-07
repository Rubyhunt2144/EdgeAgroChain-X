# EdgeAgroChain-X Node-RED Backend Setup

## Overview
This Node-RED flow provides a complete REST API backend for the EdgeAgroChain-X agricultural monitoring system.

## Features
- **Real-time Sensor Data Generation** with EMA smoothing and realistic variations
- **Historical Data Storage** (last 100 readings)
- **AI Decision Engine** with severity-based recommendations
- **Actuator Control API** for irrigation, ventilation, lighting, and heating
- **CORS Enabled** for frontend integration

## Installation

### 1. Import the Flow
1. Open Node-RED (usually at `http://localhost:1880`)
2. Click the menu (☰) → Import
3. Select the `node-red-backend-api.json` file
4. Click "Import"

### 2. Deploy
Click the **Deploy** button in the top right corner

## API Endpoints

### GET /api/sensors
Returns current sensor readings with realistic variations.

**Response:**
\`\`\`json
{
  "success": true,
  "timestamp": "2025-01-10T12:00:00.000Z",
  "sensors": [
    {
      "id": "soil-1234567890",
      "type": "soil",
      "name": "Soil Moisture",
      "value": 45.3,
      "unit": "%",
      "min": 0,
      "max": 100,
      "optimal": { "min": 40, "max": 70 },
      "timestamp": "2025-01-10T12:00:00.000Z",
      "status": "optimal"
    }
    // ... 5 more sensors
  ]
}
\`\`\`

### GET /api/history
Returns last 100 sensor readings for historical analysis.

**Response:**
\`\`\`json
{
  "success": true,
  "count": 100,
  "history": [
    {
      "timestamp": "2025-01-10T12:00:00.000Z",
      "sensors": [ /* array of 6 sensors */ ]
    }
    // ... up to 100 entries
  ]
}
\`\`\`

### GET /api/decisions
Returns AI-generated decision based on current sensor values.

**Response:**
\`\`\`json
{
  "success": true,
  "decision": {
    "id": "decision-1234567890",
    "timestamp": "2025-01-10T12:00:00.000Z",
    "issue": "Critical: Low Soil Moisture",
    "sensorValues": {
      "soil": 25.3,
      "temperature": 24.1,
      "humidity": 65.2,
      "light": 450,
      "co2": 420,
      "water": 2.5
    },
    "decision": "Activate irrigation immediately",
    "rationale": "Soil moisture at 25.3% is critically below optimal range (40-70%). Immediate irrigation required.",
    "action": "AUTO: Irrigation system activated at 80% intensity",
    "severity": "critical",
    "confidence": 0.88
  }
}
\`\`\`

### POST /api/actuators
Control actuators (irrigation, ventilation, lighting, heating).

**Request Body:**
\`\`\`json
{
  "actuatorId": "irrigation",
  "status": "on",
  "intensity": 80
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "actuators": {
    "irrigation": { "status": "on", "intensity": 80 },
    "ventilation": { "status": "auto", "intensity": 0 },
    "lighting": { "status": "off", "intensity": 0 },
    "heating": { "status": "auto", "intensity": 0 }
  },
  "message": "Actuator updated successfully"
}
\`\`\`

## Frontend Integration

### Update Frontend to Use Node-RED Backend

In your Next.js app, create an API client:

\`\`\`typescript
// lib/api-client.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1880'

export async function fetchSensors() {
  const response = await fetch(`${API_BASE_URL}/api/sensors`)
  return response.json()
}

export async function fetchHistory() {
  const response = await fetch(`${API_BASE_URL}/api/history`)
  return response.json()
}

export async function fetchDecision() {
  const response = await fetch(`${API_BASE_URL}/api/decisions`)
  return response.json()
}

export async function controlActuator(actuatorId: string, status: string, intensity: number) {
  const response = await fetch(`${API_BASE_URL}/api/actuators`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ actuatorId, status, intensity })
  })
  return response.json()
}
\`\`\`

### Environment Variable

Add to your `.env.local`:
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:1880
\`\`\`

## Testing

Test the endpoints using curl:

\`\`\`bash
# Get sensor data
curl http://localhost:1880/api/sensors

# Get history
curl http://localhost:1880/api/history

# Get decision
curl http://localhost:1880/api/decisions

# Control actuator
curl -X POST http://localhost:1880/api/actuators \
  -H "Content-Type: application/json" \
  -d '{"actuatorId":"irrigation","status":"on","intensity":80}'
\`\`\`

## How It Works

### Sensor Data Generation
- Uses EMA (Exponential Moving Average) smoothing for realistic data
- Adds random variations and occasional spikes (5% chance)
- Maintains state between calls using Node-RED context storage
- Each sensor has configurable variance for realistic behavior

### Decision Engine
- Analyzes all sensor values against optimal ranges
- Generates severity levels: success, warning, critical
- Provides detailed rationale and recommended actions
- Confidence scoring based on sensor status

### Data Persistence
- Stores last 100 readings in Node-RED context
- Maintains sensor state for smooth transitions
- Actuator states persist across requests

## Customization

### Adjust Sensor Ranges
Edit the `configs` object in the "Generate Sensor Readings" function node:

\`\`\`javascript
const configs = {
    soil: { 
        name: "Soil Moisture", 
        unit: "%", 
        min: 0, 
        max: 100, 
        optimal: { min: 40, max: 70 }, 
        variance: 8 
    },
    // ... modify other sensors
};
\`\`\`

### Change Update Frequency
The frontend controls update frequency. To add auto-refresh in Node-RED:
1. Add an "inject" node set to repeat every X seconds
2. Connect it to the "Generate Sensor Readings" function
3. Add a "websocket" node to push updates to frontend

## Troubleshooting

### CORS Issues
If you get CORS errors, ensure the headers in http response nodes include:
\`\`\`json
{
  "Access-Control-Allow-Origin": "*"
}
\`\`\`

### Port Already in Use
If port 1880 is taken, change Node-RED port in `settings.js`:
\`\`\`javascript
uiPort: process.env.PORT || 1880,
\`\`\`

### Data Not Persisting
Node-RED context is in-memory by default. For persistence:
1. Install `node-red-contrib-contextbrowser`
2. Configure file-based context in `settings.js`

## Production Deployment

For production use:
1. **Secure the API** - Add authentication middleware
2. **Use HTTPS** - Configure SSL certificates
3. **Rate Limiting** - Prevent API abuse
4. **Database Storage** - Replace context with PostgreSQL/MongoDB
5. **Environment Variables** - Use Node-RED environment variables for configuration

## Support

For issues or questions:
- Check Node-RED logs: `node-red-log`
- Debug mode: Add "debug" nodes after function nodes
- Community: https://discourse.nodered.org/
