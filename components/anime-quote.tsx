"use client"

import { useState, useEffect } from "react"
import { Quote } from "lucide-react"

// Массив из 30 известных аниме-цитат с указанием источника
const animeQuotes = [
  { text: "People's dreams never end!", source: "One Piece" },
  { text: "If you don't take risks, you can't create a future!", source: "One Piece" },
  { text: "I'll become the Hokage! That is my dream!", source: "Naruto" },
  {
    text: "It's not the face that makes someone a monster; it's the choices they make with their lives.",
    source: "Naruto",
  },
  { text: "Tatakae! Tatakae!", source: "Attack on Titan" },
  {
    text: "The only thing we're allowed to do is to believe that we won't regret the choice we made.",
    source: "Attack on Titan",
  },
  {
    text: "Whatever you lose, you'll find it again. But what you throw away you'll never get back.",
    source: "Fullmetal Alchemist",
  },
  {
    text: "A lesson without pain is meaningless. That's because no one can gain without sacrificing something.",
    source: "Fullmetal Alchemist",
  },
  {
    text: "I am the hope of the universe. I am the answer to all living things that cry out for peace.",
    source: "Dragon Ball Z",
  },
  { text: "Power comes in response to a need, not a desire.", source: "Dragon Ball Z" },
  {
    text: "The world isn't perfect. But it's there for us, doing the best it can... that's what makes it so damn beautiful.",
    source: "Cowboy Bebop",
  },
  { text: "Whatever happens, happens.", source: "Cowboy Bebop" },
  { text: "I'll take a potato chip... AND EAT IT!", source: "Death Note" },
  { text: "The human whose name is written in this notebook shall die.", source: "Death Note" },
  { text: "If you can't do something, then don't. Focus on what you can do.", source: "Evangelion" },
  { text: "Anywhere can be paradise as long as you have the will to live.", source: "Evangelion" },
  {
    text: "The fake is of far greater value. In its deliberate attempt to be real, it's more real than the real thing.",
    source: "Bakemonogatari",
  },
  {
    text: "If someone ever tells me it's a mistake to have hope, I'll just tell them they're wrong.",
    source: "Madoka Magica",
  },
  {
    text: "A hero is someone who has given his or her life to something bigger than oneself.",
    source: "Fate/Stay Night",
  },
  {
    text: "I don't want to conquer anything. I just think the guy with the most freedom in this ocean is the Pirate King!",
    source: "One Piece",
  },
  {
    text: "If you don't like your destiny, don't accept it. Instead, have the courage to change it the way you want it to be.",
    source: "Naruto",
  },
  {
    text: "Fear is not evil. It tells you what your weakness is. And once you know your weakness, you can become stronger as well as kinder.",
    source: "Fairy Tail",
  },
  { text: "It's okay to cry, but you have to move on. You can only cry for so long.", source: "Clannad" },
  {
    text: "Sometimes I do feel like I'm a failure. Like there's no hope for me. But even so, I'm not gonna give up. Ever!",
    source: "My Hero Academia",
  },
  { text: "The world is not beautiful, therefore it is.", source: "Kino's Journey" },
  {
    text: "You should enjoy the little detours to the fullest. Because that's where you'll find the things more important than what you want.",
    source: "Hunter x Hunter",
  },
  {
    text: "The loneliest people are the kindest. The saddest people smile the brightest. The most damaged people are the wisest.",
    source: "Tokyo Ghoul",
  },
  {
    text: "I want you to be happy. I want you to laugh a lot. I don't know what exactly I'll be able to do for you, but I'll always be by your side.",
    source: "Clannad",
  },
  {
    text: "We are all like fireworks: we climb, we shine and always go our separate ways and become further apart. But even when that time comes, let's not disappear like a firework and continue to shine forever.",
    source: "Your Lie in April",
  },
  {
    text: "Giving up kills people. When people reject giving up... they finally win the right to transcend humanity.",
    source: "Gurren Lagann",
  },
]

export function AnimeQuote() {
  const [quote, setQuote] = useState(animeQuotes[0])

  useEffect(() => {
    // Выбираем случайную цитату при монтировании компонента
    const randomIndex = Math.floor(Math.random() * animeQuotes.length)
    setQuote(animeQuotes[randomIndex])
  }, [])

  return (
    <div className="mt-4 p-3 bg-gradient-to-r from-indigo-500/30 to-purple-600/30 rounded-lg border border-white/20 backdrop-blur-sm">
      <div className="flex items-start">
        <Quote className="w-5 h-5 text-purple-300 mr-2 mt-1 flex-shrink-0" />
        <div>
          <p className="text-sm text-gray-100 italic">"{quote.text}"</p>
          <p className="text-xs text-purple-300 text-right mt-1">— {quote.source}</p>
        </div>
      </div>
    </div>
  )
}
