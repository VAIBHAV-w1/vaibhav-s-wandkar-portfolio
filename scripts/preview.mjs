import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { parseArgs } from 'node:util'
import { ensureWindowsRolldownCompat, rootDir } from './wasi-shim.mjs'

process.chdir(rootDir)
ensureWindowsRolldownCompat()

const { values: cli } = parseArgs({
  options: {
    port: { type: 'string' },
    host: { type: 'string' },
    strictPort: { type: 'boolean' },
  },
  strict: false,
})

const viteEntry = pathToFileURL(path.join(rootDir, 'node_modules/vite/dist/node/index.js')).href
const { preview } = await import(viteEntry)

const server = await preview({
  root: rootDir,
  configFile: path.join(rootDir, 'vite.config.ts'),
  preview: {
    port: cli.port ? Number(cli.port) : 4173,
    host: typeof cli.host === 'string' ? cli.host : '127.0.0.1',
    strictPort: Boolean(cli.strictPort),
  },
})

server.printUrls()
server.bindCLIShortcuts({ print: true })
