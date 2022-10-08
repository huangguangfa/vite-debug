<template>
  <h2>Template Static Asset Reference111222</h2>
</template>

<script setup lang="ts">
import { useHttp } from './hooks'
import { getUserName } from './test'
const { $get } = useHttp()
console.log('assets111', $get, getUserName)
</script>

<style scoped>
img {
  width: 30px;
}
.relative-style-url {
  display: inline-block;
  height: 30px;
  width: 30px;
  background-image: url('./assets/asset.png');
  background-size: 30px;
}
</style>
