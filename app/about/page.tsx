export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-balance">About EdgeAgroChain-X</h1>
      <p className="text-muted-foreground">
        EdgeAgroChain-X is a real-time agricultural monitoring and intelligent decision system. It combines sensor
        ingestion, on-edge analytics (EMA-based smoothing and rule reasoning), and automated actuation to maintain
        optimal growing conditions.
      </p>
      <section className="space-y-2">
        <h2 className="text-xl font-medium">Research & Objectives</h2>
        <ul className="list-disc pl-5 text-sm leading-relaxed">
          <li>Multi-sensor fusion: soil moisture, temperature, humidity, light, CO₂, and water flow.</li>
          <li>Decision engine with thresholds and recommendations for irrigation, ventilation, and lighting.</li>
          <li>Edge-first design: runs entirely offline with Node-RED on localhost.</li>
          <li>Observability: dashboards, alerts, analytics, and exportable reports.</li>
        </ul>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-medium">Architecture</h2>
        <p className="text-sm text-muted-foreground">
          The frontend can fetch from a local Node-RED REST API (<code>http://localhost:1880</code>) via
          <code>NEXT_PUBLIC_API_URL</code>. When disconnected, it switches to an internal simulator with realistic
          randomization. Settings update thresholds and intervals in real time.
        </p>
      </section>
    </main>
  )
}
