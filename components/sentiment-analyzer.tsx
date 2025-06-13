"use client"

import { useState } from "react"
import { useMiniKit } from "@coinbase/onchainkit/minikit"
import type { AnimeCharacter } from "@/lib/characters"
import Image from "next/image"
import { PpgButton } from "./ppg-button"
import { ShareResultButton } from "./share-result-button"

const AnimeHeaderImage = () => (
  <div className="flex justify-center">
    <div>
      <Image
        src="/banner.png"
        alt="Anime Character Analyzer"
        width={280}
        height={140}
        className="object-cover"
        priority
      />
    </div>
  </div>
)

type AnalysisResult = {
  character: AnimeCharacter
}

export function SentimentAnalyzer() {
  const { context } = useMiniKit()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    const userFid = context?.user?.fid // Get FID from MiniKit context

    if (!userFid) {
      setError("Please connect your Farcaster account (via Wallet) to analyze posts.")
      setLoading(false)
      setResult(null)
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    console.log(`Frontend: Determined FID to query: ${userFid}`)

    try {
      const response = await fetch("/api/analyze-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fid: userFid }), // Send the connected user's FID
      })
      const data = await response.json()
      if (!response.ok || data.error) throw new Error(data.error || "Analysis failed")
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return <ResultScreen result={result} onReset={() => setResult(null)} />
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimeHeaderImage />
      <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 border-[3px] border-gray-800 rounded-[20px] p-6 pt-8 text-center shadow-[5px_5px_0px_0px_rgba(0,0,0,0.7)]">
        <h1 className="anime-text anime-text-outline text-5xl md:text-6xl leading-tight mb-8">
          Which
          <br />
          Anime
          <br />
          Character
          <br />
          Are You?
        </h1>
        <PpgButton
          onClick={handleAnalyze}
          disabled={loading || !context?.user?.fid}
          variant="primary"
          className="w-full"
          sparkles
        >
          {loading ? "Analyzing..." : !context?.user?.fid ? "Connect Wallet to Analyze" : "Analyze My Posts!"}
        </PpgButton>
      </div>
      {error && (
        <div className="mt-6 p-4 bg-red-400 border-3 border-gray-800 rounded-xl text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.7)]">
          <p className="text-white font-bold text-2xl">{error}</p>
        </div>
      )}
    </div>
  )
}

function ResultScreen({ result, onReset }: { result: AnalysisResult; onReset: () => void }) {
  const characterColors: Record<string, "primary" | "bubbles" | "blossom" | "buttercup" | "mojo"> = {
    Naruto: "primary", // Orange
    "Eren Yeager": "buttercup", // Green
    Asuna: "blossom", // Pink/Red
    "Sailor Moon": "bubbles", // Blue
    Saitama: "primary", // Yellow
    Shinji: "mojo", // Purple
  }

  const characterImageMap: Record<string, string> = {
    Naruto: "/naruto.png",
    "Eren Yeager": "/eren.png",
    Asuna: "/asuna.png",
    "Sailor Moon": "/sailor.png",
    Saitama: "/saitama.png",
    Shinji: "/shinji.png",
  }

  const characterName = result.character.name
  const buttonVariant = characterColors[characterName] || "primary"

  return (
    <div className="w-full max-w-md mx-auto p-4 md:p-6 flex flex-col items-center">
      <PpgButton variant={buttonVariant} className="mb-8 w-full md:w-auto text-3xl" disabled sparkles>
        <span className="anime-text-outline">You're {characterName}!</span>
      </PpgButton>
      <div className="mb-8 bg-white p-3 border-[3px] border-gray-800 rounded-full shadow-[5px_5px_0px_0px_rgba(0,0,0,0.7)]">
        <Image
          src={characterImageMap[characterName] || "/placeholder.svg?width=200&height=200&query=Unknown+Character"}
          alt={characterName}
          width={200}
          height={200}
          className="rounded-full"
        />
      </div>
      <div className="relative bg-white border-[3px] border-gray-800 rounded-2xl p-6 w-full mb-10 text-center shadow-[5px_5px_0px_0px_rgba(0,0,0,0.7)]">
        <p className="text-xl font-semibold text-gray-800 mb-4">{result.character.description}</p>
        {result.character.joke && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-lg font-semibold text-indigo-600 italic">"{result.character.joke}"</p>
          </div>
        )}
        <div className="absolute left-1/2 -bottom-[15px] transform -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-gray-800" />
        <div className="absolute left-1/2 -bottom-[12px] transform -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-white" />
      </div>
      <ShareResultButton character={result.character} onReset={onReset} />
    </div>
  )
}
