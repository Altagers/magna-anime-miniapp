import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"
import { characters } from "@/lib/characters"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const characterName = searchParams.get("characterName")
    const characterImagePublicPath = searchParams.get("characterImage")

    console.log(`🖼️ OG Image: === STARTING REQUEST ===`)
    console.log(`🖼️ OG Image: Full URL: ${req.url}`)
    console.log(`🖼️ OG Image: Character name param: "${characterName}"`)
    console.log(`🖼️ OG Image: Character image param: "${characterImagePublicPath}"`)

    const baseUrl = process.env.NEXT_PUBLIC_URL || "https://manga-anime-miniapp.vercel.app"
    console.log(`🖼️ OG Image: Base URL: ${baseUrl}`)

    if (!characterName || !characterImagePublicPath) {
      console.error(`❌ OG Image: Missing parameters`)
      console.error(`❌ OG Image: characterName: ${characterName}`)
      console.error(`❌ OG Image: characterImage: ${characterImagePublicPath}`)
      return new Response("Missing character information", { status: 400 })
    }

    // Construct absolute URL for the character image
    const characterImageUrl = new URL(characterImagePublicPath, baseUrl).toString()
    console.log(`🖼️ OG Image: Character image URL: ${characterImageUrl}`)

    // Search for character data
    console.log(`🔍 OG Image: Searching for character...`)
    console.log(
      `🔍 OG Image: Available characters:`,
      Object.values(characters).map((c) => `"${c.name}"`),
    )

    const characterData = Object.values(characters).find((c) => {
      const match = c.name.toLowerCase() === characterName.toLowerCase()
      console.log(`🔍 OG Image: "${c.name.toLowerCase()}" === "${characterName.toLowerCase()}" = ${match}`)
      return match
    })

    if (!characterData) {
      console.error(`❌ OG Image: Character NOT FOUND for: "${characterName}"`)
      console.error(`❌ OG Image: Searched with toLowerCase: "${characterName.toLowerCase()}"`)
      console.error(
        `❌ OG Image: Available (lowercase):`,
        Object.values(characters).map((c) => `"${c.name.toLowerCase()}"`),
      )
      return new Response(`Character not found: ${characterName}`, { status: 404 })
    }

    console.log(`✅ OG Image: Found character: ${characterData.name} ${characterData.emoji}`)

    // Test image URL accessibility
    console.log(`🌐 OG Image: Testing image URL accessibility...`)
    try {
      const imageResponse = await fetch(characterImageUrl, { method: "HEAD" })
      console.log(`🌐 OG Image: Image URL status: ${imageResponse.status}`)
      if (!imageResponse.ok) {
        console.warn(`⚠️ OG Image: Image URL not accessible: ${imageResponse.status}`)
      }
    } catch (imageError) {
      console.error(`❌ OG Image: Failed to test image URL:`, imageError)
    }

    // Define background colors for each character
    const bgColorMap: Record<string, string> = {
      Naruto: "#FF9B21",
      "Eren Yeager": "#4CAF50",
      Asuna: "#E91E63",
      "Sailor Moon": "#2196F3",
      Saitama: "#FFC107",
      Shinji: "#9C27B0",
      Goku: "#FF5722",
      "Edward Elric": "#FF9800",
      Tanjiro: "#00BCD4",
      "Itachi Uchiha": "#F44336",
      "Natsu Dragneel": "#E91E63",
      "Monkey D. Luffy": "#F44336",
      "Yujiro Hanma": "#795548",
      Griffith: "#9E9E9E",
      Alucard: "#B71C1C",
    }

    const bgColor = bgColorMap[characterData.name] || "#3F51B5"
    console.log(`🎨 OG Image: Using background color: ${bgColor} for "${characterData.name}"`)

    console.log(`🚀 OG Image: Generating ImageResponse...`)

    const imageResponse = new ImageResponse(
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

    console.log(`✅ OG Image: ImageResponse generated successfully for "${characterData.name}"`)
    return imageResponse
  } catch (e: any) {
    console.error(`💥 OG Image: CRITICAL ERROR:`, e.message)
    console.error(`💥 OG Image: Stack trace:`, e.stack)
    console.error(`💥 OG Image: Request URL:`, req.url)
    return new Response(`Failed to generate image: ${e.message}`, { status: 500 })
  }
}
