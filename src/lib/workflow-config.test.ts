import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('deployment workflow serialization', () => {
  for (const workflow of ['deploy-dev.yml', 'deploy-prod.yml']) {
    it(`serializes ${workflow} deployments for the same branch`, () => {
      const content = readFileSync(`.github/workflows/${workflow}`, 'utf8')

      expect(content).toContain('concurrency:')
      expect(content).toContain('cancel-in-progress: false')
    })
  }
})
