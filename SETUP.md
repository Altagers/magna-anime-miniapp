# 🚀 Setup Guide

## Prerequisites

- Node.js 18 or later
- npm or yarn
- Farcaster account
- Vercel account (for deployment)

## 🔧 Local Development Setup

### 1. Clone Repository
\`\`\`bash
git clone https://github.com/your-username/anime-character-analyzer.git
cd anime-character-analyzer
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Environment Variables
\`\`\`bash
# Copy example environment file
cp .env.example .env.local

# Edit .env.local with your actual values
nano .env.local
\`\`\`

### 4. Required API Keys

#### Neynar API Key
1. Go to [neynar.com](https://neynar.com)
2. Sign up for free account
3. Get your API key from dashboard
4. Add to `.env.local`: `NEYNAR_API_KEY=your_key_here`

#### OnchainKit API Key
1. Go to [Coinbase Developer Portal](https://portal.cdp.coinbase.com/)
2. Create new project
3. Get API key
4. Add to `.env.local`: `NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_key_here`

#### Optional: OpenAI API Key
- Currently not used (keyword-based analysis)
- Keep for future AI features
- Get from [OpenAI Platform](https://platform.openai.com/)

### 5. Run Development Server
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000)

## 🚀 Production Deployment

### 1. Deploy to Vercel
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
\`\`\`

Or use GitHub integration:
1. Connect repository to Vercel
2. Set environment variables in dashboard
3. Deploy automatically on push

### 2. Environment Variables in Vercel
Add all variables from `.env.example` to Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add each variable with actual values
- Redeploy after adding variables

### 3. Farcaster Manifest Setup
1. Go to [Warpcast Manifest Tool](https://farcaster.xyz/~/developers/mini-apps/manifest)
2. Enter your deployed URL
3. Generate manifest with your custody wallet
4. Copy header, payload, signature to environment variables
5. Redeploy

## 🧪 Testing

### Local Testing
\`\`\`bash
# Test build
npm run build
npm start

# Check for TypeScript errors
npm run type-check
\`\`\`

### Farcaster Testing
1. Use Warpcast dev tools
2. Test with different accounts
3. Verify sharing works correctly
4. Check mobile experience

## 🔒 Security Notes

- **Never commit** `.env.local` to git
- **Use different API keys** for development/production
- **Rotate keys regularly** for security
- **Monitor API usage** to detect issues

## 🆘 Troubleshooting

### Common Issues

#### "API key not configured"
- Check `.env.local` file exists
- Verify variable names match exactly
- Restart development server after changes

#### "Failed to fetch user data"
- Check Neynar API key is valid
- Verify user has public posts
- Check API rate limits

#### Farcaster frame not working
- Verify manifest is properly configured
- Check all NEXT_PUBLIC_ variables are set
- Test with Warpcast dev tools

### Getting Help
- Check [GitHub Issues](https://github.com/your-username/anime-character-analyzer/issues)
- Contact [@altagers.eth](https://farcaster.xyz/altagers.eth) on Farcaster
- Read [MiniKit Documentation](https://base.org/builders/minikit)
