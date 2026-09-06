export const siteConfig = {
  ghostSiteUrl:
    process.env.NEXT_PUBLIC_GHOST_SITE_URL ?? 'https://ghost.dataiesb.com',
  ghostContentUrl:
    process.env.NEXT_PUBLIC_GHOST_CONTENT_URL ??
    'https://ghost.dataiesb.com/ghost/api/content/posts/?key=ab90b35cb20435e9a0394ca1d1&limit=12&fields=title,slug,excerpt,published_at,feature_image,html',
  reportsApiUrl:
    process.env.NEXT_PUBLIC_REPORTS_API_URL ??
    'https://hewx1kjfxh.execute-api.us-east-1.amazonaws.com/prod/dataiesb-auth/public-reports',
  teamApiUrl:
    process.env.NEXT_PUBLIC_TEAM_API_URL ??
    'https://hewx1kjfxh.execute-api.us-east-1.amazonaws.com/prod/team',
  contactApiUrl:
    process.env.NEXT_PUBLIC_CONTACT_API_URL ??
    'https://pl1ecmd782.execute-api.us-east-1.amazonaws.com/default/dataiesb-contato',
  auryaSusPath: '/assistentes/aurya-sus/',
} as const
