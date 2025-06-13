import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
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
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key not configured")
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
      // If no casts, default to Naruto (or handle as preferred)
      return NextResponse.json({ character: characters.naruto })
    }

    // 2. Prepare the prompt and call OpenAI API
    const allPosts = castTexts.join("\n---\n")
    console.log(`Backend: Sending ${castTexts.length} cast(s) to OpenAI for FID ${fid}.`)

    const { text: characterName } = await generateText({
      model: openai("gpt-3.5-turbo"), // Changed from gpt-4o-mini to gpt-3.5-turbo
      system: `You are a personality analyzer for anime characters. Analyze the user's posts and determine which character they match best. Be specific and look for distinct patterns:

NARUTO - The Determined Optimist:
- Uses enthusiastic language, believes in never giving up
- Shares motivational content, talks about friendship and bonds
- Posts about goals, dreams, and overcoming obstacles
- Optimistic even about challenges, believes in people's potential
- Language: "believe it!", "never give up!", "my ninja way", "friends"

EREN YEAGER - The Freedom Fighter:
- Direct, intense communication style
- Talks about freedom, fighting against oppression
- Posts about determination, moving forward no matter what
- Uses strong language, doesn't back down from conflict
- Language: "fight", "freedom", "enemies", "moving forward", "determination"

ASUNA - The Strategic Protector:
- Shares thoughtful, supportive content
- Takes charge in conversations, offers solutions
- Posts about protecting loved ones, strategy, and efficiency
- Balances strength with compassion
- Language: "protect", "together", "strategy", "support", "team"

SAILOR MOON - The Compassionate Leader:
- Uses positive, uplifting language with emojis
- Shares content about love, friendship, and justice
- Posts about standing up for what's right, helping others
- Emotional and expressive communication style
- Language: "love", "friendship", "justice", "believe in yourself", "together"

SAITAMA - The Understated Powerhouse:
- Casual, often deadpan communication style
- Shares simple, straightforward observations
- Posts about everyday life, occasional philosophical insights
- Unbothered by drama, focuses on essentials
- Language: "ok", "sure", "whatever", minimalist responses, practical advice

SHINJI - The Introspective Thinker:
- Reflective, sometimes self-doubting communication
- Shares philosophical questions and internal struggles
- Posts about meaning, purpose, and human connection
- Thoughtful and nuanced perspective
- Language: "why", "meaning", "purpose", "connection", "fear", "uncertainty"

Respond with ONLY the character name that best matches the overall pattern. Consider the dominant themes, not just individual posts.`,
      prompt: `Analyze these social media posts and determine which anime character this person is most like:\n\n${allPosts}`,
      maxTokens: 15,
      temperature: 0.4, // Increased from 0.2 for more variety
    })

    console.log(`Backend: OpenAI response for FID ${fid}: ${characterName}`)

    // 3. Map the OpenAI response to our character data
    const normalizedCharacterName = characterName.trim().toLowerCase()
    const matchedCharacter = characters[normalizedCharacterName]

    if (!matchedCharacter) {
      console.error(
        `Backend: OpenAI returned an unknown character for FID ${fid}: '${characterName}'. Defaulting to Naruto.`,
      )
      // Fallback if OpenAI returns an unexpected value
      return NextResponse.json({ character: characters.naruto }) // Default to Naruto
    }

    console.log(`Backend: Matched character for FID ${fid}: ${matchedCharacter.name}`)
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
