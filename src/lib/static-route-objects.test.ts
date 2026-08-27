import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { mkdtempSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('static route object manifest', () => {
  it('maps nested index files to the exact trailing-slash S3 keys CloudFront requests', () => {
    const root = mkdtempSync(join(tmpdir(), 'dataiesb-routes-'))
    try {
      mkdirSync(join(root, 'noticias'), { recursive: true })
      mkdirSync(join(root, 'aplicacoes', 'visualizar'), { recursive: true })
      writeFileSync(join(root, 'index.html'), 'root')
      writeFileSync(join(root, 'noticias', 'index.html'), 'news')
      writeFileSync(join(root, 'aplicacoes', 'visualizar', 'index.html'), 'viewer')

      const script = join(process.cwd(), 'scripts', 'static-route-objects.mjs')
      const output = execFileSync(process.execPath, [script, root], { encoding: 'utf8' })
      const rows = output.trim().split(/\r?\n/).map((line) => line.split('\t')[1])

      expect(rows).toEqual(['aplicacoes/visualizar/', 'noticias/'])
      expect(output).not.toContain('\t/\n')
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})
