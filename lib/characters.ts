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
      "You're energetic and never give up! Your posts show unwavering belief in yourself and others. You probably talk about your dreams way too much!",
    joke: "Your ramen budget is probably higher than your rent. Believe it!",
  },
  eren: {
    name: "Eren Yeager",
    emoji: "⚔️",
    trait: "Passionate & Driven",
    color: "green",
    description:
      "You're intense and fight for what you believe in. Your posts reveal strong determination and passion. Just don't start any rumbling, okay?",
    joke: "You've probably said 'I'll destroy them all!' while playing video games at 3 AM.",
  },
  asuna: {
    name: "Asuna",
    emoji: "⚔️",
    trait: "Brave & Loyal",
    color: "red",
    description:
      "You're courageous, skilled, and fiercely loyal. Your posts show dedication to protecting what matters most. Lightning Flash vibes!",
    joke: "Your cooking skills are legendary, but your logout button might be broken.",
  },
  sailor: {
    name: "Sailor Moon",
    emoji: "🌙",
    trait: "Kind & Righteous",
    color: "blue",
    description:
      "You're compassionate and always stand up for what's right. Your posts reveal your caring nature and sense of justice!",
    joke: "You probably take way too long to transform before handling everyday problems.",
  },
  saitama: {
    name: "Saitama",
    emoji: "👊",
    trait: "Powerful & Nonchalant",
    color: "yellow",
    description:
      "You're straightforward and unfazed by challenges. Your posts show your calm approach to even the biggest problems!",
    joke: "You're probably bald from too much doomscrolling. One scroll man!",
  },
  shinji: {
    name: "Shinji",
    emoji: "🤔",
    trait: "Thoughtful & Complex",
    color: "purple",
    description:
      "You're introspective and deeply thoughtful. Your posts reveal your complex inner world and emotional depth.",
    joke: "You've definitely said 'I mustn't run away' before facing your inbox on Monday morning.",
  },
  goku: {
    name: "Goku",
    emoji: "🥋",
    color: "orange",
    trait: "Pure-hearted & Adventurous",
    description:
      "You're pure-hearted and love new challenges! Your posts show enthusiasm for growth and helping others.",
    joke: "You've definitely forgotten important events because you were thinking about food.",
  },
  edward: {
    name: "Edward Elric",
    emoji: "⚗️",
    color: "gold",
    trait: "Intelligent & Determined",
    description:
      "You're brilliant and refuse to give up! Your posts show your analytical mind and strong moral compass.",
    joke: "You've probably gotten into heated debates about equivalent exchange in everyday life.",
  },
  tanjiro: {
    name: "Tanjiro",
    emoji: "🌊",
    color: "teal",
    trait: "Compassionate & Resilient",
    description:
      "You're incredibly kind-hearted and never lose hope. Your posts show deep care for others and unwavering morals.",
    joke: "You've definitely tried to befriend your enemies and apologized to objects you bumped into.",
  },
  itachi: {
    name: "Itachi Uchiha",
    emoji: "🔥",
    color: "crimson",
    trait: "Wise & Sacrificial",
    description:
      "You're wise beyond your years and make difficult sacrifices for the greater good. Your posts reveal deep thinking.",
    joke: "You've made decisions that seemed villainous but were actually heroic. Nobody understood you.",
  },
  natsu: {
    name: "Natsu Dragneel",
    emoji: "🔥",
    color: "pink",
    trait: "Fiery & Loyal",
    description:
      "You're hot-headed and fiercely protective of friends! Your posts show passionate nature and unwavering loyalty.",
    joke: "You've definitely gotten into fights over small things and somehow made lifelong friends.",
  },
  luffy: {
    name: "Monkey D. Luffy",
    emoji: "🏴‍☠️",
    color: "red",
    trait: "Free-spirited & Adventurous",
    description:
      "You're incredibly optimistic and love freedom! Your posts show infectious enthusiasm and unshakeable belief in dreams.",
    joke: "You've made important life decisions based on whether something sounds fun or not.",
  },
  hanma: {
    name: "Yujiro Hanma",
    emoji: "💪",
    color: "brown",
    trait: "Dominant & Unstoppable",
    description:
      "You're incredibly confident and always striving to be the strongest. Your posts show alpha mentality and power.",
    joke: "You've definitely flexed so hard that you scared yourself. Earthquakes are your warm-up.",
  },
  griffith: {
    name: "Griffith",
    emoji: "👑",
    color: "white",
    trait: "Ambitious & Charismatic",
    description:
      "You're incredibly charismatic with an irresistible vision. Your posts show leadership and unwavering dream pursuit.",
    joke: "You've given inspirational speeches that made people question their life choices.",
  },
  alucard: {
    name: "Alucard",
    emoji: "🧛",
    color: "crimson",
    trait: "Powerful & Mysterious",
    description:
      "You're enigmatic with dark humor others don't understand. Your posts show complex nature and philosophical outlook.",
    joke: "You've made ominous statements that sounded cooler in your head. Too many red accessories.",
  },
}
