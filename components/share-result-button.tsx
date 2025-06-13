"use client"

import { useState } from "react"
import { sdk } from "@farcaster/frame-sdk"
import { PpgButton } from "./ppg-button"
import type { PowerPuffCharacter } from "@/lib/characters"

interface ShareResultButtonProps {
  character: PowerPuffCharacter
  onReset: () => void
}

export function ShareResultButton({ character, onReset }: ShareResultButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Update to use the correct domain
  const appBaseUrl = process.env.NEXT_PUBLIC_URL || "https://manga-anime-miniapp.vercel.app"

  const handleShare = async () => {
    setStatus("loading")
    setErrorMessage(null)

    // Construct the URL for the shareable HTML page
    const sharePageUrl = new URL(`/s/${encodeURIComponent(character.name)}`, appBaseUrl).toString()

    // Update the cast text to match anime theme
    const castText = `I'm ${character.name}! ${character.emoji} Which Anime Character are you? Find out on Anime Character Analyzer!`

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
