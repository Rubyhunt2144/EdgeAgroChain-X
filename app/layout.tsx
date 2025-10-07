import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { Sidebar } from "@/components/sidebar"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "EdgeAgroChain-X | Agricultural Monitoring System",
  description: "Real-time agricultural monitoring and intelligent decision system",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Suspense fallback={null}>
          <Sidebar />
          <div className="lg:pl-72">{children}</div>
          <Toaster />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
