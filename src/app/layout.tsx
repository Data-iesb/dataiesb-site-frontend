import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { PortalShell } from '@/components/layout/portal-shell'

import './globals.css'

export const metadata: Metadata = {
  title: { default: 'DATA IESB — Ciência de Dados Aplicada', template: '%s — DATA IESB' },
  description: 'Portal de ciência de dados e inteligência artificial do Projeto Big Data IESB.',
  icons: { icon: '/favicon.svg' },
}

const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem('dataiesb-theme')==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}`

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body><PortalShell>{children}</PortalShell></body>
    </html>
  )
}
