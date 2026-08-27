import { readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const root = process.argv[2] || 'out'

function visit(directory) {
  for (const name of readdirSync(directory).sort()) {
    const file = join(directory, name)
    if (statSync(file).isDirectory()) {
      visit(file)
      continue
    }
    if (name !== 'index.html' || file === join(root, 'index.html')) continue
    const key = relative(root, file).split(sep).join('/').replace(/index\.html$/, '')
    process.stdout.write(`${file}\t${key}\n`)
  }
}

visit(root)
