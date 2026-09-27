import { describe, expect, it } from 'vitest'

import { assistants, getAssistantById } from './assistants'

describe('assistants', () => {
  it('registers the integrated Athenas with their chat suggestions', () => {
    expect(assistants.map((assistant) => assistant.id)).toEqual([
      'aurya-sus',
      'aurya-pos-graduacao',
      'aurya-iesb',
      'athena-professores',
      'athena-alunos',
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
      title: 'Athena Professores',
      eyebrow: 'Material didático',
      agent: 'educacional',
      mode: 'professor',
    })
    expect(assistants[4]).toMatchObject({
      title: 'Athena Alunos',
      eyebrow: 'Material didático',
      agent: 'educacional',
      mode: 'aluno',
    })
    expect(assistants[3].welcome).toContain('Athena Professores')
    expect(assistants[4].welcome).toContain('Athena Alunos')
    expect(assistants[3].materials?.map((material) => material.href)).toEqual([
      '/pdfs/01-introducao-a-inteligencia-artificial.pdf',
      '/pdfs/02-inteligencia-artificial.pdf',
      '/pdfs/03-a-sociedade-e-o-avanco-da-inteligencia-artificial.pdf',
      '/pdfs/04-tecnologia-da-inteligencia.pdf',
    ])
    for (const assistant of assistants) {
      expect(assistant.suggestions.length).toBeGreaterThan(0)
    }
  })

  it('resolves assistants by id', () => {
    expect(getAssistantById('aurya-sus')?.title).toBe('Athena SUS')
    expect(getAssistantById('aurya-pos-graduacao')?.title).toBe('Athena Pós-Graduação')
    expect(getAssistantById('aurya-iesb')?.title).toBe('Athena IESB')
    expect(getAssistantById('athena-professores')?.title).toBe('Athena Professores')
    expect(getAssistantById('athena-alunos')?.title).toBe('Athena Alunos')
    expect(getAssistantById('inexistente')).toBeUndefined()
  })
})
