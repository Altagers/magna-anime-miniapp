import { NextResponse } from "next/server"
import { characters } from "@/lib/characters"

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://manga-anime-miniapp.vercel.app"

  const testResults = []

  for (const [key, character] of Object.entries(characters)) {
    // Маппинг персонажей с правильными именами файлов (УБРАНЫ НАТСУ И ЛУФФИ)
    const characterImageMap: Record<string, string> = {
      Naruto: "/naruto.png",
      "Eren Yeager": "/eren.png",
      Asuna: "/asuna.png",
      "Sailor Moon": "/sailor.png",
      Saitama: "/saitama.png",
      Shinji: "/shinji.png",
      Goku: "/goku.png",
      "Edward Elric": "/edward.png",
      Tanjiro: "/tanjiro.png",
      "Itachi Uchiha": "/itachi.png",
      "Yujiro Hanma": "/hanma.png",
      Griffith: "/grifith.png",
      Alucard: "/alucard.png",
    }

    const imagePath = characterImageMap[character.name] || "/placeholder.svg"
    const ogUrl = `${baseUrl}/api/generate-og-image?characterName=${encodeURIComponent(character.name)}&characterImage=${encodeURIComponent(imagePath)}`
    const shareUrl = `${baseUrl}/s/${encodeURIComponent(character.name)}`

    testResults.push({
      key,
      name: character.name,
      imagePath,
      ogUrl,
      shareUrl,
      encoded: encodeURIComponent(character.name),
      decoded: decodeURIComponent(encodeURIComponent(character.name)),
    })
  }

  return NextResponse.json(
    {
      baseUrl,
      totalCharacters: testResults.length,
      characters: testResults,
      removedCharacters: ["Natsu Dragneel", "Monkey D. Luffy"],
      message: "Natsu and Luffy have been removed from the game",
    },
    { status: 200 },
  )
}
