import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { AwsStackBadge } from './aws-stack-badge'

describe('AwsStackBadge', () => {
  it('opens the QuickSight information on click and closes it with Escape', async () => {
    const user = userEvent.setup()
    render(<AwsStackBadge dashboardSlug="quicksight" />)

    const trigger = screen.getByRole('button', { name: 'Construído com AWS' })
    await user.click(trigger)
    const dialog = screen.getByRole('dialog', { name: 'Stack AWS utilizada neste painel' })
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(within(dialog).getByText('Amazon QuickSight')).toBeInTheDocument()
    expect(within(dialog).getByText('Amazon RDS')).toBeInTheDocument()
    expect(within(dialog).getByText('+ Software livre: PostgreSQL')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('uses the Athena services in the inline assistant badge', async () => {
    const user = userEvent.setup()
    render(<AwsStackBadge dashboardSlug="athena" variant="inline" />)

    await user.click(screen.getByRole('button', { name: 'Construído com AWS' }))
    const dialog = screen.getByRole('dialog', { name: 'Stack AWS utilizada neste painel' })
    expect(within(dialog).getByText('Amazon Bedrock')).toBeInTheDocument()
    expect(within(dialog).getByText('Amazon Polly')).toBeInTheDocument()
    expect(within(dialog).queryByText('Amazon QuickSight')).not.toBeInTheDocument()
  })
})
