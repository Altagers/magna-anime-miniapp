// Anime character personality analysis
export interface AnimeCharacter {
  name: string
  emoji: string
  color: string
  trait: string
  description: string
  joke: string
}

export const characters: Record<string, AnimeCharacter> = {
  naruto: {
    name: "Naruto",
    emoji: "🍥",
    color: "orange",
    trait: "Determined & Optimistic",
    description:
      "You're energetic, determined, and never give up! Your posts show your unwavering belief in yourself and others. Just like Naruto, you probably talk about your dreams way too much!",
    joke: "Your ramen budget is probably higher than your rent. Believe it!",
  },
  eren: {
    name: "Eren Yeager",
    emoji: "⚔️",
    trait: "Passionate & Driven",
    color: "green",
    description:
      "You're intense, focused, and fight for what you believe in. Your posts reveal your strong determination and passion. Just don't start any rumbling, okay?",
    joke: "You've probably said 'I'll destroy them all!' while playing video games at 3 AM.",
  },
  asuna: {
    name: "Asuna",
    emoji: "⚔️",
    trait: "Brave & Loyal",
    color: "red",
    description:
      "You're courageous, skilled, and fiercely loyal. Your posts show your dedication to protecting what matters most. Just be careful not to get trapped in any virtual worlds!",
    joke: "Your cooking skills are probably legendary, but your logout button might be broken.",
  },
  sailor: {
    name: "Sailor Moon",
    emoji: "🌙",
    trait: "Kind & Righteous",
    color: "blue",
    description:
      "You're compassionate, just, and always stand up for what's right. Your posts reveal your caring nature and sense of justice! In the name of the moon, you'll punish those bad vibes!",
    joke: "You probably take way too long to transform before handling everyday problems.",
  },
  saitama: {
    name: "Saitama",
    emoji: "👊",
    trait: "Powerful & Nonchalant",
    color: "yellow",
    description:
      "You're straightforward, powerful, and unfazed by challenges. Your posts show your calm approach to even the biggest problems! Just don't complain about being too strong, we know you're bored.",
    joke: "You're probably bald from too much doomscrolling. One scroll man!",
  },
  shinji: {
    name: "Shinji",
    emoji: "🤔",
    trait: "Thoughtful & Complex",
    color: "purple",
    description:
      "You're introspective, sensitive, and deeply thoughtful. Your posts reveal your complex inner world and emotional depth. Now please get in the robot and stop overthinking!",
    joke: "You've definitely said 'I mustn't run away' before facing your inbox on Monday morning.",
  },
}
