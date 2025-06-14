import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"
import { characters } from "@/lib/characters"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const characterName = searchParams.get("characterName")
    const characterImagePublicPath = searchParams.get("characterImage")

    const baseUrl = process.env.NEXT_PUBLIC_URL || "https://manga-anime-miniapp.vercel.app"

    if (!characterName || !characterImagePublicPath) {
      return new Response("Missing character information", { status: 400 })
    }

    // Construct absolute URL for the character image
    const characterImageUrl = new URL(characterImagePublicPath, baseUrl).toString()

    const characterData = Object.values(characters).find((c) => c.name === characterName)
    if (!characterData) {
      return new Response("Character not found", { status: 404 })
    }

    // Более точные цвета для каждого персонажа
    const getBackgroundColor = (name: string): string => {
      switch (name) {
        case "Naruto":
          return "#FF9B21" // Naruto Orange
        case "Eren Yeager":
          return "#4CAF50" // Eren Green
        case "Asuna":
          return "#E91E63" // Asuna Pink/Red
        case "Sailor Moon":
          return "#2196F3" // Sailor Moon Blue
        case "Saitama":
          return "#FFC107" // Saitama Yellow
        case "Shinji":
          return "#9C27B0" // Shinji Purple
        case "Goku":
          return "#FF5722" // Goku Orange/Red
        case "Edward Elric":
          return "#FFD700" // Edward Gold
        case "Tanjiro":
          return "#00BCD4" // Tanjiro Teal
        case "Itachi Uchiha":
          return "#DC143C" // Itachi Crimson
        case "Natsu Dragneel":
          return "#FF1493" // Natsu Deep Pink (изменил на более яркий)
        case "Monkey D. Luffy":
          return "#FF4444" // Luffy Red
        case "Yujiro Hanma":
          return "#8B4513" // Hanma Brown
        case "Griffith":
          return "#F0F8FF" // Griffith Alice Blue (изменил на более светлый)
        case "Alucard":
          return "#8B0000" // Alucard Dark Red
        default:
          return "#3F51B5" // Default Indigo
      }
    }

    // Получаем цвет для текста в зависимости от фона
    const getTextColor = (bgColor: string): string => {
      // Для светлых фонов используем темный текст
      if (bgColor === "#F0F8FF" || bgColor === "#FFD700" || bgColor === "#FFC107") {
        return "#1a1a2e"
      }
      return "white"
    }

    const bgColor = getBackgroundColor(characterData.name)
    const textColor = getTextColor(bgColor)

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: bgColor,
          padding: "40px",
          border: "8px solid #1a1a2e",
          borderRadius: "20px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <img
          src={characterImageUrl || "/placeholder.svg"}
          width={280}
          height={280}
          style={{
            borderRadius: "50%",
            border: "6px solid #1a1a2e",
            marginBottom: "30px",
            objectFit: "cover",
          }}
          alt={characterName}
        />
        <h1
          style={{
            fontSize: "72px",
            fontWeight: "900",
            color: textColor,
            textShadow:
              textColor === "white"
                ? "4px 4px 0 #1a1a2e, -2px -2px 0 #1a1a2e, 2px -2px 0 #1a1a2e, -2px 2px 0 #1a1a2e"
                : "2px 2px 0 rgba(255,255,255,0.8), -1px -1px 0 rgba(255,255,255,0.8)",
            margin: "0 0 20px 0",
            textAlign: "center",
            lineHeight: 1.1,
            maxWidth: "90%",
          }}
        >
          You are {characterName}! {characterData.emoji}
        </h1>
        <p
          style={{
            fontSize: "28px",
            color: textColor === "white" ? "#1a1a2e" : "#2d2d2d",
            textAlign: "center",
            maxWidth: "85%",
            lineHeight: 1.4,
            fontWeight: "600",
            textShadow: textColor === "white" ? "none" : "1px 1px 0 rgba(255,255,255,0.7)",
          }}
        >
          {characterData.description.length > 180
            ? characterData.description.substring(0, 180) + "..."
            : characterData.description}
        </p>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: any) {
    console.error(`OG Image Error: Failed to generate ImageResponse:`, e.message)
    return new Response(`Failed to generate image: ${e.message}`, { status: 500 })
  }
}
