import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'
import { ensureWindowsRolldownCompat, rootDir } from './wasi-shim.mjs'

const require = createRequire(import.meta.url)
process.chdir(rootDir)

ensureWindowsRolldownCompat()

let canLightningCss = true
try {
  require(path.join(rootDir, 'node_modules/lightningcss'))
} catch {
  canLightningCss = false
}

const viteEntry = pathToFileURL(path.join(rootDir, 'node_modules/vite/dist/node/index.js')).href
const { build } = await import(viteEntry)

await build({
  root: rootDir,
  configFile: path.join(rootDir, 'vite.config.ts'),
  ...(!canLightningCss ? { build: { cssMinify: false } } : {}),
})
