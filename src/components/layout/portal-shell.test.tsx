import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { PortalShell } from './portal-shell'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('PortalShell', () => {
  beforeEach(() => {
    document.documentElement.dataset.theme = 'dark'
    window.localStorage.clear()
  })

  it('renders the portal landmarks and collapses the desktop sidebar', async () => {
    const user = userEvent.setup()
    render(<PortalShell><h1>Conteúdo da página</h1></PortalShell>)

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Navegação principal' })).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveAttribute('id', 'conteudo-principal')

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
    expect(screen.getByRole('main')).toHaveAttribute('inert')

    const links = within(dialog).getAllByRole('link')
    links.at(-1)!.focus()
    await user.tab()
    expect(close).toHaveFocus()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: 'Menu móvel' })).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })
})
