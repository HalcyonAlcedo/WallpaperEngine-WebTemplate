<template>
  <div class="screen">
      <background></background>
      <parts></parts>
      <clock v-if="clock1"></clock>
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
  },
  computed:{
    clock1 (){
      return this.$store.state.clock1.value;
    },
  }
}
</script>

<style scoped>
.screen {
  height: 100vh;
  width: 100vw;
}
</style>
