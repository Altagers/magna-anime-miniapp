"use client"

import { ExternalLink, Heart } from "lucide-react"

export function OpRetroBadge() {
  const projectId = "0x60bd8803fd4feb1bad1339489ffacc2d3bc54409c30ea398d0e2af56bc78fb84"
  const opRetroUrl = `https://app.optimism.io/retropgf/projects/${projectId}`

  return (
    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-3 rounded-lg border border-gray-700 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-red-200" />
          <span className="text-sm font-medium">Public Goods Project</span>
        </div>
        <a
          href={opRetroUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-red-100 hover:text-white transition-colors"
        >
          OP Retro
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
      <p className="text-xs text-red-100 mt-1">Supporting anime culture in Web3 through retroactive funding</p>
    </div>
  )
}
