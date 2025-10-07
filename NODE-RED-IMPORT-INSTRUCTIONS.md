# EdgeAgroChain-X Node-RED Import Instructions

## Overview
This Node-RED flow provides a complete agricultural monitoring system with:
- 6 sensor inputs (Soil, Temperature, Humidity, Light, CO₂, Water)
- Real-time donut gauge visualizations
- AI-powered decision engine with EMA smoothing
- Automated actuator control (Irrigation, Ventilation, Lighting, Heating)
- Complete history logging with CSV export
- Professional dashboard UI

## Prerequisites
Before importing, ensure you have these Node-RED packages installed:

\`\`\`bash
npm install node-red-dashboard
npm install node-red-node-ui-table
\`\`\`

## Import Instructions

### Step 1: Copy the Flow JSON
1. Open the file `public/node-red-flow.json`
2. Copy the entire JSON content

### Step 2: Import into Node-RED
1. Open your Node-RED editor (usually at `http://localhost:1880`)
2. Click the hamburger menu (☰) in the top right
3. Select **Import** → **Clipboard**
4. Paste the JSON content
5. Click **Import**

### Step 3: Deploy
1. Click the **Deploy** button in the top right
2. Wait for the deployment to complete

### Step 4: Access the Dashboard
1. Navigate to `http://localhost:1880/ui`
2. You should see the EdgeAgroChain-X Dashboard with:
   - 6 donut gauges showing real-time sensor data
   - AI Decision Engine panel with recommendations
   - Actuator status indicators
   - History table with all decisions
   - Export CSV button

## Features Explained

### Sensor Monitoring
- **Soil Moisture**: Monitors soil water content (optimal: 40-70%)
- **Temperature**: Tracks ambient temperature (optimal: 18-28°C)
- **Humidity**: Measures air humidity (optimal: 50-80%)
- **Light Intensity**: Monitors light levels (optimal: 300-800 lux)
- **CO₂ Level**: Tracks carbon dioxide (optimal: 400-600 ppm)
- **Water Flow**: Monitors irrigation flow (optimal: 2-5 L/min)

### AI Decision Engine
- Uses EMA (Exponential Moving Average) smoothing for stable readings
- Analyzes all sensor data in real-time
- Provides confidence scores for decisions
- Generates detailed rationale for each action
- Automatically triggers actuators when needed

### Actuator Control
- **Irrigation System**: Auto-activates when soil moisture is low
- **Ventilation**: Activates for high temperature or CO₂
- **Grow Lights**: Can be controlled manually or automatically
- **Heating System**: Maintains optimal temperature

### Data Logging
- All decisions logged with timestamp
- Sensor values recorded at each decision point
- CSV export functionality for external analysis
- Complete audit trail of system actions

## Customization

### Adjust Sensor Thresholds
Edit the function nodes (e.g., "Generate Soil Data") to modify:
- `optimal.min` and `optimal.max` values
- `variance` for data fluctuation
- EMA smoothing factor (`emaAlpha`)

### Modify Decision Logic
Edit the "AI Decision Engine" function node to:
- Add new decision rules
- Adjust confidence thresholds
- Customize actuator responses

### Change Update Frequency
Modify the `repeat` value in inject nodes (default: 3 seconds)

## Troubleshooting

### Dashboard Not Showing
- Ensure `node-red-dashboard` is installed
- Check that the flow is deployed
- Verify the dashboard is accessible at `/ui`

### Sensors Not Updating
- Check that inject nodes are enabled
- Verify the repeat interval is set
- Look for errors in the debug panel

### CSV Export Not Working
- Ensure the `/data` directory exists and is writable
- Check file permissions
- Verify the file path in the "Write to CSV" node

## File Locations
- **CSV History**: `/data/edgeagrochain-history.csv`
- **Dashboard UI**: `http://localhost:1880/ui`
- **Flow Editor**: `http://localhost:1880`

## Support
For issues or questions:
1. Check the Node-RED debug panel for errors
2. Verify all required packages are installed
3. Ensure proper file permissions for CSV export
4. Review the function node code for customization needs

## Next Steps
1. Connect real sensors by replacing inject nodes with actual sensor inputs
2. Integrate with MQTT for IoT device communication
3. Add database storage for long-term data retention
4. Implement email/SMS alerts for critical conditions
5. Create custom reports and analytics dashboards
