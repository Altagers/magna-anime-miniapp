import type { Metadata, ResolvingMetadata } from "next"
import { characters } from "@/lib/characters"
import { PpgButton } from "@/components/ppg-button" // Keep for fallback page

type Props = {
  params: { characterName: string }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // УЛУЧШЕННОЕ декодирование URL
  let characterNameParam: string
  try {
    characterNameParam = decodeURIComponent(params.characterName)
  } catch (error) {
    console.error(`Share Page: Failed to decode character name: "${params.characterName}"`, error)
    characterNameParam = params.characterName.replace(/%20/g, " ").replace(/%2E/g, ".")
  }

  console.log(`Share Page: Original param: "${params.characterName}"`)
  console.log(`Share Page: Decoded character name: "${characterNameParam}"`)

  // УЛУЧШЕННЫЙ поиск персонажа
  const character = Object.values(characters).find((c) => {
    const match = c.name.toLowerCase() === characterNameParam.toLowerCase()
    console.log(`Share Page: Comparing "${c.name.toLowerCase()}" with "${characterNameParam.toLowerCase()}" = ${match}`)
    return match
  })

  console.log(`Share Page: Found character:`, character ? `${character.name} ${character.emoji}` : "NOT FOUND")

  if (!character) {
    console.log(
      `Share Page: Available characters:`,
      Object.values(characters).map((c) => `"${c.name}"`),
    )
  }

  const appBaseUrl = process.env.NEXT_PUBLIC_URL || "https://manga-anime-miniapp.vercel.app"
  const appName = process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "Anime Character Analyzer"

  // Ensure icon and splash URLs are absolute and have defaults
  const appIcon = process.env.NEXT_PUBLIC_APP_ICON || "/logo.png"
  const appIconUrl = appIcon.startsWith("http")
    ? appIcon
    : `${appBaseUrl}${appIcon.startsWith("/") ? "" : "/"}${appIcon}`

  const appSplashImage = process.env.NEXT_PUBLIC_APP_SPLASH_IMAGE || "/splash.png"
  const appSplashImageUrl = appSplashImage.startsWith("http")
    ? appSplashImage
    : `${appBaseUrl}${appSplashImage.startsWith("/") ? "" : "/"}${appSplashImage}`

  const appSplashBackgroundColor = process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR || "#1a1a2e"
  const defaultFcFrameImage = process.env.NEXT_PUBLIC_APP_HERO_IMAGE || `${appBaseUrl}/banner.png`

  // Define the frame structure based on your working example
  let frameDefinition: any

  if (!character) {
    console.log(`Share Page: Returning default frame definition due to character not found`)
    frameDefinition = {
      version: "next", // As per your example
      imageUrl: defaultFcFrameImage,
      button: {
        title: "Open Analyzer",
        action: {
          type: "launch_frame",
          name: appName,
          url: appBaseUrl,
          splashImageUrl: appSplashImageUrl,
          splashBackgroundColor: appSplashBackgroundColor,
        },
      },
    }
    return {
      title: "Anime Character Analyzer Result",
      description: "See which anime character you are!",
      openGraph: {
        // Fallback OG tags
        title: "Anime Character Analyzer",
        description: "Which anime character are you? Find out!",
        images: [{ url: defaultFcFrameImage }],
      },
      other: {
        "fc:frame": JSON.stringify(frameDefinition),
      },
    }
  }

  // Маппинг персонажей с правильными именами файлов (УБРАНЫ НАТСУ И ЛУФФИ)
  const characterImageMap: Record<string, string> = {
    Naruto: "/naruto.png",
    "Eren Yeager": "/eren.png",
    Asuna: "/asuna.png",
    "Sailor Moon": "/sailor.png",
    Saitama: "/saitama.png",
    Shinji: "/shinji.png",
    Goku: "/goku.png",
    "Edward Elric": "/edward.png",
    Tanjiro: "/tanjiro.png",
    "Itachi Uchiha": "/itachi.png",
    "Yujiro Hanma": "/hanma.png",
    Griffith: "/grifith.png", // Используем существующее имя файла
    Alucard: "/alucard.png",
  }
  const characterImagePublicPath = characterImageMap[character.name] || "/placeholder.svg"
  console.log(`Share Page: Character image path for "${character.name}": ${characterImagePublicPath}`)

  const dynamicImageUrl = new URL("/api/generate-og-image", appBaseUrl)
  dynamicImageUrl.searchParams.set("characterName", character.name) // Используем точное имя из базы
  dynamicImageUrl.searchParams.set("characterImage", characterImagePublicPath)

  console.log(`Share Page: Dynamic image URL: ${dynamicImageUrl.toString()}`)

  frameDefinition = {
    version: "next", // As per your example
    imageUrl: dynamicImageUrl.toString(), // Dynamic image for the character
    button: {
      title: `I'm ${character.name}! Open Analyzer`, // Button title
      action: {
        type: "launch_frame",
        name: appName, // Name of the Mini App to launch
        url: appBaseUrl, // URL of the Mini App to launch
        splashImageUrl: appSplashImageUrl,
        splashBackgroundColor: appSplashBackgroundColor,
      },
    },
  }

  console.log(`Share Page: Generated frame definition for ${character.name}`)

  return {
    title: `I'm ${character.name}! - Anime Character Analyzer Result`,
    description: `I found out I'm ${character.name} using the Anime Character Analyzer! ${character.description}`,
    // OpenGraph tags as fallback for other platforms
    openGraph: {
      title: `I'm ${character.name}! ${character.emoji}`,
      description: character.description,
      images: [{ url: dynamicImageUrl.toString(), width: 1200, height: 630, alt: `${character.name} Result` }],
    },
    // Farcaster Frame metadata using the single JSON object structure
    other: {
      "fc:frame": JSON.stringify(frameDefinition),
    },
  }
}

