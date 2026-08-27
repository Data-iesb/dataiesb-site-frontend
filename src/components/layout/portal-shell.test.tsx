import { render, screen } from '@testing-library/react'
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

  it('opens and closes the mobile navigation drawer', async () => {
    const user = userEvent.setup()
    render(<PortalShell><p>Portal</p></PortalShell>)

    const trigger = screen.getByRole('button', { name: 'Abrir menu' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await user.click(trigger)
    expect(screen.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })
})
