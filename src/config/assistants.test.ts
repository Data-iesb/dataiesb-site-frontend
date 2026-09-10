import { describe, expect, it } from 'vitest'

import { assistants, getAssistantById } from './assistants'

describe('assistants', () => {
  it('registers the integrated Aurya SUS with its chat suggestions', () => {
    expect(assistants.map((assistant) => assistant.id)).toEqual(['aurya-sus'])
    expect(assistants[0]).toMatchObject({
      title: 'Aurya SUS',
      eyebrow: 'Base SUS',
    })
    expect(assistants[0].suggestions.length).toBeGreaterThan(0)
  })

  it('resolves assistants by id', () => {
    expect(getAssistantById('aurya-sus')?.title).toBe('Aurya SUS')
    expect(getAssistantById('inexistente')).toBeUndefined()
  })
})