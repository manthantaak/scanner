"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function QRCode({ value, size = 200 }: { value: string; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const generateQR = async () => {
      const canvas = canvasRef.current
      if (!canvas) return

      try {
        // Dynamic import of qrcode library
        const QRCodeLib = await import("qrcode")

        await QRCodeLib.toCanvas(canvas, value, {
          width: size,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        })
      } catch (error) {
        console.error("Error generating QR code:", error)
      }
    }

    generateQR()
  }, [value, size])

  return <canvas ref={canvasRef} className="rounded-lg" />
}

// Flying hearts animation component
function FlyingHearts() {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    const heartElements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setHearts(heartElements)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-red-500 text-2xl animate-bounce"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: "3s",
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  )
}

export default function ScannerPage() {
  const [isScanned, setIsScanned] = useState(false)
  const anniversaryUrl = "https://aaniversary-eight.vercel.app/"

  const handleScan = () => {
    setIsScanned(true)
    // Simulate scanning delay
    setTimeout(() => {
      window.open(anniversaryUrl, "_blank")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-rose-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Flying hearts animation */}
      <FlyingHearts />

      {/* Main scanner card */}
      <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-pink-200 relative z-10">
        <div className="text-center space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-pink-600 font-serif">💕 Love Scanner 💕</h1>
            <p className="text-pink-500 text-sm">Scan the code below for a special surprise</p>
          </div>

          <div className="flex justify-center">
            <div className="p-4 bg-white rounded-xl shadow-lg border-2 border-pink-200">
              <QRCode value={anniversaryUrl} size={200} />
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-pink-600 text-xs"></p>
            <p className="text-pink-500 text-xs italic">Or tap the button below to open directly</p>
          </div>

          {/* Scan button */}
          <Button
            onClick={handleScan}
            disabled={isScanned}
            className="w-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-semibold py-3 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105"
          >
            {isScanned ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">💖</span>
                Opening your surprise...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">💕 Open Anniversary Link</span>
            )}
          </Button>

          {/* Romantic message */}
          <div className="text-center space-y-2">
            <p className="text-pink-600 text-sm italic">"Every love story is beautiful, but ours is my favorite"</p>
            <div className="flex justify-center space-x-1">
              <span className="text-red-500 animate-pulse">💕</span>
              <span className="text-pink-500 animate-pulse" style={{ animationDelay: "0.5s" }}>
                💖
              </span>
              <span className="text-red-500 animate-pulse" style={{ animationDelay: "1s" }}>
                💕
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-pink-300 text-6xl opacity-20 animate-pulse">🌸</div>
      <div
        className="absolute bottom-10 right-10 text-pink-300 text-6xl opacity-20 animate-pulse"
        style={{ animationDelay: "1s" }}
      >
        🌸
      </div>
      <div
        className="absolute top-1/2 left-5 text-red-300 text-4xl opacity-30 animate-bounce"
        style={{ animationDelay: "2s" }}
      >
        💝
      </div>
      <div
        className="absolute top-1/4 right-5 text-red-300 text-4xl opacity-30 animate-bounce"
        style={{ animationDelay: "3s" }}
      >
        💝
      </div>
    </div>
  )
}
