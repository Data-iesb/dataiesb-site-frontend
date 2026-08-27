import type { Metadata } from 'next'

import { NewsPage } from '@/features/content/news-page'

export const metadata: Metadata = { title: 'Notícias' }

export default function Page() { return <NewsPage /> }
