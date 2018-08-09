<template>
  <div class="screen">
      <background></background>
      <parts></parts>
      <clock></clock>
  </div>
</template>

<script>
import clock from '@/components/module/clock'
import background from '@/components/module/background'
import parts from '@/components/module/parts'

export default {
  name: 'screen',
  components: {
      'clock': clock,
      'background': background,
      'parts' : parts
    }
}
</script>

<style scoped>
.screen {
  height: 100vh;
  width: 100vw;
}
</style>
