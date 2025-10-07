# EdgeAgroChain-X Node-RED Backend Setup Guide

## Overview
This Node-RED flow provides a complete REST API backend for the EdgeAgroChain-X agricultural monitoring system.

## Features
- **Real-time sensor data generation** with EMA smoothing
- **Historical data storage** (last 100 readings)
- **AI decision engine** with severity-based recommendations
- **Actuator control** via REST API
- **CORS enabled** for frontend integration

## Installation Steps

### 1. Install Node-RED
\`\`\`bash
npm install -g node-red
\`\`\`

### 2. Start Node-RED
\`\`\`bash
node-red
\`\`\`

Node-RED will start on `http://localhost:1880`

### 3. Import the Flow
1. Open Node-RED at `http://localhost:1880`
2. Click the menu (☰) in the top right
3. Select **Import**
4. Click **select a file to import**
5. Choose `node-red-backend.json`
6. Click **Import**

### 4. Deploy
Click the **Deploy** button in the top right corner

## API Endpoints

### GET /api/sensors
Returns current sensor readings with realistic variations.

**Response:**
\`\`\`json
{
  "success": true,
  "timestamp": "2025-01-06T10:30:00.000Z",
  "sensors": [
    {
      "type": "soil",
      "name": "Soil Moisture",
      "value": 45.3,
      "unit": "%",
      "status": "optimal",
      "optimal": { "min": 40, "max": 70 },
      "timestamp": "2025-01-06T10:30:00.000Z"
    }
    // ... more sensors
  ]
}
\`\`\`

### GET /api/history
Returns last 100 sensor readings for trend analysis.

**Response:**
\`\`\`json
{
  "success": true,
  "count": 100,
  "history": [
    {
      "timestamp": "2025-01-06T10:30:00.000Z",
      "sensors": {
        "soil": 45.3,
        "temperature": 24.1,
        "humidity": 65.2,
        "light": 450,
        "co2": 420,
        "water": 2.5
      }
    }
    // ... more entries
  ]
}
\`\`\`

### GET /api/decisions
Returns AI-generated decision based on current sensor values.

**Response:**
\`\`\`json
{
  "success": true,
  "timestamp": "2025-01-06T10:30:00.000Z",
  "decision": {
    "issue": "System Normal",
    "decision": "Continue monitoring",
    "rationale": "All sensors within acceptable ranges",
    "action": "No action required",
    "severity": "success",
    "confidence": 0.95,
    "sensorValues": {
      "soil": 45.3,
      "temperature": 24.1,
      "humidity": 65.2,
      "light": 450,
      "co2": 420,
      "water": 2.5
    }
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

## Connecting Frontend to Node-RED

### Option 1: Environment Variable (Recommended)
Set the `NEXT_PUBLIC_API_URL` environment variable:

\`\`\`bash
NEXT_PUBLIC_API_URL=http://localhost:1880
\`\`\`

The frontend will automatically use this URL for API calls.

### Option 2: Direct Configuration
Update the `lib/sensor-data.ts` file to use Node-RED API:

\`\`\`typescript
const API_URL = "http://localhost:1880"
\`\`\`

## Testing the API

### Using curl
\`\`\`bash
# Get sensor data
curl http://localhost:1880/api/sensors

# Get history
curl http://localhost:1880/api/history

# Get decisions
curl http://localhost:1880/api/decisions

# Control actuator
curl -X POST http://localhost:1880/api/actuators \
  -H "Content-Type: application/json" \
  -d '{"actuatorId":"irrigation","status":"on","intensity":80}'
\`\`\`

### Using Browser
Simply open:
- http://localhost:1880/api/sensors
- http://localhost:1880/api/history
- http://localhost:1880/api/decisions

## Sensor Configuration

The backend generates realistic sensor data with the following ranges:

| Sensor | Unit | Min | Max | Optimal Range | Variance |
|--------|------|-----|-----|---------------|----------|
| Soil Moisture | % | 0 | 100 | 40-70 | ±8 |
| Temperature | °C | 0 | 50 | 18-28 | ±3 |
| Humidity | % | 0 | 100 | 50-80 | ±10 |
| Light Intensity | lux | 0 | 1000 | 300-800 | ±120 |
| CO₂ Level | ppm | 300 | 1000 | 400-600 | ±45 |
| Water Flow | L/min | 0 | 10 | 2-5 | ±0.8 |

## Decision Engine Logic

The AI decision engine analyzes sensor values and provides recommendations:

- **Critical** (confidence 88%): Value is >10 units outside optimal range
  - Immediate action required
  - Automatic actuator activation
  
- **Warning** (confidence 92%): Value is outside optimal range but <10 units
  - Monitor closely
  - Prepare corrective action
  
- **Success** (confidence 95%): All values within optimal range
  - Continue monitoring
  - No action required

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure the Node-RED flow has CORS headers enabled in all HTTP response nodes:
\`\`\`json
{
  "Access-Control-Allow-Origin": "*"
}
\`\`\`

### Port Already in Use
If port 1880 is already in use, you can change it:
\`\`\`bash
node-red -p 1881
\`\`\`

Then update your frontend API URL accordingly.

### Data Not Updating
Make sure you clicked the **Deploy** button after importing the flow.

## Production Deployment

For production use:
1. Remove or restrict CORS to your frontend domain
2. Add authentication to API endpoints
3. Use environment variables for configuration
4. Set up proper logging and monitoring
5. Consider using HTTPS

## Support

For issues or questions:
- Check Node-RED logs in the terminal
- Visit Node-RED documentation: https://nodered.org/docs/
- Review the flow's comment nodes for additional information
