// Anime character personality analysis
export interface AnimeCharacter {
  name: string
  emoji: string
  color: string
  trait: string
  description: string
}

export const characters: Record<string, AnimeCharacter> = {
  naruto: {
    name: "Naruto",
    emoji: "🍥",
    color: "orange",
    trait: "Determined & Optimistic",
    description:
      "You're energetic, determined, and never give up! Your posts show your unwavering belief in yourself and others.",
  },
  eren: {
    name: "Eren Yeager",
    emoji: "⚔️",
    trait: "Passionate & Driven",
    color: "green",
    description:
      "You're intense, focused, and fight for what you believe in. Your posts reveal your strong determination and passion.",
  },
  asuna: {
    name: "Asuna",
    emoji: "⚔️",
    trait: "Brave & Loyal",
    color: "red",
    description:
      "You're courageous, skilled, and fiercely loyal. Your posts show your dedication to protecting what matters most.",
  },
  sailor: {
    name: "Sailor Moon",
    emoji: "🌙",
    trait: "Kind & Righteous",
    color: "blue",
    description:
      "You're compassionate, just, and always stand up for what's right. Your posts reveal your caring nature and sense of justice!",
  },
  saitama: {
    name: "Saitama",
    emoji: "👊",
    trait: "Powerful & Nonchalant",
    color: "yellow",
    description:
      "You're straightforward, powerful, and unfazed by challenges. Your posts show your calm approach to even the biggest problems!",
  },
  shinji: {
    name: "Shinji",
    emoji: "🤔",
    trait: "Thoughtful & Complex",
    color: "purple",
    description:
      "You're introspective, sensitive, and deeply thoughtful. Your posts reveal your complex inner world and emotional depth.",
  },
}
