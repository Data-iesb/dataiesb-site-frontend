import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BrazilMap } from './brazil-map'

describe('BrazilMap', () => {
  it('keeps geographic translation separate from the animated marker', () => {
    render(<BrazilMap />)

    const map = screen.getByRole('img', { name: 'Mapa do Brasil' })
    const positionedMarkers = map.querySelectorAll('g[transform]')

    expect(positionedMarkers).toHaveLength(5)
    positionedMarkers.forEach((marker) => expect(marker).not.toHaveClass('map-signal'))
    expect(map.querySelectorAll('circle.map-signal')).toHaveLength(5)
  })
})
