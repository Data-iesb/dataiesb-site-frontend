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
import { useCallback, useEffect, useRef, useState } from 'react'

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
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLElement>(null)
  const drawerCloseRef = useRef<HTMLButtonElement>(null)
  const mobileOpenerRef = useRef<HTMLElement | null>(null)

  const openMobileMenu = useCallback(() => {
    mobileOpenerRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : menuButtonRef.current
    setMobileOpen(true)
  }, [])

  const closeMobileMenu = useCallback(() => setMobileOpen(false), [])

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
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const frame = window.requestAnimationFrame(() => drawerCloseRef.current?.focus())
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMobileMenu()
        return
      }
      if (event.key !== 'Tab' || !drawerRef.current) return
      const focusable = [...drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )]
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyboard)
    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener('keydown', handleKeyboard)
      document.body.style.overflow = previousOverflow
      mobileOpenerRef.current?.focus()
    }
  }, [closeMobileMenu, mobileOpen])

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
            ref={menuButtonRef}
            className="icon-button mobile-menu-button"
            type="button"
            onClick={mobileOpen ? closeMobileMenu : openMobileMenu}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-hidden={mobileOpen || undefined}
            tabIndex={mobileOpen ? -1 : undefined}
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
            tabIndex={-1}
            onClick={closeMobileMenu}
          />
          <aside ref={drawerRef} className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Menu móvel">
            <div className="mobile-drawer-header">
              <strong>Menu</strong>
              <button ref={drawerCloseRef} className="icon-button" type="button" aria-label="Fechar menu" onClick={closeMobileMenu}><X size={20} /></button>
            </div>
            {navigation}
          </aside>
        </div>
      )}

      <main id="conteudo-principal" className="portal-main" tabIndex={-1} inert={mobileOpen ? true : undefined}>
        {children}
        {!immersive && (
          <footer className="portal-credits">
            <span>Desenvolvido por <a href="https://levav.it" target="_blank" rel="noopener noreferrer">Levav-IT</a> · Patrocínio: <a href="https://datai.tec.br" target="_blank" rel="noopener noreferrer">DatAí</a></span>
            <a className="aws-credit" href="https://aws.amazon.com" target="_blank" rel="noopener noreferrer"><span>Powered by</span><img src="/img/Amazon_Web_Services-Logo.wine.png" alt="AWS" /></a>
          </footer>
        )}
      </main>

      <nav className="mobile-bottom-nav" aria-label="Atalhos móveis" inert={mobileOpen ? true : undefined}>
        <a className={isActive(pathname, '/') ? 'is-active' : undefined} href="/" aria-current={isActive(pathname, '/') ? 'page' : undefined}><Home size={18} /><span>Início</span></a>
        <a className={isActive(pathname, '/aplicacoes/') ? 'is-active' : undefined} href="/aplicacoes/" aria-current={isActive(pathname, '/aplicacoes/') ? 'page' : undefined}><BarChart3 size={18} /><span>Aplicações</span></a>
        <a href="https://aurya.dataiesb.com" target="_blank" rel="noopener noreferrer">
          <Bot size={18} /><span>Aurya</span>
        </a>
        <button type="button" onClick={openMobileMenu}>
          <Menu size={18} /><span>Menu</span>
        </button>
      </nav>
    </div>
  )
}
