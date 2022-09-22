import fetch from 'node-fetch'
import { describe, expect, test } from 'vitest'
import { port } from './serve'
import { editFile, isServe, page, untilUpdated } from '~utils'

const url = `http://localhost:${port}`

describe('injected inline scripts', () => {
  test('no injected inline scripts are present', async () => {
    await page.goto(url)
    const inlineScripts = await page.$$eval('script', (nodes) =>
      nodes.filter((n) => !n.getAttribute('src') && n.innerHTML)
    )
    expect(inlineScripts).toHaveLength(0)
  })

  test('injected script proxied correctly', async () => {
    await page.goto(url)
    const proxiedScripts = await page.$$eval('script', (nodes) =>
      nodes
        .filter((n) => {
          const src = n.getAttribute('src')
          if (!src) return false
          return src.includes('?html-proxy&index')
        })
        .map((n) => n.getAttribute('src'))
    )

    // assert at least 1 proxied script exists
    expect(proxiedScripts).not.toHaveLength(0)

    const scriptContents = await Promise.all(
      proxiedScripts.map((src) => fetch(url + src).then((res) => res.text()))
    )

    // all proxied scripts return code
    for (const code of scriptContents) {
      expect(code).toBeTruthy()
    }
  })
})

describe.runIf(isServe)('hmr', () => {
  test('handle virtual module updates', async () => {
    await page.goto(url)
    const el = await page.$('.virtual')
    expect(await el.textContent()).toBe('[success]')
    editFile('src/importedVirtual.js', (code) =>
      code.replace('[success]', '[wow]')
    )
    await page.waitForNavigation()
    await untilUpdated(async () => {
      const el = await page.$('.virtual')
      return await el.textContent()
    }, '[wow]')
  })
})
