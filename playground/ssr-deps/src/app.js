import path from 'node:path'
import readFileContent from 'read-file-content'
import primitiveExport from 'primitive-export'
import tsDefaultExport, { hello as tsNamedExport } from 'ts-transpiled-exports'
import objectAssignedExports from 'object-assigned-exports'
import forwardedExport from 'forwarded-export'
import bcrypt from 'bcrypt'
import definePropertiesExports from 'define-properties-exports'
import definePropertyExports from 'define-property-exports'
import onlyObjectAssignedExports from 'only-object-assigned-exports'
import requireAbsolute from 'require-absolute'
import noExternalCjs from 'no-external-cjs'
import importBuiltinCjs from 'import-builtin-cjs'
import { hello as linkedNoExternal } from 'linked-no-external'
import virtualMessage from 'pkg-exports/virtual'
import '@vitejs/css-lib'

// This import will set a 'Hello World!" message in the nested-external non-entry dependency
import 'non-optimized-with-nested-external'

// These two are optimized and get the message from nested-external, if the dependency is
// not properly externalized and ends up bundled, the message will be undefined
import optimizedWithNestedExternal from 'optimized-with-nested-external'
import optimizedCjsWithNestedExternal from 'optimized-cjs-with-nested-external'

import { setMessage } from 'external-entry/entry'
setMessage('Hello World!')
import externalUsingExternalEntry from 'external-using-external-entry'

export async function render(url, rootDir) {
  let html = ''

  const encryptedMsg = await bcrypt.hash('Secret Message!', 10)
  html += `\n<p class="encrypted-msg">encrypted message: ${encryptedMsg}</p>`

  const fileContent = await readFileContent(path.resolve(rootDir, 'message'))
  html += `\n<p class="file-message">msg read via fs/promises: ${fileContent}</p>`

  html += `\n<p class="primitive-export-message">message from primitive export: ${primitiveExport}</p>`

  const tsDefaultExportMessage = tsDefaultExport()
  html += `\n<p class="ts-default-export-message">message from ts-default-export: ${tsDefaultExportMessage}</p>`

  const tsNamedExportMessage = tsNamedExport()
  html += `\n<p class="ts-named-export-message">message from ts-named-export: ${tsNamedExportMessage}</p>`

  const objectAssignedExportsMessage = objectAssignedExports.hello()
  html += `\n<p class="object-assigned-exports-message">message from object-assigned-exports: ${objectAssignedExportsMessage}</p>`

  const forwardedExportMessage = forwardedExport.hello()
  html += `\n<p class="forwarded-export-message">message from forwarded-export: ${forwardedExportMessage}</p>`

  const definePropertiesExportsMsg = definePropertiesExports.hello()
  html += `\n<p class="define-properties-exports-msg">message from define-properties-exports: ${definePropertiesExportsMsg}</p>`

  const definePropertyExportsMsg = definePropertyExports.hello()
  html += `\n<p class="define-property-exports-msg">message from define-property-exports: ${definePropertyExportsMsg}</p>`

  const onlyObjectAssignedExportsMessage = onlyObjectAssignedExports.hello()
  html += `\n<p class="only-object-assigned-exports-msg">message from only-object-assigned-exports: ${onlyObjectAssignedExportsMessage}</p>`

  const requireAbsoluteMessage = requireAbsolute.hello()
  html += `\n<p class="require-absolute-msg">message from require-absolute: ${requireAbsoluteMessage}</p>`

  const noExternalCjsMessage = noExternalCjs.hello()
  html += `\n<p class="no-external-cjs-msg">message from no-external-cjs: ${noExternalCjsMessage}</p>`

  const importBuiltinCjsMessage = importBuiltinCjs.hello()
  html += `\n<p class="import-builtin-cjs-msg">message from import-builtin-cjs: ${importBuiltinCjsMessage}</p>`

  const optimizedWithNestedExternalMessage = optimizedWithNestedExternal.hello()
  html += `\n<p class="optimized-with-nested-external">message from optimized-with-nested-external: ${optimizedWithNestedExternalMessage}</p>`

  const optimizedCjsWithNestedExternalMessage =
    optimizedCjsWithNestedExternal.hello()
  html += `\n<p class="optimized-cjs-with-nested-external">message from optimized-cjs-with-nested-external: ${optimizedCjsWithNestedExternalMessage}</p>`

  const externalUsingExternalEntryMessage = externalUsingExternalEntry.hello()
  html += `\n<p class="external-using-external-entry">message from external-using-external-entry: ${externalUsingExternalEntryMessage}</p>`

  const linkedNoExternalMessage = linkedNoExternal()
  html += `\n<p class="linked-no-external">message from linked-no-external: ${linkedNoExternalMessage}</p>`

  html += `\n<p class="dep-virtual">message from dep-virtual: ${virtualMessage}</p>`

  html += `\n<p class="css-lib">I should be blue</p>`

  return html + '\n'
}
