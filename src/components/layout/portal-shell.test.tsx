import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { PortalShell } from './portal-shell'

const navigationMock = vi.hoisted(() => ({ pathname: '/' }))

vi.mock('next/navigation', () => ({
  usePathname: () => navigationMock.pathname,
}))

describe('PortalShell', () => {
  beforeEach(() => {
    navigationMock.pathname = '/'
    document.documentElement.dataset.theme = 'dark'
    window.localStorage.clear()
  })

  it('renders the portal landmarks and collapses the desktop sidebar', async () => {
    const user = userEvent.setup()
    render(<PortalShell><h1>Conteúdo da página</h1></PortalShell>)

    expect(screen.getByRole('banner')).toBeInTheDocument()
    const primaryNavigation = screen.getByRole('navigation', { name: 'Navegação principal' })
    expect(primaryNavigation).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveAttribute('id', 'conteudo-principal')
    expect(within(primaryNavigation).getByRole('link', { name: 'Aurya' })).toHaveAttribute(
      'href',
      'https://aurya.dataiesb.com',
    )
    expect(within(primaryNavigation).getByRole('link', { name: 'IARA-SUS' })).toHaveAttribute(
      'href',
      '/assistentes/iara-sus/',
    )

    await user.click(screen.getByRole('button', { name: 'Recolher menu lateral' }))
    expect(screen.getByRole('button', { name: 'Expandir menu lateral' })).toBeInTheDocument()
    expect(window.localStorage.getItem('dataiesb-sidebar-collapsed')).toBe('true')
  })

  it('persists the selected color theme', async () => {
    const user = userEvent.setup()
    render(<PortalShell><p>Portal</p></PortalShell>)

    await user.click(screen.getByRole('button', { name: 'Ativar tema claro' }))

    expect(document.documentElement.dataset.theme).toBe('light')
    expect(window.localStorage.getItem('dataiesb-theme')).toBe('light')
    expect(screen.getByRole('button', { name: 'Ativar tema escuro' })).toBeInTheDocument()
  })

  it('traps focus inside the mobile drawer and restores it when closed', async () => {
    const user = userEvent.setup()
    render(<PortalShell><p>Portal</p></PortalShell>)

    const trigger = screen.getByRole('button', { name: 'Abrir menu' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await user.click(trigger)
    const dialog = screen.getByRole('dialog', { name: 'Menu móvel' })
    const close = within(dialog).getByRole('button', { name: 'Fechar menu' })
    await waitFor(() => expect(close).toHaveFocus())
    expect(screen.getAllByRole('button', { name: 'Fechar menu' })).toHaveLength(1)
    expect(screen.getByRole('main')).toHaveAttribute('inert')

    const links = within(dialog).getAllByRole('link')
    links.at(-1)!.focus()
    await user.tab()
    expect(close).toHaveFocus()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: 'Menu móvel' })).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('identifies the current page in the mobile shortcuts', () => {
    navigationMock.pathname = '/aplicacoes/'
    render(<PortalShell><p>Portal</p></PortalShell>)

    const shortcuts = screen.getByRole('navigation', { name: 'Atalhos móveis' })
    expect(within(shortcuts).getByRole('link', { name: 'Aplicações' })).toHaveAttribute('aria-current', 'page')
    expect(within(shortcuts).getByRole('link', { name: 'Início' })).not.toHaveAttribute('aria-current')
  })
})
