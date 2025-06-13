"use client"

import { useState } from "react"
import { sdk } from "@farcaster/frame-sdk"
import { PpgButton } from "./ppg-button"
import type { AnimeCharacter } from "@/lib/characters"

interface ShareResultButtonProps {
  character: AnimeCharacter
  onReset: () => void
}

export function ShareResultButton({ character, onReset }: ShareResultButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Update to use the correct domain
  const appBaseUrl = process.env.NEXT_PUBLIC_URL || "https://manga-anime-miniapp.vercel.app"

  // Fun messages for each character
  const characterMessages: Record<string, string[]> = {
    Naruto: [
      "Believe it! I'm Naruto! 🍥 Which Anime Character are you?",
      "My ninja way led me to be Naruto! 🍥 Discover your anime alter ego!",
      "Dattebayo! I'm Naruto! 🍥 Find out which anime character you are!",
    ],
    "Eren Yeager": [
      "I'll destroy them all! I'm Eren Yeager! ⚔️ Which Anime Character are you?",
      "Freedom awaits! I'm Eren Yeager! ⚔️ Discover your anime alter ego!",
      "Tatakae! I'm Eren Yeager! ⚔️ Find out which anime character you are!",
    ],
    Asuna: [
      "Lightning Flash! I'm Asuna! ⚔️ Which Anime Character are you?",
      "From the virtual world, I'm Asuna! ⚔️ Discover your anime alter ego!",
      "With my rapier in hand, I'm Asuna! ⚔️ Find out which anime character you are!",
    ],
    "Sailor Moon": [
      "In the name of the Moon! I'm Sailor Moon! 🌙 Which Anime Character are you?",
      "Moon Prism Power! I'm Sailor Moon! 🌙 Discover your anime alter ego!",
      "Fighting evil by moonlight! I'm Sailor Moon! 🌙 Find out which anime character you are!",
    ],
    Saitama: [
      "One Punch is all I need! I'm Saitama! 👊 Which Anime Character are you?",
      "Just a hero for fun! I'm Saitama! 👊 Discover your anime alter ego!",
      "OK. I'm Saitama! 👊 Find out which anime character you are!",
    ],
    Shinji: [
      "I mustn't run away! I'm Shinji! 🤖 Which Anime Character are you?",
      "Get in the robot! I'm Shinji! 🤖 Discover your anime alter ego!",
      "Complicated feelings... I'm Shinji! 🤖 Find out which anime character you are!",
    ],
  }

  const handleShare = async () => {
    setStatus("loading")
    setErrorMessage(null)

    // Construct the URL for the shareable HTML page
    const sharePageUrl = new URL(`/s/${encodeURIComponent(character.name)}`, appBaseUrl).toString()

    // Get random message for the character or use default
    const messages = characterMessages[character.name] || [
      `I'm ${character.name}! ${character.emoji} Which Anime Character are you?`,
    ]

    // Add the joke to the cast text
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    const castText = `${randomMessage} ${character.joke} Made by @altagers.eth with @sohey support. Powered by Minikit.`

    try {
      await sdk.actions.composeCast({
        text: castText,
        embeds: [sharePageUrl], // Embed the URL of the HTML page with OG tags
      })
      setStatus("idle")
    } catch (error) {
      console.error("❌ Failed to share cast:", error)
      setStatus("error")
      setErrorMessage("Failed to open Farcaster composer.")
    }
  }

  // Map anime characters to appropriate colors
  const characterColors: Record<string, "primary" | "bubbles" | "blossom" | "buttercup" | "mojo"> = {
    Naruto: "bubbles", // Orange-ish
    "Eren Yeager": "buttercup", // Green-ish
    Asuna: "blossom", // Pink/Red-ish
    "Sailor Moon": "primary", // Blue-ish
    Saitama: "bubbles", // Yellow-ish
    Shinji: "mojo", // Purple-ish
  }
  const buttonVariant = characterColors[character.name] || "primary"

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <PpgButton
        onClick={handleShare}
        disabled={status === "loading"}
        variant={buttonVariant}
        className="w-full text-xl"
        sparkles
      >
        {status === "loading" ? "Preparing Share..." : `Share Your Result!`}
      </PpgButton>
      {status === "error" && <p className="text-red-500 font-body mt-2">{errorMessage}</p>}
    </div>
  )
}
