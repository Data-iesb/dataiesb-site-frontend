'use client'

import {
  Activity,
  BarChart3,
  Bot,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Contact,
  FileText,
  HeartPulse,
  Home,
  Menu,
  Moon,
  Newspaper,
  Sun,
  UsersRound,
  X,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

import { navigationGroups } from '@/config/navigation'

const SIDEBAR_KEY = 'dataiesb-sidebar-collapsed'
const THEME_KEY = 'dataiesb-theme'

const iconById = {
  home: Home,
  noticias: Newspaper,
  aurya: Bot,
  aplicacoes: BarChart3,
  'sus-aih': HeartPulse,
  'sus-ambulatorial': Activity,
  'sus-sinan': FileText,
  'quem-somos': CircleUserRound,
  parceiros: UsersRound,
  contato: Contact,
} as const

type Props = Readonly<{ children: ReactNode; immersive?: boolean }>

const isActive = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : href.startsWith('/') && pathname.startsWith(href)

export function PortalShell({ children, immersive = false }: Props) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setCollapsed(window.localStorage.getItem(SIDEBAR_KEY) === 'true')
      const savedTheme = window.localStorage.getItem(THEME_KEY)
      const nextTheme = savedTheme === 'light' ? 'light' : 'dark'
      setTheme(nextTheme)
      document.documentElement.dataset.theme = nextTheme
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMobileOpen(false))
    return () => window.cancelAnimationFrame(frame)
  }, [pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [mobileOpen])

  const toggleCollapsed = () => {
    setCollapsed((current) => {
      window.localStorage.setItem(SIDEBAR_KEY, String(!current))
      return !current
    })
  }

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    document.documentElement.dataset.theme = nextTheme
    window.localStorage.setItem(THEME_KEY, nextTheme)
  }

  const navigation = (
    <nav className="portal-navigation" aria-label="Navegação principal">
      {navigationGroups.map((group) => (
        <section className="nav-group" key={group.label} aria-label={group.label}>
          <h2 className="nav-group-label">{group.label}</h2>
          <div className="nav-group-items">
            {group.items.map((item) => {
              const Icon = iconById[item.id as keyof typeof iconById] ?? FileText
              const active = !item.external && isActive(pathname, item.href)
              const content = (
                <>
                  <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
                  <span>{item.label}</span>
                </>
              )

              return item.external ? (
                <a
                  className="nav-link"
                  href={item.href}
                  key={item.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={collapsed ? item.label : undefined}
                >
                  {content}
                </a>
              ) : (
                <a
                  className={`nav-link${active ? ' is-active' : ''}`}
                  href={item.href}
                  key={item.id}
                  aria-current={active ? 'page' : undefined}
                  title={collapsed ? item.label : undefined}
                >
                  {content}
                </a>
              )
            })}
          </div>
        </section>
      ))}
    </nav>
  )

  return (
    <div className={`portal-frame${collapsed ? ' is-collapsed' : ''}${immersive ? ' is-immersive' : ''}`}>
      <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo</a>

      <header className="portal-header">
        <a className="brand-wordmark" href="/" aria-label="DataIESB — início">
          <span>Data</span><strong>IESB</strong>
        </a>
        <div className="header-actions">
          <button
            className="icon-button theme-button"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button
            className="icon-button mobile-menu-button"
            type="button"
            onClick={() => setMobileOpen((current) => !current)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <aside className="portal-sidebar" aria-label="Menu lateral">
        <button
          className="sidebar-toggle"
          type="button"
          onClick={toggleCollapsed}
          aria-label={collapsed ? 'Expandir menu lateral' : 'Recolher menu lateral'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          <span>{collapsed ? 'Expandir menu' : 'Recolher menu'}</span>
        </button>
        {navigation}
        <p className="sidebar-signature"><span aria-hidden="true" /> Ciência de dados aplicada</p>
      </aside>

      {mobileOpen && (
        <div className="mobile-drawer-layer">
          <button
            className="drawer-backdrop"
            type="button"
            aria-label="Fechar menu ao clicar fora"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="mobile-drawer" aria-label="Menu móvel">{navigation}</aside>
        </div>
      )}

      <main id="conteudo-principal" className="portal-main" tabIndex={-1}>{children}</main>

      <nav className="mobile-bottom-nav" aria-label="Atalhos móveis">
        <a href="/"><Home size={18} /><span>Início</span></a>
        <a href="/aplicacoes/"><BarChart3 size={18} /><span>Aplicações</span></a>
        <a href="https://aurya.dataiesb.com" target="_blank" rel="noopener noreferrer">
          <Bot size={18} /><span>Aurya</span>
        </a>
        <button type="button" onClick={() => setMobileOpen(true)}>
          <Menu size={18} /><span>Menu</span>
        </button>
      </nav>
    </div>
  )
}
