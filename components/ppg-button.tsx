"use client"

import type React from "react"

interface PpgButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "primary" | "bubbles" | "blossom" | "buttercup" | "mojo" // Character colors
  className?: string
  sparkles?: boolean // Option to add sparkles
}

export function PpgButton({
  children,
  variant = "primary",
  className = "",
  sparkles = false,
  ...props
}: PpgButtonProps) {
  const baseClasses = `
    font-bold text-xl uppercase tracking-wider
    px-8 py-3 rounded-xl border-2 border-gray-800
    shadow-[3px_3px_0px_0px_rgba(0,0,0,0.7)]
    transition-all duration-150 ease-in-out
    hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.7)] hover:translate-x-[-2px] hover:translate-y-[-2px]
    active:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.7)] active:translate-x-[1px] active:translate-y-[1px]
    relative overflow-hidden group
  `

  const getVariantClasses = () => {
    switch (variant) {
      case "bubbles": // Blue - Sailor Moon
        return "bg-blue-500 text-white hover:bg-blue-600"
      case "blossom": // Red - Asuna
        return "bg-red-500 text-white hover:bg-red-600"
      case "buttercup": // Green - Eren
        return "bg-green-600 text-white hover:bg-green-700"
      case "mojo": // Purple - Shinji
        return "bg-purple-600 text-white hover:bg-purple-700"
      default: // Primary - Orange/Yellow for Naruto/Saitama
        return "bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600"
    }
  }

  return (
    <button className={`${baseClasses} ${getVariantClasses()} ${className}`} {...props}>
      <span className="relative z-10">{children}</span>
      {sparkles && (
        <>
          {/* Simple CSS Sparkles - anime style */}
          <span className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping delay-100"></span>
          <span className="absolute bottom-1 right-1 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping delay-200"></span>
          <span className="absolute top-2 right-3 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping delay-300"></span>
        </>
      )}
    </button>
  )
}
