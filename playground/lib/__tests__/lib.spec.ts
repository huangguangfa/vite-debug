import { describe, expect, test } from 'vitest'
import {
  isBuild,
  isServe,
  page,
  readFile,
  serverLogs,
  untilUpdated
} from '~utils'

describe.runIf(isBuild)('build', () => {
  test('es', async () => {
    expect(await page.textContent('.es')).toBe('It works')
  })

  test('umd', async () => {
    expect(await page.textContent('.umd')).toBe('It works')
    const code = readFile('dist/my-lib-custom-filename.umd.js')
    // esbuild helpers are injected inside of the UMD wrapper
    expect(code).toMatch(/^\(function\(/)
  })

  test('iife', async () => {
    expect(await page.textContent('.iife')).toBe('It works')
    const code = readFile('dist/my-lib-custom-filename.iife.js')
    // esbuild helpers are injected inside of the IIFE wrapper
    expect(code).toMatch(/^var MyLib=function\(\){"use strict";/)
  })

  test('Library mode does not include `preload`', async () => {
    await untilUpdated(
      () => page.textContent('.dynamic-import-message'),
      'hello vite'
    )
    const code = readFile('dist/lib/dynamic-import-message.es.mjs')
    expect(code).not.toMatch('__vitePreload')

    // Test that library chunks are hashed
    expect(code).toMatch(/await import\("\.\/message.[a-z\d]{8}.mjs"\)/)
  })

  test('@import hoist', async () => {
    serverLogs.forEach((log) => {
      // no warning from esbuild css minifier
      expect(log).not.toMatch('All "@import" rules must come first')
    })
  })

  test('preserve process.env', () => {
    const es = readFile('dist/my-lib-custom-filename.mjs')
    const iife = readFile('dist/my-lib-custom-filename.iife.js')
    const umd = readFile('dist/my-lib-custom-filename.umd.js')
    expect(es).toMatch('process.env.NODE_ENV')
    expect(iife).toMatch('process.env.NODE_ENV')
    expect(umd).toMatch('process.env.NODE_ENV')
  })
})

test.runIf(isServe)('dev', async () => {
  expect(await page.textContent('.demo')).toBe('It works')
})
