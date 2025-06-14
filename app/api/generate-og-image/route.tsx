import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"
import { characters } from "@/lib/characters"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const characterName = searchParams.get("characterName")
    const characterImagePublicPath = searchParams.get("characterImage") // e.g., /naruto.png

    console.log(`OG Image: Received request for character: "${characterName}"`)
    console.log(`OG Image: Character image path: "${characterImagePublicPath}"`)

    // Update the base URL
    const baseUrl = process.env.NEXT_PUBLIC_URL || "https://manga-anime-miniapp.vercel.app"

    if (!characterName || !characterImagePublicPath) {
      console.error(
        `OG Image: Missing parameters - characterName: ${characterName}, characterImage: ${characterImagePublicPath}`,
      )
      return new Response("Missing character information", { status: 400 })
    }

    // Construct absolute URL for the character image
    const characterImageUrl = new URL(characterImagePublicPath, baseUrl).toString()
    console.log(`OG Image: Full character image URL: ${characterImageUrl}`)

    // ИСПРАВЛЕНО: используем toLowerCase() для поиска, как в share page
    const characterData = Object.values(characters).find((c) => c.name.toLowerCase() === characterName.toLowerCase())
    console.log(
      `OG Image: Found character data:`,
      characterData ? `${characterData.name} ${characterData.emoji}` : "NOT FOUND",
    )

    if (!characterData) {
      console.error(`OG Image: Character not found for name: "${characterName}"`)
      console.log(
        `OG Image: Available characters:`,
        Object.values(characters).map((c) => c.name),
      )
      console.log(`OG Image: Search was case-insensitive for: "${characterName.toLowerCase()}"`)
      return new Response("Character not found", { status: 404 })
    }

    // Define background colors for each character - ОБНОВЛЕНО для всех персонажей
    const bgColor =
      characterData.name === "Naruto"
        ? "#FF9B21" // Naruto Orange
        : characterData.name === "Eren Yeager"
          ? "#4CAF50" // Eren Green
          : characterData.name === "Asuna"
            ? "#E91E63" // Asuna Pink/Red
            : characterData.name === "Sailor Moon"
              ? "#2196F3" // Sailor Moon Blue
              : characterData.name === "Saitama"
                ? "#FFC107" // Saitama Yellow
                : characterData.name === "Shinji"
                  ? "#9C27B0" // Shinji Purple
                  : characterData.name === "Goku"
                    ? "#FF5722" // Goku Orange
                    : characterData.name === "Edward Elric"
                      ? "#FF9800" // Edward Gold
                      : characterData.name === "Tanjiro"
                        ? "#00BCD4" // Tanjiro Teal
                        : characterData.name === "Itachi Uchiha"
                          ? "#F44336" // Itachi Crimson
                          : characterData.name === "Natsu Dragneel"
                            ? "#E91E63" // Natsu Pink
                            : characterData.name === "Monkey D. Luffy"
                              ? "#F44336" // Luffy Red
                              : characterData.name === "Yujiro Hanma"
                                ? "#795548" // Hanma Brown
                                : characterData.name === "Griffith"
                                  ? "#9E9E9E" // Griffith White/Gray
                                  : characterData.name === "Alucard"
                                    ? "#B71C1C" // Alucard Dark Red
                                    : "#3F51B5" // Default Indigo

    console.log(`OG Image: Using background color: ${bgColor} for ${characterData.name}`)

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
          You are {characterData.name}! {characterData.emoji}
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
    console.error(`OG Image Error: Failed to generate ImageResponse for "${req.url}":`, e.message)
    console.error(`OG Image Error Stack:`, e.stack)
    return new Response(`Failed to generate image: ${e.message}`, { status: 500 })
  }
}
