export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL || "https://manga-anime-miniapp.vercel.app"

  return Response.json({
    accountAssociation: {
      header:
        process.env.FARCASTER_HEADER ||
        "eyJmaWQiOjIxNzI2MSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDA3RjZkOEQzMWY0NjVGY2IyQTEyRjNEMjY3Njc3MDViRUMyMzEzOTkifQ",
      payload: process.env.FARCASTER_PAYLOAD || "eyJkb21haW4iOiJtYW5nYS1hbmltZS1taW5pYXBwLnZlcmNlbC5hcHAifQ",
      signature:
        process.env.FARCASTER_SIGNATURE ||
        "MHgxMTk3NmMyY2M3ZjcwZjU5MDdlN2YwNTQzMDRmNTYzOTljMGQ1NzIxZGFkNTJlMjQ4ZmExY2IwM2IzM2MwMGI0M2MxNzI1ZWM1NTc3Y2YyYzgzZTMyN2JmM2E3NzZmNTJlYjEwNDRkZDg1MjdhNzY5ZDFjNmM0ZTM3OWExOTczNjFi",
    },
    frame: {
      version: "1",
      name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "Anime Character Analyzer",
      iconUrl: process.env.NEXT_PUBLIC_APP_ICON || `${URL}/logo.png`,
      splashImageUrl: process.env.NEXT_PUBLIC_APP_SPLASH_IMAGE || `${URL}/splash.png`,
      splashBackgroundColor: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR || "#1a1a2e",
      homeUrl: URL,
      webhookUrl: `${URL}/api/webhook`,
      subtitle: process.env.NEXT_PUBLIC_APP_SUBTITLE || "Discover your anime alter ego!",
      description:
        process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
        "Which Anime Character Are You? Analyze your Farcaster posts to find out!",
      screenshotUrls: [process.env.NEXT_PUBLIC_APP_SCREENSHOT || `${URL}/screenshot.png`],
      primaryCategory: process.env.NEXT_PUBLIC_APP_PRIMARY_CATEGORY || "entertainment",
      tags: ["anime", "personality", "farcaster", "analyzer", "op-retro", "public-goods"],
      heroImageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE || `${URL}/logo.png`,
      tagline: process.env.NEXT_PUBLIC_APP_TAGLINE || "Find your anime character match!",
      ogTitle: process.env.NEXT_PUBLIC_APP_OG_TITLE || "Anime Character Analyzer",
      ogDescription:
        process.env.NEXT_PUBLIC_APP_OG_DESCRIPTION ||
        "Which Anime Character Are You? Analyze your Farcaster posts to find out!",
      ogImageUrl: process.env.NEXT_PUBLIC_APP_OG_IMAGE || `${URL}/logo.png`,
      funding: {
        type: "op-retro",
        projectId: "0x60bd8803fd4feb1bad1339489ffacc2d3bc54409c30ea398d0e2af56bc78fb84"
      },
    },
  })
}
