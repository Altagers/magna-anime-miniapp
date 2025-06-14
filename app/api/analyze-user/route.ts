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
      console.log(`Backend: No casts found for FID ${fid}. Using randomized result.`)
      // If no casts, return a random character instead of defaulting to Naruto
      const characterKeys = Object.keys(characters)
      const randomCharacter = characterKeys[Math.floor(Math.random() * characterKeys.length)]
      return NextResponse.json({ character: characters[randomCharacter] })
    }

    // Simple keyword-based analysis without OpenAI
    const allPostsText = castTexts.join(" ").toLowerCase()

    // Define keywords for each character with weights - ОБНОВЛЕНО с правильными ключами
    const characterKeywords = {
      naruto: [
        { word: "believe", weight: 1.5 },
        { word: "never give up", weight: 2 },
        { word: "friend", weight: 1 },
        { word: "dream", weight: 1.5 },
        { word: "goal", weight: 1 },
        { word: "ninja", weight: 2 },
        { word: "hokage", weight: 3 },
        { word: "ramen", weight: 2 },
        { word: "dattebayo", weight: 3 },
        { word: "team", weight: 1 },
        { word: "protect", weight: 1 },
        { word: "shadow clone", weight: 2.5 },
        { word: "jutsu", weight: 2 },
        { word: "sensei", weight: 1.5 },
      ],
      eren: [
        { word: "freedom", weight: 2 },
        { word: "fight", weight: 1 },
        { word: "enemy", weight: 1 },
        { word: "forward", weight: 1.5 },
        { word: "determination", weight: 1.5 },
        { word: "attack", weight: 1 },
        { word: "titan", weight: 2.5 },
        { word: "wall", weight: 1.5 },
        { word: "destroy", weight: 1.5 },
        { word: "revenge", weight: 2 },
        { word: "war", weight: 1 },
        { word: "tatakae", weight: 3 },
        { word: "rumbling", weight: 2.5 },
        { word: "yeager", weight: 2 },
      ],
      asuna: [
        { word: "protect", weight: 1 },
        { word: "together", weight: 1.5 },
        { word: "strategy", weight: 1.5 },
        { word: "support", weight: 1 },
        { word: "team", weight: 1 },
        { word: "sword", weight: 2 },
        { word: "online", weight: 1.5 },
        { word: "virtual", weight: 1.5 },
        { word: "skill", weight: 1 },
        { word: "lightning", weight: 2 },
        { word: "flash", weight: 2 },
        { word: "game", weight: 1.5 },
        { word: "aincrad", weight: 2.5 },
        { word: "kirito", weight: 2 },
      ],
      "sailor moon": [
        { word: "love", weight: 1.5 },
        { word: "friendship", weight: 1.5 },
        { word: "justice", weight: 2 },
        { word: "moon", weight: 2 },
        { word: "heart", weight: 1 },
        { word: "crystal", weight: 1.5 },
        { word: "princess", weight: 1.5 },
        { word: "transform", weight: 1.5 },
        { word: "evil", weight: 1 },
        { word: "magic", weight: 1 },
        { word: "guardian", weight: 1.5 },
        { word: "sailor", weight: 2.5 },
        { word: "usagi", weight: 2 },
        { word: "tuxedo", weight: 2 },
      ],
      saitama: [
        { word: "ok", weight: 0.5 },
        { word: "sure", weight: 0.5 },
        { word: "whatever", weight: 0.7 },
        { word: "bored", weight: 1.5 },
        { word: "sale", weight: 1 },
        { word: "simple", weight: 0.7 },
        { word: "strong", weight: 1 },
        { word: "hero", weight: 1 },
        { word: "punch", weight: 2 },
        { word: "training", weight: 1.5 },
        { word: "monster", weight: 1.5 },
        { word: "one punch", weight: 3 },
        { word: "caped baldy", weight: 3 },
        { word: "genos", weight: 2 },
      ],
      shinji: [
        { word: "why", weight: 0.7 },
        { word: "meaning", weight: 1 },
        { word: "purpose", weight: 1 },
        { word: "connection", weight: 1 },
        { word: "fear", weight: 1.5 },
        { word: "uncertainty", weight: 1.5 },
        { word: "eva", weight: 2.5 },
        { word: "father", weight: 1 },
        { word: "pilot", weight: 2 },
        { word: "sorry", weight: 0.7 },
        { word: "depression", weight: 2 },
        { word: "angel", weight: 2 },
        { word: "instrumentality", weight: 3 },
        { word: "ayanami", weight: 2 },
      ],
      goku: [
        { word: "training", weight: 2 },
        { word: "strong", weight: 1.5 },
        { word: "power", weight: 1.5 },
        { word: "fight", weight: 1.5 },
        { word: "challenge", weight: 2 },
        { word: "food", weight: 1.5 },
        { word: "hungry", weight: 1.5 },
        { word: "excited", weight: 1.5 },
        { word: "adventure", weight: 2 },
        { word: "kamehameha", weight: 3 },
        { word: "saiyan", weight: 2.5 },
        { word: "dragon ball", weight: 2.5 },
        { word: "vegeta", weight: 2 },
        { word: "pure", weight: 1.5 },
        { word: "innocent", weight: 1.5 },
      ],
      edward: [
        { word: "alchemy", weight: 2.5 },
        { word: "science", weight: 2 },
        { word: "research", weight: 1.5 },
        { word: "study", weight: 1.5 },
        { word: "knowledge", weight: 1.5 },
        { word: "truth", weight: 2 },
        { word: "equivalent exchange", weight: 3 },
        { word: "brother", weight: 2 },
        { word: "alphonse", weight: 2.5 },
        { word: "fullmetal", weight: 2.5 },
        { word: "short", weight: 1.5 },
        { word: "automail", weight: 2 },
        { word: "philosopher", weight: 2 },
        { word: "transmutation", weight: 2.5 },
        { word: "smart", weight: 1.5 },
      ],
      tanjiro: [
        { word: "family", weight: 2 },
        { word: "kindness", weight: 2 },
        { word: "compassion", weight: 2 },
        { word: "demon", weight: 2 },
        { word: "sister", weight: 2 },
        { word: "nezuko", weight: 2.5 },
        { word: "water breathing", weight: 3 },
        { word: "smell", weight: 2 },
        { word: "empathy", weight: 2 },
        { word: "forgiveness", weight: 2 },
        { word: "slayer", weight: 2 },
        { word: "gentle", weight: 1.5 },
        { word: "understanding", weight: 1.5 },
        { word: "hope", weight: 1.5 },
      ],
      itachi: [
        { word: "sacrifice", weight: 2.5 },
        { word: "burden", weight: 2 },
        { word: "clan", weight: 2 },
        { word: "village", weight: 1.5 },
        { word: "brother", weight: 2 },
        { word: "sasuke", weight: 2.5 },
        { word: "sharingan", weight: 2.5 },
        { word: "akatsuki", weight: 2.5 },
        { word: "wisdom", weight: 2 },
        { word: "pain", weight: 1.5 },
        { word: "duty", weight: 2 },
        { word: "peace", weight: 1.5 },
        { word: "forgiveness", weight: 1.5 },
        { word: "uchiha", weight: 2 },
      ],
      natsu: [
        { word: "fire", weight: 2.5 },
        { word: "dragon", weight: 2.5 },
        { word: "guild", weight: 2 },
        { word: "fairy tail", weight: 3 },
        { word: "friends", weight: 2 },
        { word: "lucy", weight: 2 },
        { word: "happy", weight: 2 },
        { word: "igneel", weight: 2.5 },
        { word: "motion sickness", weight: 2 },
        { word: "hot", weight: 1.5 },
        { word: "passionate", weight: 1.5 },
        { word: "protect", weight: 1.5 },
        { word: "magic", weight: 1.5 },
        { word: "dragneel", weight: 2.5 },
      ],
      luffy: [
        { word: "pirate", weight: 2.5 },
        { word: "king", weight: 2 },
        { word: "adventure", weight: 2 },
        { word: "crew", weight: 2 },
        { word: "meat", weight: 2 },
        { word: "rubber", weight: 2.5 },
        { word: "straw hat", weight: 3 },
        { word: "one piece", weight: 3 },
        { word: "freedom", weight: 2 },
        { word: "nakama", weight: 2.5 },
        { word: "gomu gomu", weight: 3 },
        { word: "treasure", weight: 1.5 },
        { word: "sea", weight: 1.5 },
        { word: "fun", weight: 1.5 },
      ],
      hanma: [
        { word: "strongest", weight: 2.5 },
        { word: "power", weight: 2 },
        { word: "muscle", weight: 2 },
        { word: "fight", weight: 2 },
        { word: "dominate", weight: 2 },
        { word: "alpha", weight: 2 },
        { word: "baki", weight: 2.5 },
        { word: "ogre", weight: 2.5 },
        { word: "strength", weight: 2 },
        { word: "martial arts", weight: 2 },
        { word: "intimidate", weight: 2 },
        { word: "fear", weight: 1.5 },
        { word: "demon", weight: 1.5 },
        { word: "unstoppable", weight: 2 },
      ],
      griffith: [
        { word: "dream", weight: 2 },
        { word: "ambition", weight: 2.5 },
        { word: "kingdom", weight: 2 },
        { word: "leader", weight: 2 },
        { word: "charisma", weight: 2 },
        { word: "beautiful", weight: 1.5 },
        { word: "band of hawk", weight: 3 },
        { word: "guts", weight: 2 },
        { word: "casca", weight: 2 },
        { word: "femto", weight: 2.5 },
        { word: "godhand", weight: 2.5 },
        { word: "sacrifice", weight: 2 },
        { word: "destiny", weight: 2 },
        { word: "eclipse", weight: 2.5 },
      ],
      alucard: [
        { word: "vampire", weight: 2.5 },
        { word: "blood", weight: 2 },
        { word: "hellsing", weight: 2.5 },
        { word: "seras", weight: 2 },
        { word: "integra", weight: 2 },
        { word: "immortal", weight: 2 },
        { word: "darkness", weight: 1.5 },
        { word: "power", weight: 1.5 },
        { word: "monster", weight: 2 },
        { word: "gun", weight: 1.5 },
        { word: "red", weight: 1.5 },
        { word: "shadow", weight: 1.5 },
        { word: "dracula", weight: 2.5 },
        { word: "ultimate", weight: 2 },
      ],
    }

    // Count keyword matches for each character with weights
    const scores = Object.entries(characterKeywords).map(([character, keywords]) => {
      const score = keywords.reduce((total, { word, weight }) => {
        // Count occurrences of each keyword
        const regex = new RegExp(`\\b${word}\\b`, "gi")
        const matches = allPostsText.match(regex)
        return total + (matches ? matches.length * weight : 0)
      }, 0)

      // Add a small random factor for variety (0-15% of the score)
      const randomFactor = score * (Math.random() * 0.15)
      const finalScore = score + randomFactor

      return { character, score: finalScore }
    })

    // Sort by score and get the highest
    scores.sort((a, b) => b.score - a.score)

    // If scores are very close (within 10%), randomly choose between top 2
    if (scores.length > 1 && scores[0].score > 0 && (scores[0].score - scores[1].score) / scores[0].score < 0.1) {
      const topCharacter = Math.random() < 0.5 ? scores[0].character : scores[1].character
      console.log(`Backend: Scores were close, randomly selected between top 2: ${topCharacter}`)
      const matchedCharacter = characters[topCharacter]
      return NextResponse.json({ character: matchedCharacter })
    }

    const bestMatch = scores[0].character

    console.log(`Backend: Matched character for FID ${fid} using keyword analysis: ${bestMatch}`)
    console.log(`Backend: Scores:`, scores.map((s) => `${s.character}: ${s.score.toFixed(2)}`).join(", "))

    // Map the character name to our character data
    const matchedCharacter = characters[bestMatch]

    if (!matchedCharacter) {
      console.error(`Backend: Could not find character data for ${bestMatch}. Using randomized result.`)
      const characterKeys = Object.keys(characters)
      const randomCharacter = characterKeys[Math.floor(Math.random() * characterKeys.length)]
      return NextResponse.json({ character: characters[randomCharacter] })
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
