<template>
  <div class="parts">
      <div id="particles-js"></div>
  </div>
</template>

<script>
import 'particlesjs'

export default {
  name: 'parts',
  mounted (){
    particlesJS("particles-js",require('@/assets/particles-autumn.json'))
  }
}
</script>

<style scoped>
#particles-js {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
}
</style>