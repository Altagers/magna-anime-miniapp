"use client"

import Image from "next/image"
import { PpgButton } from "./ppg-button"
import { ShareResultButton } from "./share-result-button"

// Обновляем только функцию ResultScreen, остальной код остается прежним

interface AnalysisResult {
  character: {
    name: string
    description: string
    joke: string
  }
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
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-lg font-semibold text-indigo-600 italic">"{result.character.joke}"</p>
        </div>
        <div className="absolute left-1/2 -bottom-[15px] transform -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-gray-800" />
        <div className="absolute left-1/2 -bottom-[12px] transform -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-white" />
      </div>
      <ShareResultButton character={result.character} onReset={onReset} />
    </div>
  )
}
