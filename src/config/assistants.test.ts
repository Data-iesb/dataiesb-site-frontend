import { describe, expect, it } from 'vitest'

import { assistants, getAssistantById } from './assistants'

describe('assistants', () => {
  it('registers the integrated Auryas with their chat suggestions', () => {
    expect(assistants.map((assistant) => assistant.id)).toEqual(['aurya-sus', 'aurya-pos-graduacao'])
    expect(assistants[0]).toMatchObject({
      title: 'Aurya SUS',
      eyebrow: 'Base SUS',
    })
    expect(assistants[1]).toMatchObject({
      title: 'Aurya Pós-Graduação',
      eyebrow: 'Base CAPES',
      agent: 'pos_graduacao',
    })
    for (const assistant of assistants) {
      expect(assistant.suggestions.length).toBeGreaterThan(0)
    }
  })

  it('resolves assistants by id', () => {
    expect(getAssistantById('aurya-sus')?.title).toBe('Aurya SUS')
    expect(getAssistantById('aurya-pos-graduacao')?.title).toBe('Aurya Pós-Graduação')
    expect(getAssistantById('inexistente')).toBeUndefined()
  })
})