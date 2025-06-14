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
  goku: {
    name: "Goku",
    emoji: "🥋",
    color: "orange",
    trait: "Pure-hearted & Adventurous",
    description:
      "You're pure-hearted, always seeking new challenges, and love to push your limits! Your posts show your enthusiasm for growth and helping others. Just like Goku, you probably get excited about the smallest things!",
    joke: "You've definitely forgotten important events because you were too busy training or thinking about food.",
  },
  edward: {
    name: "Edward Elric",
    emoji: "⚗️",
    color: "gold",
    trait: "Intelligent & Determined",
    description:
      "You're brilliant, stubborn, and refuse to give up on what you believe in! Your posts show your analytical mind and strong moral compass. Just like Edward, you probably get really passionate about your interests!",
    joke: "You've probably gotten into heated debates about the laws of equivalent exchange in everyday situations.",
  },
  tanjiro: {
    name: "Tanjiro",
    emoji: "🌊",
    color: "teal",
    trait: "Compassionate & Resilient",
    description:
      "You're incredibly kind-hearted, empathetic, and never lose hope even in the darkest times. Your posts show your deep care for others and unwavering moral compass. Just like Tanjiro, you probably see the good in everyone!",
    joke: "You've definitely tried to befriend your enemies and probably apologized to inanimate objects you bumped into.",
  },
  itachi: {
    name: "Itachi Uchiha",
    emoji: "🔥",
    color: "crimson",
    trait: "Wise & Sacrificial",
    description:
      "You're incredibly wise beyond your years, strategic, and willing to make difficult sacrifices for the greater good. Your posts reveal deep philosophical thinking and hidden pain. Just like Itachi, you probably carry burdens others don't understand.",
    joke: "You've definitely made a decision that seemed villainous but was actually for everyone's benefit, and nobody understood you.",
  },
  natsu: {
    name: "Natsu Dragneel",
    emoji: "🔥",
    color: "pink",
    trait: "Fiery & Loyal",
    description:
      "You're hot-headed, fiercely protective of your friends, and never back down from a fight! Your posts show your passionate nature and unwavering loyalty. Just like Natsu, you probably get motion sickness but still charge headfirst into danger!",
    joke: "You've definitely gotten into fights over the smallest things and somehow made lifelong friends in the process.",
  },
  luffy: {
    name: "Monkey D. Luffy",
    emoji: "🏴‍☠️",
    color: "red",
    trait: "Free-spirited & Adventurous",
    description:
      "You're incredibly optimistic, love freedom above all else, and have an infectious enthusiasm that draws people to you! Your posts show your simple but profound wisdom and unshakeable belief in your dreams. Just like Luffy, you probably make friends everywhere you go!",
    joke: "You've definitely made important life decisions based on whether something sounds fun or not, and somehow it always works out.",
  },
  hanma: {
    name: "Yujiro Hanma",
    emoji: "💪",
    color: "brown",
    trait: "Dominant & Unstoppable",
    description:
      "You're incredibly confident, competitive, and always striving to be the strongest in whatever you do. Your posts show your alpha mentality and refusal to accept weakness. Just like Yujiro, you probably intimidate people just by existing!",
    joke: "You've definitely flexed so hard that you scared yourself, and you probably consider earthquakes a light warm-up.",
  },
  griffith: {
    name: "Griffith",
    emoji: "👑",
    color: "white",
    trait: "Ambitious & Charismatic",
    description:
      "You're incredibly charismatic, ambitious, and have a vision that others find irresistible to follow. Your posts show your leadership qualities and unwavering pursuit of your dreams. Just like Griffith, you probably have people who would do anything for you!",
    joke: "You've definitely given inspirational speeches that made people question their life choices, and you probably look good doing literally anything.",
  },
  alucard: {
    name: "Alucard",
    emoji: "🧛",
    color: "crimson",
    trait: "Powerful & Mysterious",
    description:
      "You're enigmatic, incredibly powerful, and have a dark sense of humor that others don't always understand. Your posts show your complex nature and philosophical outlook on existence. Just like Alucard, you probably enjoy psychological games more than physical ones!",
    joke: "You've definitely made ominous statements that sounded cooler in your head, and you probably own way too many red accessories.",
  },
}
