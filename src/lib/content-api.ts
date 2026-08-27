import { siteConfig } from '@/config/site'
import type { NewsPost, PublicReport, TeamMember } from '@/types/content'

import { fetchJsonWithTimeout } from './api-client'
import { parseNewsResponse, parseReportsResponse, parseTeamResponse } from './data-contracts'

export const loadNews = (): Promise<NewsPost[]> =>
  fetchJsonWithTimeout(siteConfig.ghostContentUrl, parseNewsResponse)

export const loadReports = (): Promise<PublicReport[]> =>
  fetchJsonWithTimeout(siteConfig.reportsApiUrl, parseReportsResponse)

export const loadTeam = (): Promise<TeamMember[]> =>
  fetchJsonWithTimeout(siteConfig.teamApiUrl, parseTeamResponse)
