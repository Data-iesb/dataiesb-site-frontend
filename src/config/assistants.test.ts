import { describe, expect, it } from 'vitest'

import { assistants, getAssistantById } from './assistants'

describe('assistants', () => {
  it('registers the integrated Athenas with their chat suggestions', () => {
    expect(assistants.map((assistant) => assistant.id)).toEqual([
      'aurya-sus',
      'aurya-pos-graduacao',
      'aurya-iesb',
      'athena-educacional',
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
    expect(assistants[3]).toMatchObject({
      title: 'Athena Educacional',
      eyebrow: 'Material didático',
      agent: 'educacional',
    })
    expect(assistants[3].modes?.map((mode) => mode.id)).toEqual(['professor', 'aluno'])
    for (const assistant of assistants) {
      if (assistant.modes?.length) {
        for (const mode of assistant.modes) {
          expect(mode.suggestions.length).toBeGreaterThan(0)
          expect(mode.welcome.length).toBeGreaterThan(0)
        }
      } else {
        expect(assistant.suggestions.length).toBeGreaterThan(0)
      }
    }
  })

  it('resolves assistants by id', () => {
    expect(getAssistantById('aurya-sus')?.title).toBe('Athena SUS')
    expect(getAssistantById('aurya-pos-graduacao')?.title).toBe('Athena Pós-Graduação')
    expect(getAssistantById('aurya-iesb')?.title).toBe('Athena IESB')
    expect(getAssistantById('athena-educacional')?.title).toBe('Athena Educacional')
    expect(getAssistantById('inexistente')).toBeUndefined()
  })
})
