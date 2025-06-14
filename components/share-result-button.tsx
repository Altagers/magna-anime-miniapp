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

  // Fun messages for each character - УБРАНЫ НАТСУ И ЛУФФИ
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
      "I mustn't run away! I'm Shinji! 🤔 Which Anime Character are you?",
      "Get in the robot! I'm Shinji! 🤔 Discover your anime alter ego!",
      "Complicated feelings... I'm Shinji! 🤔 Find out which anime character you are!",
    ],
    Goku: [
      "I want to get stronger! I'm Goku! 🥋 Which Anime Character are you?",
      "Let's fight and have fun! I'm Goku! 🥋 Discover your anime alter ego!",
      "Kamehameha! I'm Goku! 🥋 Find out which anime character you are!",
    ],
    "Edward Elric": [
      "Equivalent exchange! I'm Edward Elric! ⚗️ Which Anime Character are you?",
      "Alchemy is science! I'm Edward Elric! ⚗️ Discover your anime alter ego!",
      "Don't call me short! I'm Edward Elric! ⚗️ Find out which anime character you are!",
    ],
    Tanjiro: [
      "I'll protect everyone! I'm Tanjiro! 🌊 Which Anime Character are you?",
      "Water Breathing! I'm Tanjiro! 🌊 Discover your anime alter ego!",
      "I can smell kindness! I'm Tanjiro! 🌊 Find out which anime character you are!",
    ],
    "Itachi Uchiha": [
      "I bear this burden! I'm Itachi Uchiha! 🔥 Which Anime Character are you?",
      "For the village! I'm Itachi Uchiha! 🔥 Discover your anime alter ego!",
      "Forgive me, Sasuke! I'm Itachi Uchiha! 🔥 Find out which anime character you are!",
    ],
    "Yujiro Hanma": [
      "I am the strongest! I'm Yujiro Hanma! 💪 Which Anime Character are you?",
      "Fear the Ogre! I'm Yujiro Hanma! 💪 Discover your anime alter ego!",
      "Strength is everything! I'm Yujiro Hanma! 💪 Find out which anime character you are!",
    ],
    Griffith: [
      "My dream will come true! I'm Griffith! 👑 Which Anime Character are you?",
      "I will have my kingdom! I'm Griffith! 👑 Discover your anime alter ego!",
      "Destiny calls! I'm Griffith! 👑 Find out which anime character you are!",
    ],
    Alucard: [
      "I am the night! I'm Alucard! 🧛 Which Anime Character are you?",
      "Blood and shadows! I'm Alucard! 🧛 Discover your anime alter ego!",
      "Immortal power! I'm Alucard! 🧛 Find out which anime character you are!",
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

  // Map anime characters to appropriate colors (УБРАНЫ НАТСУ И ЛУФФИ)
  const characterColors: Record<string, "primary" | "bubbles" | "blossom" | "buttercup" | "mojo"> = {
    Naruto: "bubbles", // Orange-ish
    "Eren Yeager": "buttercup", // Green-ish
    Asuna: "blossom", // Pink/Red-ish
    "Sailor Moon": "primary", // Blue-ish
    Saitama: "bubbles", // Yellow-ish
    Shinji: "mojo", // Purple-ish
    Goku: "primary", // Orange-ish
    "Edward Elric": "buttercup", // Gold-ish
    Tanjiro: "bubbles", // Teal-ish
    "Itachi Uchiha": "blossom", // Crimson-ish
    "Yujiro Hanma": "buttercup", // Brown-ish
    Griffith: "primary", // White-ish
    Alucard: "blossom", // Crimson-ish
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
