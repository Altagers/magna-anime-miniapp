import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { MiniKitContextProvider } from "@/provider/minikit-provider"

export const metadata: Metadata = {
  title: "Anime Character Analyzer",
  description: "Which Anime Character Are You? Analyze your Farcaster posts to find out!",
  generator: "v0.dev",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "https://manga-anime-miniapp.vercel.app/logo.png",
      button: {
        title: "Find your Anime Character",
        action: {
          type: "launch_frame",
          name: "Anime Character Analyzer",
          url: "https://manga-anime-miniapp.vercel.app",
          splashImageUrl: "https://manga-anime-miniapp.vercel.app/splash.png",
          splashBackgroundColor: "#1a1a2e",
        },
      },
    }),
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <MiniKitContextProvider>{children}</MiniKitContextProvider>
      </body>
    </html>
  )
}
