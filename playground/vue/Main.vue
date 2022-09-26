<template>
  <div class="comments"><!--hello--></div>
  <h1>Vue SFCs2</h1>
  {{ time as string }}
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'

const res = getCurrentInstance()

console.log(res)

const time = ref('loading...')

window.addEventListener('load', () => {
  setTimeout(() => {
    const [entry] = performance.getEntriesByType('navigation')
    time.value = `loaded in ${entry.duration.toFixed(2)}ms.`
  }, 0)
})
</script>
