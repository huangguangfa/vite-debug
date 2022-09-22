## 3.1.0 (2022-09-05)




## 3.1.0-beta.0 (2022-08-29)

* docs: fix typo (#9855) ([583f185](https://github.com/vitejs/vite/commit/583f185)), closes [#9855](https://github.com/vitejs/vite/issues/9855)
* feat: support object style hooks (#9634) ([757a92f](https://github.com/vitejs/vite/commit/757a92f)), closes [#9634](https://github.com/vitejs/vite/issues/9634)
* chore: fix typo (#9684) ([d30f881](https://github.com/vitejs/vite/commit/d30f881)), closes [#9684](https://github.com/vitejs/vite/issues/9684)
* chore(deps): update all non-major dependencies (#9675) ([4e56e87](https://github.com/vitejs/vite/commit/4e56e87)), closes [#9675](https://github.com/vitejs/vite/issues/9675)
* chore(plugin-vue): update reactivityTransform comment docs [ci skip] ([d04784b](https://github.com/vitejs/vite/commit/d04784b))



## <small>3.0.3 (2022-08-12)</small>




## <small>3.0.2 (2022-08-11)</small>

* chore: fix code typos (#9033) ([ed02861](https://github.com/vitejs/vite/commit/ed02861)), closes [#9033](https://github.com/vitejs/vite/issues/9033)
* chore: narrow down rollup version (#9637) ([fcf4d98](https://github.com/vitejs/vite/commit/fcf4d98)), closes [#9637](https://github.com/vitejs/vite/issues/9637)



## <small>3.0.1 (2022-07-18)</small>

* fix: mention that Node.js 13/15 support is dropped (fixes #9113) (#9116) ([2826303](https://github.com/vitejs/vite/commit/2826303)), closes [#9113](https://github.com/vitejs/vite/issues/9113) [#9116](https://github.com/vitejs/vite/issues/9116)
* fix(vue): remove ssr.external config (#9128) ([ec91f98](https://github.com/vitejs/vite/commit/ec91f98)), closes [#9128](https://github.com/vitejs/vite/issues/9128)
* refactor(vue): limit passable compilerOptions (#8994) ([b7b3e65](https://github.com/vitejs/vite/commit/b7b3e65)), closes [#8994](https://github.com/vitejs/vite/issues/8994)



## 3.0.0 (2022-07-13)

* chore: 3.0 release notes and bump peer deps (#9072) ([427ba26](https://github.com/vitejs/vite/commit/427ba26)), closes [#9072](https://github.com/vitejs/vite/issues/9072)
* fix(vue): handle undefined on import.meta.hot.accept (fixes #8625) (#9011) ([70af44a](https://github.com/vitejs/vite/commit/70af44a)), closes [#8625](https://github.com/vitejs/vite/issues/8625) [#9011](https://github.com/vitejs/vite/issues/9011)
* docs: cleanup changes (#8989) ([07aef1b](https://github.com/vitejs/vite/commit/07aef1b)), closes [#8989](https://github.com/vitejs/vite/issues/8989)



## 3.0.0-beta.1 (2022-07-06)

* fix(deps): update all non-major dependencies (#8802) ([a4a634d](https://github.com/vitejs/vite/commit/a4a634d)), closes [#8802](https://github.com/vitejs/vite/issues/8802)
* fix(plugin-vue): handle TS decorators in rewriteDefault fallback ([cb0c76a](https://github.com/vitejs/vite/commit/cb0c76a))
* chore: use `tsx` directly instead of indirect `esno` (#8773) ([f018f13](https://github.com/vitejs/vite/commit/f018f13)), closes [#8773](https://github.com/vitejs/vite/issues/8773)
* chore(plugin-vue): mark export helper with null byte (#8792) ([8de4319](https://github.com/vitejs/vite/commit/8de4319)), closes [#8792](https://github.com/vitejs/vite/issues/8792)



## 3.0.0-beta.0 (2022-06-21)

* feat: bump minimum node version to 14.18.0 (#8662) ([8a05432](https://github.com/vitejs/vite/commit/8a05432)), closes [#8662](https://github.com/vitejs/vite/issues/8662)
* feat: experimental.buildAdvancedBaseOptions (#8450) ([8ef7333](https://github.com/vitejs/vite/commit/8ef7333)), closes [#8450](https://github.com/vitejs/vite/issues/8450)
* chore: use node prefix (#8309) ([60721ac](https://github.com/vitejs/vite/commit/60721ac)), closes [#8309](https://github.com/vitejs/vite/issues/8309)



## 3.0.0-alpha.2 (2022-06-19)

* fix(deps): update all non-major dependencies (#8281) ([c68db4d](https://github.com/vitejs/vite/commit/c68db4d)), closes [#8281](https://github.com/vitejs/vite/issues/8281)
* fix(deps): update all non-major dependencies (#8391) ([842f995](https://github.com/vitejs/vite/commit/842f995)), closes [#8391](https://github.com/vitejs/vite/issues/8391)
* fix(plugin-vue): fix sourcemap when no script block in sfc (close #8601) (#8604) ([ccfccec](https://github.com/vitejs/vite/commit/ccfccec)), closes [#8601](https://github.com/vitejs/vite/issues/8601) [#8604](https://github.com/vitejs/vite/issues/8604)
* chore: enable reportUnusedDisableDirectives (#8384) ([9a99bc4](https://github.com/vitejs/vite/commit/9a99bc4)), closes [#8384](https://github.com/vitejs/vite/issues/8384)
* chore: update major deps (#8572) ([0e20949](https://github.com/vitejs/vite/commit/0e20949)), closes [#8572](https://github.com/vitejs/vite/issues/8572)
* chore: use `esno` to replace `ts-node` (#8162) ([c18a5f3](https://github.com/vitejs/vite/commit/c18a5f3)), closes [#8162](https://github.com/vitejs/vite/issues/8162)
* chore(deps): update all non-major dependencies (#8474) ([6d0ede7](https://github.com/vitejs/vite/commit/6d0ede7)), closes [#8474](https://github.com/vitejs/vite/issues/8474)
* feat: expose createFilter util (#8562) ([c5c424a](https://github.com/vitejs/vite/commit/c5c424a)), closes [#8562](https://github.com/vitejs/vite/issues/8562)
* refactor: remove hooks ssr param support (#8491) ([f59adf8](https://github.com/vitejs/vite/commit/f59adf8)), closes [#8491](https://github.com/vitejs/vite/issues/8491)
* feat!: migrate to ESM (#8178) ([76fdc27](https://github.com/vitejs/vite/commit/76fdc27)), closes [#8178](https://github.com/vitejs/vite/issues/8178)



## 3.0.0-alpha.1 (2022-05-19)

* fix: rewrite CJS specific funcs/vars in plugins (#8227) ([9baa70b](https://github.com/vitejs/vite/commit/9baa70b)), closes [#8227](https://github.com/vitejs/vite/issues/8227)
* fix(plugin-vue): regenerate scoped css in build watch, fix #7980 (#7989) ([dc00225](https://github.com/vitejs/vite/commit/dc00225)), closes [#7980](https://github.com/vitejs/vite/issues/7980) [#7989](https://github.com/vitejs/vite/issues/7989)
* fix(plugin-vue): use server.origin when building base for transformAssetUrls (#8077) ([2f7a490](https://github.com/vitejs/vite/commit/2f7a490)), closes [#8077](https://github.com/vitejs/vite/issues/8077)
* build!: bump targets (#8045) ([66efd69](https://github.com/vitejs/vite/commit/66efd69)), closes [#8045](https://github.com/vitejs/vite/issues/8045)
* chore: enable `import/no-duplicates` eslint rule (#8199) ([11243de](https://github.com/vitejs/vite/commit/11243de)), closes [#8199](https://github.com/vitejs/vite/issues/8199)
* docs(plugin-vue): clarify asset url handling (#8184) ([32c75e2](https://github.com/vitejs/vite/commit/32c75e2)), closes [#8184](https://github.com/vitejs/vite/issues/8184)



## 3.0.0-alpha.0 (2022-05-13)

* chore: bump minors and rebuild lock (#8074) ([aeb5b74](https://github.com/vitejs/vite/commit/aeb5b74)), closes [#8074](https://github.com/vitejs/vite/issues/8074)
* chore: revert vitejs/vite#8152 (#8161) ([85b8b55](https://github.com/vitejs/vite/commit/85b8b55)), closes [vitejs/vite#8152](https://github.com/vitejs/vite/issues/8152) [#8161](https://github.com/vitejs/vite/issues/8161)
* chore: update plugins peer deps ([d57c23c](https://github.com/vitejs/vite/commit/d57c23c))
* chore: upgrade to pnpm v7 (#8041) ([50f8f3b](https://github.com/vitejs/vite/commit/50f8f3b)), closes [#8041](https://github.com/vitejs/vite/issues/8041)
* chore: use `unbuild` to bundle plugins (#8139) ([638b168](https://github.com/vitejs/vite/commit/638b168)), closes [#8139](https://github.com/vitejs/vite/issues/8139)
* chore(deps): use `esno` to replace `ts-node` (#8152) ([2363bd3](https://github.com/vitejs/vite/commit/2363bd3)), closes [#8152](https://github.com/vitejs/vite/issues/8152)
* chore(lint): sort for imports (#8113) ([43a58dd](https://github.com/vitejs/vite/commit/43a58dd)), closes [#8113](https://github.com/vitejs/vite/issues/8113)
* chore(plugin-vue): change @rollup/pluginutils to dep from devDep (#8154) ([dcc8ea4](https://github.com/vitejs/vite/commit/dcc8ea4)), closes [#8154](https://github.com/vitejs/vite/issues/8154)
* chore(plugin-vue): replace source-map with gen/trace-mapping (#8155) ([79a8c85](https://github.com/vitejs/vite/commit/79a8c85)), closes [#8155](https://github.com/vitejs/vite/issues/8155)
* fix(plugin-vue): allow overwriting template.transformAssetUrls.includeAbsolute (fix #4836) (#6779) ([e0fe200](https://github.com/vitejs/vite/commit/e0fe200)), closes [#4836](https://github.com/vitejs/vite/issues/4836) [#6779](https://github.com/vitejs/vite/issues/6779)
* fix(plugin-vue): don't inline ts scripts during build (#7909) ([ba6cae9](https://github.com/vitejs/vite/commit/ba6cae9)), closes [#7909](https://github.com/vitejs/vite/issues/7909)
* fix(plugin-vue): trigger css hmr on custom template languages (#6987) ([2289d04](https://github.com/vitejs/vite/commit/2289d04)), closes [#6987](https://github.com/vitejs/vite/issues/6987)
* fix(plugin-vue): user defined transformAssetUrls ignored in production build (#7171) ([bfab569](https://github.com/vitejs/vite/commit/bfab569)), closes [#7171](https://github.com/vitejs/vite/issues/7171)
* fix(vue): same src file request same key (#8059) ([4c54800](https://github.com/vitejs/vite/commit/4c54800)), closes [#8059](https://github.com/vitejs/vite/issues/8059)
* refactor: use node hash (#7975) ([5ce7c74](https://github.com/vitejs/vite/commit/5ce7c74)), closes [#7975](https://github.com/vitejs/vite/issues/7975)
* build!: remove node v12 support (#7833) ([eeac2d2](https://github.com/vitejs/vite/commit/eeac2d2)), closes [#7833](https://github.com/vitejs/vite/issues/7833)



## <small>2.3.2 (2022-05-04)</small>

* feat: import ts with .js in vue (#7998) ([9974094](https://github.com/vitejs/vite/commit/9974094)), closes [#7998](https://github.com/vitejs/vite/issues/7998)
* refactor(plugin-vue): remove querystring import (#7997) ([f3d15f1](https://github.com/vitejs/vite/commit/f3d15f1)), closes [#7997](https://github.com/vitejs/vite/issues/7997)
* chore(deps): update all non-major dependencies (#7780) ([eba9d05](https://github.com/vitejs/vite/commit/eba9d05)), closes [#7780](https://github.com/vitejs/vite/issues/7780)



## <small>2.3.1 (2022-03-30)</small>

* chore(plugin-vue): revert #7527, lower vite peer dep ([447bbeb](https://github.com/vitejs/vite/commit/447bbeb)), closes [#7527](https://github.com/vitejs/vite/issues/7527)



## 2.3.0 (2022-03-30)

* chore(plugin-vue): bump vite peer dep to 2.9.0 (#7472) ([12fd1d9](https://github.com/vitejs/vite/commit/12fd1d9)), closes [#7472](https://github.com/vitejs/vite/issues/7472)
* feat(css): css.devSourcemap option (#7471) ([57f14cb](https://github.com/vitejs/vite/commit/57f14cb)), closes [#7471](https://github.com/vitejs/vite/issues/7471)
* fix(plugin-vue): respect __VUE_PROD_DEVTOOLS__ setting (#4984) ([90e812a](https://github.com/vitejs/vite/commit/90e812a)), closes [#4984](https://github.com/vitejs/vite/issues/4984)



## 2.3.0-beta.0 (2022-03-22)

* fix(deps): update all non-major dependencies (#7392) ([b63fc3b](https://github.com/vitejs/vite/commit/b63fc3b)), closes [#7392](https://github.com/vitejs/vite/issues/7392)
* feat: css sourcemap support during dev (#7173) ([38a655f](https://github.com/vitejs/vite/commit/38a655f)), closes [#7173](https://github.com/vitejs/vite/issues/7173)
* chore(deps): update all non-major dependencies (#6905) ([839665c](https://github.com/vitejs/vite/commit/839665c)), closes [#6905](https://github.com/vitejs/vite/issues/6905)
* docs(vue): add transformAssetUrls example (#7232) ([08e928c](https://github.com/vitejs/vite/commit/08e928c)), closes [#7232](https://github.com/vitejs/vite/issues/7232)



## [2.2.4](https://github.com/vitejs/vite/compare/plugin-vue@2.2.3...plugin-vue@2.2.4) (2022-02-28)



## [2.2.3](https://github.com/vitejs/vite/compare/plugin-vue@2.2.2...plugin-vue@2.2.3) (2022-02-28)


### Bug Fixes

* **plugin-vue:** setup jsx script no hmr ([#6568](https://github.com/vitejs/vite/issues/6568)) ([c84601c](https://github.com/vitejs/vite/commit/c84601cee5232bad0f65c8fcc663e38bb457a0b3))



## [2.2.2](https://github.com/vitejs/vite/compare/plugin-vue@2.2.1...plugin-vue@2.2.2) (2022-02-18)



## [2.2.1](https://github.com/vitejs/vite/compare/plugin-vue@2.2.0...plugin-vue@2.2.1) (2022-02-18)


### Bug Fixes

* adjust vue template sourcemap ([#6972](https://github.com/vitejs/vite/issues/6972)) ([a774303](https://github.com/vitejs/vite/commit/a7743039f263f41e1c3971e324f893a5ef5e5508))
* **deps:** update all non-major dependencies ([#6782](https://github.com/vitejs/vite/issues/6782)) ([e38be3e](https://github.com/vitejs/vite/commit/e38be3e6ca7bf79319d5d7188e1d347b1d6091ef))



# [2.2.0](https://github.com/vitejs/vite/compare/plugin-vue@2.1.0...plugin-vue@2.2.0) (2022-02-09)


### Bug Fixes

* plugin-vue `options.compiler` field ([#6588](https://github.com/vitejs/vite/issues/6588)) ([caec019](https://github.com/vitejs/vite/commit/caec01998a9599d255761f3efc1c49827aadac0d)), closes [#6587](https://github.com/vitejs/vite/issues/6587)



# [2.1.0](https://github.com/vitejs/vite/compare/plugin-vue@2.0.1...plugin-vue@2.1.0) (2022-01-21)


### Bug Fixes

* **plugin-vue:** compiler is null on rollup ([#6566](https://github.com/vitejs/vite/issues/6566)) ([b289b2d](https://github.com/vitejs/vite/commit/b289b2d433f94949730e1f041f3c8e16c417e9d0))
* **plugin-vue:** make cssm code tree shakeable ([#6353](https://github.com/vitejs/vite/issues/6353)) ([3fb4118](https://github.com/vitejs/vite/commit/3fb4118026e2745140894afb9755298656750f43))
* update the vue version in the error message ([#6252](https://github.com/vitejs/vite/issues/6252)) ([6a47083](https://github.com/vitejs/vite/commit/6a47083df14cb8d2584a86abda8a5e89a731c170))



## [2.0.1](https://github.com/vitejs/vite/compare/plugin-vue@2.0.0...plugin-vue@2.0.1) (2021-12-14)


### Bug Fixes

* **plugin-vue:** error.length is zero ([#6106](https://github.com/vitejs/vite/issues/6106)) ([5ec49be](https://github.com/vitejs/vite/commit/5ec49befad4d7b5e7cc14f14520ba96d5b6f6d69))



# [2.0.0](https://github.com/vitejs/vite/compare/plugin-vue@1.10.2...plugin-vue@2.0.0) (2021-12-12)


### Bug Fixes

* allow overwriting `define` options in vue & vue-jsx plugins ([#6072](https://github.com/vitejs/vite/issues/6072)) ([5f3f6b7](https://github.com/vitejs/vite/commit/5f3f6b7b406cb3371084057c74814eb36175e5cf))
* **plugin-vue:** multiple vue files using the same src file (fix [#5925](https://github.com/vitejs/vite/issues/5925), [#5447](https://github.com/vitejs/vite/issues/5447)) ([#5994](https://github.com/vitejs/vite/issues/5994)) ([df7aec7](https://github.com/vitejs/vite/commit/df7aec7d2a567af1dfbab76e5765aba80dc3cb5c))


### Code Refactoring

* **plugin-vue:** resolve vue/compiler-sfc from project root ([ce8b0fe](https://github.com/vitejs/vite/commit/ce8b0feae334cc224b3f4d2fdb2bffbb62322acf))


### Features

* **plugin-vue:** add `reactivityTransform` option. ([955d0fe](https://github.com/vitejs/vite/commit/955d0fecd936b8175d7a7e4355eab855eb4567f8))


### BREAKING CHANGES

* **plugin-vue:** `refTransform` option has been replaced by
`reactivityTransform` option. Now also requires vue@^3.2.25.
* **plugin-vue:** now requires vue@^3.2.13 as peer dep



## [1.10.2](https://github.com/vitejs/vite/compare/plugin-vue@1.10.1...plugin-vue@1.10.2) (2021-12-07)


### Bug Fixes

* **plugin-vue:** misleading error thrown after refresh or hmr ([#5870](https://github.com/vitejs/vite/issues/5870)) ([5c07cec](https://github.com/vitejs/vite/commit/5c07cec7214948da73fbbc33c7f5c83bf7f6cd2e))



## [1.10.1](https://github.com/vitejs/vite/compare/plugin-vue@1.10.0...plugin-vue@1.10.1) (2021-11-26)


### Bug Fixes

* **plugin-vue:** fix hmr issue in vuejs/core[#4358](https://github.com/vitejs/vite/issues/4358) ([709e4b0](https://github.com/vitejs/vite/commit/709e4b0428d8cdc8299b22898c76e58d66ca92c9))



# [1.10.0](https://github.com/vitejs/vite/compare/plugin-vue@1.10.0-beta.1...plugin-vue@1.10.0) (2021-11-22)



# [1.10.0-beta.1](https://github.com/vitejs/vite/compare/plugin-vue@1.10.0-beta.0...plugin-vue@1.10.0-beta.1) (2021-11-19)


### Bug Fixes

* plugin-vue dev scripts error in ssr-vue ([#5607](https://github.com/vitejs/vite/issues/5607)) ([502b8f2](https://github.com/vitejs/vite/commit/502b8f2b31f06d4e524d36b5566197db76f6ccda))
* **plugin-vue:** template src isn't working when script setup ([#5418](https://github.com/vitejs/vite/issues/5418)) ([518da44](https://github.com/vitejs/vite/commit/518da447e573b6f6ec5e2b1ca837332e0e230c14))
* **plugin-vue:** use __vccOpts for vue-class-component ([#5374](https://github.com/vitejs/vite/issues/5374)) ([c4f9db2](https://github.com/vitejs/vite/commit/c4f9db2cb375729b06f438298560045d4c488c14))



# [1.10.0-beta.0](https://github.com/vitejs/vite/compare/plugin-vue@1.9.4...plugin-vue@1.10.0-beta.0) (2021-10-28)



## [1.9.4](https://github.com/vitejs/vite/compare/plugin-vue@1.9.3...plugin-vue@1.9.4) (2021-10-27)


### Bug Fixes

* **plugin-vue:** exclude direct css request from hmr target ([#5422](https://github.com/vitejs/vite/issues/5422)) ([4331c26](https://github.com/vitejs/vite/commit/4331c26a5e5d7a9efc08a8b7bf7056785a1bcd94))



## [1.9.3](https://github.com/vitejs/vite/compare/plugin-vue@1.9.2...plugin-vue@1.9.3) (2021-10-05)


### Bug Fixes

* **plugin-vue:** don't use object spread in the config hook ([#5155](https://github.com/vitejs/vite/issues/5155)) ([c1ce471](https://github.com/vitejs/vite/commit/c1ce471c07264db034f42573662971f0dc531df7))



## [1.9.2](https://github.com/vitejs/vite/compare/plugin-vue@1.9.1...plugin-vue@1.9.2) (2021-09-24)


### Bug Fixes

* **plugin-vue:** handle rewrite default edge case with TS ([609a342](https://github.com/vitejs/vite/commit/609a342986b2d3b05ef59dc23523239938264008))


### Reverts

* Revert "feat(plugin-vue): define __VUE_SSR__ flag" ([3e2c1bf](https://github.com/vitejs/vite/commit/3e2c1bf74bb8ef583d66c67c715fdeae8d8fe432))



## [1.9.1](https://github.com/vitejs/vite/compare/plugin-vue@1.9.0...plugin-vue@1.9.1) (2021-09-23)


### Features

* ~~**plugin-vue:** define __VUE_SSR__ flag ([49618c1](https://github.com/vitejs/vite/commit/49618c17f38ee54ea17b4b04d58eb5fbf3e532fe))~~ (Reverted)



# [1.9.0](https://github.com/vitejs/vite/compare/plugin-vue@1.8.1...plugin-vue@1.9.0) (2021-09-21)


### Bug Fixes

* **plugin-vue:** enable ts in template also for lang=tsx ([ed88df3](https://github.com/vitejs/vite/commit/ed88df30a93d759e5c4ac0f079b9f604fad2ce40))


### Features

* **plugin-vue:** support optional @vue/compiler-sfc peer dep ([b17b5ae](https://github.com/vitejs/vite/commit/b17b5ae68de50413a95fb992ceda92ec0fceaa86))



## [1.8.1](https://github.com/vitejs/vite/compare/plugin-vue@1.8.0...plugin-vue@1.8.1) (2021-09-19)


### Bug Fixes

* **plugin-vue:** generate tree-shakable code ([316d7af](https://github.com/vitejs/vite/commit/316d7afc0c84e51359938a12ebe1b09ca34ea8bd))



# [1.8.0](https://github.com/vitejs/vite/compare/plugin-vue@1.7.1...plugin-vue@1.8.0) (2021-09-18)


### Bug Fixes

* **deps:** update all non-major dependencies ([#4545](https://github.com/vitejs/vite/issues/4545)) ([a44fd5d](https://github.com/vitejs/vite/commit/a44fd5d38679da0be2536103e83af730cda73a95))


### Performance Improvements

* **plugin-vue:** inline main script for build + avoid sourcemap generation when possible ([93d9a2d](https://github.com/vitejs/vite/commit/93d9a2d175b1a1e3fe54197856a86887b1dadb74))



## [1.7.1](https://github.com/vitejs/vite/compare/plugin-vue@1.7.0...plugin-vue@1.7.1) (2021-09-18)


### Bug Fixes

* **plugin-vue:** properly handle in-template TS syntax + tests ([0a2a5e1](https://github.com/vitejs/vite/commit/0a2a5e1c8b9d2765faecfb5e4641b1c5a94575e1))



# [1.7.0](https://github.com/vitejs/vite/compare/plugin-vue@1.6.2...plugin-vue@1.7.0) (2021-09-18)


### Features

* **plugin-vue:** support TS in template expressions ([01fa2ab](https://github.com/vitejs/vite/commit/01fa2abe901834c1c3168c343120429700e82983))



## [1.6.2](https://github.com/vitejs/vite/compare/plugin-vue@1.6.1...plugin-vue@1.6.2) (2021-09-08)


### Bug Fixes

* **plugin-vue:** ensure descriptor in case main request is cached ([85612fe](https://github.com/vitejs/vite/commit/85612fe69da98759dbf3b5352cf47a74f20374ff))



## [1.6.1](https://github.com/vitejs/vite/compare/plugin-vue@1.6.0...plugin-vue@1.6.1) (2021-09-06)


### Bug Fixes

* hmr doesn't work when modifying the code of jsx in sfc ([#4563](https://github.com/vitejs/vite/issues/4563)) ([1012367](https://github.com/vitejs/vite/commit/101236794c5d6d28591302d5552cb1c0ab8f4115))
* **plugin-vue:** avoid applying ref transform to dependencies by default ([cd4f341](https://github.com/vitejs/vite/commit/cd4f341201d5598c3ec9cc594949e7d5304ac7ec))



# [1.6.0](https://github.com/vitejs/vite/compare/plugin-vue@1.5.0...plugin-vue@1.6.0) (2021-08-24)


### Features

* **plugin-vue:** latest ref transform support ([533b002](https://github.com/vitejs/vite/commit/533b0029adc912257251b5021879ab1d676a16ab))
* **plugin-vue:** warn compiler-sfc version mismatch ([e7263b9](https://github.com/vitejs/vite/commit/e7263b98f2e174198b322d26c6a7207d706a6639))



# [1.5.0](https://github.com/vitejs/vite/compare/plugin-vue@1.4.0...plugin-vue@1.5.0) (2021-08-24)



# [1.4.0](https://github.com/vitejs/vite/compare/plugin-vue@1.3.0...plugin-vue@1.4.0) (2021-08-07)

### Features

* Custom Elements mode behavior changed: now only inlines the CSS and no longer exports the custom element constructor (exports the component as in normal mode). Users now need to explicitly call `defineCustomElement` on the component. This allows the custom element to be defined using an async version of the source component.

### Bug Fixes

* revert update dependency slash to v4 ([#4118](https://github.com/vitejs/vite/issues/4118)) ([#4519](https://github.com/vitejs/vite/issues/4519)) ([9b4fe1f](https://github.com/vitejs/vite/commit/9b4fe1fa68c522878d1bdef87d7aa02ae08e986f))



# [1.3.0](https://github.com/vitejs/vite/compare/plugin-vue@1.2.5...plugin-vue@1.3.0) (2021-07-27)


### Bug Fixes

* reuse the old preprocessor after changing the lang attr ([#4224](https://github.com/vitejs/vite/issues/4224)) ([7a3c6e6](https://github.com/vitejs/vite/commit/7a3c6e616385cbc069620ae583d6739a972c0ead))


### Features

* **plugin-vue:** support importing vue files as custom elements ([3a3af6e](https://github.com/vitejs/vite/commit/3a3af6eeafbc9fc686fc909ec6a61c61283316fc))



## [1.2.5](https://github.com/vitejs/vite/compare/plugin-vue@1.2.4...plugin-vue@1.2.5) (2021-07-12)



## [1.2.4](https://github.com/vitejs/vite/compare/plugin-vue@1.2.3...plugin-vue@1.2.4) (2021-06-27)


### Bug Fixes

* **ssr:** normalize manifest filenames ([#3706](https://github.com/vitejs/vite/issues/3706)) ([aa8ca3f](https://github.com/vitejs/vite/commit/aa8ca3f35218c9fb48f87d3f6f4681d379ee45ca)), closes [#3303](https://github.com/vitejs/vite/issues/3303)



## [1.2.3](https://github.com/vitejs/vite/compare/plugin-vue@1.2.2...plugin-vue@1.2.3) (2021-06-01)


### Bug Fixes

* **plugin-vue:** rewrite default after ts compiled ([#3591](https://github.com/vitejs/vite/issues/3591)) ([ea5bafa](https://github.com/vitejs/vite/commit/ea5bafaefbafd858389f88e537cb3473b4669802))



## [1.2.2](https://github.com/vitejs/vite/compare/plugin-vue@1.2.1...plugin-vue@1.2.2) (2021-04-24)


### Bug Fixes

* **plugin-vue:** add newline character before class components, fix [#2787](https://github.com/vitejs/vite/issues/2787) ([#2933](https://github.com/vitejs/vite/issues/2933)) ([8fe828e](https://github.com/vitejs/vite/commit/8fe828e9be9e9de67463af6f5dc35ebdbfdbda28))
* **plugin-vue:** avoid duplicate import, fix [#2640](https://github.com/vitejs/vite/issues/2640) ([#2897](https://github.com/vitejs/vite/issues/2897)) ([011438d](https://github.com/vitejs/vite/commit/011438d16dc42408d5229b842d67dba28868566b))
* **plugin-vue:** respect `hmr: false` server config, fix [#2790](https://github.com/vitejs/vite/issues/2790) ([#2797](https://github.com/vitejs/vite/issues/2797)) ([27e0c3f](https://github.com/vitejs/vite/commit/27e0c3fffd32a0ff90d06a909a5d5cc7d73f44b0))



## [1.2.1](https://github.com/vitejs/vite/compare/plugin-vue@1.2.0...plugin-vue@1.2.1) (2021-03-31)


### Bug Fixes

* **plugin-vue:** allow to overwrite feature flags ([#2675](https://github.com/vitejs/vite/issues/2675)) ([a4acc16](https://github.com/vitejs/vite/commit/a4acc161e10fb6d122f808ad6211feef389d41a9))



# [1.2.0](https://github.com/vitejs/vite/compare/plugin-vue@1.1.5...plugin-vue@1.2.0) (2021-03-26)


### Features

* **plugin-vue:** enable :slotted usage detection ([c40c49f](https://github.com/vitejs/vite/commit/c40c49f6fa806406364f4982fe45a69db15c204f))



## [1.1.5](https://github.com/vitejs/vite/compare/plugin-vue@1.1.4...plugin-vue@1.1.5) (2021-02-26)


### Bug Fixes

* **plugin-vue:** fix hmr when emptying sfc file ([#2142](https://github.com/vitejs/vite/issues/2142)) ([493b942](https://github.com/vitejs/vite/commit/493b94259d6a499e03684d6001fea1a96d56810c)), closes [#2128](https://github.com/vitejs/vite/issues/2128)
* **plugin-vue:** handle default rewrite edge case for commented class ([2900a9a](https://github.com/vitejs/vite/commit/2900a9a6a501628588b31f7453e2fe5a71fe45ce)), closes [#2277](https://github.com/vitejs/vite/issues/2277)
* **plugin-vue:** import vue file as raw correctly ([#1923](https://github.com/vitejs/vite/issues/1923)) ([5b56d70](https://github.com/vitejs/vite/commit/5b56d70c1d173d4c5e3d9532f9c3bc6f8bfc020c))



## [1.1.4](https://github.com/vitejs/vite/compare/plugin-vue@1.1.3...plugin-vue@1.1.4) (2021-01-30)


### Bug Fixes

* **plugin-vue:** handle block src pointing to dependency files ([bb7da3f](https://github.com/vitejs/vite/commit/bb7da3f0f07da6558f0e81bd82ede4cfe1785a56)), closes [#1812](https://github.com/vitejs/vite/issues/1812)



## [1.1.3](https://github.com/vitejs/vite/compare/plugin-vue@1.1.2...plugin-vue@1.1.3) (2021-01-29)


### Bug Fixes

* **plugin-vue:** special handling for class default export in sfc ([d3397e6](https://github.com/vitejs/vite/commit/d3397e61cd9d0761606506dcc176a1cbc845d8b5)), closes [#1476](https://github.com/vitejs/vite/issues/1476)



## [1.1.2](https://github.com/vitejs/vite/compare/plugin-vue@1.1.1...plugin-vue@1.1.2) (2021-01-24)



## [1.1.1](https://github.com/vitejs/vite/compare/plugin-vue@1.1.0...plugin-vue@1.1.1) (2021-01-23)


### Bug Fixes

* avoid eager hmr api access ([fa37456](https://github.com/vitejs/vite/commit/fa37456584a09b52b39a61760a6d130e261886ff))


### Features

* support `base` option during dev, deprecate `build.base` ([#1556](https://github.com/vitejs/vite/issues/1556)) ([809d4bd](https://github.com/vitejs/vite/commit/809d4bd3bf62d3bc6b35f182178922d2ab2175f1))



# [1.1.0](https://github.com/vitejs/vite/compare/plugin-vue@1.0.6...plugin-vue@1.1.0) (2021-01-19)


### Features

* ssr manifest for preload inference ([107e79e](https://github.com/vitejs/vite/commit/107e79e7b7d422f0d1dbe8b7b435636df7c6281c))
* **plugin-vue:** support for vite core new ssr impl ([a93ab23](https://github.com/vitejs/vite/commit/a93ab23491ee9fee78345ddc20567e1b0ceec2a7))



## [1.0.6](https://github.com/vitejs/vite/compare/plugin-vue@1.0.5...plugin-vue@1.0.6) (2021-01-15)


### Bug Fixes

* **plugin-vue:** sfc src import respect alias ([#1544](https://github.com/vitejs/vite/issues/1544)) ([d8754de](https://github.com/vitejs/vite/commit/d8754deeb16ef0d86b17dfa2a3394d0919bcd72e)), closes [#1542](https://github.com/vitejs/vite/issues/1542)



## [1.0.5](https://github.com/vitejs/vite/compare/plugin-vue@1.0.4...plugin-vue@1.0.5) (2021-01-09)


### Bug Fixes

* **plugin-vue:** default pug doctype ([756a0f2](https://github.com/vitejs/vite/commit/756a0f26911e5bff9c1ea3f780a0a1eccd1f1cfd)), closes [#1383](https://github.com/vitejs/vite/issues/1383)
* **plugin-vue:** pass on script and style options to compiler-sfc ([0503d42](https://github.com/vitejs/vite/commit/0503d42aaddbc4b8428c94ede07cf7b84f800cef)), closes [#1450](https://github.com/vitejs/vite/issues/1450)



## [1.0.4](https://github.com/vitejs/vite/compare/plugin-vue@1.0.3...plugin-vue@1.0.4) (2021-01-04)


### Bug Fixes

* **plugin-vue:** mark SFC compiler options as `Partial` ([#1316](https://github.com/vitejs/vite/issues/1316)) ([331484c](https://github.com/vitejs/vite/commit/331484c2600e96543aa8007b4940d023cb5cc19f))


### Features

* **plugin-vue:** export vue query parse API ([#1303](https://github.com/vitejs/vite/issues/1303)) ([56bcb0c](https://github.com/vitejs/vite/commit/56bcb0c475a5dff31527cad6dcd7c61fde424f5e))



## [1.0.3](https://github.com/vitejs/vite/compare/plugin-vue@1.0.2...plugin-vue@1.0.3) (2021-01-02)


### Bug Fixes

* **plugin-vue:** custom block prev handling ([8dbc2b4](https://github.com/vitejs/vite/commit/8dbc2b47dd8fea4a953fb05057edb47122e2dcb7))


### Code Refactoring

* **hmr:** pass context object to `handleHotUpdate` plugin hook ([b314771](https://github.com/vitejs/vite/commit/b3147710e96a8f88ab81b2e45dbf7e7174ad976c))


### BREAKING CHANGES

* **hmr:** `handleHotUpdate` plugin hook now receives a single
`HmrContext` argument instead of multiple args.



## [1.0.2](https://github.com/vitejs/vite/compare/plugin-vue@1.0.2...plugin-vue@1.0.2) (2021-01-02)


### Bug Fixes

* **plugin-vue:** avoid throwing on never requested file ([48a24c1](https://github.com/vitejs/vite/commit/48a24c1fa1f64e89ca853635580911859ef5881b))
* **plugin-vue:** custom block prev handling ([8dbc2b4](https://github.com/vitejs/vite/commit/8dbc2b47dd8fea4a953fb05057edb47122e2dcb7))
* avoid self referencing type in plugin-vue ([9cccdaa](https://github.com/vitejs/vite/commit/9cccdaa0935ca664c8a709a89ebd1f2216565546))
* **plugin-vue:** ensure id on descriptor ([91217f6](https://github.com/vitejs/vite/commit/91217f6d968485303e71128bb79ad4400b9b4412))
