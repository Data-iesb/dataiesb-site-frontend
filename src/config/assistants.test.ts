import { describe, expect, it } from 'vitest'

import { assistants, getAssistantById } from './assistants'

describe('assistants', () => {
  it('registers the integrated Athenas with their chat suggestions', () => {
    expect(assistants.map((assistant) => assistant.id)).toEqual([
      'aurya-sus',
      'aurya-pos-graduacao',
      'aurya-iesb',
    ])
    expect(assistants[0]).toMatchObject({
      title: 'Athena SUS',
      eyebrow: 'Base SUS',
    })
    expect(assistants[1]).toMatchObject({
      title: 'Athena Pós-Graduação',
      eyebrow: 'Base CAPES',
      agent: 'pos_graduacao',
    })
    expect(assistants[2]).toMatchObject({
      title: 'Athena IESB',
      eyebrow: 'Guias IESB',
      agent: 'iesb',
    })
    for (const assistant of assistants) {
      expect(assistant.suggestions.length).toBeGreaterThan(0)
    }
  })

  it('resolves assistants by id', () => {
    expect(getAssistantById('aurya-sus')?.title).toBe('Athena SUS')
    expect(getAssistantById('aurya-pos-graduacao')?.title).toBe('Athena Pós-Graduação')
    expect(getAssistantById('aurya-iesb')?.title).toBe('Athena IESB')
    expect(getAssistantById('inexistente')).toBeUndefined()
  })
})
