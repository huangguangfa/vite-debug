<template>
  <div class="comments">hello</div>
  <!-- 注释测试 -->
  <h1>Vue SFCs2</h1>
  <!--删除的内容-->
  {{ time as string }}
  <!-- 
    <Assets></Assets> 
  -->
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
// import Assets from './Assets.vue'

const res = getCurrentInstance()

console.log(1133355511, res)

const time = ref('loading...')

window.addEventListener('load', () => {
  setTimeout(() => {
    const [entry] = performance.getEntriesByType('navigation')
    time.value = `loaded in ${entry.duration.toFixed(2)}ms.`
  }, 0)
})
</script>

<style>
.comments {
  font-size: 30px;
}
</style>
