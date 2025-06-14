import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"
import { characters } from "@/lib/characters"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const characterName = searchParams.get("characterName")
    const characterImagePublicPath = searchParams.get("characterImage") // e.g., /naruto.png

    // Update the base URL
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

    // Define background colors for each character - ИСПРАВЛЕНО для всех персонажей
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
          return "#FF69B4" // Natsu Pink
        case "Monkey D. Luffy":
          return "#FF4444" // Luffy Red
        case "Yujiro Hanma":
          return "#8B4513" // Hanma Brown
        case "Griffith":
          return "#F5F5DC" // Griffith Beige/White
        case "Alucard":
          return "#8B0000" // Alucard Dark Red
        default:
          return "#3F51B5" // Default Indigo
      }
    }

    const bgColor = getBackgroundColor(characterData.name)

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
        }}
      >
        <img
          src={characterImageUrl || "/placeholder.svg"}
          width={300}
          height={300}
          style={{ borderRadius: "50%", border: "6px solid #1a1a2e", marginBottom: "30px" }}
          alt={characterName}
        />
        <h1
          style={{
            fontSize: "82px",
            fontWeight: "bold",
            color: "white",
            textShadow: "3px 3px 0 #1a1a2e, -3px -3px 0 #1a1a2e, 3px -3px 0 #1a1a2e, -3px 3px 0 #1a1a2e",
            margin: "0 0 20px 0",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          You are {characterName}! {characterData.emoji}
        </h1>
        <p
          style={{
            fontSize: "32px",
            color: "#1a1a2e",
            textAlign: "center",
            maxWidth: "90%",
            lineHeight: 1.3,
          }}
        >
          {characterData.description}
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
