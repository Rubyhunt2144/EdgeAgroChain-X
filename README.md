# 🌾 **EdgeAgroChain-X — Smart Agriculture IoT System**

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge\&logo=vercel)](https://edgeagrochain-x.vercel.app/)
[![Built with Node-RED](https://img.shields.io/badge/Backend-Node--RED-red?style=for-the-badge\&logo=nodered)](https://nodered.org/)
[![Frontend Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-blue?style=for-the-badge\&logo=next.js)](https://nextjs.org/)
[![Prototyped with v0.app](https://img.shields.io/badge/UI%20Prototyped%20with-v0.app-purple?style=for-the-badge\&logo=v0)](https://v0.app/chat/projects/yicGJoZaMzj)

---

## 🌍 **Live Demo**

🔗 **[Visit the Project](https://edgeagrochain-x.vercel.app/)**
*(Fully deployed, interactive demo — view the entire dashboard in action.)*

---

## 📘 **Overview**

**EdgeAgroChain-X** is an **AI-driven Smart Agriculture IoT Platform** that merges **Edge Computing**, **Node-RED automation**, and a **Next.js analytics dashboard** to create an intelligent farming ecosystem.

It enables **real-time environmental monitoring**, **AI-powered decision-making**, and **automated actuator control** — all designed for sustainable, data-driven agriculture.

### 🌱 What It Does

* Monitors environmental conditions using IoT sensors
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

* Provides REST API endpoints: `/sensors`, `/history`, `/decisions`, `/actuators`
* Simulates realistic sensor values with variance & smoothing
* Runs an **AI Decision Engine** for context-aware automation
* Supports **local/offline operation**

#### 💻 **Next.js Frontend**

* Real-time visualization of all sensors
* Interactive analytics & EMA charts
* Alert and decision panels
* Fully responsive, minimal design built with **TailwindCSS**

---

## 🧠 **Key Features**

| Feature                           | Description                                                                  |
| --------------------------------- | ---------------------------------------------------------------------------- |
| 🌡️ **Dynamic Sensor Simulation** | Realistic data for temperature, humidity, soil moisture, and light intensity |
| 🤖 **AI Decision Engine**         | Severity-based recommendations for smart irrigation                          |
| 📊 **Advanced Analytics**         | Real-time trends with EMA smoothing                                          |
| ⚙️ **Actuator Automation**        | Auto/manual device control modes                                             |
| 🚨 **Real-Time Alerts**           | Threshold-based environmental alerts                                         |
| 🧭 **Offline Operation**          | Works completely without internet                                            |
| 📄 **Reports & Logs**             | Summarized actions and decisions                                             |
| 🧱 **Modern Stack**               | Next.js 14 + TailwindCSS + Node-RED                                          |

---

## ⚙️ **Setup Instructions**

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/EdgeAgroChain-X.git
cd EdgeAgroChain-X
```

### 🔹 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 🔹 3. Import Node-RED Flow

1. Open **Node-RED**
2. Menu → **Import**
3. Import `backend/node-red-backend-api.json`
4. Click **Deploy**

### 🔹 4. Configure Environment Variables

Create a `.env.local` file in `/frontend`:

```
NEXT_PUBLIC_API_URL=http://localhost:1880
PORT=3000
```

### 🔹 5. Run Frontend Locally

```bash
npm run dev
```

Then open **[http://localhost:3000](http://localhost:3000)**

---

## 🛰️ **Offline & Local Mode**

✅ **100% Offline Functionality**

* Node-RED runs locally and generates live sensor data
* Frontend connects to `http://localhost:1880`
* No internet, no third-party APIs required

Perfect for **rural farm deployment**, **research labs**, or **edge devices**.

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

Developed as part of a **research initiative** exploring:

* Edge-based IoT architectures
* Sustainable agriculture through intelligent automation
* Real-time AI decision systems
* Integration of **data analytics**, **automation**, and **smart farming**

**EdgeAgroChain-X** demonstrates how **AI at the edge** can optimize resource use and empower precision farming.

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
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── public/
│   ├── lib/
│   ├── .env.example
│   └── package.json
│
├── backend/
│   └── node-red-backend-api.json
│
└── docs/
    ├── setup-guide.md
    ├── architecture-diagram.png
    └── api-endpoints.md
```

---

## 🧰 **Technology Stack**

* ⚡ **Next.js 14**
* 🎨 **TailwindCSS**
* 🔴 **Node-RED**
* 🧮 **EMA (Exponential Moving Average)**
* 💻 **TypeScript / JavaScript**
* ☁️ **Vercel (Deployment)**

---

## 📜 **License**

**MIT License © 2025 Ahzaz Ahmed**
Open-source and free for educational and research use.

---

## 🌟 **Support the Project**

If you like **EdgeAgroChain-X**, please:

* ⭐ Star this repository
* 🔄 Fork & contribute
* 💬 Share feedback and new ideas

> “Empowering sustainable agriculture through edge intelligence.” 🌱
