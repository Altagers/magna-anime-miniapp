import { type NextRequest, NextResponse } from "next/server"
import { characters } from "@/lib/characters" // Ensure this path is correct

export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const fid = body.fid // Get FID from request body

    if (!fid) {
      throw new Error("FID not provided in the request body")
    }

    console.log(`Backend: Received request to analyze FID: ${fid}`) // Log the FID being queried

    // 1. Fetch user casts from Neynar API
    if (!process.env.NEYNAR_API_KEY) {
      throw new Error("Neynar API key not configured")
    }

    console.log(`Backend: Querying Neynar API for FID: ${fid}`) // Log before Neynar call

    const neynarResponse = await fetch(`https://api.neynar.com/v2/farcaster/feed/user/casts?fid=${fid}&limit=10`, {
      method: "GET",
      headers: {
        accept: "application/json",
        api_key: process.env.NEYNAR_API_KEY,
      },
    })

    if (!neynarResponse.ok) {
      const errorText = await neynarResponse.text()
      console.error(`Backend: Neynar API error for FID ${fid}: ${errorText}`)
      throw new Error(`Neynar API error: ${neynarResponse.status} - ${errorText}`)
    }

    const neynarData = await neynarResponse.json()
    const castTexts = neynarData.casts?.map((cast: any) => cast.text).filter(Boolean) || []

    if (castTexts.length === 0) {
      console.log(`Backend: No casts found for FID ${fid}. Defaulting to Naruto.`)
      // If no casts, default to Naruto
      return NextResponse.json({ character: characters.naruto })
    }

    // Simple keyword-based analysis without OpenAI
    const allPostsText = castTexts.join(" ").toLowerCase()

    // Define keywords for each character
    const characterKeywords = {
      naruto: [
        "believe",
        "never give up",
        "friend",
        "dream",
        "goal",
        "ninja",
        "hokage",
        "ramen",
        "dattebayo",
        "team",
        "protect",
      ],
      eren: [
        "freedom",
        "fight",
        "enemy",
        "forward",
        "determination",
        "attack",
        "titan",
        "wall",
        "destroy",
        "revenge",
        "war",
      ],
      asuna: [
        "protect",
        "together",
        "strategy",
        "support",
        "team",
        "sword",
        "online",
        "virtual",
        "skill",
        "lightning",
        "flash",
      ],
      "sailor moon": [
        "love",
        "friendship",
        "justice",
        "moon",
        "heart",
        "crystal",
        "princess",
        "transform",
        "evil",
        "magic",
        "guardian",
      ],
      saitama: ["ok", "sure", "whatever", "bored", "sale", "simple", "strong", "hero", "punch", "training", "monster"],
      shinji: [
        "why",
        "meaning",
        "purpose",
        "connection",
        "fear",
        "uncertainty",
        "eva",
        "father",
        "pilot",
        "sorry",
        "depression",
      ],
    }

    // Count keyword matches for each character
    const scores = Object.entries(characterKeywords).map(([character, keywords]) => {
      const score = keywords.reduce((total, keyword) => {
        // Count occurrences of each keyword
        const regex = new RegExp(keyword, "gi")
        const matches = allPostsText.match(regex)
        return total + (matches ? matches.length : 0)
      }, 0)

      return { character, score }
    })

    // Sort by score and get the highest
    scores.sort((a, b) => b.score - a.score)
    const bestMatch = scores[0].character

    console.log(`Backend: Matched character for FID ${fid} using keyword analysis: ${bestMatch}`)

    // Map the character name to our character data
    const matchedCharacter = characters[bestMatch]

    if (!matchedCharacter) {
      console.error(`Backend: Could not find character data for ${bestMatch}. Defaulting to Naruto.`)
      return NextResponse.json({ character: characters.naruto })
    }

    return NextResponse.json({
      character: matchedCharacter,
    })
  } catch (error) {
    console.error("Backend: Error in analyze-user route:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to analyze user data",
      },
      { status: 500 },
    )
  }
}
