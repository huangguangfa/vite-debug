<template>
  <div class="comments">hello</div>
  <!-- 注释测试 -->
  <h1>Vue SFCs2</h1>
  <!--删除的内容-->
  {{ time as string }}
  <!-- <Assets></Assets> -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import Assets from './Assets.vue'
const jsList = import.meta.glob('./js/**', { eager: true })
const useEnv = import.meta.env
console.log(1133355511, useEnv, jsList, window.isCustomStatus)

const time = ref('loading...')

window.addEventListener('load', () => {
  setTimeout(() => {
    const [entry] = performance.getEntriesByType('navigation')
    time.value = `loaded in ${entry.duration.toFixed(2)}ms.`
  }, 0)
})
</script>

<style scoped>
.comments {
  font-size: 30px;
}
</style>
