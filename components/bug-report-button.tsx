"use client"

import { useState } from "react"
import { sdk } from "@farcaster/frame-sdk"
import { Bug } from "lucide-react"

export function BugReportButton() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  // Funny bug report messages in anime style
  const bugMessages = [
    "Hey, I want to find out what anime waifu I am, but it's not working! 😭 Give me back my 2D love!",
    "The app said I'm Saitama, but I'm not bald! 😤 Is this a bug or an insult?",
    "I wanted to become the main anime character, but got a 404 error. Where's my plot armor? 🤔",
    "The analyzer broke just like my heart after watching 'Your Name' 💔 Help me!",
    "I clicked the button and got a white screen instead of results. Is this a new form of zen? 🧘‍♂️",
  ]

  const handleBugReport = async () => {
    setStatus("loading")

    try {
      // Select random message
      const randomMessage = bugMessages[Math.floor(Math.random() * bugMessages.length)]

      // Create reply to specific post
      await sdk.actions.composeCast({
        text: `${randomMessage}\n\n@altagers.eth @sohey help me! 🆘`,
        // Reply to specific cast hash
        parentCastHash: "0x9f5f9dc0",
      })

      setStatus("success")

      // Reset status after 3 seconds
      setTimeout(() => setStatus("idle"), 3000)
    } catch (error) {
      console.error("Failed to send bug report:", error)
      setStatus("error")

      // Reset status after 3 seconds
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  const getButtonText = () => {
    switch (status) {
      case "loading":
        return "Sending bug..."
      case "success":
        return "Bug sent! 🎉"
      case "error":
        return "Send failed 😅"
      default:
        return "Bug Report"
    }
  }

  const getButtonColor = () => {
    switch (status) {
      case "success":
        return "bg-green-500 hover:bg-green-600"
      case "error":
        return "bg-red-500 hover:bg-red-600"
      default:
        return "bg-gray-600 hover:bg-gray-700"
    }
  }

  return (
    <button
      onClick={handleBugReport}
      disabled={status === "loading"}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-lg text-white text-sm font-medium
        transition-all duration-200 hover:scale-105 active:scale-95
        ${getButtonColor()}
        ${status === "loading" ? "opacity-70 cursor-not-allowed" : ""}
      `}
      title="Report a problem with a funny message"
    >
      <Bug className="w-4 h-4" />
      {getButtonText()}
    </button>
  )
}
