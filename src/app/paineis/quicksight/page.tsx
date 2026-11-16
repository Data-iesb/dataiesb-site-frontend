import type { Metadata } from 'next'

import { DashboardPage } from '@/components/dashboard-page'

export const metadata: Metadata = { title: 'Painel QuickSight — Big Data IESB' }

export default function Page() {
  return (
    <>
      <link rel="preconnect" href="https://us-east-1.quicksight.aws.amazon.com" />
      <link rel="preconnect" href="https://d758cqe2bs24d.cloudfront.net" />
      <link rel="dns-prefetch" href="//kqe94xcvo1.execute-api.us-east-1.amazonaws.com" />
      <DashboardPage slug="quicksight" />
    </>
  )
}
