# Anime Character Analyzer 🎌

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/soheimams-projects/v0-next-js-project-setup)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/KppGbLDC3we)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

## 🌟 Overview

A fun Farcaster Mini App that analyzes your posts to determine which anime character you're most like! Built with Next.js, powered by MiniKit, and featuring 15 unique anime characters from popular series.

**Live Demo**: [https://manga-anime-miniapp.vercel.app](https://manga-anime-miniapp.vercel.app)

## ✨ Features

- 🎯 **15 Anime Characters**: Naruto, Eren, Asuna, Sailor Moon, Saitama, Shinji, Goku, Edward Elric, Tanjiro, Itachi, Natsu, Luffy, Yujiro Hanma, Griffith, and Alucard
- 🔍 **Smart Analysis**: Keyword-based personality analysis of Farcaster posts
- 🎨 **Beautiful UI**: Anime-themed design with character-specific colors and animations
- 📱 **Farcaster Integration**: Built as a Mini App with MiniKit
- 🖼️ **Dynamic OG Images**: Auto-generated share images for each character
- 🎭 **Character Quotes**: Unique jokes and descriptions for each character
- 🌈 **Responsive Design**: Works perfectly on mobile and desktop

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom anime themes
- **Integration**: Coinbase OnchainKit (MiniKit)
- **API**: Neynar API for Farcaster data
- **Database**: Upstash Redis (for notifications)
- **Deployment**: Vercel
- **Language**: TypeScript

## 🏆 OP Retro Funding

This project is part of Optimism's Retroactive Public Goods Funding program:

- **Project ID**: `0x60bd8803fd4feb1bad1339489ffacc2d3bc54409c30ea398d0e2af56bc78fb84`
- **Category**: Social & Entertainment
- **Impact**: Bringing anime culture to Farcaster and onboarding new users to crypto through fun, engaging experiences

### Why This Project Matters

- **Cultural Bridge**: Connects anime enthusiasts with Web3 technology
- **User Onboarding**: Introduces new users to Farcaster and crypto in a fun way
- **Open Source**: Fully open source for community learning and contribution
- **Innovation**: Demonstrates creative use of MiniKit and Farcaster frames

Support public goods development by using and sharing the app! 🎌

## 🎮 How It Works

1. **Connect**: Users connect their Farcaster account via MiniKit
2. **Analyze**: The app fetches recent posts using Neynar API
3. **Match**: Keyword analysis matches personality to anime characters
4. **Share**: Users can share results as Farcaster frames with custom OG images

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ 
- Farcaster account
- Vercel account (for deployment)

### Environment Variables

Create a `.env.local` file with:

\`\`\`bash
# Required
NEYNAR_API_KEY=your_neynar_api_key
NEXT_PUBLIC_URL=https://your-app-url.vercel.app
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key

# App Configuration
NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME="Anime Character Analyzer"
NEXT_PUBLIC_APP_SUBTITLE="Discover your anime alter ego!"
NEXT_PUBLIC_APP_DESCRIPTION="Which Anime Character Are You? Analyze your Farcaster posts to find out!"
NEXT_PUBLIC_APP_ICON="/logo.png"
NEXT_PUBLIC_APP_SPLASH_IMAGE="/splash.png"
NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR="#1a1a2e"

# Optional (for notifications)
REDIS_URL=your_upstash_redis_url
REDIS_TOKEN=your_upstash_redis_token

# Farcaster Manifest (get from Warpcast developer tools)
FARCASTER_HEADER=your_farcaster_header
FARCASTER_PAYLOAD=your_farcaster_payload  
FARCASTER_SIGNATURE=your_farcaster_signature
\`\`\`

### Local Development

\`\`\`bash
# Clone the repository
git clone https://github.com/your-username/anime-character-analyzer.git
cd anime-character-analyzer

# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

### Deployment

1. **Deploy to Vercel**: Click the deploy button or connect your GitHub repo
2. **Set Environment Variables**: Add all required env vars in Vercel dashboard
3. **Create Farcaster Manifest**: Use [Warpcast manifest tool](https://farcaster.xyz/~/developers/mini-apps/manifest)
4. **Test**: Use Warpcast dev tools to test your Mini App

## 🎨 Character Analysis

The app uses keyword-based analysis to match users with characters:

- **Naruto**: Determination, dreams, friendship, ninja themes
- **Eren Yeager**: Freedom, fighting, intensity, titan references  
- **Tanjiro**: Compassion, family, kindness, demon slayer themes
- **Luffy**: Adventure, freedom, pirate themes, fun-loving
- **And 11 more unique characters...**

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) first.

### Development Guidelines

1. **Character Images**: Replace with original artwork for commercial use
2. **API Keys**: Never commit real API keys
3. **Code Style**: Follow existing patterns and use TypeScript
4. **Testing**: Test with multiple Farcaster accounts

### Adding New Characters

1. Add character data to `lib/characters.ts`
2. Add character image to `public/` folder
3. Update keyword analysis in `app/api/analyze-user/route.ts`
4. Update UI components with new character mappings
5. Test analysis and sharing functionality

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

### Important Notes

- **Character Images**: Anime character images are used for educational purposes. For commercial use, replace with original artwork or properly licensed images.
- **API Usage**: Respect rate limits of third-party APIs (Neynar, etc.)
- **Farcaster Compliance**: Follow Farcaster's Mini App guidelines

## 🙏 Acknowledgments

- **Creators**: Built by [@altagers.eth](https://farcaster.xyz/altagers.eth) with [@sohey](https://farcaster.xyz/sohey) support
- **Framework**: Powered by [MiniKit](https://base.org/builders/minikit) and [v0.dev](https://v0.dev)
- **Anime Studios**: Character designs © their respective creators and studios
- **Community**: Thanks to the Farcaster developer community

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/anime-character-analyzer/issues)
- **Farcaster**: [@altagers.eth](https://farcaster.xyz/altagers.eth)
- **Vercel Support**: [vercel.com/help](https://vercel.com/help)

---

**Made with ❤️ for the anime and Farcaster communities**
