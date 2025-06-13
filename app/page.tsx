"use client"

import { useEffect, useState } from "react"
import { useMiniKit } from "@coinbase/onchainkit/minikit"
import { SentimentAnalyzer } from "@/components/sentiment-analyzer"
import { Sparkles, Heart, Star } from "lucide-react"
import { AnimeQuote } from "@/components/anime-quote"

// Background decoration component
const BgElement = ({
  top,
  left,
  size = "w-8 h-8",
  rotate = "0",
  delay = "0s",
  type = "star",
}: { top: string; left: string; size?: string; rotate?: string; delay?: string; type?: string }) => {
  if (type === "star") {
    return (
      <Sparkles
        className={`absolute text-white/40 ${size} transform rotate-${rotate} animate-pulse`}
        style={{ top, left, animationDelay: delay }}
      />
    )
  }
  return (
    <div
      className={`absolute ${size} rounded-full bg-white/20 animate-pulse`}
      style={{ top, left, animationDelay: delay }}
    ></div>
  )
}

// Easter egg component
const EasterEgg = () => {
  const [clicked, setClicked] = useState(0)
  const [showMessage, setShowMessage] = useState("")

  const handleClick = () => {
    const newCount = clicked + 1
    setClicked(newCount)

    if (newCount === 3) {
      setShowMessage("Is that a JoJo reference?")
    } else if (newCount === 5) {
      setShowMessage("Omae wa mou shindeiru!")
    } else if (newCount === 7) {
      setShowMessage("NANI?!")
    } else if (newCount === 10) {
      setShowMessage("This isn't even my final form!")
    } else {
      setShowMessage("")
    }

    // Reset after a while
    if (showMessage) {
      setTimeout(() => setShowMessage(""), 3000)
    }
  }

  return (
    <div className="absolute bottom-2 right-2 z-20">
      <div onClick={handleClick} className="cursor-pointer opacity-30 hover:opacity-100 transition-opacity">
        <Star className="w-5 h-5 text-yellow-300" />
      </div>
      {showMessage && (
        <div className="absolute bottom-6 right-0 bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
          {showMessage}
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const { setFrameReady, isFrameReady } = useMiniKit()

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  return (
    <div
      className="relative min-h-screen flex flex-col items-center p-4 pt-8 selection:bg-purple-300 selection:text-purple-900 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #1a1a2e, #16213e)", // Dark anime-themed gradient
      }}
    >
      {/* Background elements */}
      <BgElement top="10%" left="15%" size="w-12 h-12" rotate="12" delay="0.2s" />
      <BgElement top="20%" left="80%" size="w-10 h-10" rotate="-15" delay="0.5s" type="circle" />
      <BgElement top="60%" left="5%" size="w-16 h-16" rotate="5" delay="0.8s" />
      <BgElement top="75%" left="90%" size="w-14 h-14" rotate="-5" delay="0.3s" type="circle" />
      <BgElement top="40%" left="45%" size="w-8 h-8" rotate="20" delay="0.6s" />

      {/* Header */}
      <header className="relative z-10 w-full max-w-xl mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-gradient-to-r from-indigo-500 to-purple-600 border-[3px] border-gray-800 rounded-xl shadow-[5px_5px_0px_0px_rgba(0,0,0,0.7)]">
        <div className="text-center sm:text-left w-full">
          <h1 className="anime-text text-4xl text-white leading-tight">Anime Analyzer</h1>
          <p className="text-lg text-gray-100 font-medium">Discover your anime alter ego!</p>
        </div>
      </header>

      {/* Main sentiment analyzer component */}
      <div className="relative z-10 w-full max-w-xl">
        <SentimentAnalyzer />
      </div>

      <footer className="relative z-10 mt-12 text-center bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl w-full max-w-xl border border-gray-700">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-300">
            Made with <Heart className="inline w-4 h-4 text-red-400" /> by{" "}
            <a
              href="https://farcaster.xyz/altagers.eth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              @altagers.eth
            </a>{" "}
            with{" "}
            <a
              href="https://farcaster.xyz/sohey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              @sohey
            </a>{" "}
            support
          </p>

          {/* Рандомная аниме-цитата */}
          <AnimeQuote />
        </div>
      </footer>

      {/* Easter egg */}
      <EasterEgg />
    </div>
  )
}