// Fallback page content (remains the same)
export default function SharePage({ params }: Props) {
  // УЛУЧШЕННОЕ декодирование URL
  let characterNameParam: string
  try {
    characterNameParam = decodeURIComponent(params.characterName)
  } catch (error) {
    console.error(`Share Page Render: Failed to decode character name: "${params.characterName}"`, error)
    characterNameParam = params.characterName.replace(/%20/g, " ").replace(/%2E/g, ".")
  }

  const character = Object.values(characters).find((c) => c.name.toLowerCase() === characterNameParam.toLowerCase())
  const appBaseUrl = process.env.NEXT_PUBLIC_URL || "https://manga-anime-miniapp.vercel.app"

  if (!character) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-8 text-center">
        <h1 className="text-4xl font-heading text-white mb-6">Oops! Character Not Found</h1>
        <p className="font-body text-xl text-gray-200 mb-8">
          We couldn't find that anime character result for "{characterNameParam}".
        </p>
        <a href={appBaseUrl}>
          <PpgButton variant="primary" className="text-xl">
            Take the Quiz!
          </PpgButton>
        </a>
      </div>
    )
  }

  // Маппинг персонажей с правильными именами файлов (УБРАНЫ НАТСУ И ЛУФФИ)
  const characterImageMap: Record<string, string> = {
    Naruto: "/naruto.png",
    "Eren Yeager": "/eren.png",
    Asuna: "/asuna.png",
    "Sailor Moon": "/sailor.png",
    Saitama: "/saitama.png",
    Shinji: "/shinji.png",
    Goku: "/goku.png",
    "Edward Elric": "/edward.png",
    Tanjiro: "/tanjiro.png",
    "Itachi Uchiha": "/itachi.png",
    "Yujiro Hanma": "/hanma.png",
    Griffith: "/grifith.png", // Используем существующее имя файла
    Alucard: "/alucard.png",
  }
  const characterImagePublicPath = characterImageMap[character.name] || "/placeholder.svg"
  const ogImageUrl = `${appBaseUrl}/api/generate-og-image?characterName=${encodeURIComponent(character.name)}&characterImage=${encodeURIComponent(characterImagePublicPath)}`

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-8 text-center">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl border-3 border-gray-800 max-w-lg w-full">
        <h2 className="font-heading text-white text-3xl mb-2">This result was shared:</h2>
        <img
          src={ogImageUrl || "/placeholder.svg"}
          alt={`${character.name} Result`}
          width={400}
          height={210}
          className="rounded-lg shadow-xl border-2 border-gray-800 mx-auto mb-6"
        />
        <p className="font-body text-xl text-gray-200 mb-8">
          It looks like someone shared their result: They're {character.name}! {character.emoji}
        </p>
        <a href={appBaseUrl}>
          <PpgButton variant="primary" className="text-xl">
            Find YOUR Character!
          </PpgButton>
        </a>
      </div>
      <p className="font-body text-sm text-gray-400 mt-8">
        You were viewing a shared result. Click above to take the quiz yourself!
      </p>
    </div>
  )
}
