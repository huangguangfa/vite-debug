## <small>2.0.1 (2022-08-29)</small>

* fix: mention that Node.js 13/15 support is dropped (fixes #9113) (#9116) ([2826303](https://github.com/vitejs/vite/commit/2826303)), closes [#9113](https://github.com/vitejs/vite/issues/9113) [#9116](https://github.com/vitejs/vite/issues/9116)
* fix(deps): update all non-major dependencies (#9176) ([31d3b70](https://github.com/vitejs/vite/commit/31d3b70)), closes [#9176](https://github.com/vitejs/vite/issues/9176)
* fix(deps): update all non-major dependencies (#9575) ([8071325](https://github.com/vitejs/vite/commit/8071325)), closes [#9575](https://github.com/vitejs/vite/issues/9575)
* fix(deps): update all non-major dependencies (#9888) ([e35a58b](https://github.com/vitejs/vite/commit/e35a58b)), closes [#9888](https://github.com/vitejs/vite/issues/9888)
* perf(plugin-vue-jsx): hoist variables (#9687) ([d9eb6b9](https://github.com/vitejs/vite/commit/d9eb6b9)), closes [#9687](https://github.com/vitejs/vite/issues/9687)



## 2.0.0 (2022-07-13)

* chore: 3.0 release notes and bump peer deps (#9072) ([427ba26](https://github.com/vitejs/vite/commit/427ba26)), closes [#9072](https://github.com/vitejs/vite/issues/9072)
* chore: use `tsx` directly instead of indirect `esno` (#8773) ([f018f13](https://github.com/vitejs/vite/commit/f018f13)), closes [#8773](https://github.com/vitejs/vite/issues/8773)
* chore(deps): update all non-major dependencies (#9022) ([6342140](https://github.com/vitejs/vite/commit/6342140)), closes [#9022](https://github.com/vitejs/vite/issues/9022)
* fix(deps): update all non-major dependencies (#8802) ([a4a634d](https://github.com/vitejs/vite/commit/a4a634d)), closes [#8802](https://github.com/vitejs/vite/issues/8802)



## 2.0.0-beta.0 (2022-06-21)

* chore: update major deps (#8572) ([0e20949](https://github.com/vitejs/vite/commit/0e20949)), closes [#8572](https://github.com/vitejs/vite/issues/8572)
* chore: use `esno` to replace `ts-node` (#8162) ([c18a5f3](https://github.com/vitejs/vite/commit/c18a5f3)), closes [#8162](https://github.com/vitejs/vite/issues/8162)
* chore: use node prefix (#8309) ([60721ac](https://github.com/vitejs/vite/commit/60721ac)), closes [#8309](https://github.com/vitejs/vite/issues/8309)
* feat: bump minimum node version to 14.18.0 (#8662) ([8a05432](https://github.com/vitejs/vite/commit/8a05432)), closes [#8662](https://github.com/vitejs/vite/issues/8662)
* feat: expose createFilter util (#8562) ([c5c424a](https://github.com/vitejs/vite/commit/c5c424a)), closes [#8562](https://github.com/vitejs/vite/issues/8562)
* refactor: remove hooks ssr param support (#8491) ([f59adf8](https://github.com/vitejs/vite/commit/f59adf8)), closes [#8491](https://github.com/vitejs/vite/issues/8491)
* docs(plugin-vue-jsx): update the options (#8496) ([0826f7b](https://github.com/vitejs/vite/commit/0826f7b)), closes [#8496](https://github.com/vitejs/vite/issues/8496)
* fix(deps): update all non-major dependencies (#8281) ([c68db4d](https://github.com/vitejs/vite/commit/c68db4d)), closes [#8281](https://github.com/vitejs/vite/issues/8281)
* fix(deps): update all non-major dependencies (#8391) ([842f995](https://github.com/vitejs/vite/commit/842f995)), closes [#8391](https://github.com/vitejs/vite/issues/8391)
* feat!: migrate to ESM (#8178) ([76fdc27](https://github.com/vitejs/vite/commit/76fdc27)), closes [#8178](https://github.com/vitejs/vite/issues/8178)



## 2.0.0-alpha.1 (2022-05-19)

* fix: rewrite CJS specific funcs/vars in plugins (#8227) ([9baa70b](https://github.com/vitejs/vite/commit/9baa70b)), closes [#8227](https://github.com/vitejs/vite/issues/8227)
* build!: bump targets (#8045) ([66efd69](https://github.com/vitejs/vite/commit/66efd69)), closes [#8045](https://github.com/vitejs/vite/issues/8045)



## 2.0.0-alpha.0 (2022-05-13)

* chore: revert vitejs/vite#8152 (#8161) ([85b8b55](https://github.com/vitejs/vite/commit/85b8b55)), closes [vitejs/vite#8152](https://github.com/vitejs/vite/issues/8152) [#8161](https://github.com/vitejs/vite/issues/8161)
* chore: update plugins peer deps ([d57c23c](https://github.com/vitejs/vite/commit/d57c23c))
* chore: use `unbuild` to bundle plugins (#8139) ([638b168](https://github.com/vitejs/vite/commit/638b168)), closes [#8139](https://github.com/vitejs/vite/issues/8139)
* chore(deps): update all non-major dependencies (#7780) ([eba9d05](https://github.com/vitejs/vite/commit/eba9d05)), closes [#7780](https://github.com/vitejs/vite/issues/7780)
* chore(deps): update all non-major dependencies (#7949) ([b877d30](https://github.com/vitejs/vite/commit/b877d30)), closes [#7949](https://github.com/vitejs/vite/issues/7949)
* chore(deps): use `esno` to replace `ts-node` (#8152) ([2363bd3](https://github.com/vitejs/vite/commit/2363bd3)), closes [#8152](https://github.com/vitejs/vite/issues/8152)
* chore(plugin-vue-jsx): add peer deps (#8086) ([7b48e22](https://github.com/vitejs/vite/commit/7b48e22)), closes [#8086](https://github.com/vitejs/vite/issues/8086)
* refactor: use node hash (#7975) ([5ce7c74](https://github.com/vitejs/vite/commit/5ce7c74)), closes [#7975](https://github.com/vitejs/vite/issues/7975)
* refactor: use optional chaining in config `define` of vue-jsx (#8046) ([9f8381e](https://github.com/vitejs/vite/commit/9f8381e)), closes [#8046](https://github.com/vitejs/vite/issues/8046)
* build!: remove node v12 support (#7833) ([eeac2d2](https://github.com/vitejs/vite/commit/eeac2d2)), closes [#7833](https://github.com/vitejs/vite/issues/7833)



## <small>1.3.10 (2022-04-13)</small>

* fix(deps): update all non-major dependencies (#7668) ([485263c](https://github.com/vitejs/vite/commit/485263c)), closes [#7668](https://github.com/vitejs/vite/issues/7668)



## <small>1.3.9 (2022-03-30)</small>

* fix(deps): update all non-major dependencies (#7392) ([b63fc3b](https://github.com/vitejs/vite/commit/b63fc3b)), closes [#7392](https://github.com/vitejs/vite/issues/7392)
* chore(deps): update all non-major dependencies (#6905) ([839665c](https://github.com/vitejs/vite/commit/839665c)), closes [#6905](https://github.com/vitejs/vite/issues/6905)



## [1.3.8](https://github.com/vitejs/vite/compare/plugin-vue@2.2.4...plugin-vue@1.3.8) (2022-02-28)



## [1.3.7](https://github.com/vitejs/vite/compare/plugin-vue@2.2.0...plugin-vue@1.3.7) (2022-02-14)


### Bug Fixes

* **deps:** update all non-major dependencies ([#6782](https://github.com/vitejs/vite/issues/6782)) ([e38be3e](https://github.com/vitejs/vite/commit/e38be3e6ca7bf79319d5d7188e1d347b1d6091ef))



## [1.3.6](https://github.com/vitejs/vite/compare/plugin-vue@2.2.0...plugin-vue@1.3.6) (2022-02-12)


### Bug Fixes

* **deps:** update all non-major dependencies ([#6782](https://github.com/vitejs/vite/issues/6782)) ([e38be3e](https://github.com/vitejs/vite/commit/e38be3e6ca7bf79319d5d7188e1d347b1d6091ef))



## [1.3.5](https://github.com/vitejs/vite/compare/plugin-vue-jsx@1.3.4...plugin-vue-jsx@1.3.5) (2022-02-12)



## [1.3.4](https://github.com/vitejs/vite/compare/plugin-vue-jsx@1.3.3...plugin-vue-jsx@1.3.4) (2022-02-09)



## [1.3.3](https://github.com/vitejs/vite/compare/plugin-vue-jsx@1.3.2...plugin-vue-jsx@1.3.3) (2021-12-20)



## [1.3.2](https://github.com/vitejs/vite/compare/plugin-vue-jsx@1.3.1...plugin-vue-jsx@1.3.2) (2021-12-13)


### Bug Fixes

* allow overwriting `define` options in vue & vue-jsx plugins ([#6072](https://github.com/vitejs/vite/issues/6072)) ([5f3f6b7](https://github.com/vitejs/vite/commit/5f3f6b7b406cb3371084057c74814eb36175e5cf))



## [1.3.1](https://github.com/vitejs/vite/compare/plugin-vue-jsx@1.3.0...plugin-vue-jsx@1.3.1) (2021-12-07)



# [1.3.0](https://github.com/vitejs/vite/compare/plugin-vue-jsx@1.3.0-beta.0...plugin-vue-jsx@1.3.0) (2021-11-22)



# [1.3.0-beta.0](https://github.com/vitejs/vite/compare/plugin-vue-jsx@1.2.0...plugin-vue-jsx@1.3.0-beta.0) (2021-10-28)



# [1.2.0](https://github.com/vitejs/vite/compare/plugin-vue-jsx@1.1.8...plugin-vue-jsx@1.2.0) (2021-09-29)


### Bug Fixes

* **deps:** update all non-major dependencies ([#4545](https://github.com/vitejs/vite/issues/4545)) ([a44fd5d](https://github.com/vitejs/vite/commit/a44fd5d38679da0be2536103e83af730cda73a95))
* normalize internal plugin names ([#4976](https://github.com/vitejs/vite/issues/4976)) ([37f0b2f](https://github.com/vitejs/vite/commit/37f0b2fff74109d381513ed052a32b43655ee11d))



## [1.1.8](https://github.com/vitejs/vite/compare/plugin-vue-jsx@1.1.7...plugin-vue-jsx@1.1.8) (2021-09-07)


### Bug Fixes

* hmr doesn't work when modifying the code of jsx in sfc ([#4563](https://github.com/vitejs/vite/issues/4563)) ([1012367](https://github.com/vitejs/vite/commit/101236794c5d6d28591302d5552cb1c0ab8f4115))



## [1.1.7](https://github.com/vitejs/vite/compare/plugin-vue-jsx@1.1.6...plugin-vue-jsx@1.1.7) (2021-07-27)


### Bug Fixes

* **deps:** update all non-major dependencies ([#4387](https://github.com/vitejs/vite/issues/4387)) ([2f900ba](https://github.com/vitejs/vite/commit/2f900ba4d4ad8061e0046898e8d1de3129e7f784))



## [1.1.6](https://github.com/vitejs/vite/compare/plugin-vue-jsx@1.1.5...plugin-vue-jsx@1.1.6) (2021-06-27)


### Bug Fixes

* **deps:** update all non-major dependencies ([#3791](https://github.com/vitejs/vite/issues/3791)) ([74d409e](https://github.com/vitejs/vite/commit/74d409eafca8d74ec4a6ece621ea2895bc1f2a32))
* **plugin-vue-jsx:** replace default export with helper during SSR ([#3966](https://github.com/vitejs/vite/issues/3966)) ([bc86464](https://github.com/vitejs/vite/commit/bc86464d3c6591eae96e070a1724a3f21874c8ce))
* **ssr:** normalize manifest filenames ([#3706](https://github.com/vitejs/vite/issues/3706)) ([aa8ca3f](https://github.com/vitejs/vite/commit/aa8ca3f35218c9fb48f87d3f6f4681d379ee45ca)), closes [#3303](https://github.com/vitejs/vite/issues/3303)


### Features

* **plugin-vue-jsx:**  jsx plugin should have extra babel plugins option ([#3923](https://github.com/vitejs/vite/issues/3923)) ([aada0c5](https://github.com/vitejs/vite/commit/aada0c5e71e4826cf049596f3459d48b386ea4da))



## [1.1.5](https://github.com/vitejs/vite/compare/plugin-vue-jsx@1.1.4...plugin-vue-jsx@1.1.5) (2021-06-01)


### Bug Fixes

* include/exclude options for vue-jsx .d.ts ([#3573](https://github.com/vitejs/vite/issues/3573)) ([82ec0ca](https://github.com/vitejs/vite/commit/82ec0ca69c1f077cf518073edca4e6580ebd4892))



## [1.1.4](https://github.com/vitejs/vite/compare/plugin-vue-jsx@1.1.3...plugin-vue-jsx@1.1.4) (2021-05-03)


### Features

* include/exclude options for vue-jsx plugin ([#1953](https://github.com/vitejs/vite/issues/1953)) ([fbecf1e](https://github.com/vitejs/vite/commit/fbecf1e5349ea5da8ff6f194efdcb152e2995398))



## [1.1.3](https://github.com/vitejs/vite/compare/plugin-vue-jsx@1.1.2...plugin-vue-jsx@1.1.3) (2021-03-31)


### Bug Fixes

* ignore babelrc ([#2766](https://github.com/vitejs/vite/issues/2766)) ([23c4114](https://github.com/vitejs/vite/commit/23c41149ddf74261f7615d22e59b39a017b79509)), closes [#2722](https://github.com/vitejs/vite/issues/2722)



## [1.1.2](https://github.com/vitejs/vite/compare/plugin-vue-jsx@1.1.1...plugin-vue-jsx@1.1.2) (2021-02-24)



## [1.1.1](https://github.com/vitejs/vite/compare/plugin-vue-jsx@1.1.0...plugin-vue-jsx@1.1.1) (2021-02-24)


### Bug Fixes

* **plugin-vue-jsx:** do not read babel configuration ([#2181](https://github.com/vitejs/vite/issues/2181)) ([8f0dc25](https://github.com/vitejs/vite/commit/8f0dc25e943ff490eefa0ed3663205a14e8eed9e))



# [1.1.0](https://github.com/vitejs/vite/compare/plugin-vue-jsx@1.0.3...plugin-vue-jsx@1.1.0) (2021-02-09)


### Features

* **plugin-vue-jsx:** register jsx module during ssr ([7a6aa2a](https://github.com/vitejs/vite/commit/7a6aa2ad2689bf8221389924a608876866db7b0a))



## [1.0.3](https://github.com/vitejs/vite/compare/plugin-vue-jsx@1.0.2...plugin-vue-jsx@1.0.3) (2021-02-08)


### Bug Fixes

* **plugin-vue-jsx:** support ssr ([30e92a1](https://github.com/vitejs/vite/commit/30e92a150e060e8bedcb6f0c477dcaa87e7996d6)), closes [#1939](https://github.com/vitejs/vite/issues/1939)



## [1.0.2](https://github.com/vitejs/vite/compare/plugin-vue-jsx@1.0.1...plugin-vue-jsx@1.0.2) (2021-01-12)


### Bug Fixes

* **plugin-vue-jsx:** files should include `index.d.ts` ([#1473](https://github.com/vitejs/vite/issues/1473)) [skip ci] ([f3ab497](https://github.com/vitejs/vite/commit/f3ab497b762e267721ace628bc6c7c5695b0d431))
* **plugin-vue-jsx:** fix define call check ([#1480](https://github.com/vitejs/vite/issues/1480)) ([4ea065f](https://github.com/vitejs/vite/commit/4ea065f6278f30c022ed291bfb0412a674b18dd4))
* **plugin-vue-jsx:** fix vue jsx hmr ([#1495](https://github.com/vitejs/vite/issues/1495)) ([6bdc3eb](https://github.com/vitejs/vite/commit/6bdc3eb2d004a28d2934946e33602f832b1ad8f2))


### Performance Improvements

* **plugin-vue-jsx:** only gen source map when necessary ([bfa8530](https://github.com/vitejs/vite/commit/bfa8530fc60deada634c38cfd6a23ab8ca05d47c))



## [1.0.1](https://github.com/vitejs/vite/compare/plugin-vue-jsx@1.0.0...plugin-vue-jsx@1.0.1) (2021-01-04)


### Bug Fixes

* still let esbuild handle ts ([5903554](https://github.com/vitejs/vite/commit/59035546db7ff4b7020242ba994a5395aac92802))



# 2.0.0-beta.4 (2021-01-04)



# 1.0.0 (2021-01-04)


### Features

* vue-jsx support ([e756c48](https://github.com/vitejs/vite/commit/e756c48ed4c7372d4c8e26016ba4b91880e7e248))



