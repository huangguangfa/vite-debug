import { describe, expect, test } from 'vitest'
import { browserLogs, isBuild, page } from '~utils'

test('importmap', () => {
  expect(browserLogs).not.toContain(
    'An import map is added after module script load was triggered.'
  )
})

describe.runIf(isBuild)('build', () => {
  test('should externalize imported packages', async () => {
    // If `vue` is successfully externalized, the page should use the version from the import map
    expect(await page.textContent('#imported-vue-version')).toBe('3.2.0')
  })

  test('should externalize required packages', async () => {
    // If `vue` is successfully externalized, the page should use the version from the import map
    expect(await page.textContent('#required-vue-version')).toBe('3.2.0')
  })
})
