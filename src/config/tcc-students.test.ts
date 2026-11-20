import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { tccStudents } from './tcc-students'

describe('tccStudents', () => {
  it('registers all 16 TCC 2026.2 students with unique ids', () => {
    expect(tccStudents).toHaveLength(16)
    expect(new Set(tccStudents.map((student) => student.id)).size).toBe(tccStudents.length)
  })

  it('resolves every configured photo to a unique file under public/', () => {
    const hashes = tccStudents.flatMap((student) => {
      if (!student.photoUrl) return []

      const relativePath = decodeURIComponent(student.photoUrl).replace(/^\//, '')
      const photo = readFileSync(join(process.cwd(), 'public', relativePath))
      return [createHash('sha256').update(photo).digest('hex')]
    })

    expect(hashes).toHaveLength(11)
    expect(new Set(hashes).size).toBe(hashes.length)
  })

  it('uses valid http/https URLs for external profile and application links', () => {
    const linkKeys = ['linkedin', 'lattes', 'github', 'appUrl'] as const

    for (const student of tccStudents) {
      for (const key of linkKeys) {
        const value = student[key]
        if (value !== undefined) {
          expect(value).toMatch(/^https?:\/\//)
        }
      }
    }
  })

  it('includes the new registrations, verified photos, and deployed application links', () => {
    const byId = new Map(tccStudents.map((student) => [student.id, student]))

    expect(byId.get('cesar-eustaquio-da-fonseca-filho')).toMatchObject({
      name: 'Cesar Eustaquio da Fonseca Filho',
      github: 'https://github.com/CesarFonseca13',
    })
    expect(byId.get('marley-abe-silva')).toMatchObject({
      name: 'Marley Abe Silva',
      photoUrl: '/img/tcc/marley-abe-silva.webp',
      appUrl: 'https://observatorio.163-176-169-135.sslip.io/',
    })
    expect(byId.get('matheus-lima-ribeiro')).toMatchObject({
      name: 'Matheus Lima Ribeiro',
      appUrl: 'https://tcc-cs2-triagem-1.onrender.com/',
    })

    const expectedApps: Record<string, string> = {
      'gabriel-cesar-de-franca-pereira': 'https://app.dataiesb.com/atlas-enade/site/',
      'piettro-pecidor-nakashoji': 'https://diabetes-tcc.vercel.app/',
      'william-wallace-ribeiro-matos': 'https://tccwilliam.dataiesb.com/',
      'maycon-moriy-abe-machado': 'https://76-13-167-21.sslip.io/',
      'carlos-henrique-de-brito-teles': 'https://tcccarlos.dataiesb.com/',
      'marley-abe-silva': 'https://observatorio.163-176-169-135.sslip.io/',
      'matheus-lima-ribeiro': 'https://tcc-cs2-triagem-1.onrender.com/',
      'joel-carolino-farias': 'https://tccjoel.dataiesb.com/',
    }
    for (const [id, appUrl] of Object.entries(expectedApps)) {
      expect(byId.get(id)?.appUrl).toBe(appUrl)
    }

    const withoutPhoto = [
      'luca-adriano-melo-mendonca-soares',
      'eduardo-goncalves-barbosa',
      'carlos-henrique-de-brito-teles',
      'cesar-eustaquio-da-fonseca-filho',
      'matheus-lima-ribeiro',
    ]
    for (const id of withoutPhoto) {
      expect(byId.get(id)).not.toHaveProperty('photoUrl')
    }
  })
})
