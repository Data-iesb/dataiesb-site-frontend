import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Page from './page'

describe('Partners page', () => {
  it.each([
    {
      name: 'Centro Universitário IESB',
      paragraphCount: 5,
      closingText: 'aplicação do conhecimento em benefício do desenvolvimento social',
    },
    {
      name: 'Amazon Web Services',
      paragraphCount: 4,
      closingText: 'obter relatórios por requisições técnicas das instituições atendidas',
    },
    {
      name: 'SAS',
      paragraphCount: 6,
      closingText: 'tecnologias amplamente adotadas por organizações de alto desempenho',
    },
    {
      name: 'DataI',
      paragraphCount: 4,
      closingText: 'desafios contemporâneos da ciência de dados aplicada à gestão pública',
    },
  ])('renders the complete official narrative for $name', ({ name, paragraphCount, closingText }) => {
    render(<Page />)

    const article = screen.getByRole('heading', { name }).closest('article')
    expect(article).not.toBeNull()
    expect(article!.querySelectorAll('p')).toHaveLength(paragraphCount)
    expect(article).toHaveTextContent(closingText)
  })
})
