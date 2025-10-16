# 🌾 **EdgeAgroChain-X — Smart Agriculture IoT System**

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://edgeagrochain-x.vercel.app/)
[![Built with Node-RED](https://img.shields.io/badge/Backend-Node--RED-red?style=for-the-badge&logo=nodered)](https://nodered.org/)
[![Frontend Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-blue?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Prototyped with v0.app](https://img.shields.io/badge/UI%20Prototyped%20with-v0.app-purple?style=for-the-badge&logo=v0)](https://v0.app/chat/projects/yicGJoZaMzj)

---

## 🌍 **Live Demo**

🔗 **[Visit the Project](https://edgeagrochain-x.vercel.app/)**
*(Fully deployed, interactive demo — view the entire dashboard in action.)*

---

## 📘 **Overview**

**EdgeAgroChain-X** is an **AI-driven Smart Agriculture IoT Platform** that merges **Edge Computing**, **Node-RED automation**, and a **Next.js analytics dashboard** to create an intelligent farming ecosystem.

It enables **real-time environmental monitoring**, **AI-powered decision-making**, and **automated actuator control** — all designed for sustainable, data-driven agriculture.

### 🌱 What It Does

* Monitors environmental conditions using IoT sensors (incl. GPS)
* Analyzes and smooths sensor data with EMA (Exponential Moving Average)
* Generates AI-based irrigation and control recommendations
* Triggers actuators automatically or via manual override
* Displays insights, alerts, and historical trends via an interactive dashboard

---

## 🧩 **System Architecture**

```
[Sensors] → [Node-RED Backend API] → [AI Decision Engine] → [Next.js Dashboard]
```

### ⚙️ Components

#### 🧠 **Node-RED Backend**

* REST API endpoints: `/api/sensors`, `/api/history`, `/api/decisions`, `/api/actuators`
* Realistic sensor simulation with GPS fields (latitude, longitude, altitude, speed, satellites)
* AI Decision Engine (rule-based; can plug in Edge Impulse)
* Works fully offline

#### 💻 **Next.js Frontend**

* Real-time visualization of all sensors
* GPS details card (not a gauge)
* Alerts, decisions, analytics, actuator control
* TailwindCSS UI

---

## 🧠 **Key Features**

| Feature                           | Description                                                                  |
| --------------------------------- | ---------------------------------------------------------------------------- |
| 🌡️ **Dynamic Sensor Simulation** | Realistic data (temp, humidity, soil moisture, light, CO₂, GPS)              |
| 🤖 **AI Decision Engine**         | Severity-based recommendations; Edge Impulse ready                           |
| 📊 **Advanced Analytics**         | Real-time trends with EMA smoothing                                          |
| ⚙️ **Actuator Automation**        | Auto/manual device control modes                                             |
| 🚨 **Real-Time Alerts**           | Threshold-based environmental alerts                                         |
| 🧭 **Offline Operation**          | Works completely without internet                                            |
| 🧱 **Modern Stack**               | Next.js 14 + TailwindCSS + Node-RED + InfluxDB + Grafana                     |

---

## ⚙️ **Run with Docker (recommended)**

Services/ports:
- Node-RED: http://localhost:1880
- InfluxDB 1.8: http://localhost:8086 (health: `/ping` → 204)
- Grafana: http://localhost:3000
- Frontend: http://localhost:3002
- MQTT (Mosquitto): mqtt://localhost:1883 (TCP; use an MQTT client)
- Fabric Gateway (mock): http://localhost:4000 (GET `/` OK, POST `/tx/reading`)

Start everything (Windows PowerShell):
```powershell
# from anywhere
docker compose -f E:\edgeagrochain\docker-compose.yml up -d --build
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

Import Node-RED flows (UI):
- Open http://localhost:1880 → Menu → Import → choose:
  - `EdgeAgroChain-X/public/node-red-backend-api.json`
- Click Deploy

Quick health checks:
```powershell
Invoke-WebRequest http://localhost:1880/api/sensors -UseBasicParsing | % Content
Invoke-WebRequest http://localhost:8086/ping -UseBasicParsing | % StatusCode
Invoke-WebRequest http://localhost:4000/ -UseBasicParsing | % Content
$body = @{ sensorId="soil-1"; timestamp=(Get-Date).ToString("o"); value=42.5 } | ConvertTo-Json
Invoke-WebRequest http://localhost:4000/tx/reading -Method POST -ContentType application/json -Body $body | % Content
```

> Note: If `/api/decisions` returns empty `sensorValues`, call `/api/sensors` first or seed defaults in the “AI Decision Engine” function.

---

## 🔧 **Local Development (Frontend only)**

```bash
# from repo root
cd EdgeAgroChain-X
npm install
npm run dev
# http://localhost:3000
```

Environment example: `EdgeAgroChain-X/env.example`

---

## 🧠 **Edge Impulse (optional)**

*Train a TinyML model and run via Node-RED Exec or JS runner.*
```powershell
npm i -g edge-impulse-cli
E:\edgeagrochain\edge-impulse\edge-impulse.ps1
```

---

## 🤝 **Federated Learning (Flower) — optional**

Three terminals:
```powershell
E:\edgeagrochain\.venv\Scripts\python.exe E:\edgeagrochain\fl\flower\server.py
E:\edgeagrochain\.venv\Scripts\python.exe E:\edgeagrochain\fl\flower\client.py
E:\edgeagrochain\.venv\Scripts\python.exe E:\edgeagrochain\fl\flower\client.py
```

AI MQTT consumer:
```powershell
E:\edgeagrochain\.venv\Scripts\python.exe E:\edgeagrochain\ai\mqtt_consumer_predict.py
```

---

## 🧭 **Pages Overview**

| Page         | Description                                       |
| ------------ | ------------------------------------------------- |
| `/sensors`   | Live sensor readings with interactive visuals     |
| `/analytics` | Historical analysis and EMA smoothing             |
| `/decisions` | AI decision logs and recommendations              |
| `/actuators` | Manual and automatic control interfaces           |
| `/alerts`    | Environmental warnings and conditions             |
| `/reports`   | Summary reports and insights                      |
| `/settings`  | Update intervals and system configuration         |
| `/about`     | Project overview, research aims, and contributors |

---

## 🧾 **Research Context**

Developed as part of a **research initiative** integrating IoT, Edge AI, Federated Learning, Blockchain logging, and modern web dashboards for precision farming.

---

## 👨‍💻 **Author**

**Ahzaz Ahmed**
* 🎓 *BS Computer Science — University of Wah*
* 📍 Islamabad, Pakistan
* 📧 [zeework2144@gmail.com](mailto:zeework2144@gmail.com)
* 🌐 [Portfolio](https://ahzazkodestech.vercel.app/)
* 🚀 [Live Demo](https://edgeagrochain-x.vercel.app/)

---

## 🧱 **Folder Structure**

```
EdgeAgroChain-X/
├── app/ components/ hooks/ lib/ public/ styles/
├── env.example
└── (Docker stack, Node-RED flows, docs live at repo root)
```

---

## 🧰 **Technology Stack**

* ⚡ **Next.js 14**
* 🎨 **TailwindCSS**
* 🔴 **Node-RED**
* 📈 **InfluxDB 1.8** + **Grafana**
* 🧮 **EMA** (smoothing)
* 💻 **TypeScript / JavaScript**

---

## 📜 **License**

**MIT License © 2025 Ahzaz Ahmed** — Open-source and free for educational and research use.

---

## 🌟 **Support the Project**

* ⭐ Star this repository
* 🔄 Fork & contribute
* 💬 Share feedback and ideas

> “Empowering sustainable agriculture through edge intelligence.” 🌱
